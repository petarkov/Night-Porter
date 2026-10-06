// Every deploy-specific value lives here. Change these, rebuild, redeploy.
export default {
  // Planned domain, not bought yet. The only place the domain lives: canonical, og, sitemap, robots and schema all read it.
  siteUrl: 'https://nightporterhq.com',
  // Cal.com booking link, e.g. 'your-name/20min'. Empty = form posts the lead, then shows the email fallback only.
  calLink: '',
  calOrigin: 'https://cal.com',
  // Same-origin Cloudflare Pages Function (functions/api/lead.js).
  leadEndpoint: '/api/lead',
};
