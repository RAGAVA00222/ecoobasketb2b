import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { Store, Pill, Boxes, Building2, UtensilsCrossed, Briefcase, GraduationCap, MapPin, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import TamilNaduMap from "@/components/TamilNaduMap";
import { Container, Section, Eyebrow, Button } from "@/components/primitives";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Industries We Serve | FMCG Wholesale Chennai",
  description: "The retail sectors Ecoo Basket serves across Chennai today and where our coverage is expanding.",
  alternates: { canonical: "/we-serve" },
};

const servingNow: { t: string; d: string; Icon: LucideIcon }[] = [
  { t: "Kirana & General Trade", d: "The largest share of our retail partners — neighbourhood stores that need dependable, regular delivery over flashy minimums.", Icon: Store },
  { t: "Pharmacies", d: "Retail pharmacies stocking FMCG and personal care alongside their core inventory.", Icon: Pill },
  { t: "Wholesale Outlets", d: "Wholesale and semi-wholesale traders who buy in volume and redistribute locally.", Icon: Boxes },
];

const expanding: { t: string; d: string; Icon: LucideIcon }[] = [
  { t: "Supermarkets", d: "Modern trade outlets, as our volume capacity grows.", Icon: Building2 },
  { t: "HORECA (Hotels, Restaurants & Catering)", d: "Hospitality and catering partners needing consistent FMCG supply — Now Delivery available, free above ₹10,000.", Icon: UtensilsCrossed },
  { t: "Corporate Offices", d: "Workplace pantry and hygiene essentials.", Icon: Briefcase },
  { t: "Institutions", d: "Schools, hospitals and similar bulk buyers, evaluated case by case.", Icon: GraduationCap },
];

export default function WeServePage() {
  return (
    <>
      <PageHero
        eyebrow="Our Reach"
        title="Who we serve today, and where we're headed."
        subtitle="We'd rather be precise about our current base than list every sector we might reach someday."
      />

      {/* Serving now */}
      <Section>
        <Container>
          <Reveal className="max-w-[640px]">
            <Eyebrow>Serving Now</Eyebrow>
            <h2 className="mt-3 text-[clamp(24px,3.2vw,34px)]">Our core base is Chennai&apos;s neighbourhood retail.</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {servingNow.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.06} className="group rounded-2xl border border-line bg-surface p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-strong/40 hover:shadow-soft-lg">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-mint to-mint2 text-accent"><s.Icon size={23} strokeWidth={1.8} /></span>
                <span className="mt-5 inline-block rounded-full bg-accent-strong/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-accent">Core</span>
                <h3 className="mt-3 text-[19px]">{s.t}</h3>
                <p className="mt-2 text-muted">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Expanding */}
      <Section tone="surface">
        <Container>
          <Reveal className="max-w-[640px]">
            <Eyebrow>Expanding Toward</Eyebrow>
            <h2 className="mt-3 text-[clamp(24px,3.2vw,34px)]">Sectors on our roadmap, not yet our core base.</h2>
            <p className="mt-4 text-muted">We&apos;re building toward these — we won&apos;t claim to serve them at scale before we actually do.</p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {expanding.map((s, i) => (
              <Reveal key={s.t} delay={(i % 4) * 0.05} className="rounded-2xl border border-dashed border-line bg-base p-6 transition-all duration-300 hover:border-accent-strong/40 hover:shadow-soft">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface text-accent shadow-soft"><s.Icon size={21} strokeWidth={1.8} /></span>
                <h3 className="mt-4 text-[16.5px]">{s.t}</h3>
                <p className="mt-2 text-[13.5px] text-muted">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Coverage — slate band with map */}
      <Section tone="dark">
        <Container>
          <Reveal className="max-w-[640px]">
            <Eyebrow onDark>Coverage Approach</Eyebrow>
            <h2 className="mt-3 text-invert text-[clamp(24px,3.2vw,34px)]">We grow area by area, not all at once.</h2>
            <p className="mt-4 text-white/80">Rather than spreading thin across Chennai, we onboard retailers zone by zone — so delivery reliability doesn&apos;t slip as we add partners. If we&apos;re not in your area yet, tell us and we&apos;ll let you know honestly where you sit on the expansion plan.</p>
          </Reveal>
          <div className="mt-10 rounded-3xl bg-base p-5 text-ink shadow-soft-lg md:p-7">
            <TamilNaduMap />
          </div>
          <div className="mt-8"><Button href="/contact" variant="solidInvert"><MapPin size={16} /> Check Your Area</Button></div>
        </Container>
      </Section>

      {/* CTA */}
      <section className="forest-grad relative overflow-hidden py-16 text-center text-invert md:py-24">
        <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(60% 120% at 50% -10%, rgba(255,255,255,0.14), transparent 60%)" }} />
        <Container className="relative">
          <h2 className="text-invert text-[clamp(24px,3.4vw,38px)]">Is your business on this list?</h2>
          <p className="mx-auto mt-3 max-w-[560px] text-white/85">Reach out and we&apos;ll tell you plainly whether we can serve you today or what timeline to expect.</p>
          <div className="mt-8 flex justify-center"><Button href="/contact" variant="solidInvert">Talk To Us <ArrowRight size={16} /></Button></div>
        </Container>
      </section>
    </>
  );
}
