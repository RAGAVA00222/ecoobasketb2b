# Content-Needed Checklist — ecoobasketb2b

Running list of real content dependencies (owner: client). Code ships with
structural shells / placeholders where an item is outstanding; nothing here
blocks a build. Never fabricate any of these values.

| # | Item | Needed for | Status |
|---|------|-----------|--------|
| 1 | Manufacturer/partner logo files — drop `<slug>.(png/svg/webp/jpg)` in `public/assets/images/partners/` (hul, itc, nestle, britannia, parle, coca-cola, pepsico) **and redeploy** | Phase 6 logo strip — **build-time gated**: renders only logos that exist; **section is hidden entirely while 0 files present** (no name chips, no 404s) | pending |
| 2 | GST number (GSTIN) | Phase 3.4 footer legal row | ✅ RESOLVED — GSTIN `33AAJCE8472G1ZG` approved 17 Aug 2026; applied to the footer compliance row + Organization JSON-LD `taxID` 2026-08-18 |
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
- **#2 GST:** RESOLVED 2026-08-18 — GSTIN approved 17 Aug 2026, now rendered in the footer compliance row in the same solid treatment as CIN/UDYAM and exposed as `taxID` on the Organization JSON-LD. **#3 FSSAI:** still pending → footer keeps the visible, clearly-marked "· to be updated" placeholder row (Incorporated line removed).
- **#5 Minimum order value + #6 Credit terms:** still pending → left blank. No value invented and no vague filler added (per brief 4.5).
- Product grid returned to locked 6 categories (Biscuits + Snacks merged; Staples → "Staples & Groceries"); Ecoo Nuts & Spices rendered as a distinct own-brand tile. Grid links to /downloads.

## Notes from Phase 6 (partner logo strip) — 2026-07-25
- Built `PartnerLogos` (static, no marquee) directly below the hero. Slots for HUL, ITC, Nestlé, Britannia, Parle, Coca-Cola, PepsiCo (`content/site.ts` → `manufacturers`).
- **Build-time gated (revised post-merge):** a server-side `fs` read of `public/assets/images/partners/` renders ONLY partners whose logo file exists — never requests a missing file (no 404s). **With 0 files the whole section is hidden** (approved: an empty trust strip reads as unfinished). Drop files + **redeploy** to activate.
- Removed the old unused `ManufacturerSlider.tsx` (superseded).
- **#5 Minimum order figure** still pending — insertion point now also in the "How We Deliver" step 1.

## Notes from Phase 5 (IA & structure) — 2026-07-25
- **5.1 approved & implemented:** primary nav reduced to 5 (Services · For Kirana Stores · Partner With Us · About · Contact; Home on the logo). Founders/Vision demoted; Investor/Careers/Gallery/Downloads/FAQ remain footer-only. **/we-serve merged into /services** as a "Who We Serve" block and **removed as a route** — added a **301** `/we-serve → /services` (legacy `/we-serve.html` also points straight to /services). Dropped from sitemap + footer nav. Removed the now-unused `TamilNaduMap.tsx`. `/kirana` kept as its own page.
- **5.2 approved & implemented:** the 7-step internal `DistributionWorkflow` replaced by a 3-step buyer-facing "How We Deliver" (Place your order → Dispatched same day → Pay on delivery), using approved copy. `DistributionWorkflow.tsx` removed.
- **5.3 HELD** — no zones added; "Chennai Distribution Network" section untouched (see #7).

## Notes — post-merge hardening (2026-07-25)
- Eliminated the ~287 KB of partner-logo **404-page** bytes by gating the strip (see Phase 6 note above).
- **favicon:** the old `app/favicon.ico` was a 1536×1536 JPEG (~141 KB). Regenerated a proper icon set from `04_Logo_Icon.jpg` via sharp — `app/favicon.ico` (48², ~2.8 KB), `app/icon.png` (64²), `app/apple-icon.png` (180²).

## Notes from Phase 7 (leadership / founders) — 2026-07-25
- `/leadership` scope **cancelled** — `/founders` stays the single leadership page, improved in place (existing bios/quotes untouched; name corrected "Ragavendren Chakaravarthi" → "Ragavendren" per confirmed titles).
- **Headshots converted (dependency satisfied):** 3 founder JPEGs → webp (q82, ≤800w) at `public/assets/images/founders/{nagaraj-nirmala-devi,sri-keerthana-devi-c,ragavendren}.webp`; originals kept. Used by /founders + the home teaser via `next/image`, gated by `lib/founderPhotos.ts`.
- New: `leaders` roster in `content/site.ts`; `components/FoundersTeaser.tsx` (home teaser, placed before the footer); Organization JSON-LD extended with a Person per leader (name + jobTitle + worksFor only).
- **No leadership content-needed items** — bios were already approved copy on /founders, headshots are now supplied. Nothing to remove.
