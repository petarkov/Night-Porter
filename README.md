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

Node 22 or newer. `/api/lead` only exists on Cloudflare; locally the form still moves to the scheduler step when the post fails.

## Where things live

- `site.config.mjs`: every deploy value in one place (site URL / domain, Cal.com link, lead endpoint).
- `src/data/variants.ts`: all landing and /data copy (brief v2 plus the Oct 2026 copy update). `[[Double-bracketed]]` text is a value Petar has not confirmed. Never deploy a page that still shows one.
- `src/pages/privacy/index.astro`: privacy page, same layout as /data.
- `src/components/Landing.astro`: one component for both variants. `src/pages/staffing` and `src/pages/proposals` just pass the variant.
- `src/layouts/Base.astro`: head, simple header, footer.
- `src/styles/site.css`: the only stylesheet, built from `design-system/tokens/`. Inlined into each page at build.
- `src/lib/rich.ts`: wraps numbers in IBM Plex Mono and renders `[placeholders]` and `[[unconfirmed values]]` as placeholder tags, at build time.
- `functions/api/lead.js`: Cloudflare Pages Function that receives the booking form.
- `scripts/build-fonts.sh`: regenerates `public/fonts/` from `design-system/fonts/` (needs `pip install fonttools brotli`). Archivo and Plex Sans are variable fonts clamped to the weights used, subset to Latin.

## Deploy (Cloudflare Pages)

One-time setup in the Cloudflare dashboard:

1. Workers & Pages > Create > Pages > Connect to Git, pick this repo and the production branch.
2. Build command `npm run build`, output directory `dist`. Set `NODE_VERSION=22.16.0` under environment variables (Astro needs 22.12 or newer; `.nvmrc` pins the same).
3. Every push to the production branch deploys; other branches get preview URLs.
4. `siteUrl` in `site.config.mjs` is set to the planned domain `https://nightporterhq.com` (not bought yet). It is the only place the domain lives: canonical URLs, Open Graph, sitemap, robots and JSON-LD all read it.

### Booking form

- **Leads:** set `LEAD_WEBHOOK_URL` as an encrypted variable (Settings > Variables and secrets) and each lead is POSTed there as JSON (`name, email, company, size, variant, receivedAt`). Until then leads only go to the function log (Workers & Pages > project > Functions > Real-time logs). No keys in the repo.
- **Scheduler:** set `calLink` in `site.config.mjs` (e.g. `your-name/20min`). The Cal.com embed loads only after a valid submit, with name and email prefilled. With JS off the form posts to the function, which redirects to the Cal.com page.

## Open items

- Booking position: kept as built (checks in four columns, booking at about 57% of page height at 1440px). Decided, not a defect.
- Cal.com link: intentionally empty for now. After a valid submit, visitors see only the email fallback line.
- Word count: both variants are over the 650 target. Copy is not cut without sign-off.
- Unconfirmed values, still in `[[double brackets]]`: the support hours in the coverage line (/staffing, /proposals) and the AI provider, retention days, hosting, region, encryption, workspace and retention windows on /data. Before deploying, check that `dist/` has no `[[`.
- The footer reads `© 2026 Night Porter` until a legal entity exists.
- Logo files: `design-system/assets/` holds the supplied Night Porter SVGs and wordmark PNGs. `src/components/Logo.astro` inlines an SVGO-optimized copy of `nightporter-wordmark-paper.svg`.
