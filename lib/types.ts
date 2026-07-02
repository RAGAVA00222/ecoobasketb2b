export interface Address {
  street: string;
  area: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
}

export interface Company {
  name: string;
  tagline: string;
  phone: string;
  phone_link: string;
  email: string;
  website: string;
  website_b2b: string;
  address: Address;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SEO {
  baseKeywords: string[];
  locations: string[];
}

export interface Breakpoints {
  mobile: string;
  tablet: string;
  desktop: string;
  wide: string;
}

export interface AnimationDuration {
  fast: number;
  normal: number;
  slow: number;
}

export interface ZIndex {
  dropdown: number;
  sticky: number;
  fixed: number;
  modal: number;
  tooltip: number;
}

export interface Spacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
}

export interface Colors {
  primary: string;
  primaryDark: string;
  secondary: string;
  accent: string;
  dark: string;
  light: string;
}
