/**
 * SINGLE SOURCE OF TRUTH for every Ecoo Basket company fact.
 *
 * No company detail - name, number, address, statutory identifier, delivery
 * promise or order term - may be hard-coded anywhere else in this repository.
 * If a page needs a fact, it imports it from here.
 *
 * Statutory values below were supplied by the business. Nothing here is
 * inferred, estimated or invented.
 */

export const COMPANY = {
  legalName: "Ecoo Hyper Retail Private Limited",
  brandName: "Ecoo Basket",

  // Statutory identifiers.
  cin: "U47912TN2026PTC195420",
  gstin: "33AAJCE8472G1ZG",
  udyam: "UDYAM-TN-24-0189186",

  phone: "+91 93423 58226",
  /** Digits only - required by wa.me and used to build tel: links. */
  phoneRaw: "919342358226",
  email: "info@ecoobasketb2b.com",
  whatsapp: "https://wa.me/919342358226",

  address: {
    line1: "Sf. No. 215, Pt No. 120, Sh No. 5",
    line2: "Rajesh Garden Main Road, Vanagaram",
    line3: "Poonamallee, Tiruvallur - 600095",
    state: "Tamil Nadu, India",
  },

  hours: "MON-SAT · 09:00-18:00 IST",

  // Commercial terms. Published commitments - change only with the business.
  minOrderValue: 10000,
  orderCutoff: "3:00 PM",
  deliveryPromise: "Next working day across Chennai",

  /** Consumer storefront. */
  storeUrl: "https://www.ecoobasket.com",
  /** This B2B site, used for canonical URLs and structured data. */
  siteUrl: "https://ecoobasketb2b.com",
} as const;

export const LEADERSHIP = [
  { name: "N Nirmala Devi", title: "Founder & Managing Director" },
  { name: "Sri Keerthana Devi C", title: "Co-Founder & Director" },
  { name: "Ragavendran", title: "Chief Strategy Officer" },
];

export const STATUTORY_LINE =
  "CIN U47912TN2026PTC195420 · GSTIN 33AAJCE8472G1ZG · UDYAM-TN-24-0189186";

/** Approved delivery wording. Identical in hero, FAQ and process steps. */
export const DELIVERY_PROMISE =
  "Order by 3:00 PM — delivered the next working day across Chennai.";

/** Approved order-terms wording. Replaces every free-delivery line. */
export const ORDER_TERMS =
  "Minimum order ₹10,000. Delivery included on every order within Chennai city.";

/** Prefilled message for the WhatsApp deep link. */
export const WHATSAPP_MESSAGE =
  "Hello Ecoo Basket, I would like to enquire about wholesale/bulk FMCG supply.";

// ---------------------------------------------------------------------------
// Site structure
// ---------------------------------------------------------------------------

export const SEO = {
  baseKeywords: [] as string[],
  locations: ["Chennai", "Tamil Nadu", "India"],
};

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/ecoobasket", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com/ecoobasket", icon: "facebook" },
  { label: "LinkedIn", href: "https://linkedin.com/company/ecoo-basket", icon: "linkedin" },
];

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Founders", href: "/founders" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

/** Verified asset paths. Every one is confirmed to exist in /public. */
export const ASSETS = {
  ogImage: "/images/social-banner.jpg",
  logoHorizontal: "/images/logo-horizontal.jpg",
  logoSquare: "/images/logo.svg",
} as const;

/**
 * Product categories rendered on /products.
 *
 * Brand names were removed: listing a manufacturer implies a distribution
 * agreement the company does not hold.
 */
export const PRODUCT_CATEGORY_DETAILS = [
  {
    title: "Grocery",
    image: "/images/categories/grocery.jpg",
    description: "Staple food essentials for kirana stores, supermarkets and merchants.",
    items: ["Rice", "Sugar", "Flour", "Pulses", "Cooking Oil"],
  },
  {
    title: "Beverages",
    image: "/images/categories/beverages.jpg",
    description: "Tea, coffee, juices and soft drinks for everyday demand.",
    items: ["Tea", "Coffee", "Soft Drinks", "Juices"],
  },
  {
    title: "Personal Care",
    image: "/images/categories/personal-care.jpg",
    description: "Daily personal care essentials trusted by modern households.",
    items: ["Soap", "Shampoo", "Toothpaste", "Face Wash"],
  },
  {
    title: "Home Care",
    image: "/images/categories/home-care.jpg",
    description: "Cleaning and hygiene products for homes and businesses.",
    items: ["Detergent", "Floor Cleaner", "Dishwash"],
  },
  {
    title: "Snacks & Biscuits",
    // PLACEHOLDER ARTWORK - real product photography still required.
    image: "/images/categories/snacks-biscuits.svg",
    description: "Snack packs and biscuits for retail shelves and festive demand.",
    items: ["Biscuits", "Namkeen", "Chips", "Cookies"],
  },
  {
    title: "Stationery",
    image: "/images/categories/stationery.jpg",
    description: "Everyday stationery lines for retail counters and institutions.",
    items: ["Notebooks", "Pens", "Paper", "Office Supplies"],
  },
] as const;

export const PRODUCT_CATEGORIES: string[] = PRODUCT_CATEGORY_DETAILS.map(
  (category) => category.title
);

/**
 * Services rendered on /services. The footer derives its deep links from these
 * titles, so page anchors and footer links can never drift apart.
 */
export const SERVICE_DETAILS = [
  {
    title: "FMCG Wholesale Distribution",
    description:
      "Multi-brand FMCG supplied to kirana stores, pharmacies and wholesale merchants across Chennai.",
  },
  {
    title: "Fixed Weekly Beat",
    description:
      "The same representative visits your store on the same day every week, takes the order and confirms delivery.",
  },
  {
    title: "Route Planning",
    description:
      "Planned Chennai routes so every store on the beat is served on a predictable cycle.",
  },
  {
    title: "GST Billing",
    description:
      "Every order delivered against a GST invoice, with payment on delivery. No credit accounts.",
  },
  {
    title: "WhatsApp Order Capture",
    description:
      "Place or adjust an order on WhatsApp between beat visits, against the same accountable contact.",
  },
  {
    title: "Next-Day Delivery",
    description: DELIVERY_PROMISE,
  },
] as const;

export const SERVICES: string[] = SERVICE_DETAILS.map((service) => service.title);
