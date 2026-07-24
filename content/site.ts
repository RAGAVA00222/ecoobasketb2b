// ============================================================
// Single source of truth for locked content. Copy here is
// carried over verbatim from the current live site — do not
// rewrite. No merchant-count numbers (deliberate prior fix).
// ============================================================

export const site = {
  brand: "Ecoo Basket",
  legalName: "Ecoo Hyper Retail Private Limited",
  brandSub: "Ecoo Hyper Retail Pvt Ltd · Chennai",
  tagline: "B2B FMCG Distribution · Chennai, Tamil Nadu",
  domain: "https://www.ecoobasketb2b.com",
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

// Primary navigation — order preserved from the live site.
export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "We Serve", href: "/we-serve" },
  { label: "For Kirana Stores", href: "/kirana" },
  { label: "Partner With Us", href: "/partner" },
  { label: "Founders", href: "/founders" },
  { label: "Vision", href: "/vision" },
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
    { label: "Industries We Serve", href: "/we-serve" },
    { label: "For Kirana Stores", href: "/kirana" },
    { label: "Supplier Partnership", href: "/partner" },
    { label: "Gallery", href: "/gallery" },
    { label: "Download Center", href: "/downloads" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Returns", href: "/returns" },
  ],
};

// The Now Delivery hook — factual claim, locked wording.
export const deliveryPromise = {
  eyebrow: "Delivery Promise",
  heading: "Now Delivery across Chennai. Free above ₹10,000.",
  body:
    "Built for Kirana stores and HORECA businesses — hotels, restaurants and caterers — who can't afford to wait days for restock. Order now, and any order above ₹10,000 delivers free anywhere in Chennai.",
  cards: [
    { k: "SPEED", t: "Now Delivery", d: "Fast turnaround across Chennai — no multi-day waits for restock." },
    { k: "THRESHOLD", t: "Free Above ₹10,000", d: "Any single order over ₹10,000 ships free, anywhere in Chennai." },
  ],
};

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

// Manufacturer slider — CONFIRMED real distribution partners.
// Logo files + brand/legal confirmation are being sourced separately;
// these render as text/placeholder marks until real logos land.
export const manufacturers = [
  "Nestlé",
  "HUL",
  "ITC",
  "Britannia",
  "Parle",
  "PepsiCo",
  "Coca-Cola",
  "Dabur",
];

// Distribution process (locked qualitative steps).
export const processSteps = [
  { n: "01", t: "Manufacturer", d: "Strategic sourcing from established FMCG brands and our own line." },
  { n: "02", t: "Warehouse", d: "Received, inspected and stored with stock rotation." },
  { n: "03", t: "Route Planning", d: "Deliveries planned zone by zone for predictable windows." },
  { n: "04", t: "Delivery", d: "Direct-to-store, on schedule, on a clean GST invoice." },
  { n: "05", t: "Retailer", d: "Shelves kept full — kirana, pharmacy, wholesale, HORECA." },
  { n: "06", t: "Reorder", d: "Reorder any time through our digital ordering platform." },
];

// AI-powered supply chain features (qualitative — no fabricated metrics).
export const aiFeatures = [
  { t: "Route Optimization", d: "Smarter delivery routing so orders arrive within a predictable window." },
  { t: "Inventory Analytics", d: "Stock signals that flag what's low before a retailer runs out." },
  { t: "Sales Dashboard", d: "A clear view of what's moving, for partners who want visibility." },
  { t: "Live Tracking", d: "Order status you can follow, not a black box." },
  { t: "Order Automation", d: "Reordering through the digital platform, no phone-tag." },
];
