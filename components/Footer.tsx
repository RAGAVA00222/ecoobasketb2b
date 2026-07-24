import Link from "next/link";
import Image from "next/image";
import { footerNav, site } from "@/content/site";

function Social() {
  return (
    <div className="mt-6 flex gap-2.5">
      <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Ecoo Basket on Facebook"
         className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#1B3555] bg-[#0A2138] text-invert transition-colors hover:border-accent-strong hover:text-accent-strong">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V5h-3c-2.2 0-4 1.8-4 4v2H7v4h3v8h4v-8h3l1-4h-4V9c0-.6.4-1 1-1z"/></svg>
      </a>
      <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Ecoo Basket on Instagram"
         className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#1B3555] bg-[#0A2138] text-invert transition-colors hover:border-accent-strong hover:text-accent-strong">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg>
      </a>
      <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Ecoo Basket on WhatsApp"
         className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#1B3555] bg-[#0A2138] text-invert transition-colors hover:border-accent-strong hover:text-accent-strong">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.6-.6-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 .9-2.2.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.1.1.3 0 .5l-.4.5-.3.3c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.7-.1l.7-.9c.2-.3.4-.2.7-.1l1.9.9c.3.2.5.2.6.4.1.1.1.7-.2 1.4Z"/></svg>
      </a>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-charcoal text-invert">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent-strong/60 to-transparent" />
      <div className="mx-auto max-w-[1400px] px-6 pb-12 pt-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1.15fr]">
          {/* brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5">
                <Image src="/assets/images/logo/04_Logo_Icon.png" alt="" width={44} height={44} className="h-full w-full object-contain" />
              </span>
              <span className="leading-tight">
                <strong className="font-display text-[19px]">{site.brand}</strong>
                <span className="mt-0.5 block font-mono text-[10px] font-medium tracking-[0.04em] text-[#8DA0B5]">{site.legalName}</span>
              </span>
            </div>
            <p className="mt-5 max-w-[320px] text-[14px] leading-relaxed text-[#9FB0C0]">
              Technology-enabled B2B FMCG distribution, headquartered in Chennai — delivering trusted brands from warehouse to retailer with reliable logistics.
            </p>
            <Social />
          </div>

          <div>
            <h4 className="mb-5 font-mono text-[11px] uppercase tracking-[0.12em] text-invert">Company</h4>
            {footerNav.company.map((l) => (
              <Link key={l.href} href={l.href} className="mb-3 block text-[14px] text-[#B6C2CF] transition-colors hover:text-invert">{l.label}</Link>
            ))}
          </div>

          <div>
            <h4 className="mb-5 font-mono text-[11px] uppercase tracking-[0.12em] text-invert">Business</h4>
            {footerNav.business.map((l) => (
              <Link key={l.href} href={l.href} className="mb-3 block text-[14px] text-[#B6C2CF] transition-colors hover:text-invert">{l.label}</Link>
            ))}
            <a href={site.orderUrl} target="_blank" rel="noopener noreferrer" className="mb-3 block text-[14px] text-[#B6C2CF] transition-colors hover:text-invert">Order Online ↗</a>
          </div>

          <div>
            <h4 className="mb-5 font-mono text-[11px] uppercase tracking-[0.12em] text-invert">Reach Us</h4>
            <p className="mb-3 text-[13.5px] leading-relaxed text-[#9FB0C0]">{site.registeredOffice}</p>
            <a href={`tel:${site.phoneRaw}`} className="mb-3 block text-[14px] text-[#B6C2CF] hover:text-invert">{site.phone}</a>
            <a href={`mailto:${site.email}`} className="mb-3 block text-[14px] text-[#B6C2CF] hover:text-invert">{site.email}</a>
            <p className="text-[13px] text-[#8DA0B5]">{site.hours}</p>
          </div>
        </div>

        {/* compliance row */}
        <div className="mt-12 flex flex-wrap gap-2.5 border-t border-[#16304F] pt-8">
          <span className="rounded-lg border border-accent-strong/40 bg-accent-strong/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.05em] text-[#4ADE80]">CIN {site.cin}</span>
          <span className="rounded-lg border border-[#1B3555] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.05em] text-[#9FB0C0]">Incorporated {site.incorporated}</span>
          {/* CONTENT NEEDED: GST row — add real GSTIN once confirmed */}
          {/* CONTENT NEEDED: MSME / Udyam row — add real registration number once confirmed */}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-[#16304F] pt-7 font-mono text-[11px] text-[#8DA0B5]">
          <span>© 2026 {site.legalName}. All rights reserved.</span>
          <span className="flex flex-wrap gap-x-6 gap-y-2">
            {footerNav.legal.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-invert">{l.label}</Link>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
