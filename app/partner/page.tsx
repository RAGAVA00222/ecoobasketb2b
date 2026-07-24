import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { Container, Section, Eyebrow, Button } from "@/components/primitives";

export const metadata: Metadata = {
  title: "FMCG Supplier Partnership in Chennai",
  description: "Partner with Ecoo Basket — distribution access, warehouse capacity and digital ordering for FMCG brands across Chennai.",
  alternates: { canonical: "/partner" },
};

const benefits = [
  { n: "01", t: "Distribution Access", d: "Immediate access to our growing retail network across Chennai, without building relationships from scratch." },
  { n: "02", t: "Reliable Delivery", d: "Route-planned delivery so your products reach shelves within a predictable window, order after order." },
  { n: "03", t: "Warehouse Capacity", d: "Storage space for your inventory with basic stock visibility, so you're not guessing at what's on hand." },
  { n: "04", t: "Digital Ordering", d: "Our digital ordering platform gives retailers an easy way to reorder your products — and gives you visibility into demand." },
  { n: "05", t: "Direct Market Feedback", d: "Honest, ground-level feedback from retailers on pricing, packaging and demand — not a filtered report." },
  { n: "06", t: "Long-Term Relationship", d: "We're building for repeat partnerships, not one-off deals — regular check-ins as both businesses grow." },
];

const steps = [
  { n: "Step 01", t: "Connect With Us", d: "Reach out by form, phone, or WhatsApp. We respond within one business day to understand your product and goals." },
  { n: "Step 02", t: "Agreement & Onboarding", d: "We finalise terms, sign agreements, and set you up on our digital ordering platform with a dedicated contact." },
  { n: "Step 03", t: "Product Integration", d: "Your catalogue is added to our system, inventory is received at our warehouse, and your products go live to retailers." },
  { n: "Step 04", t: "Growth & Expansion", d: "Regular reviews and shared market intelligence as we grow your retail reach together." },
];

export default function PartnerPage() {
  return (
    <>
      <section className="border-b border-line bg-base">
        <Container className="py-14 md:py-20">
          <Eyebrow>Grow Together</Eyebrow>
          <h1 className="mt-4 max-w-[860px] text-[clamp(30px,4.6vw,46px)]">Partner with a distributor still small enough to answer the phone.</h1>
          <p className="mt-5 max-w-[620px] text-muted">We&apos;re an emerging network, not a national giant — which means your brand gets real attention, not a line item.</p>
          <div className="mt-8"><Button href="/contact" variant="green">Start a Partnership →</Button></div>
        </Container>
      </section>

      <Section>
        <Container className="max-w-[820px]">
          <Reveal>
            <Eyebrow>Why Partner With Us</Eyebrow>
            <h2 className="mt-3 text-[clamp(24px,3.2vw,32px)]">Your growth is genuinely our mission — we only scale by helping partners sell more.</h2>
            <p className="mt-4 text-muted">Whether you&apos;re an established FMCG manufacturer looking for a reliable Chennai foothold, or an emerging brand trying to reach retailers you can&apos;t get to alone, we bring distribution infrastructure, direct retailer relationships, and honest reporting on how your products are actually moving.</p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <Reveal className="max-w-[640px]"><Eyebrow>Partner Benefits</Eyebrow><h2 className="mt-3 text-[clamp(24px,3.2vw,32px)]">What you gain when you join our network.</h2></Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <Reveal key={b.n} delay={(i % 3) * 0.05} className="rounded-[3px] border border-line bg-base p-7">
                <span className="font-mono text-[13px] font-semibold text-accent">{b.n}</span>
                <h3 className="mt-3 text-[19px]">{b.t}</h3>
                <p className="mt-2 text-[14.5px] text-muted">{b.d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="dark">
        <Container>
          <Reveal className="max-w-[640px]"><Eyebrow onDark>How It Works</Eyebrow><h2 className="mt-3 text-invert text-[clamp(24px,3.2vw,32px)]">Four steps, no unnecessary paperwork.</h2></Reveal>
          <ol className="mt-10 grid gap-6 md:grid-cols-4">
            {steps.map((s) => (
              <li key={s.n} className="border-t-2 border-[rgba(251,250,247,0.2)] pt-5">
                <div className="font-mono text-[12px] text-dark-accent">{s.n}</div>
                <h3 className="mt-1 text-[18px] text-invert">{s.t}</h3>
                <p className="mt-2 text-[14px] text-invert/80">{s.d}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <section className="bg-accent py-16 text-center text-invert md:py-20">
        <Container>
          <h2 className="text-invert text-[clamp(24px,3.4vw,34px)]">Ready to grow with us?</h2>
          <p className="mx-auto mt-3 max-w-[560px] text-invert/90">Join a partner network built on honest numbers and real relationships — not inflated claims.</p>
          <div className="mt-7 flex justify-center"><Button href="/contact" variant="outlineInvert">Start a Partnership →</Button></div>
        </Container>
      </section>
    </>
  );
}
