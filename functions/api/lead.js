// Cloudflare Pages Function: POST /api/lead
// Receives the booking form (JSON from the page script, or form-encoded when JS is off).
// Destination is not decided yet: set LEAD_WEBHOOK_URL as an encrypted environment variable in
// Cloudflare (Pages > Settings > Variables and secrets) and every lead is forwarded there as JSON.
// Without it, leads are only written to the function log. No key lives in the repo.
import site from '../../site.config.mjs';

const FIELDS = ['name', 'email', 'company', 'size', 'variant'];
const EMAIL = /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i;

export async function onRequestPost({ request, env }) {
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
