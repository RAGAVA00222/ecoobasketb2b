import Link from "next/link";
import Image from "next/image";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Brands", href: "/brands" },
  { label: "Services", href: "/services" },
  { label: "Founders", href: "/founders" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="block">
              <Image
                src="/images/logo/ecoobasket-logo.png"
                alt="Ecoo Basket Official Logo"
                width={180}
                height={60}
                priority
                className="h-12 md:h-[60px] w-auto object-contain"
              />
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

        <a
          href="https://www.ecoobasket.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition-all duration-300"
        >
          Order Online
        </a>
      </div>
    </header>
  );
}