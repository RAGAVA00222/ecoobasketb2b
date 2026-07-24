"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/content/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // scroll-lock + focus trap + ESC while the drawer is open
  useEffect(() => {
    if (!open) return;
    document.body.classList.add("drawer-open");
    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    focusables?.[0]?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key === "Tab" && focusables && focusables.length) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("drawer-open");
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-base/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-5 py-3 sm:px-8">
        <Link href="/" className="flex flex-shrink-0 items-center gap-3" aria-label="Ecoo Basket home">
          <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-[2px] border border-line bg-white p-[3px]">
            <Image src="/assets/images/logo/04_Logo_Icon.png" alt="" width={40} height={40} className="h-full w-full object-contain" />
          </span>
          <span className="leading-none">
            <span className="font-display text-[19px] font-semibold text-ink">{site.brand}</span>
            <small className="mt-[3px] block font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-muted">
              {site.brandSub}
            </small>
          </span>
        </Link>

        {/* desktop nav (>=1200px) */}
        <nav className="hidden items-center gap-6 min-[1200px]:flex" aria-label="Primary">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`whitespace-nowrap border-b-2 py-1.5 text-[15px] font-medium transition-colors ${
                isActive(n.href) ? "border-accent text-accent" : "border-transparent text-ink hover:text-accent"
              }`}
            >
              {n.label}
            </Link>
          ))}
          <a
            href={site.orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[2px] bg-ink px-[18px] py-2.5 text-[15px] font-semibold text-invert hover:bg-dark"
          >
            Order Now
          </a>
        </nav>

        {/* hamburger (<1200px) */}
        <button
          ref={toggleRef}
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="mobile-drawer"
          onClick={() => setOpen((v) => !v)}
          className="relative z-[60] rounded-[2px] border border-line p-[9px_11px] min-[1200px]:hidden"
        >
          <span className="mb-1 block h-0.5 w-5 bg-ink" />
          <span className="mb-1 block h-0.5 w-5 bg-ink" />
          <span className="block h-0.5 w-5 bg-ink" />
        </button>
      </div>

      {/* backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[45] bg-[rgba(14,36,55,0.5)] transition-opacity min-[1200px]:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden
      />

      {/* drawer */}
      <div
        id="mobile-drawer"
        ref={panelRef}
        className={`fixed right-0 top-0 bottom-0 z-[55] flex w-[min(86vw,360px)] flex-col gap-0.5 overflow-y-auto border-l border-line bg-surface px-6 pb-8 pt-20 shadow-[-8px_0_40px_rgba(14,36,55,0.16)] transition-transform min-[1200px]:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {nav.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            onClick={() => setOpen(false)}
            className={`w-full border-b border-line py-3.5 text-[17px] ${
              isActive(n.href) ? "font-semibold text-accent" : "text-ink"
            }`}
          >
            {n.label}
          </Link>
        ))}
        <a
          href={site.orderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full rounded-[2px] bg-ink px-4 py-3 text-center text-[16px] font-semibold text-invert"
        >
          Order Now ↗
        </a>
      </div>
    </header>
  );
}
