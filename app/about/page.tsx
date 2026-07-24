import type { Metadata } from "next";
import Image from "next/image";
import { Target, Eye, HeartHandshake, Boxes, Sparkles, Building2, ArrowRight, Quote } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Container, Section, Eyebrow, Button } from "@/components/primitives";
import PageHero from "@/components/PageHero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About Us | B2B FMCG Distributor in Chennai",
  description: "The story, mission and company record of Ecoo Basket (Ecoo Hyper Retail Private Limited), a B2B FMCG distributor based in Chennai, Tamil Nadu.",
  alternates: { canonical: "/about" },
};

const mvv = [
  { k: "Mission", t: "Reliable distribution, honestly priced", d: "Give Chennai retailers consistent access to quality FMCG products with transparent pricing and dependable delivery.", Icon: Target },
  { k: "Vision", t: "Tamil Nadu's most trusted distributor", d: "To become the FMCG distribution partner retailers and manufacturers recommend first — starting in Chennai, expanding across Tamil Nadu.", Icon: Eye },
  { k: "Values", t: "Integrity, service, follow-through", d: "Transparent dealings, dependable delivery windows, and accountability when something goes wrong — not just when it goes right.", Icon: HeartHandshake },
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
      <PageHero
        eyebrow="Our Story"
        title="Built to close the gap between manufacturer and shopkeeper."
        subtitle="Chennai-headquartered, founder-led, and focused on getting distribution basics right before chasing scale."
      >
        {["12+ yrs retail experience", "Founder-led", "Chennai HQ", "Two parallel tracks"].map((c) => (
          <span key={c} className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[13px] font-medium text-white backdrop-blur">{c}</span>
        ))}
      </PageHero>

      {/* Problem — split with image */}
      <Section>
        <Container className="grid items-center gap-14 md:grid-cols-2">
          <Reveal>
            <Eyebrow>The Problem We Set Out to Fix</Eyebrow>
            <h2 className="mt-3 text-[clamp(24px,3.2vw,34px)]">Retailers were choosing between price and reliability. We didn&apos;t think they should have to.</h2>
            <p className="mt-5 text-muted">After 12 years moving through HUL, Reliance Retail, BigBasket, and a prior wholesale co-founder role, Ragavendren Chakaravarthi started {site.legalName} with a narrow, deliberate focus: build a distribution operation in Chennai that a small retailer can actually depend on — correct orders, fair pricing, and a real person to call.</p>
            <p className="mt-3 text-muted">The company runs two tracks in parallel — multi-brand FMCG distribution to keep shelves stocked with what customers already ask for, and an own-brand Nuts &amp; Spices line to give retail partners a stronger-margin category alongside it.</p>
          </Reveal>
          <Reveal delay={0.1} className="relative aspect-[5/4.2] overflow-hidden rounded-3xl border border-line shadow-soft-lg">
            <Image src="/assets/images/background/06_Business_Meeting.jpg" alt="Ecoo Basket team planning distribution operations" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
          </Reveal>
        </Container>
      </Section>

      {/* Two tracks */}
      <Section tone="surface">
        <Container>
          <Reveal className="mx-auto max-w-[640px] text-center">
            <Eyebrow>Two Parallel Tracks</Eyebrow>
            <h2 className="mt-3 text-[clamp(24px,3.2vw,34px)]">One operation, two ways we add value.</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {[
              { Icon: Boxes, t: "Multi-Brand FMCG Distribution", d: "Keeping shelves stocked with the established brands customers already ask for — reliable supply, flexible order sizes, clean GST invoicing." },
              { Icon: Sparkles, t: "Own-Brand Nuts & Spices", d: "A line we source, pack and price ourselves — a stronger-margin category for retail partners, without compromising on quality." },
            ].map((x, i) => (
              <Reveal key={x.t} delay={i * 0.08} className="group rounded-2xl border border-line bg-base p-8 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-strong/40 hover:shadow-soft-lg">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-mint to-mint2 text-accent"><x.Icon size={23} strokeWidth={1.8} /></span>
                <h3 className="mt-5 text-[20px]">{x.t}</h3>
                <p className="mt-2.5 text-[15px] text-muted">{x.d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Mission / Vision / Values */}
      <Section>
        <Container>
          <Reveal className="mx-auto max-w-[640px] text-center">
            <Eyebrow>Mission, Vision &amp; Values</Eyebrow>
            <h2 className="mt-3 text-[clamp(24px,3.2vw,34px)]">The principles behind every delivery.</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {mvv.map((m, i) => (
              <Reveal key={m.k} delay={i * 0.06} className="rounded-2xl border border-line bg-surface p-8 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-mint to-mint2 text-accent"><m.Icon size={23} strokeWidth={1.8} /></span>
                <span className="mt-5 block font-mono text-[11px] uppercase tracking-[0.1em] text-navy">{m.k}</span>
                <h3 className="mt-1.5 text-[19px]">{m.t}</h3>
                <p className="mt-2.5 text-[14.5px] text-muted">{m.d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Founder pull-quote */}
      <Section tone="surface">
        <Container className="grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="relative mx-auto aspect-square w-full max-w-[360px] overflow-hidden rounded-3xl border border-line shadow-soft-lg">
            <Image src="/assets/images/founders/CSO-RAGAVENDREN%20CHAKARAVARTHI_.JPG.jpeg" alt="Ragavendren Chakaravarthi, Chief Strategy Officer, Ecoo Basket" fill sizes="(max-width:768px) 100vw, 360px" className="object-cover" />
          </Reveal>
          <Reveal delay={0.08}>
            <Quote size={40} className="text-accent-strong/30" />
            <blockquote className="mt-3 text-[clamp(20px,2.4vw,28px)] font-semibold leading-[1.32] tracking-[-0.02em] text-ink">
              Strategy without execution is a dream. We combine a clear plan with disciplined day-to-day execution.
            </blockquote>
            <div className="mt-6 flex items-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <div>
                <div className="font-semibold text-ink">Ragavendren Chakaravarthi</div>
                <div className="text-[13.5px] text-muted">Chief Strategy Officer · 12 yrs across HUL, Reliance Retail &amp; BigBasket</div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Company record — slate band */}
      <Section tone="dark">
        <Container>
          <Reveal className="max-w-[640px]">
            <Eyebrow onDark>Company Record</Eyebrow>
            <h2 className="mt-3 text-invert text-[clamp(24px,3.2vw,34px)]">The facts, plainly stated.</h2>
            <p className="mt-4 text-white/70">A real, registered company — here is the public record, without the marketing gloss.</p>
          </Reveal>
          <div className="mt-10 grid gap-x-10 gap-y-0 sm:grid-cols-2">
            {record.map(([k, v]) => (
              <div key={k} className="flex flex-col gap-1 border-b border-white/12 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <dt className="font-mono text-[12px] uppercase tracking-[0.04em] text-dark-accent">{k}</dt>
                <dd className="text-[15px] text-invert sm:text-right">{v}</dd>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* How we operate */}
      <Section>
        <Container className="max-w-[820px]">
          <Reveal>
            <Eyebrow>How We Operate</Eyebrow>
            <h2 className="mt-3 text-[clamp(24px,3.2vw,34px)]">Built on relationships first, technology second.</h2>
            <p className="mt-5 text-muted">We&apos;d rather grow slowly with retailers who trust us than grow fast with ones who don&apos;t. Every partnership starts with a real conversation about order patterns, delivery windows, and what &ldquo;reliable&rdquo; actually needs to mean for that specific shop.</p>
            <p className="mt-3 text-muted">Technology — our digital ordering platform, route planning, inventory tracking — exists to support that relationship, not replace it.</p>
          </Reveal>
        </Container>
      </Section>

      {/* CTA */}
      <section className="forest-grad relative overflow-hidden py-16 text-center text-invert md:py-24">
        <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(60% 120% at 50% -10%, rgba(255,255,255,0.14), transparent 60%)" }} />
        <Container className="relative">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12"><Building2 size={24} /></div>
          <h2 className="text-invert text-[clamp(24px,3.4vw,38px)]">Want to know more before you commit?</h2>
          <p className="mx-auto mt-3 max-w-[560px] text-white/85">Talk to us directly — no sales script, just a straight answer about whether we&apos;re the right fit.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="solidInvert">Get In Touch</Button>
            <Button href="/founders" variant="outlineInvert">Meet the Founders <ArrowRight size={16} /></Button>
          </div>
        </Container>
      </section>
    </>
  );
}
