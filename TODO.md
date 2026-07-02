# Ecoo Basket B2B - Refactor/Production Readiness TODO

## Phase 1 — Project audit
- [x] Read key files to build preliminary dependency graph
- [x] Read all route pages (/, /about, /products, /services, /contact, /founders) + error/loading/sitemap/robots
- [ ] Produce full repo-wide dependency graph (requires import scanning)
- [ ] Identify dead/unused files with proof

## Phase 2 — Remove unused files
- [x] Remove Sentry test rendering from `app/page.tsx`
- [ ] Delete `components/SentryClientTest.tsx` and `components/SentryServerTest.tsx` (after verifying no other imports)

- [ ] Determine whether `components/Hero.tsx` is unused, then delete if safe

## Phase 3 — Fix architecture
- [ ] Normalize metadata strategy (layout vs page)
- [ ] Fix Next error boundary architecture (`app/error.tsx`, `app/global-error.tsx`)

## Phase 4 — Fix code quality
- [ ] Run lint + build and fix TS/ESLint issues

## Phase 5 — Clean dependencies
- [ ] Install missing packages / remove unused packages (after audit + build)

## Phase 6 — Tailwind v4 repair
- [ ] Ensure Tailwind v4 config and PostCSS pipeline are correct
- [ ] Remove duplicate Tailwind/PostCSS config files
- [ ] Validate with `npm run build`

## Phase 7 — Performance
- [ ] Verify image asset paths and fix broken references
- [ ] Optimize image usage and loading

## Phase 8 — Security
- [ ] Remove placeholder Sentry org/project from `next.config.mjs` (use env)
- [ ] Remove/adjust any production console logs

## Phase 9 — Website validation
- [ ] Verify all routes render correctly: /, /about, /products, /services, /contact, /founders
- [ ] Validate 404 + error pages behavior

## Phase 10 — Build
- [ ] `npm install`
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] Ensure no runtime/hydration/tailwind errors

