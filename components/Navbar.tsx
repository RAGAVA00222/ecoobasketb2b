import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Brands", href: "/brands" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="block">
          <h1 className="text-2xl font-bold tracking-tight text-green-700 sm:text-3xl">
            ECOO BASKET
          </h1>
          <p className="text-xs text-gray-500 sm:text-sm">Your Wholesale Partner</p>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-gray-700 transition hover:text-green-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 sm:px-5"
        >
          Request Quote
        </Link>
      </div>
    </header>
  );
}