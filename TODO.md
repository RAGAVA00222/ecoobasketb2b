# TODO - Fix blank page / runtime errors

- [ ] Inspect browser console + server terminal for runtime errors on localhost.
- [ ] Fix invalid Next.js `app/global-error.tsx` (must not use <html>/<body> and must be a Server Component).
- [ ] Fix any other runtime errors in `app/layout.tsx` / `app/page.tsx` / components.
- [ ] Ensure Tailwind styles are loaded (verify `tailwind.config.js`, `postcss` configs, and `app/globals.css`).
- [ ] Verify dev server renders full homepage at the correct port (currently 3007).
- [ ] Restart dev server and re-check for zero runtime errors.

