// Worker entry: /api/lead runs here, everything else is the static Astro build in dist/.
import { handleLead } from './lead.js';

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/lead') {
      if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: { allow: 'POST' } });
      return handleLead(request, env, ctx);
    }
    return env.ASSETS.fetch(request);
  },
};
