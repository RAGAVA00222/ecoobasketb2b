import Link from "next/link";
import Image from "next/image";
import { COMPANY, NAV_ITEMS } from "@/lib/constants";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 rounded" aria-label={`${COMPANY.name} - Home`}>
          <Image
            src="/images/logo.png.jpeg"
            alt={`${COMPANY.name} logo`}
            width={180}
            height={60}
            priority
            className="h-12 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-gray-700 transition hover:text-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 rounded px-2 py-1"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={COMPANY.website}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          aria-label="Order Online - Opens in new window"
        >
          Order Online
        </a>
      </div>
    </header>
  );
}