# Night Porter site

Static marketing site for Night Porter. Astro, no UI framework, one CSS file, under 2 KB of JS (landing pages only).

| Route | Page |
|---|---|
| `/` | Root: pick a segment |
| `/staffing/` | Landing, staffing variant |
| `/proposals/` | Landing, proposals variant |
| `/data/` | Data and security Q&A for IT |

## Local development

```sh
npm i
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm run preview   # serve dist/ locally
```

Node 22.22 or newer. `/api/lead` only runs on Cloudflare or under `npx wrangler dev`; locally the form still moves to the scheduler step when the post fails.

## Where things live

- `site.config.mjs`: every deploy value in one place (site URL / domain, Cal.com link, lead endpoint).
- `src/data/variants.ts`: all landing and /data copy (brief v2 plus the Oct 2026 copy update). `[[Double-bracketed]]` text is a value Petar has not confirmed. Never deploy a page that still shows one.
- `src/pages/privacy/index.astro`: privacy page, same layout as /data.
- `src/components/Landing.astro`: one component for both variants. `src/pages/staffing` and `src/pages/proposals` just pass the variant.
- `src/layouts/Base.astro`: head, simple header, footer.
- `src/styles/site.css`: the only stylesheet, built from `design-system/tokens/`. Inlined into each page at build.
- `src/lib/rich.ts`: wraps numbers in IBM Plex Mono and renders `[placeholders]` and `[[unconfirmed values]]` as placeholder tags, at build time.
- `worker/index.js`, `worker/lead.js`: the Worker. `/api/lead` receives the booking form; every other path is served from `dist/`.
- `wrangler.jsonc`: Cloudflare deploy config (build command, assets, 404 page).
- `scripts/build-fonts.sh`: regenerates `public/fonts/` from `design-system/fonts/` (needs `pip install fonttools brotli`). Archivo and Plex Sans are variable fonts clamped to the weights used, subset to Latin.

## Deploy (Cloudflare Workers)

The site deploys as the `night-porter` Worker: static files from `dist/` plus a small script for `/api/lead`. `wrangler.jsonc` holds the whole setup, including the build command, so Cloudflare only needs:

1. Workers & Pages > `night-porter` > Settings > Build: connected to this repo, production branch `main`, deploy command `npx wrangler deploy`.
2. Build variable `NODE_VERSION=22.22.0` (or remove it so `.nvmrc` is used). Astro's dependencies want 22.19 or newer.
3. Every push to `main` deploys.
4. `siteUrl` in `site.config.mjs` is set to `https://nightporterhq.com`. It is the only place the domain lives: canonical URLs, Open Graph, sitemap, robots and JSON-LD all read it.

Keep `wrangler.jsonc` in the repo. Without it, `wrangler deploy` auto-configures the project, runs `astro add cloudflare` and pulls in an Astro that fails on the pinned Node.

Check a deploy locally: `npm run build && npx wrangler dev` serves the site and `/api/lead` at http://localhost:8787.

### Booking form

- **Leads:** set `LEAD_WEBHOOK_URL` as an encrypted variable (Settings > Variables and secrets) and each lead is POSTed there as JSON (`name, email, company, size, variant, receivedAt`). Until then leads only go to the Worker log (Workers & Pages > night-porter > Logs). No keys in the repo.
- **Scheduler:** set `calLink` in `site.config.mjs` (e.g. `your-name/20min`). The Cal.com embed loads only after a valid submit, with name and email prefilled. With JS off the form posts to the Worker, which redirects to the Cal.com page.

## Open items

- Booking position: kept as built (checks in four columns, booking at about 57% of page height at 1440px). Decided, not a defect.
- Cal.com link: intentionally empty for now. After a valid submit, visitors see only the email fallback line.
- Word count: both variants are over the 650 target. Copy is not cut without sign-off.
- No unconfirmed values left. If one is added later in `[[double brackets]]`, check that `dist/` has no `[[` before deploying.
- The footer reads `© 2026 Night Porter` until a legal entity exists.
- Logo files: `design-system/assets/` holds the supplied Night Porter SVGs and wordmark PNGs. `src/components/Logo.astro` inlines an SVGO-optimized copy of `nightporter-wordmark-paper.svg`.
