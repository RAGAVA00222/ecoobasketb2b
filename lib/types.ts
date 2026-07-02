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
