# Content-Needed Checklist — ecoobasketb2b

Running list of real content dependencies (owner: client). Code ships with
structural shells / placeholders where an item is outstanding; nothing here
blocks a build. Never fabricate any of these values.

| # | Item | Needed for | Status |
|---|------|-----------|--------|
| 1 | Manufacturer/partner logo files — HUL, ITC, Nestlé, Britannia, Parle, Coca-Cola, PepsiCo | Phase 6 logo strip | pending |
| 2 | GST number (GSTIN) | Phase 3.4 footer legal row | pending |
| 3 | FSSAI licence number | Phase 3.4 footer legal row | pending |
| 4 | 1200×630 OG/Twitter share image (warehouse photo, free-delivery hook legible for WhatsApp) | Phase 3.3 | pending |
| 5 | Minimum order value | Phase 4.5 | pending |
| 6 | Credit terms | Phase 4.5 | pending |
| 7 | Real Chennai zone names for "Chennai Distribution Network" copy (client must confirm accuracy) | Phase 5.3 | pending |
| 8 | Real, attributed testimonials/quotes | Testimonials section (kept flag-off until supplied) | pending |
| 9 | Precise contact-map coordinates (lat/lng) or a Google Maps Embed API key + place_id | /contact map (road-level placeholder pin for now) | pending |
| 10 | Original product-category photography (some tiles currently share a placeholder) | Home product grid | pending |

## Notes from Phase 1 (perf) — 2026-07-25
- Renamed the 6 mis-extensioned product images (`*.webp.jpg`, actually JPEG) to `*.jpg`, and `04_Logo_Icon.png` (actually JPEG) to `.jpg`. No transcoding — extension corrected to true byte format.
- `06_Logo_Brand_Banner.png` and `08_Logo_Full_Primary.png` are ALSO JPEG-as-`.png`. Left unchanged this session because they are the OG/Twitter image (Phase 3.3 replaces it) and the JSON-LD logo (Phase 3.1). Handle during Phase 3.
- A true transparent logo asset (SVG or transparent PNG) would be ideal — current logo marks are opaque JPEGs sitting on white chips.
