import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { Smartphone, Map, MapPinned, TrendingUp, Target, Rocket, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Container, Section, Eyebrow, Button } from "@/components/primitives";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Investor Relations | Ecoo Basket",
  description: "Ecoo Basket investor relations — growth story, roadmap and market opportunity narrative. No financial figures.",
  alternates: { canonical: "/investor" },
};

// Growth roadmap reuses the confirmed Vision phases (real copy, not placeholder).
const roadmap: { n: string; t: string; d: string; Icon: LucideIcon }[] = [
  { n: "Phase 01", t: "Digital Foundation", d: "Digital ordering, GST-compliant invoicing, and reliable delivery across our current Chennai coverage — the phase we're in now.", Icon: Smartphone },
  { n: "Phase 02", t: "Zone-by-Zone Expansion", d: "Grow the Chennai footprint area by area, without letting delivery reliability slip.", Icon: Map },
  { n: "Phase 03", t: "Tamil Nadu Coverage", d: "Extend distribution beyond Chennai to other Tamil Nadu markets, using what we learn locally first.", Icon: MapPinned },
  { n: "Phase 04", t: "Category & Partner Growth", d: "Deepen the own-brand Nuts & Spices line and grow the supplier partner base as the network matures.", Icon: TrendingUp },
];

export default function InvestorPage() {
  return (
    <>
      <PageHero
        eyebrow="Investor Relations"
        title="The growth story and the road ahead."
        subtitle="A roadmap and market-opportunity narrative — presented qualitatively, with no financial figures."
      />

      {/* The opportunity */}
      {/* CONTENT NEEDED: expanded investor market-opportunity narrative (qualitative, no figures) */}
      <Section>
        <Container className="max-w-[860px]">
          <Reveal>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-mint to-mint2 text-accent"><Target size={23} strokeWidth={1.8} /></span>
            <div className="mt-5"><Eyebrow>The Opportunity</Eyebrow></div>
            <h2 className="mt-3 text-[clamp(24px,3.2vw,34px)]">A large, fragmented FMCG distribution market — starting where we can serve well.</h2>
            <p className="mt-5 text-[clamp(16px,1.5vw,18px)] leading-relaxed text-muted">
              Chennai&apos;s neighbourhood retail runs on FMCG distribution that is often inconsistent — unreliable
              delivery windows, high minimum orders, and little accountability when something goes wrong. Ecoo Basket is
              building a reliability-first alternative, one zone at a time: technology-enabled logistics, transparent
              GST billing, and a real account contact for every partner. It is a large, fragmented market, and our focus
              is on serving it well where we operate before we expand.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Growth roadmap — numbered timeline */}
      <Section tone="surface">
        <Container>
          <Reveal className="max-w-[640px]"><Eyebrow>Growth Roadmap</Eyebrow><h2 className="mt-3 text-[clamp(24px,3.2vw,34px)]">How we intend to grow — in order, not all at once.</h2></Reveal>
          <div className="relative mt-14">
            <div aria-hidden className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-line to-transparent md:block" />
            <ol className="grid gap-y-10 sm:grid-cols-2 md:grid-cols-4 md:gap-x-5">
              {roadmap.map((p, i) => (
                <li key={p.n} className="relative flex flex-col items-start">
                  <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-base text-accent shadow-soft">
                    <p.Icon size={23} strokeWidth={1.8} />
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-invert">{i + 1}</span>
                  </span>
                  <div className="mt-4 font-mono text-[12px] text-accent">{p.n}</div>
                  <h3 className="mt-1 text-[18px]">{p.t}</h3>
                  <p className="mt-2 text-[14px] text-muted">{p.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* Why now — slate */}
      {/* CONTENT NEEDED: expanded investor "why now" / traction narrative (qualitative, no figures) */}
      <Section tone="dark">
        <Container className="max-w-[860px]">
          <Reveal>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#4ADE80]"><Rocket size={23} strokeWidth={1.8} /></span>
            <div className="mt-5"><Eyebrow onDark>Why Now</Eyebrow></div>
            <h2 className="mt-3 text-invert text-[clamp(24px,3.2vw,34px)]">Founder-led, disciplined, built on honest numbers.</h2>
            <p className="mt-5 text-[clamp(16px,1.5vw,18px)] leading-relaxed text-white/80">
              The timing rests on three things: a founder-led team with years across HUL, Reliance Retail and BigBasket;
              a persistent reliability gap in neighbourhood FMCG distribution; and a deliberate, zone-by-zone approach
              that grows only as fast as we can serve well. This page is intentionally qualitative — no revenue,
              financial highlights, or projections are shown.
            </p>
            <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.06em] text-white/60">
              This page intentionally omits financial figures
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* CTA */}
      <section className="forest-grad relative overflow-hidden py-16 text-center text-invert md:py-24">
        <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(60% 120% at 50% -10%, rgba(255,255,255,0.14), transparent 60%)" }} />
        <Container className="relative">
          <h2 className="text-invert text-[clamp(24px,3.4vw,38px)]">Interested in the journey?</h2>
          <p className="mx-auto mt-3 max-w-[560px] text-white/85">We&apos;re glad to talk to prospective partners and investors about where this is headed.</p>
          <div className="mt-8 flex justify-center"><Button href="/contact" variant="solidInvert">Get In Touch <ArrowRight size={16} /></Button></div>
        </Container>
      </section>
    </>
  );
}
