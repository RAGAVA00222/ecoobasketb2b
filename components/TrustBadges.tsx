import type { LucideIcon } from "lucide-react";
import { ShieldCheck, ReceiptText, BadgeCheck, MapPin } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Container, Section, Eyebrow } from "@/components/primitives";
import { site } from "@/content/site";

/**
 * Home section #12 — qualitative compliance/credibility strip (decision D3-A).
 * Shows the real CIN plus true, qualitative marks. GST/MSME REGISTRATION
 * NUMBERS are deliberately NOT shown here (they live as clearly-marked footer
 * placeholders until confirmed) — and no "pending"/gap language appears here.
 */
const marks: { Icon: LucideIcon; t: string; d: string; mono?: boolean }[] = [
  { Icon: ShieldCheck, t: "Registered Pvt Ltd", d: `CIN ${site.cin}`, mono: true },
  { Icon: ReceiptText, t: "GST-compliant invoicing", d: "A clean, GST-compliant invoice on every order." },
  { Icon: BadgeCheck, t: "Licensed FMCG distribution", d: "Multi-brand distribution, licensing kept current." },
  { Icon: MapPin, t: "Chennai-based", d: "Operated from Vanagaram, Chennai." },
];

export default function TrustBadges() {
  return (
    <Section>
      <Container>
        <Reveal className="mx-auto max-w-[680px] text-center">
          <Eyebrow>Compliance &amp; Credibility</Eyebrow>
          <h2 className="mt-3 text-[clamp(24px,3.2vw,36px)]">A registered, accountable distribution partner</h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {marks.map((m, i) => (
            <Reveal key={m.t} delay={(i % 4) * 0.05} className="rounded-2xl border border-line bg-surface p-6 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent-strong/40 hover:shadow-soft-lg">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-mint to-mint2 text-accent"><m.Icon size={23} strokeWidth={1.8} /></span>
              <h3 className="mt-4 text-[16px]">{m.t}</h3>
              <p className={`mt-1.5 text-[13px] leading-relaxed text-muted ${m.mono ? "break-words font-mono text-[11px] uppercase tracking-[0.03em]" : ""}`}>{m.d}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
