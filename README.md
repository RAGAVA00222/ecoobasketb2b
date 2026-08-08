# Ecoo Basket — corporate website

Marketing site for **Ecoo Hyper Retail Private Limited**, a B2B FMCG distributor
in Vanagaram, Chennai.

Next.js 15 (App Router) · React 19 · Tailwind CSS 4 · TypeScript · deployed on Vercel.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build — 25 static pages
npm run typecheck  # tsc --noEmit
```

The whole site prerenders to static HTML at build time. There is no database, no
API route and no runtime server dependency.

---

## Layout

```
app/          one directory per route, plus layout/sitemap/robots
components/   shared UI
content/      site.ts — the single source of truth for copy, nav and contact details
lib/          build-time helpers (founder headshot gate)
public/       static assets served as-is
```

**`content/site.ts` is the file to edit for copy changes.** Brand name, phone,
email, address, CIN, navigation and footer links all come from there rather than
being scattered through the pages.

### Routes

`/` · `/about` · `/services` · `/products` · `/kirana` · `/contact` ·
`/founders` · `/vision` · `/investor` · `/careers` · `/gallery` · `/downloads` ·
`/faq` · `/privacy` · `/terms` · `/returns`

`/we-serve` was merged into `/services` and 301s there (see `next.config.mjs`).

---

## Two build-time gates worth knowing about

Both read the filesystem during the build and render nothing when a file is
absent, so the site never requests an image that doesn't exist:

- **`lib/founderPhotos.ts`** — a leader's headshot renders only if
  `public/assets/images/founders/<slug>.webp` exists. The slugs are set in
  `content/site.ts`; renaming one without renaming the file silently drops the
  photo.
- **`components/PartnerLogos.tsx`** — the homepage partner strip renders only
  the partners whose logo file is present in
  `public/assets/images/partners/`. Drop a logo in, named for the slug, and it
  appears. The whole strip hides when the directory is empty.

---

## Deliberate omissions

Two things are left out on purpose, and both are enforced in code rather than by
convention:

- **No merchant counts or growth figures** anywhere in the copy.
- **Testimonials are behind `features.testimonials` in `content/site.ts`, set to
  `false`**, and stay off until real attributed quotes exist.

`CONTENT-NEEDED.md` tracks the copy and assets still outstanding.

---

## Deployment

Vercel builds from the default branch on push. Settings live in `vercel.json`
(framework, build and install commands); everything else is Vercel defaults.
