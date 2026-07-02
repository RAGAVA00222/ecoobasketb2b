import type {
  Company,
  SocialLink,
  NavItem,
  SEO as SEOType,
  Breakpoints,
  AnimationDuration,
  ZIndex,
  Spacing,
  Colors,
} from "./types";

/**
 * Global constants for Ecoo Basket
 * This file contains all magic numbers, strings, and configuration values
 */

// Company information
export const COMPANY: Company = {
  name: "Ecoo Basket",
  tagline: "India's Trusted FMCG Wholesale Distribution Partner",
  phone: "+91 93423 58226",
  phone_link: "+919342358226",
  email: "info@ecoobasketb2b.com",
  website: "https://www.ecoobasket.com",
  website_b2b: "https://ecoobasketb2b.com",
  address: {
    street: "Plot No. 120, Shop No. 5, Raajas Garden",
    area: "Chettiyar Agaram, Vanagaram",
    city: "Chennai",
    postalCode: "600095",
    state: "Tamil Nadu",
    country: "India",
  },
};

// SEO Keywords
export const SEO: SEOType = {
  baseKeywords: [
    "FMCG wholesale",
    "wholesale distributor",
    "bulk supply",
    "wholesale distribution",
    "Ecoo Basket",
  ],
  locations: ["Chennai", "India", "Tamil Nadu"],
};

// Social links
export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Instagram",
    href: "https://instagram.com/ecoobasket",
    icon: "instagram",
  },
  {
    label: "Facebook",
    href: "https://facebook.com/ecoobasket",
    icon: "facebook",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/ecoo-basket",
    icon: "linkedin",
  },
];

// Navigation items
export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Founders", href: "/founders" },
  { label: "Contact", href: "/contact" },
];

// Footer quick links
export const FOOTER_QUICK_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

// Product categories
export const PRODUCT_CATEGORIES: string[] = [
  "Grocery",
  "Beverages",
  "Personal Care",
  "Home Care",
  "Snacks & Biscuits",
  "Dairy Products",
];

// Services
export const SERVICES: string[] = [
  "Wholesale Distribution",
  "Retail Supply",
  "Hotel & Restaurant Supply",
  "Institutional Supply",
  "Bulk Enquiries",
  "Fast Delivery",
];

// Responsive breakpoints (Tailwind)
export const BREAKPOINTS: Breakpoints = {
  mobile: "375px",
  tablet: "768px",
  desktop: "1024px",
  wide: "1280px",
};

// Animation durations (in milliseconds)
export const ANIMATION_DURATION: AnimationDuration = {
  fast: 150,
  normal: 300,
  slow: 500,
};

// Z-index values
export const Z_INDEX: ZIndex = {
  dropdown: 10,
  sticky: 20,
  fixed: 40,
  modal: 50,
  tooltip: 60,
};

// Common spacing values
export const SPACING: Spacing = {
  xs: "0.5rem",
  sm: "1rem",
  md: "1.5rem",
  lg: "2rem",
  xl: "3rem",
  "2xl": "4rem",
};

// Colors
export const COLORS: Colors = {
  primary: "#16a34a", // green-600
  primaryDark: "#15803d", // green-700
  secondary: "#f3f4f6", // gray-100
  accent: "#10b981", // emerald-500
  dark: "#111827", // gray-900
  light: "#f9fafb", // gray-50
};
