import Link from "next/link";
import { COMPANY } from "@/lib/constants";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label={`${COMPANY.name} Home`}>
          <span className="text-lg font-bold text-green-700">{COMPANY.name}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {[
            { href: "/about", label: "About" },
            { href: "/products", label: "Products" },
            { href: "/services", label: "Services" },
            { href: "/contact", label: "Contact" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-700 transition hover:text-green-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

