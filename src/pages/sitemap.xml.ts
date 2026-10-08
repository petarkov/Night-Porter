import type { APIRoute } from 'astro';

const PATHS = ['/', '/staffing/', '/proposals/', '/data/', '/privacy/'];

export const GET: APIRoute = ({ site }) =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${PATHS.map(
      (p) => `  <url><loc>${new URL(p, site).href}</loc></url>`,
    ).join('\n')}\n</urlset>\n`,
    { headers: { 'content-type': 'application/xml' } },
  );
