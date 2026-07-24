import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Placeholder from "@/components/Placeholder";
import { Container, Section, Eyebrow, Button } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Investor Relations | Ecoo Basket",
  description: "Ecoo Basket investor relations — growth story, roadmap and market opportunity narrative. No financial figures.",
  alternates: { canonical: "/investor" },
};

// Growth roadmap reuses the confirmed Vision phases (real copy, not placeholder).
const roadmap = [
  { n: "Phase 01", t: "Digital Foundation", d: "Digital ordering, GST-compliant invoicing, and reliable delivery across our current Chennai coverage — the phase we're in now." },
  { n: "Phase 02", t: "Zone-by-Zone Expansion", d: "Grow the Chennai footprint area by area, without letting delivery reliability slip." },
  { n: "Phase 03", t: "Tamil Nadu Coverage", d: "Extend distribution beyond Chennai to other Tamil Nadu markets, using what we learn locally first." },
  { n: "Phase 04", t: "Category & Partner Growth", d: "Deepen the own-brand Nuts & Spices line and grow the supplier partner base as the network matures." },
];

export default function InvestorPage() {
  return (
    <>
      <section className="border-b border-line bg-base">
        <Container className="py-14 md:py-20">
          <Eyebrow>Investor Relations</Eyebrow>
          <h1 className="mt-4 max-w-[860px] text-[clamp(30px,4.6vw,46px)]">The growth story and the road ahead.</h1>
          <p className="mt-5 max-w-[620px] text-muted">A roadmap and market-opportunity narrative — presented qualitatively, with no financial figures.</p>
        </Container>
      </section>

      {/* CONTENT NEEDED: investor market-opportunity narrative (qualitative, no figures) */}
      <Section>
        <Container className="max-w-[820px]">
          <Reveal>
            <Eyebrow>The Opportunity</Eyebrow>
            <h2 className="mt-3 text-[clamp(24px,3.2vw,32px)]">A large, fragmented FMCG distribution market — starting where we can serve well.</h2>
            <div className="mt-4"><Placeholder label="market-opportunity narrative (your words, no figures)" /></div>
            <p className="mt-4 text-muted">
              Chennai&apos;s neighbourhood retail runs on FMCG distribution that is often inconsistent. Ecoo Basket is
              building a reliability-first alternative, one zone at a time. The full market-opportunity narrative goes
              here — supplied by the company, qualitative only, no financial figures.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <Reveal className="max-w-[640px]"><Eyebrow>Growth Roadmap</Eyebrow><h2 className="mt-3 text-[clamp(24px,3.2vw,32px)]">How we intend to grow — in order, not all at once.</h2></Reveal>
          <ol className="mt-10 grid gap-6 md:grid-cols-4">
            {roadmap.map((p) => (
              <li key={p.n} className="border-t-2 border-line pt-5">
                <div className="font-mono text-[12px] text-accent">{p.n}</div>
                <h3 className="mt-1 text-[18px]">{p.t}</h3>
                <p className="mt-2 text-[14px] text-muted">{p.d}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* CONTENT NEEDED: investor "why now" / traction narrative (qualitative, no figures) */}
      <Section tone="dark">
        <Container className="max-w-[820px]">
          <Eyebrow onDark>Why Now</Eyebrow>
          <h2 className="mt-3 text-invert text-[clamp(24px,3.2vw,32px)]">Founder-led, disciplined, built on honest numbers.</h2>
          <div className="mt-4"><Placeholder label="why-now / traction narrative" className="border-dark-accent/60 !text-dark-accent" /></div>
          <p className="mt-4 text-invert/80">
            A qualitative &ldquo;why now&rdquo; narrative goes here — leadership experience, the reliability gap in the
            market, and the deliberate zone-by-zone approach. No financial highlights, revenue, or projections are shown.
          </p>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.08em] text-invert/60">
            This page intentionally omits financial figures.
          </p>
        </Container>
      </Section>

      <section className="bg-accent py-16 text-center text-invert md:py-20">
        <Container>
          <h2 className="text-invert text-[clamp(24px,3.4vw,34px)]">Interested in the journey?</h2>
          <p className="mx-auto mt-3 max-w-[560px] text-invert/90">We&apos;re glad to talk to prospective partners and investors about where this is headed.</p>
          <div className="mt-7 flex justify-center"><Button href="/contact" variant="outlineInvert">Get In Touch</Button></div>
        </Container>
      </section>
    </>
  );
}
