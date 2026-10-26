// POST /api/lead: receives the booking form (JSON from the page script, or form-encoded when JS is off).
// Destination is not decided yet: set LEAD_WEBHOOK_URL as an encrypted variable on the Worker
// (Workers & Pages > night-porter > Settings > Variables and secrets) and every lead is forwarded there as JSON.
// Without it, leads are only written to the function log. No key lives in the repo.
// Email alert: set RESEND_API_KEY (secret) and LEAD_NOTIFY_TO (where alerts go) on the Worker and every
// submission is emailed the moment it lands, before the person picks a time. Cal.com sends its own email
// on booking, so a lead alert with no matching booking is someone who left at the scheduler.
// LEAD_NOTIFY_FROM is optional: Resend's onboarding@resend.dev works until the domain is verified there.
import site from '../site.config.mjs';

const FIELDS = ['name', 'email', 'company', 'size', 'variant'];
const EMAIL = /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i;

export async function handleLead(request, env, ctx) {
  const isJson = (request.headers.get('content-type') || '').includes('application/json');
  let raw;
  try {
    raw = isJson ? await request.json() : Object.fromEntries(await request.formData());
  } catch {
    return new Response('Bad request', { status: 400 });
  }
  const lead = Object.fromEntries(FIELDS.map((k) => [k, String(raw[k] ?? '').trim().slice(0, 200)]));
  if (!lead.name || !lead.company || !lead.size || !EMAIL.test(lead.email)) {
    return new Response('Missing or invalid fields', { status: 422 });
  }
  lead.receivedAt = new Date().toISOString();

  if (env.RESEND_API_KEY && env.LEAD_NOTIFY_TO) ctx.waitUntil(notify(lead, env));

  if (env.LEAD_WEBHOOK_URL) {
    const res = await fetch(env.LEAD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(lead),
    });
    if (!res.ok) console.error('Lead webhook failed', res.status);
  } else {
    console.log('Lead (no LEAD_WEBHOOK_URL set)', JSON.stringify(lead));
  }

  if (isJson) return Response.json({ ok: true });

  // No-JS fallback: go straight to the scheduler with name and email prefilled, or back to the form.
  const back = new URL(`/${lead.variant === 'proposals' ? 'proposals' : 'staffing'}/#book`, request.url);
  const to = site.calLink
    ? `${site.calOrigin}/${site.calLink}?name=${encodeURIComponent(lead.name)}&email=${encodeURIComponent(lead.email)}`
    : back.href;
  return Response.redirect(to, 303);
}

async function notify(lead, env) {
  const rows = [
    ['Name', lead.name],
    ['Email', lead.email],
    ['Company', lead.company],
    ['Size', lead.size],
    ['Page', lead.variant || 'staffing'],
    ['Received', lead.receivedAt],
  ];
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: env.LEAD_NOTIFY_FROM || 'Night Porter <onboarding@resend.dev>',
      to: env.LEAD_NOTIFY_TO.split(',').map((a) => a.trim()),
      reply_to: lead.email,
      subject: `New lead: ${lead.name} (${lead.company}), not booked yet`,
      text:
        rows.map(([k, v]) => `${k}: ${v}`).join('\n') +
        '\n\nNo Cal.com booking email for this person soon means they left at the scheduler. Reply to follow up.',
    }),
  });
  if (!res.ok) console.error('Lead email failed', res.status, await res.text());
}
