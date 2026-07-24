import Link from "next/link";
import Image from "next/image";
import { footerNav, site } from "@/content/site";

// Certification / registration marks. CIN is real (public MCA record).
// GST / MSME / ISO are placeholders until real numbers/marks are supplied.
const certBadges: { label: string; value?: string; pending?: boolean }[] = [
  { label: "CIN", value: site.cin },
  { label: "GST", pending: true },
  { label: "MSME / Udyam", pending: true },
  { label: "ISO", pending: true },
];

function Social() {
  return (
    <div className="mt-5 flex gap-3">
      <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Ecoo Basket on Facebook"
         className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2A3A46] transition-colors hover:border-invert">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M17 3H14.5C13.04 3 11.64 3.58 10.61 4.61 9.58 5.64 9 7.04 9 8.5V11H6.5V14.5H9V21H12.5V14.5H15L16 11H12.5V8.5C12.5 8.04 12.68 7.59 13.01 7.26 13.34 6.93 13.79 6.75 14.25 6.75H17V3Z" stroke="#FBFAF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </a>
      <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Ecoo Basket on Instagram"
         className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2A3A46] transition-colors hover:border-invert">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" stroke="#FBFAF6" strokeWidth="1.5"/><circle cx="12" cy="12" r="4" stroke="#FBFAF6" strokeWidth="1.5"/><circle cx="17.5" cy="6.5" r="1" fill="#FBFAF6"/></svg>
      </a>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-dark text-invert">
      <div className="mx-auto max-w-[1200px] px-5 pb-24 pt-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr] lg:grid-cols-[1.7fr_1fr_1fr_1.1fr]">
          {/* brand + social + certs */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-[2px] border border-line bg-white p-[3px]">
                <Image src="/assets/images/logo/04_Logo_Icon.png" alt="" width={36} height={36} className="h-full w-full object-contain" />
              </span>
              <strong className="font-display text-[17px]">
                {site.brand}
                <br />
                <span className="font-mono text-[10px] font-medium tracking-[0.04em] text-[#9FB0C0]">{site.legalName}</span>
              </strong>
            </div>
            <p className="mt-4 max-w-[280px] text-[14px] text-invert/80">
              A technology-enabled B2B FMCG distribution company headquartered in Chennai, connecting manufacturers to retailers across Tamil Nadu.
            </p>
            <Social />
            <div className="mt-6 flex flex-wrap gap-2" aria-label="Registration and certifications">
              {certBadges.map((b) => (
                <span
                  key={b.label}
                  title={b.value ?? `${b.label} — pending`}
                  className={`rounded-[2px] border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.06em] ${
                    b.pending ? "border-[#2A3A46] text-invert/45" : "border-[#3C5A73] text-invert/85"
                  }`}
                >
                  {b.value ? `${b.label} ${b.value}` : `${b.label} · pending`}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.1em] text-invert">Company</h4>
            {footerNav.company.map((l) => (
              <Link key={l.href} href={l.href} className="mb-2.5 block text-[14px] text-invert transition-opacity hover:opacity-70">{l.label}</Link>
            ))}
          </div>

          <div>
            <h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.1em] text-invert">Business</h4>
            {footerNav.business.map((l) => (
              <Link key={l.href} href={l.href} className="mb-2.5 block text-[14px] text-invert transition-opacity hover:opacity-70">{l.label}</Link>
            ))}
            <a href={site.orderUrl} target="_blank" rel="noopener noreferrer" className="mb-2.5 block text-[14px] text-invert transition-opacity hover:opacity-70">Order Online ↗</a>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.1em] text-invert">Reach Us</h4>
            <a href={`tel:${site.phoneRaw}`} className="mb-2.5 block text-[14px] text-invert hover:opacity-70">{site.phone}</a>
            <a href={`mailto:${site.email}`} className="mb-2.5 block text-[14px] text-invert hover:opacity-70">{site.email}</a>
            <p className="mb-4 text-[13px] text-invert/70">{site.hours}</p>
            <p className="mb-4 text-[13px] text-invert/70">{site.registeredOffice}</p>
            {/* Newsletter — placeholder, not wired to a backend yet */}
            <form aria-label="Newsletter signup (coming soon)" onSubmit={undefined}>
              <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.08em] text-invert/70">Newsletter · coming soon</label>
              <div className="flex gap-2">
                <input type="email" disabled placeholder="you@business.com" className="min-w-0 flex-1 rounded-[2px] border border-[#2A3A46] bg-transparent px-3 py-2 text-[13px] text-invert placeholder:text-invert/40" />
                <button type="button" disabled className="rounded-[2px] border border-[#2A3A46] px-3 py-2 text-[13px] text-invert/70">Notify me</button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-t border-[rgba(251,250,247,0.2)] pt-6 font-mono text-[11px] text-invert">
          <span>© 2026 {site.legalName}. All rights reserved.</span>
          <span className="flex flex-wrap gap-x-5 gap-y-1.5">
            {footerNav.legal.map((l) => (
              <Link key={l.href} href={l.href} className="hover:opacity-70">{l.label}</Link>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
