// Every deploy-specific value lives here. Change these, rebuild, redeploy.
export default {
  // Final domain is not cleared yet. Swap this one value when it is.
  siteUrl: 'https://night-desk.pages.dev',
  // Cal.com booking link, e.g. 'your-name/20min'. Empty = form posts the lead, then shows the email fallback only.
  calLink: '',
  calOrigin: 'https://cal.com',
  // Same-origin Cloudflare Pages Function (functions/api/lead.js).
  leadEndpoint: '/api/lead',
};
