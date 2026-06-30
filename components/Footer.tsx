import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Brands", href: "/brands" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "Downloads", href: "/downloads" },
];

const categories = ["Grocery", "Beverages", "Personal Care", "Home Care", "Snacks & Biscuits", "Dairy Products"];

const services = ["Wholesale Distribution", "Retail Supply", "Hotel & Restaurant Supply", "Institutional Supply", "Bulk Enquiries", "Fast Delivery"];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Zm5.25-3.25a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M13 22v-8h2.7l.4-3H13V4.6c0-.9.2-1.5 1.5-1.5H16V.1c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.5v3h2.3v8h3.2Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M6.94 8.5A1.56 1.56 0 1 1 6.94 5.38a1.56 1.56 0 0 1 0 3.12ZM5.5 9.75h2.88V18H5.5Zm4.74 0h2.76v1.12h.04c.38-.72 1.32-1.48 2.72-1.48 2.9 0 3.44 1.9 3.44 4.38V18h-2.87v-7.4c0-1.76-.03-4.03-2.46-4.03-2.46 0-2.84 1.92-2.84 3.9V18H10.24Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          <div>
            <h2 className="text-xl font-semibold text-white">ECOO BASKET</h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-gray-400">
              Ecoo Basket is a trusted FMCG wholesale and distribution partner supporting retailers, supermarkets, hotels, restaurants, and institutions with reliable supply and competitive pricing.
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-green-600"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-green-400">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-green-400">Product Categories</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {categories.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-green-400">Services & Contact</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {services.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-5 space-y-2 text-sm text-gray-400">
              <p>+91 93423 58226</p>
              <p>info@ecoobasketb2b.com</p>
              <p>Plot No. 120, Vanagaram, Chennai</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-gray-500">
          © 2026 Ecoo Basket. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
