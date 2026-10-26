// POST /api/lead: receives the booking form (JSON from the page script, or form-encoded when JS is off).
// A lead counts as captured only when it is stored in KV (binding LEADS), emailed via Resend, or accepted
// by the webhook. If none of those succeed the visitor gets 503 so the page can say so. No key lives in the repo.
// Storage: KV namespace bound as LEADS in wrangler.jsonc. Key: lead:<ISO timestamp>:<random>.
// Email alert: RESEND_API_KEY (secret) and LEAD_NOTIFY_TO (where alerts go) on the Worker. Cal.com sends its
// own email on booking, so a lead alert with no matching booking is someone who left at the scheduler.
// LEAD_FROM is optional (LEAD_NOTIFY_FROM still works). The default sender needs notify.nightporterhq.com
// verified in Resend; until then Resend rejects the send and the lead still counts as captured if KV stored it.
// Webhook: optional LEAD_WEBHOOK_URL (encrypted variable); every lead is POSTed there as JSON.
import site from '../site.config.mjs';
import { VARIANTS } from '../src/data/variants';

const FIELDS = ['name', 'email', 'company', 'size', 'variant'];
const EMAIL = /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i;
const HONEYPOT = 'website';
const DEFAULT_FROM = 'Night Porter Leads <leads@notify.nightporterhq.com>';
const ALLOWED_ORIGINS = new Set([new URL(site.siteUrl).origin]);
// Preview and version URLs for this Worker, e.g. <preview>-night-porter.<subdomain>.workers.dev.
const PREVIEW_HOST = /^([a-z0-9-]+-)?night-porter\.[a-z0-9-]+\.workers\.dev$/;
const LOCAL_HOST = /^(localhost|127\.0\.0\.1|\[::1\])$/;

function originAllowed(request) {
  const value = request.headers.get('origin') || request.headers.get('referer');
  if (!value) return false;
  let url;
  try {
    url = new URL(value);
  } catch {
    return false;
  }
  if (url.origin === new URL(request.url).origin) return true;
  if (ALLOWED_ORIGINS.has(url.origin)) return true;
  if (url.protocol === 'https:' && PREVIEW_HOST.test(url.hostname)) return true;
  return url.protocol === 'http:' && LOCAL_HOST.test(url.hostname);
}

export async function handleLead(request, env) {
  const isJson = (request.headers.get('content-type') || '').includes('application/json');
  if (!originAllowed(request)) return reply(isJson, 403, { ok: false });

  let raw;
  try {
    raw = isJson ? await request.json() : Object.fromEntries(await request.formData());
  } catch {
    return reply(isJson, 400, { ok: false });
  }
  if (!raw || typeof raw !== 'object') return reply(isJson, 400, { ok: false });

  const lead = Object.fromEntries(FIELDS.map((k) => [k, String(raw[k] ?? '').trim().slice(0, 200)]));
  if (!lead.variant) lead.variant = 'staffing';
  const variant = Object.hasOwn(VARIANTS, lead.variant) ? VARIANTS[lead.variant] : null;
  if (!lead.name || !lead.company || !EMAIL.test(lead.email) || !variant || !variant.formOpts.includes(lead.size)) {
    return reply(isJson, 422, { ok: false });
  }

  // Bots fill every field. Look like success, keep nothing.
  if (String(raw[HONEYPOT] ?? '').trim()) return success(isJson, lead, request);

  const record = {
    ...lead,
    received_at: new Date().toISOString(),
    user_agent: (request.headers.get('user-agent') || '').slice(0, 300),
    country: request.cf?.country || '',
  };

  const [stored, emailed, posted] = await Promise.all([store(record, env), notify(record, env), webhook(record, env)]);
  if (!stored && !emailed && !posted) {
    console.error('Lead not captured: no store, email or webhook succeeded');
    return isJson ? Response.json({ ok: false }, { status: 503 }) : fallbackPage();
  }
  return success(isJson, lead, request);
}

function reply(isJson, status, body) {
  return isJson ? Response.json(body, { status }) : new Response(body.ok ? 'OK' : 'Request rejected', { status });
}

function success(isJson, lead, request) {
  if (isJson) return Response.json({ ok: true });
  // No-JS fallback: go straight to the scheduler with name and email prefilled, or back to the form.
  const back = new URL(`/${lead.variant === 'proposals' ? 'proposals' : 'staffing'}/#book`, request.url);
  const to = site.calLink
    ? `${site.calOrigin}/${site.calLink}?name=${encodeURIComponent(lead.name)}&email=${encodeURIComponent(lead.email)}`
    : back.href;
  return Response.redirect(to, 303);
}

function fallbackPage() {
  const cal = site.calLink ? `<p><a href="${site.calOrigin}/${site.calLink}">Pick a time</a></p>` : '';
  const html = `<!doctype html><meta charset="utf-8"><title>Night Porter</title><p>We didn't get your details. Email <a href="mailto:${site.contactEmail}">${site.contactEmail}</a> and we'll follow up.</p>${cal}`;
  return new Response(html, { status: 503, headers: { 'content-type': 'text/html; charset=utf-8' } });
}

async function store(record, env) {
  if (!env.LEADS) return false;
  const key = `lead:${record.received_at}:${crypto.randomUUID().slice(0, 8)}`;
  try {
    await env.LEADS.put(key, JSON.stringify(record));
    return true;
  } catch (err) {
    console.error('Lead KV write failed', String(err));
    return false;
  }
}

async function notify(record, env) {
  if (!env.RESEND_API_KEY || !env.LEAD_NOTIFY_TO) return false;
  const rows = [
    ['Name', record.name],
    ['Email', record.email],
    ['Company', record.company],
    ['Size', record.size],
    ['Page', record.variant],
    ['Country', record.country],
    ['Received', record.received_at],
  ];
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        from: env.LEAD_FROM || env.LEAD_NOTIFY_FROM || DEFAULT_FROM,
        to: env.LEAD_NOTIFY_TO.split(',').map((a) => a.trim()),
        reply_to: record.email,
        subject: `New lead: ${record.name} (${record.company}), not booked yet`,
        text:
          rows.map(([k, v]) => `${k}: ${v}`).join('\n') +
          '\n\nNo Cal.com booking email for this person soon means they left at the scheduler. Reply to follow up.',
      }),
    });
    if (!res.ok) console.error('Lead email failed', res.status, await res.text());
    return res.ok;
  } catch (err) {
    console.error('Lead email failed', String(err));
    return false;
  }
}

async function webhook(record, env) {
  if (!env.LEAD_WEBHOOK_URL) return false;
  try {
    const res = await fetch(env.LEAD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(record),
    });
    if (!res.ok) console.error('Lead webhook failed', res.status);
    return res.ok;
  } catch (err) {
    console.error('Lead webhook failed', String(err));
    return false;
  }
}
