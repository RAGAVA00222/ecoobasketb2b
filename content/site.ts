// ============================================================
// Single source of truth for locked content. Copy here is
// carried over verbatim from the current live site — do not
// rewrite. No merchant-count numbers (deliberate prior fix).
// ============================================================

export const site = {
  brand: "Ecoo Basket",
  legalName: "Ecoo Hyper Retail Private Limited",
  tagline: "B2B FMCG Distribution · Chennai, Tamil Nadu",
  // Apex is the primary domain on Netlify (www 301s here). Canonical, sitemap,
  // robots and OG all derive from this, so it must be the URL that serves 200 —
  // pointing them at a redirecting host splits SEO signals.
  domain: "https://ecoobasketb2b.com",
  orderUrl: "https://www.ecoobasket.com",
  phone: "+91 93423 58226",
  phoneRaw: "+919342358226",
  whatsapp: "https://wa.me/919342358226",
  email: "info@ecoobasketb2b.com",
  hours: "MON–SAT · 09:00–18:00 IST",
  cityLine: "VANAGARAM, CHENNAI 600095",
  // Official incorporation record (public info only)
  cin: "U47912TN2026PTC195420",
  incorporated: "15 July 2026",
  companyType: "Private Limited Company, limited by shares",
  registeredOffice:
    "Sf. No. 215 Pt No. 120, Sh No. 5, Rajesh Garden Main Road, Vanagaram, Poonamallee, Tiruvallur – 600095, Tamil Nadu, India",
  social: {
    facebook: "https://www.facebook.com/share/1HoGZJJUxZ/",
    instagram: "https://www.instagram.com/ecoobasket",
  },
};

// Feature flags. Testimonials stay OFF until real, attributed quotes exist.
export const features = {
  testimonials: false,
};

// Primary navigation — order preserved from the live site.
// Primary nav — 5 items (Home lives on the logo). About/Founders/Vision +
// Investor/Careers/Gallery/Downloads/FAQ are footer-only. /we-serve merged into
// /services ("who we serve" block) with a 301 — no longer a nav route.
export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Kirana Stores", href: "/kirana" },
  { label: "Contact", href: "/contact" },
];

// Footer-only routes (new + legal).
export const footerNav = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Founders", href: "/founders" },
    { label: "Our Vision", href: "/vision" },
    { label: "Investor Relations", href: "/investor" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
  ],
  business: [
    { label: "Services", href: "/services" },
    { label: "For Kirana Stores", href: "/kirana" },
    { label: "Partner With Us", href: "/partner" },
    { label: "Gallery", href: "/gallery" },
    { label: "Download Center", href: "/downloads" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Returns", href: "/returns" },
  ],
};

// Leadership roster — single source for /founders, the home teaser, and JSON-LD.
// Name + title + slug + intrinsic webp dimensions ONLY. No bios, no quotes, no
// shareholding — bios/quotes live on /founders; headshots gate on the webp file.
export const leaders: { name: string; title: string; slug: string; w: number; h: number }[] = [
  { name: "Nagaraj Nirmala Devi", title: "Founder & Managing Director", slug: "nagaraj-nirmala-devi", w: 800, h: 1132 },
  { name: "Sri Keerthana Devi C", title: "Co-Founder & Director", slug: "sri-keerthana-devi-c", w: 800, h: 1000 },
  { name: "Ragavendren", title: "Chief Strategy Officer", slug: "ragavendren", w: 800, h: 1069 },
];

// services.html — 6 FMCG categories (locked).
export const fmcgCategories = [
  "Beverages",
  "Biscuits & Snacks",
  "Home Care",
  "Personal Care",
  "Staples & Groceries",
  "Stationery",
];

export const nutsSpicesCategories = [
  "Whole Spices",
  "Ground Spices & Masalas",
  "Roasted & Flavoured Nuts",
  "Dry Fruits",
];

// Confirmed current distribution partners (homepage logo strip, Phase 6).
// Drop a logo file at public/assets/images/partners/<slug>.png to activate a
// slot; a neutral brand-name chip renders until then. CONTENT NEEDED: real,
// licensed logo files (CONTENT-NEEDED.md #1). No other brand name is published.
export const manufacturers: { name: string; slug: string }[] = [
  { name: "HUL", slug: "hul" },
  { name: "ITC", slug: "itc" },
  { name: "Nestlé", slug: "nestle" },
  { name: "Britannia", slug: "britannia" },
  { name: "Parle", slug: "parle" },
  { name: "Coca-Cola", slug: "coca-cola" },
  { name: "PepsiCo", slug: "pepsico" },
];

// AI-powered supply chain features (qualitative — no fabricated metrics).
export const aiFeatures = [
  { t: "Route Optimization", d: "Smarter delivery routing so orders arrive within a predictable window." },
  { t: "Inventory Analytics", d: "Stock signals that flag what's low before a retailer runs out." },
  { t: "Sales Dashboard", d: "A clear view of what's moving, for partners who want visibility." },
  { t: "Live Tracking", d: "Order status you can follow, not a black box." },
  { t: "Order Automation", d: "Reordering through the digital platform, no phone-tag." },
];
