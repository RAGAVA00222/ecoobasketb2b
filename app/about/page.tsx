import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { Container, Section, Eyebrow, Button } from "@/components/primitives";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About Us | B2B FMCG Distributor in Chennai",
  description: "The story, mission and company record of Ecoo Basket (Ecoo Hyper Retail Private Limited), a B2B FMCG distributor based in Chennai, Tamil Nadu.",
  alternates: { canonical: "/about" },
};

const mvv = [
  { k: "Mission", t: "Reliable distribution, honestly priced", d: "Give Chennai retailers consistent access to quality FMCG products with transparent pricing and dependable delivery." },
  { k: "Vision", t: "Tamil Nadu's most trusted distributor", d: "To become the FMCG distribution partner retailers and manufacturers recommend first — starting in Chennai, expanding across Tamil Nadu." },
  { k: "Values", t: "Integrity, service, follow-through", d: "Transparent dealings, dependable delivery windows, and accountability when something goes wrong — not just when it goes right." },
];

const record: [string, string][] = [
  ["Legal Entity", site.legalName],
  ["CIN", site.cin],
  ["Date of Incorporation", site.incorporated],
  ["Company Type", site.companyType],
  ["Registered Office", site.registeredOffice],
  ["Headquarters", "Vanagaram, Poonamallee, Chennai – 600095"],
  ["Business Model", "Multi-brand FMCG distribution + own-brand Nuts & Spices"],
  ["Ordering Platform", "B2B digital ordering"],
  ["Current Coverage", "Chennai, expanding across Tamil Nadu"],
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line bg-base">
        <Container className="py-14 md:py-20">
          <Eyebrow>Our Story</Eyebrow>
          <h1 className="mt-4 max-w-[860px] text-[clamp(30px,4.6vw,46px)]">Built to close the gap between manufacturer and shopkeeper.</h1>
          <p className="mt-5 max-w-[620px] text-muted">Chennai-headquartered, founder-led, and focused on getting distribution basics right before chasing scale.</p>
        </Container>
      </section>

      <Section>
        <Container className="max-w-[820px]">
          <Reveal>
            <Eyebrow>The Problem We Set Out to Fix</Eyebrow>
            <h2 className="mt-3 text-[clamp(24px,3.2vw,32px)]">Retailers were choosing between price and reliability. We didn&apos;t think they should have to.</h2>
            <p className="mt-4 text-muted">After 12 years moving through HUL, Reliance Retail, BigBasket, and a prior wholesale co-founder role, Ragavendren Chakaravarthi started {site.legalName} with a narrow, deliberate focus: build a distribution operation in Chennai that a small retailer can actually depend on — correct orders, fair pricing, and a real person to call.</p>
            <p className="mt-3 text-muted">The company runs two tracks in parallel — multi-brand FMCG distribution to keep shelves stocked with what customers already ask for, and an own-brand Nuts &amp; Spices line to give retail partners a stronger-margin category alongside it.</p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <Reveal className="max-w-[640px]">
            <Eyebrow>Mission, Vision &amp; Values</Eyebrow>
            <h2 className="mt-3 text-[clamp(24px,3.2vw,32px)]">The principles behind every delivery.</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {mvv.map((m, i) => (
              <Reveal key={m.k} delay={i * 0.06} className="rounded-[3px] border border-line bg-base p-7">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">{m.k}</span>
                <h3 className="mt-2 text-[19px]">{m.t}</h3>
                <p className="mt-2 text-muted">{m.d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="dark">
        <Container>
          <Reveal className="max-w-[640px]">
            <Eyebrow onDark>Company Record</Eyebrow>
            <h2 className="mt-3 text-invert text-[clamp(24px,3.2vw,32px)]">The facts, plainly stated.</h2>
          </Reveal>
          <dl className="mt-8 border-t border-[rgba(251,250,247,0.18)]">
            {record.map(([k, v]) => (
              <div key={k} className="flex flex-col gap-1 border-b border-[rgba(251,250,247,0.18)] py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <dt className="font-mono text-[12px] uppercase tracking-[0.04em] text-dark-accent sm:min-w-[200px]">{k}</dt>
                <dd className="text-[15px] text-invert sm:text-right">{v}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-[820px]">
          <Reveal>
            <Eyebrow>How We Operate</Eyebrow>
            <h2 className="mt-3 text-[clamp(24px,3.2vw,32px)]">Built on relationships first, technology second.</h2>
            <p className="mt-4 text-muted">We&apos;d rather grow slowly with retailers who trust us than grow fast with ones who don&apos;t. Every partnership starts with a real conversation about order patterns, delivery windows, and what &ldquo;reliable&rdquo; actually needs to mean for that specific shop.</p>
            <p className="mt-3 text-muted">Technology — our digital ordering platform, route planning, inventory tracking — exists to support that relationship, not replace it.</p>
          </Reveal>
        </Container>
      </Section>

      <section className="bg-accent py-16 text-center text-invert md:py-20">
        <Container>
          <h2 className="text-invert text-[clamp(24px,3.4vw,34px)]">Want to know more before you commit?</h2>
          <p className="mx-auto mt-3 max-w-[560px] text-invert/90">Talk to us directly — no sales script, just a straight answer about whether we&apos;re the right fit.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="outlineInvert">Get In Touch</Button>
            <Button href="/founders" variant="outlineInvert">Meet the Founders →</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
