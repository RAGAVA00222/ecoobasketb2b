import Link from "next/link";
import { COMPANY, FOOTER_QUICK_LINKS, ORDER_TERMS, PRODUCT_CATEGORIES, SERVICES, SOCIAL_LINKS, STATUTORY_LINE } from "@/lib/constants";
import { slugify } from "@/lib/utils";

const socialIcons = {
  instagram: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Zm5.25-3.25a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M13 22v-8h2.7l.4-3H13V4.6c0-.9.2-1.5 1.5-1.5H16V.1c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.5v3h2.3v8h3.2Z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M6.94 8.5A1.56 1.56 0 1 1 6.94 5.38a1.56 1.56 0 0 1 0 3.12ZM5.5 9.75h2.88V18H5.5Zm4.74 0h2.76v1.12h.04c.38-.72 1.32-1.48 2.72-1.48 2.9 0 3.44 1.9 3.44 4.38V18h-2.87v-7.4c0-1.76-.03-4.03-2.46-4.03-2.46 0-2.84 1.92-2.84 3.9V18H10.24Z" />
    </svg>
  ),
};



export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-950 text-gray-300" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Brand Section */}
          <div>
            <h2 className="text-xl font-semibold text-white">{COMPANY.brandName}</h2>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gray-500">
              A unit of {COMPANY.legalName}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-7 text-gray-400">
              {COMPANY.brandName} is a trusted FMCG wholesale and distribution partner supporting retailers, supermarkets, hotels, restaurants, and institutions with reliable supply and competitive pricing.
            </p>
            <nav className="mt-6 flex gap-3" aria-label="Social media links">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${link.label}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  {socialIcons[link.icon as keyof typeof socialIcons]}
                </a>
              ))}
            </nav>
          </div>

          {/* Quick Links */}
          <nav>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-green-400">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {FOOTER_QUICK_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 rounded px-1 py-0.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Product Categories */}
          <nav>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-green-400">
              Product Categories
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {PRODUCT_CATEGORIES.map((category) => (
                <li key={category}>
                  <Link
                    href={`/products#${slugify(category)}`}
                    className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 rounded px-1 py-0.5"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services & Contact */}
          <nav>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-green-400">
              Services & Contact
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {SERVICES.map((service) => (
                <li key={service}>
                  <Link
                    href={`/services#${slugify(service)}`}
                    className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 rounded px-1 py-0.5"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5 space-y-2 text-sm text-gray-400">
              <p>
                <a
                  href={`tel:+${COMPANY.phoneRaw}`}
                  className="hover:text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 rounded px-1 py-0.5"
                >
                  {COMPANY.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="hover:text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 rounded px-1 py-0.5"
                >
                  {COMPANY.email}
                </a>
              </p>
              <p>{COMPANY.address.line1}</p>
              <p>{COMPANY.address.line2}</p>
              <p>{COMPANY.address.line3}</p>
            </div>
          </nav>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="mb-3 text-center text-xs tracking-wide text-gray-400">
            {STATUTORY_LINE}
          </p>
          <p className="mb-4 text-center text-sm text-gray-400">{ORDER_TERMS}</p>
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} {COMPANY.legalName}. All rights
            reserved. {COMPANY.brandName} is a brand of {COMPANY.legalName}.
          </p>
        </div>
      </div>
    </footer>
  );
}
