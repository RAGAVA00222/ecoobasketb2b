# Content-Needed Checklist — ecoobasketb2b

Running list of real content dependencies (owner: client). Code ships with
structural shells / placeholders where an item is outstanding; nothing here
blocks a build. Never fabricate any of these values.

| # | Item | Needed for | Status |
|---|------|-----------|--------|
| 1 | Manufacturer/partner logo files — drop at `public/assets/images/partners/<slug>.png` (hul, itc, nestle, britannia, parle, coca-cola, pepsico) | Phase 6 logo strip — **shell built**; neutral name chips render until files land | pending |
| 2 | GST number (GSTIN) | Phase 3.4 footer legal row | pending |
| 3 | FSSAI licence number | Phase 3.4 footer legal row | pending |
| 4 | 1200×630 OG/Twitter share image (warehouse photo, free-delivery hook legible for WhatsApp) | Phase 3.3 | pending |
| 5 | Minimum order value — a fixed ₹ minimum **exists**; exact figure still **PENDING**. Insertion points ready: homepage "How We Deliver" step 1, FAQ, and /kirana. Do not guess. | Phase 4.5 / 5.2 | partial |
| 6 | Credit terms — cash/UPI on delivery, no credit accounts | Phase 4.5 | ✅ RESOLVED — approved copy applied to homepage FAQ 2026-07-25 |
| 7 | Real Chennai zone names for "Chennai Distribution Network" copy — **5.3 HELD by client**. Will be a SHORT list of zones actually served reliably today (not a broad coverage claim) and must not contradict the existing "zone by zone, not spreading thin" framing. Section left unchanged. | Phase 5.3 | pending (held) |
| 8 | Real, attributed testimonials/quotes | Testimonials section (kept flag-off until supplied) | pending |
| 9 | Precise contact-map coordinates (lat/lng) or a Google Maps Embed API key + place_id | /contact map (road-level placeholder pin for now) | pending |
| 10 | Original product-category photography (some tiles currently share a placeholder) | Home product grid | pending |

## Notes from Phase 1 (perf) — 2026-07-25
- Renamed the 6 mis-extensioned product images (`*.webp.jpg`, actually JPEG) to `*.jpg`, and `04_Logo_Icon.png` (actually JPEG) to `.jpg`. No transcoding — extension corrected to true byte format.
- `06_Logo_Brand_Banner.png` and `08_Logo_Full_Primary.png` are ALSO JPEG-as-`.png`. Left unchanged this session because they are the OG/Twitter image (Phase 3.3 replaces it) and the JSON-LD logo (Phase 3.1). Handle during Phase 3.
- A true transparent logo asset (SVG or transparent PNG) would be ideal — current logo marks are opaque JPEGs sitting on white chips.

## Notes from Phase 3–4 (SEO/compliance + hero/grid) — 2026-07-25
- **AVIF reverted** to WebP-only in next.config (P1 decision: ~10% larger for this asset set + slow decode on low-end Android).
- **JSON-LD extended** (not replaced): LocalBusiness now has `additionalType: "Wholesaler"`, `alternateName: "Ecoo Basket"`, structured `openingHoursSpecification` (Mo–Sa 09:00–18:00); `name` set to the legal name for the brand-collision defence. FAQPage JSON-LD added from the 5 existing homepage Q&As.
  - Note: `additionalType` is a text label ("Wholesaler"). Google accepts it; if a strict schema.org URL is required, supply a URI (e.g. a Wikidata/productontology link) and I'll swap it in.
- **08_Logo_Full_Primary.png → .jpg** (was JPEG-as-png). **06_Logo_Brand_Banner.png STILL JPEG-as-png** — left because it is the OG/Twitter image; it will be corrected when item #4 (1200×630 share image) is supplied and og:image is replaced.
- **#4 OG/Twitter image (1200×630):** still pending → og:image left as the current logo banner (skipped per brief). BLOCKS the 06 logo fix too.
- **#2 GST + #3 FSSAI:** still pending → footer shows visible, clearly-marked "· to be updated" placeholder rows (Incorporated line removed).
- **#5 Minimum order value + #6 Credit terms:** still pending → left blank. No value invented and no vague filler added (per brief 4.5).
- Product grid returned to locked 6 categories (Biscuits + Snacks merged; Staples → "Staples & Groceries"); Ecoo Nuts & Spices rendered as a distinct own-brand tile. Grid links to /downloads.

## Notes from Phase 6 (partner logo strip) — 2026-07-25
- Built `PartnerLogos` (static, no marquee) directly below the hero. Slots for HUL, ITC, Nestlé, Britannia, Parle, Coca-Cola, PepsiCo (`content/site.ts` → `manufacturers`).
- **Drop-to-activate:** put `<slug>.png` in `public/assets/images/partners/` (see that dir's README) and the slot swaps its neutral name chip for the logo — no code change. Missing files render the name chip (no broken image).
- Removed the old unused `ManufacturerSlider.tsx` (superseded).
- **#5 Minimum order figure** still pending — insertion point now also in the "How We Deliver" step 1.

## Notes from Phase 5 (IA & structure) — 2026-07-25
- **5.1 approved & implemented:** primary nav reduced to 5 (Services · For Kirana Stores · Partner With Us · About · Contact; Home on the logo). Founders/Vision demoted; Investor/Careers/Gallery/Downloads/FAQ remain footer-only. **/we-serve merged into /services** as a "Who We Serve" block and **removed as a route** — added a **301** `/we-serve → /services` (legacy `/we-serve.html` also points straight to /services). Dropped from sitemap + footer nav. Removed the now-unused `TamilNaduMap.tsx`. `/kirana` kept as its own page.
- **5.2 approved & implemented:** the 7-step internal `DistributionWorkflow` replaced by a 3-step buyer-facing "How We Deliver" (Place your order → Dispatched same day → Pay on delivery), using approved copy. `DistributionWorkflow.tsx` removed.
- **5.3 HELD** — no zones added; "Chennai Distribution Network" section untouched (see #7).
