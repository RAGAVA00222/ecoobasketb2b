import type { Metadata } from "next";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { Share2, Truck, Warehouse, Smartphone, MessageSquare, Handshake, PhoneCall, FileSignature, PackagePlus, TrendingUp, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Container, Section, Eyebrow, Button } from "@/components/primitives";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "FMCG Supplier Partnership in Chennai",
  description: "Partner with Ecoo Basket — distribution access, warehouse capacity and digital ordering for FMCG brands across Chennai.",
  alternates: { canonical: "/partner" },
};

const benefits: { n: string; t: string; d: string; Icon: LucideIcon }[] = [
  { n: "01", t: "Distribution Access", d: "Immediate access to our growing retail network across Chennai, without building relationships from scratch.", Icon: Share2 },
  { n: "02", t: "Reliable Delivery", d: "Route-planned delivery so your products reach shelves within a predictable window, order after order.", Icon: Truck },
  { n: "03", t: "Warehouse Capacity", d: "Storage space for your inventory with basic stock visibility, so you're not guessing at what's on hand.", Icon: Warehouse },
  { n: "04", t: "Digital Ordering", d: "Our digital ordering platform gives retailers an easy way to reorder your products — and gives you visibility into demand.", Icon: Smartphone },
  { n: "05", t: "Direct Market Feedback", d: "Honest, ground-level feedback from retailers on pricing, packaging and demand — not a filtered report.", Icon: MessageSquare },
  { n: "06", t: "Long-Term Relationship", d: "We're building for repeat partnerships, not one-off deals — regular check-ins as both businesses grow.", Icon: Handshake },
];

const steps: { n: string; t: string; d: string; Icon: LucideIcon }[] = [
  { n: "Step 01", t: "Connect With Us", d: "Reach out by form, phone, or WhatsApp. We respond within one business day to understand your product and goals.", Icon: PhoneCall },
  { n: "Step 02", t: "Agreement & Onboarding", d: "We finalise terms, sign agreements, and set you up on our digital ordering platform with a dedicated contact.", Icon: FileSignature },
  { n: "Step 03", t: "Product Integration", d: "Your catalogue is added to our system, inventory is received at our warehouse, and your products go live to retailers.", Icon: PackagePlus },
  { n: "Step 04", t: "Growth & Expansion", d: "Regular reviews and shared market intelligence as we grow your retail reach together.", Icon: TrendingUp },
];

export default function PartnerPage() {
  return (
    <>
      <PageHero
        eyebrow="Grow Together"
        title="Partner with a distributor still small enough to answer the phone."
        subtitle="We're an emerging network, not a national giant — which means your brand gets real attention, not a line item."
      >
        <Button href="/contact" variant="solidInvert">Start a Partnership <ArrowRight size={16} /></Button>
      </PageHero>

      {/* Why partner — image split */}
      <Section>
        <Container className="grid items-center gap-14 md:grid-cols-2">
          <Reveal>
            <Eyebrow>Why Partner With Us</Eyebrow>
            <h2 className="mt-3 text-[clamp(24px,3.2vw,34px)]">Your growth is genuinely our mission — we only scale by helping partners sell more.</h2>
            <p className="mt-5 text-muted">Whether you&apos;re an established FMCG manufacturer looking for a reliable Chennai foothold, or an emerging brand trying to reach retailers you can&apos;t get to alone, we bring distribution infrastructure, direct retailer relationships, and honest reporting on how your products are actually moving.</p>
            <div className="mt-8"><Button href="/contact" variant="primary">Talk to partnerships <ArrowRight size={17} /></Button></div>
          </Reveal>
          <Reveal delay={0.1} className="relative aspect-[5/4.2] overflow-hidden rounded-3xl border border-line shadow-soft-lg">
            <Image src="/assets/images/services/04_Retail_Partner.jpg" alt="Ecoo Basket retail partners in Chennai" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
          </Reveal>
        </Container>
      </Section>

      {/* Benefits */}
      <Section tone="surface">
        <Container>
          <Reveal className="max-w-[640px]"><Eyebrow>Partner Benefits</Eyebrow><h2 className="mt-3 text-[clamp(24px,3.2vw,34px)]">What you gain when you join our network.</h2></Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <Reveal key={b.n} delay={(i % 3) * 0.05} className="group relative rounded-2xl border border-line bg-base p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-strong/40 hover:shadow-soft-lg">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-mint to-mint2 text-accent"><b.Icon size={23} strokeWidth={1.8} /></span>
                <span className="absolute right-6 top-7 font-mono text-[12px] font-semibold text-line group-hover:text-accent-strong/40">{b.n}</span>
                <h3 className="mt-5 text-[19px]">{b.t}</h3>
                <p className="mt-2 text-[14.5px] text-muted">{b.d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* How it works — slate numbered timeline */}
      <Section tone="dark">
        <Container>
          <Reveal className="max-w-[640px]"><Eyebrow onDark>How It Works</Eyebrow><h2 className="mt-3 text-invert text-[clamp(24px,3.2vw,34px)]">Four steps, no unnecessary paperwork.</h2></Reveal>
          <div className="relative mt-14">
            <div aria-hidden className="absolute left-0 right-0 top-7 hidden h-px bg-white/15 md:block" />
            <ol className="grid gap-y-10 sm:grid-cols-2 md:grid-cols-4 md:gap-x-5">
              {steps.map((s, i) => (
                <li key={s.n} className="relative flex flex-col items-start">
                  <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-[#0B1220] text-[#4ADE80] shadow-soft">
                    <s.Icon size={23} strokeWidth={1.8} />
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent-strong text-[10px] font-bold text-white">{i + 1}</span>
                  </span>
                  <div className="mt-4 font-mono text-[12px] text-dark-accent">{s.n}</div>
                  <h3 className="mt-1 text-[18px] text-invert">{s.t}</h3>
                  <p className="mt-2 text-[14px] text-white/80">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <section className="forest-grad relative overflow-hidden py-16 text-center text-invert md:py-24">
        <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(60% 120% at 50% -10%, rgba(255,255,255,0.14), transparent 60%)" }} />
        <Container className="relative">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12"><Handshake size={24} /></div>
          <h2 className="text-invert text-[clamp(24px,3.4vw,38px)]">Ready to grow with us?</h2>
          <p className="mx-auto mt-3 max-w-[560px] text-white/85">Join a partner network built on honest numbers and real relationships — not inflated claims.</p>
          <div className="mt-8 flex justify-center"><Button href="/contact" variant="solidInvert">Start a Partnership <ArrowRight size={16} /></Button></div>
        </Container>
      </section>
    </>
  );
}
