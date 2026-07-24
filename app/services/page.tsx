import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { Container, Section, Eyebrow, Button } from "@/components/primitives";
import { fmcgCategories, nutsSpicesCategories, aiFeatures, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Services | B2B FMCG Distribution in Chennai",
  description:
    "Retail distribution, wholesale supply, warehousing, procurement and private label support from Ecoo Basket in Chennai.",
  alternates: { canonical: "/services" },
};

const services = [
  { n: "01", t: "Retail Distribution", d: "Direct-to-store delivery across our Chennai coverage area, with route planning that keeps delivery windows consistent." },
  { n: "02", t: "Wholesale Supply", d: "Bulk procurement and wholesale pricing for kirana stores, general trade, and modern trade outlets, with flexible order quantities." },
  { n: "03", t: "Warehouse Management", d: "Organised storage with basic climate awareness and stock rotation, so products move before they age out." },
  { n: "04", t: "Inventory Management", d: "Stock tracking that flags what's low before a retailer runs out, and what's slow before it becomes dead stock." },
  { n: "05", t: "Supply Chain Coordination", d: "Managing the handoffs between sourcing, warehousing, and last-mile delivery so nothing stalls between steps." },
  { n: "06", t: "Procurement Services", d: "Sourcing and vendor negotiation on behalf of partners who want competitive pricing without doing the legwork themselves." },
  { n: "07", t: "Business Consulting", d: "Practical, experience-based advice for retail and FMCG businesses on distribution strategy and operational efficiency." },
  { n: "08", t: "Private Label Manufacturing Support", d: "For brands — not our own line — that want help with sourcing, packaging, and getting a private label product onto retail shelves." },
];

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-line bg-base">
        <Container className="py-14 md:py-20">
          <Eyebrow>What We Offer</Eyebrow>
          <h1 className="mt-4 max-w-[860px] text-[clamp(30px,4.6vw,46px)]">
            Wholesale FMCG distribution, from a manufacturer&apos;s dock to a retailer&apos;s shelf.
          </h1>
          <p className="mt-5 max-w-[620px] text-muted">A full range of services, one accountable point of contact for each partner.</p>
        </Container>
      </section>

      {/* 8 services */}
      <Section>
        <Container>
          <Reveal><h2 className="text-[clamp(24px,3.2vw,32px)]">Our Wholesale &amp; Distribution Services</h2></Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.n} delay={(i % 3) * 0.05} className="rounded-[3px] border border-line bg-surface p-7">
                <span className="flex h-9 w-9 items-center justify-center rounded-[2px] bg-accent-strong/12 font-mono text-[13px] font-semibold text-accent">{s.n}</span>
                <h3 className="mt-4 text-[19px]">{s.t}</h3>
                <p className="mt-2 text-[14.5px] text-muted">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* AI-powered supply chain */}
      <Section tone="dark">
        <Container>
          <Reveal className="max-w-[640px]">
            <Eyebrow onDark>AI-Powered Supply Chain</Eyebrow>
            <h2 className="mt-3 text-invert text-[clamp(24px,3.2vw,34px)]">Technology that supports the relationship, not replaces it.</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {aiFeatures.map((f, i) => (
              <Reveal key={f.t} delay={(i % 3) * 0.05} className="rounded-[3px] border border-[rgba(251,250,247,0.18)] p-6">
                <h3 className="text-[17px] text-invert">{f.t}</h3>
                <p className="mt-2 text-[14px] text-invert/80">{f.d}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.08em] text-invert/60">
            Feature set shown qualitatively — capability depth pending confirmation
          </p>
        </Container>
      </Section>

      {/* Product categories */}
      <Section tone="surface">
        <Container>
          <Reveal className="max-w-[640px]">
            <Eyebrow>Product Categories</Eyebrow>
            <h2 className="mt-3 text-[clamp(24px,3.2vw,32px)]">The categories we move</h2>
            <p className="mt-3 text-muted">General FMCG categories we distribute, plus our own Ecoo Nuts &amp; Spices range. Category names are shown for reference — not a full product catalogue.</p>
          </Reveal>
          <p className="mb-4 mt-8 font-mono text-[12px] uppercase tracking-[0.1em] text-muted">Multi-Brand Track · FMCG Categories We Distribute</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {fmcgCategories.map((c) => (
              <div key={c} className="rounded-[3px] border border-line bg-surface px-4 py-6 text-center text-[15px] font-medium">{c}</div>
            ))}
          </div>
          <p className="mb-4 mt-11 font-mono text-[12px] uppercase tracking-[0.1em] text-accent">Own-Brand Track · Ecoo Nuts &amp; Spices Categories</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {nutsSpicesCategories.map((c) => (
              <div key={c} className="rounded-[3px] border border-line bg-base px-4 py-6 text-center text-[15px] font-medium">{c}</div>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href={site.orderUrl} external variant="green">Order Nuts &amp; Spices online →</Button>
            <Button href="/" variant="outline">See our Nuts &amp; Spices line →</Button>
          </div>
        </Container>
      </Section>

      {/* Two distinct product lines */}
      <Section>
        <Container>
          <Reveal className="max-w-[640px]">
            <Eyebrow>Two Distinct Product Lines</Eyebrow>
            <h2 className="mt-3 text-[clamp(24px,3.2vw,32px)]">Don&apos;t confuse these two — they&apos;re separate.</h2>
            <p className="mt-3 text-muted">We provide private-label support as a service to other brands. Separately, we also manufacture and sell our own branded line. They are not the same initiative.</p>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Reveal className="rounded-[3px] border border-line bg-surface p-7">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">Service We Provide</span>
              <h3 className="mt-2 text-[19px]">Private Label Support (for your brand)</h3>
              <p className="mt-2 text-muted">You bring the brand, we help with sourcing, packaging, compliance, and retail placement — your product, our operational support.</p>
            </Reveal>
            <Reveal delay={0.08} className="rounded-[3px] border border-line bg-surface p-7">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">Our Own Product</span>
              <h3 className="mt-2 text-[19px]">Ecoo Nuts &amp; Spices (our brand)</h3>
              <p className="mt-2 text-muted">Sourced, packed and sold by us directly — a higher-margin category we offer alongside standard multi-brand FMCG distribution.</p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <section className="bg-accent py-16 text-center text-invert md:py-20">
        <Container>
          <h2 className="text-invert text-[clamp(24px,3.4vw,34px)]">Not sure which service fits your business?</h2>
          <p className="mx-auto mt-3 max-w-[560px] text-invert/90">Tell us what you&apos;re trying to solve and we&apos;ll point you to the right one — or tell you honestly if we can&apos;t help yet.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="outlineInvert">Talk To Us</Button>
            <Button href="/we-serve" variant="outlineInvert">See Who We Serve →</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
