import Image from "next/image";
import Reveal from "@/components/Reveal";
import ManufacturerSlider from "@/components/ManufacturerSlider";
import ProcessTimeline from "@/components/ProcessTimeline";
import { Container, Section, Eyebrow, Button } from "@/components/primitives";
import { deliveryPromise, fmcgCategories, site } from "@/content/site";

const whyChoose = [
  { t: "Focused Distribution", d: "Timely delivery to supermarkets, grocery stores, hotels, restaurants, bakeries and institutions across Chennai." },
  { t: "Reliable Warehousing", d: "Organised storage with stock rotation, so products move before they age out." },
  { t: "Clean GST Invoicing", d: "A GST-compliant invoice on every order, reconciled and traceable end to end." },
  { t: "Direct Relationships", d: "A real account contact, not a call centre — most partners deal with the same person every week." },
  { t: "Competitive Pricing", d: "Strategic sourcing and operational efficiency keep pricing competitive." },
  { t: "Own-Brand Margin", d: "Our Nuts & Spices line gives retailers a higher-margin category alongside standard FMCG." },
];

export default function Home() {
  return (
    <>
      {/* HERO — asymmetric split, real photography */}
      <section className="border-b border-line bg-base">
        <Container className="grid items-center gap-10 py-14 md:grid-cols-12 md:py-20">
          <div className="md:col-span-6">
            <Eyebrow>{site.tagline}</Eyebrow>
            <h1 className="mt-4 text-[clamp(34px,5.2vw,58px)]">
              The route from manufacturer&nbsp;shelf to retailer&nbsp;shelf, run properly.
            </h1>
            <p className="mt-5 max-w-[560px] text-muted">
              {site.legalName} moves multi-brand FMCG and our own Nuts &amp; Spices line from warehouse to kirana shop,
              supermarket and institution — on schedule, on invoice, on WhatsApp when you need us. Order online anytime at{" "}
              <strong className="text-ink">Ecoo Basket</strong> (ecoobasket.com).
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={site.orderUrl} external variant="green">Order Now →</Button>
              <Button href="/services" variant="outline">See What We Move →</Button>
            </div>
          </div>
          <div className="md:col-span-6">
            {/* CONTENT NEEDED: real warehouse hero photography (current image is generic/AI-style) */}
            <div className="overflow-hidden rounded-[4px] border border-line">
              <Image
                src="/assets/images/warehouse/01_Warehouse_Logistics.jpg"
                alt="Ecoo Basket warehouse operations, Vanagaram, Chennai"
                width={1536} height={864}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
              Warehouse floor · Vanagaram, Chennai · photo pending real shoot
            </p>
          </div>
        </Container>
      </section>

      {/* DELIVERY PROMISE — dark punctuation band */}
      <Section tone="dark">
        <Container className="grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <Eyebrow onDark>{deliveryPromise.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-invert text-[clamp(24px,3.2vw,34px)]">{deliveryPromise.heading}</h2>
            <p className="mt-4 text-invert/80">{deliveryPromise.body}</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {deliveryPromise.cards.map((c, i) => (
              <Reveal key={c.k} delay={i * 0.08} className="rounded-[3px] border border-[rgba(251,250,247,0.18)] p-6">
                <span className="font-mono text-[11px] tracking-[0.08em] text-dark-accent">{c.k}</span>
                <h3 className="mt-2 text-[17px] text-invert">{c.t}</h3>
                <p className="mt-2 text-[14px] text-invert/80">{c.d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* MANUFACTURER SLIDER */}
      <Section tone="surface" className="py-12 md:py-14">
        <Container>
          <p className="mb-6 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            We distribute for established FMCG manufacturers
          </p>
          <ManufacturerSlider />
        </Container>
      </Section>

      {/* WHY CHOOSE — icon cards, staggered not a flat 3×2 */}
      <Section>
        <Container>
          <Reveal className="max-w-[640px]">
            <Eyebrow>Why Ecoo Basket</Eyebrow>
            <h2 className="mt-3 text-[clamp(26px,3.4vw,38px)]">The competitive edge that sets us apart.</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((w, i) => (
              <Reveal key={w.t} delay={(i % 3) * 0.06} className={`rounded-[3px] border border-line bg-surface p-7 ${i % 5 === 0 ? "lg:row-span-1" : ""}`}>
                <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-[2px] bg-accent-strong/12 font-mono text-[13px] font-semibold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-[18px]">{w.t}</h3>
                <p className="mt-2 text-[14.5px] text-muted">{w.d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* PROCESS TIMELINE — horizontal rail */}
      <Section tone="surface">
        <Container>
          <Reveal className="max-w-[640px]">
            <Eyebrow>How We Deliver</Eyebrow>
            <h2 className="mt-3 text-[clamp(26px,3.4vw,38px)]">Manufacturer to reorder, one accountable chain.</h2>
          </Reveal>
          <div className="mt-10"><ProcessTimeline /></div>
        </Container>
      </Section>

      {/* PREMIUM LINE — split */}
      <Section>
        <Container className="grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <Eyebrow>Our Premium Line</Eyebrow>
            <h2 className="mt-3 text-[clamp(24px,3.2vw,34px)]">Ecoo Nuts &amp; Spices — our own brand.</h2>
            <p className="mt-4 text-muted">
              Not a reseller line. We source it, pack it and price it ourselves — a higher-margin category that sits
              alongside the multi-brand FMCG we distribute, without compromising on quality.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={site.orderUrl} external variant="green">Order Nuts &amp; Spices online →</Button>
              <Button href="/services" variant="outline">See categories →</Button>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="overflow-hidden rounded-[4px] border border-line">
            <Image src="/assets/images/products/05_Premium_Dry_Fruits.jpg" alt="Ecoo Basket own-brand nuts, dry fruits and spices" width={1536} height={1024} className="h-full w-full object-cover" />
          </Reveal>
        </Container>
      </Section>

      {/* CTA */}
      <section className="bg-accent py-16 text-center text-invert md:py-20">
        <Container>
          <h2 className="text-invert text-[clamp(24px,3.4vw,34px)]">Ready to see if we deliver to your shop?</h2>
          <p className="mx-auto mt-3 max-w-[560px] text-invert/90">
            Tell us your area and order pattern — we&apos;ll tell you honestly whether we&apos;re a fit today or on the roadmap.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="outlineInvert">Get In Touch</Button>
            <Button href="/partner" variant="outlineInvert">Become a Partner</Button>
          </div>
        </Container>
      </section>

      {/* Category quick-strip (FMCG 6) */}
      <Section tone="surface" className="py-12">
        <Container>
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">FMCG categories we distribute</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {fmcgCategories.map((c) => (
              <div key={c} className="rounded-[3px] border border-line bg-base px-4 py-5 text-center text-[14px] font-medium">{c}</div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
