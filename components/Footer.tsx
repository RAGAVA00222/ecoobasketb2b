import Link from "next/link";
import Image from "next/image";
import { footerNav, site } from "@/content/site";

// CIN is real (public MCA record). GST / MSME / ISO pending real numbers.
const certBadges: { label: string; value?: string; pending?: boolean }[] = [
  { label: "CIN", value: site.cin },
  { label: "GST", pending: true },
  { label: "MSME · Udyam", pending: true },
  { label: "ISO", pending: true },
];

function Social() {
  return (
    <div className="mt-6 flex gap-2.5">
      <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Ecooo Basket on Facebook"
         className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#1E293B] bg-[#0B1220] text-invert transition-colors hover:border-accent-strong hover:text-accent-strong">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V5h-3c-2.2 0-4 1.8-4 4v2H7v4h3v8h4v-8h3l1-4h-4V9c0-.6.4-1 1-1z"/></svg>
      </a>
      <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Ecooo Basket on Instagram"
         className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#1E293B] bg-[#0B1220] text-invert transition-colors hover:border-accent-strong hover:text-accent-strong">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg>
      </a>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-charcoal text-invert">
      {/* emerald hairline */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent-strong/60 to-transparent" />
      <div className="mx-auto max-w-[1200px] px-6 pb-12 pt-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.7fr_1fr_1fr_1.15fr]">
          {/* brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5">
                <Image src="/assets/images/logo/04_Logo_Icon.png" alt="" width={44} height={44} className="h-full w-full object-contain" />
              </span>
              <span className="leading-tight">
                <strong className="font-display text-[19px]">{site.brand}</strong>
                <span className="mt-0.5 block font-mono text-[10px] font-medium tracking-[0.04em] text-[#94A3B8]">{site.legalName}</span>
              </span>
            </div>
            <p className="mt-5 max-w-[300px] text-[14px] leading-relaxed text-[#94A3B8]">
              Technology-enabled B2B FMCG distribution, headquartered in Chennai — connecting manufacturers to retailers across Tamil Nadu.
            </p>
            <Social />
            <div className="mt-7 flex flex-wrap gap-2" aria-label="Registration and certifications">
              {certBadges.map((b) => (
                <span key={b.label} title={b.value ?? `${b.label} — pending`}
                  className={`rounded-lg border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.05em] ${
                    b.pending ? "border-[#1E293B] text-invert/40" : "border-accent-strong/50 bg-accent-strong/10 text-[#4ADE80]"
                  }`}>
                  {b.value ? `${b.label} ${b.value}` : `${b.label} · pending`}
                </span>
              ))}
            </div>
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
            <a href={`tel:${site.phoneRaw}`} className="mb-3 block text-[14px] text-[#B6C2CF] hover:text-invert">{site.phone}</a>
            <a href={`mailto:${site.email}`} className="mb-3 block text-[14px] text-[#B6C2CF] hover:text-invert">{site.email}</a>
            <p className="mb-3 text-[13px] leading-relaxed text-[#8595A5]">{site.hours}</p>
            <p className="mb-5 text-[13px] leading-relaxed text-[#8595A5]">{site.registeredOffice}</p>
            <form aria-label="Newsletter signup (coming soon)">
              <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.08em] text-[#8595A5]">Newsletter · coming soon</label>
              <div className="flex gap-2">
                <input type="email" disabled placeholder="you@business.com" className="min-w-0 flex-1 rounded-lg border border-[#1E293B] bg-[#0B1220] px-3 py-2.5 text-[13px] text-invert placeholder:text-[#5A6b7a]" />
                <button type="button" disabled className="rounded-lg border border-[#1E293B] px-3 py-2.5 text-[13px] text-[#8595A5]">Notify me</button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-[#1A2436] pt-7 font-mono text-[11px] text-[#8595A5]">
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
