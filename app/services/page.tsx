import type { Metadata } from "next";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { Store, Boxes, Warehouse, ClipboardList, Workflow, ShoppingCart, LineChart, Tags, Cpu, ArrowRight, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Container, Section, Eyebrow, Button } from "@/components/primitives";
import PageHero from "@/components/PageHero";
import { fmcgCategories, nutsSpicesCategories, aiFeatures, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Services | B2B FMCG Distribution in Chennai",
  description:
    "Retail distribution, wholesale supply, warehousing, procurement and private label support from Ecoo Basket in Chennai.",
  alternates: { canonical: "/services" },
};

const services: { n: string; t: string; d: string; Icon: LucideIcon }[] = [
  { n: "01", t: "Retail Distribution", d: "Direct-to-store delivery across our Chennai coverage area, with route planning that keeps delivery windows consistent.", Icon: Store },
  { n: "02", t: "Wholesale Supply", d: "Bulk procurement and wholesale pricing for kirana stores, general trade, and modern trade outlets, with flexible order quantities.", Icon: Boxes },
  { n: "03", t: "Warehouse Management", d: "Organised storage with basic climate awareness and stock rotation, so products move before they age out.", Icon: Warehouse },
  { n: "04", t: "Inventory Management", d: "Stock tracking that flags what's low before a retailer runs out, and what's slow before it becomes dead stock.", Icon: ClipboardList },
  { n: "05", t: "Supply Chain Coordination", d: "Managing the handoffs between sourcing, warehousing, and last-mile delivery so nothing stalls between steps.", Icon: Workflow },
  { n: "06", t: "Procurement Services", d: "Sourcing and vendor negotiation on behalf of partners who want competitive pricing without doing the legwork themselves.", Icon: ShoppingCart },
  { n: "07", t: "Business Consulting", d: "Practical, experience-based advice for retail and FMCG businesses on distribution strategy and operational efficiency.", Icon: LineChart },
  { n: "08", t: "Private Label Manufacturing Support", d: "For brands — not our own line — that want help with sourcing, packaging, and getting a private label product onto retail shelves.", Icon: Tags },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Offer"
        title="Wholesale FMCG distribution, from a manufacturer's dock to a retailer's shelf."
        subtitle="A full range of services, one accountable point of contact for each partner."
      />

      {/* 8 services */}
      <Section>
        <Container>
          <Reveal className="mx-auto max-w-[640px] text-center">
            <Eyebrow>Our Services</Eyebrow>
            <h2 className="mt-3 text-[clamp(26px,3.4vw,40px)]">Our Wholesale &amp; Distribution Services</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.n} delay={(i % 3) * 0.05}
                className="group relative rounded-2xl border border-line bg-surface p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-strong/40 hover:shadow-soft-lg">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-mint to-mint2 text-accent"><s.Icon size={23} strokeWidth={1.8} /></span>
                <span className="absolute right-6 top-7 font-mono text-[12px] font-semibold text-line group-hover:text-accent-strong/40">{s.n}</span>
                <h3 className="mt-5 text-[19px] tracking-[-0.01em]">{s.t}</h3>
                <p className="mt-2.5 text-[14.5px] text-muted">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* AI-powered supply chain — image split on slate */}
      <Section tone="dark">
        <Container className="grid items-center gap-14 md:grid-cols-2">
          <Reveal delay={0.06} className="relative order-last aspect-[5/4] overflow-hidden rounded-3xl border border-white/10 shadow-soft-lg md:order-first">
            {/* CONTENT NEEDED: swap for an original technology/operations photo if available */}
            <Image src="/assets/images/services/02_AI_Technology.jpg" alt="Technology-enabled supply chain operations at Ecoo Basket" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
          </Reveal>
          <Reveal>
            <Eyebrow onDark>AI-Powered Supply Chain</Eyebrow>
            <h2 className="mt-3 text-invert text-[clamp(24px,3.2vw,34px)]">Technology that supports the relationship, not replaces it.</h2>
            {/* CONTENT NEEDED: confirm which AI features are live vs aspirational */}
            <ul className="mt-8 grid gap-5">
              {aiFeatures.map((f) => (
                <li key={f.t} className="flex gap-4">
                  <span className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-white/10 text-[#4ADE80]"><Sparkles size={19} strokeWidth={1.8} /></span>
                  <div><h3 className="text-[16.5px] text-invert">{f.t}</h3><p className="mt-1 text-[14px] text-white/75">{f.d}</p></div>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      {/* Product categories */}
      <Section tone="surface">
        <Container>
          <Reveal className="max-w-[640px]">
            <Eyebrow>Product Categories</Eyebrow>
            <h2 className="mt-3 text-[clamp(24px,3.2vw,34px)]">The categories we move</h2>
            <p className="mt-4 text-muted">General FMCG categories we distribute, plus our own Ecoo Nuts &amp; Spices range. Category names are shown for reference — not a full product catalogue.</p>
          </Reveal>
          <p className="mb-4 mt-10 font-mono text-[12px] uppercase tracking-[0.1em] text-muted">Multi-Brand Track · FMCG Categories We Distribute</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {fmcgCategories.map((c) => (
              <div key={c} className="rounded-xl border border-line bg-base px-4 py-6 text-center text-[15px] font-semibold shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent-strong/40">{c}</div>
            ))}
          </div>
          <p className="mb-4 mt-12 font-mono text-[12px] uppercase tracking-[0.1em] text-accent">Own-Brand Track · Ecoo Nuts &amp; Spices Categories</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {nutsSpicesCategories.map((c) => (
              <div key={c} className="rounded-xl border border-navy/20 bg-navy-soft/70 px-4 py-6 text-center text-[15px] font-semibold text-ink transition-all duration-300 hover:-translate-y-1">{c}</div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={site.orderUrl} external variant="primary">Order Nuts &amp; Spices online <ArrowRight size={17} /></Button>
            <Button href="/" variant="outline">See our Nuts &amp; Spices line <ArrowRight size={16} /></Button>
          </div>
        </Container>
      </Section>

      {/* Two distinct product lines */}
      <Section>
        <Container>
          <Reveal className="max-w-[640px]">
            <Eyebrow>Two Distinct Product Lines</Eyebrow>
            <h2 className="mt-3 text-[clamp(24px,3.2vw,34px)]">Don&apos;t confuse these two — they&apos;re separate.</h2>
            <p className="mt-4 text-muted">We provide private-label support as a service to other brands. Separately, we also manufacture and sell our own branded line. They are not the same initiative.</p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Reveal className="rounded-2xl border border-line bg-surface p-8 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-mint to-mint2 text-accent"><Tags size={23} strokeWidth={1.8} /></span>
              <span className="mt-5 block font-mono text-[11px] uppercase tracking-[0.08em] text-accent">Service We Provide</span>
              <h3 className="mt-1.5 text-[20px]">Private Label Support (for your brand)</h3>
              <p className="mt-2.5 text-muted">You bring the brand, we help with sourcing, packaging, compliance, and retail placement — your product, our operational support.</p>
            </Reveal>
            <Reveal delay={0.08} className="rounded-2xl border border-navy/20 bg-navy-soft/70 p-8 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-navy shadow-soft"><Sparkles size={23} strokeWidth={1.8} /></span>
              <span className="mt-5 block font-mono text-[11px] uppercase tracking-[0.08em] text-navy">Our Own Product</span>
              <h3 className="mt-1.5 text-[20px]">Ecoo Nuts &amp; Spices (our brand)</h3>
              <p className="mt-2.5 text-muted">Sourced, packed and sold by us directly — a higher-margin category we offer alongside standard multi-brand FMCG distribution.</p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <section className="forest-grad relative overflow-hidden py-16 text-center text-invert md:py-24">
        <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(60% 120% at 50% -10%, rgba(255,255,255,0.14), transparent 60%)" }} />
        <Container className="relative">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12"><Cpu size={24} /></div>
          <h2 className="text-invert text-[clamp(24px,3.4vw,38px)]">Not sure which service fits your business?</h2>
          <p className="mx-auto mt-3 max-w-[560px] text-white/85">Tell us what you&apos;re trying to solve and we&apos;ll point you to the right one — or tell you honestly if we can&apos;t help yet.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="solidInvert">Talk To Us</Button>
            <Button href="/we-serve" variant="outlineInvert">See Who We Serve <ArrowRight size={16} /></Button>
          </div>
        </Container>
      </section>
    </>
  );
}
