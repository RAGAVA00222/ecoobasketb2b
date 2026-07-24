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

  // close on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-base/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-3 sm:px-8">
        <Link href="/" className="flex flex-shrink-0 items-center gap-3" aria-label="Ecoo Basket home">
          <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-line bg-white p-1.5">
            <Image src="/assets/images/logo/04_Logo_Icon.png" alt="" width={44} height={44} className="h-full w-full object-contain" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-[19px] font-extrabold tracking-[-0.01em] text-ink">{site.brand}</span>
            <small className="mt-1 block font-mono text-[9.5px] font-medium uppercase tracking-[0.06em] text-muted">
              {site.legalName}
            </small>
          </span>
        </Link>

        {/* desktop nav (>=1200px) */}
        <nav className="hidden items-center gap-6 min-[1200px]:flex" aria-label="Primary">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`whitespace-nowrap border-b-2 py-1.5 text-[14.5px] font-medium transition-colors ${
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
            className="rounded-xl bg-accent px-5 py-2.5 text-[14.5px] font-semibold text-invert shadow-[0_12px_24px_-14px_rgba(22,163,74,0.6)] transition-all hover:-translate-y-0.5 hover:bg-accent-deep"
          >
            Order Now
          </a>
        </nav>

        {/* animated hamburger (<1200px) */}
        <button
          ref={toggleRef}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-drawer"
          onClick={() => setOpen((v) => !v)}
          className="relative z-[60] flex h-11 w-11 flex-col items-center justify-center rounded-xl border border-line bg-surface min-[1200px]:hidden"
        >
          <span className={`block h-0.5 w-6 rounded bg-ink transition-all duration-300 ${open ? "translate-y-[8px] rotate-45" : ""}`} />
          <span className={`my-[6px] block h-0.5 w-6 rounded bg-ink transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 rounded bg-ink transition-all duration-300 ${open ? "-translate-y-[8px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* backdrop scrim */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[45] bg-[rgba(10,30,54,0.55)] backdrop-blur-sm transition-opacity duration-300 min-[1200px]:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden
      />

      {/* full-height drawer */}
      <div
        id="mobile-drawer"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={`fixed right-0 top-0 z-[55] flex h-[100dvh] w-[min(92vw,400px)] flex-col overflow-y-auto border-l border-line bg-surface px-6 pb-10 pt-6 shadow-[-12px_0_50px_rgba(10,30,54,0.28)] transition-transform duration-300 ease-out min-[1200px]:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-4 flex items-center gap-3 border-b border-line pb-5">
          <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-line bg-white p-1.5">
            <Image src="/assets/images/logo/04_Logo_Icon.png" alt="" width={40} height={40} className="h-full w-full object-contain" />
          </span>
          <span className="font-display text-[17px] font-extrabold text-ink">{site.brand}</span>
        </div>
        <nav className="flex flex-col" aria-label="Mobile">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className={`w-full border-b border-line py-3.5 text-[17px] transition-colors ${
                isActive(n.href) ? "font-semibold text-accent" : "text-ink hover:text-accent"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <a
          href={site.orderUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className="mt-6 w-full rounded-xl bg-accent px-4 py-3.5 text-center text-[16px] font-semibold text-invert shadow-[0_12px_24px_-14px_rgba(22,163,74,0.6)] hover:bg-accent-deep"
        >
          Order Now ↗
        </a>
        <a
          href={site.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className="mt-3 w-full rounded-xl border border-line bg-surface px-4 py-3.5 text-center text-[15px] font-semibold text-accent"
        >
          WhatsApp Us
        </a>
      </div>
    </header>
  );
}
