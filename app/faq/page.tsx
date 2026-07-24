import type { Metadata } from "next";
import { Container, Section, Eyebrow, Button } from "@/components/primitives";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "FAQ | B2B FMCG Wholesale in Chennai",
  description: "Frequently asked questions about Ecoo Basket — delivery areas, wholesale ordering, delivery times, and B2B/B2C options in Chennai.",
  alternates: { canonical: "/faq" },
};

const faqs = [
  { q: "What areas do you deliver to?", a: "We're headquartered in Vanagaram, Chennai, and currently serve retailers across our Chennai coverage area. We're expanding zone by zone across Chennai and, over time, the wider Tamil Nadu market — area by area, so delivery reliability doesn't slip as we grow." },
  { q: "What's your delivery time?", a: "Same-day dispatch with 24–48 hour delivery across Chennai. Any single order above ₹10,000 delivers free anywhere in Chennai." },
  { q: "How do I place a wholesale order?", a: "You can order online through our B2B digital ordering platform at ecoobasket.com, or reach us by phone, WhatsApp, or the contact form and we'll set you up. Every order comes with a clean, GST-compliant invoice." },
  { q: "Do you offer both B2B and B2C ordering?", a: "Yes. Our core business is B2B FMCG distribution to kirana stores, general trade, pharmacies, wholesale outlets and HORECA businesses. Separately, online B2C ordering is available at ecoobasket.com." },
  { q: "What products do you distribute?", a: "Multi-brand FMCG across everyday categories — beverages, biscuits & snacks, staples & groceries, home care, personal care and stationery — plus our own-brand Nuts & Spices line." },
  { q: "Who do you currently serve?", a: "Our core base today is Chennai's neighbourhood retail: kirana & general trade, pharmacies, and wholesale outlets. On our roadmap are supermarkets, HORECA (hotels, restaurants & catering), corporate offices and institutions." },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Questions & Answers"
        title="Frequently asked questions."
        subtitle="Straight answers to the things retailers and suppliers ask us most."
      />

      <Section tone="surface">
        <Container>
          <div className="mx-auto max-w-[820px]">
            {faqs.map((f, i) => (
              <details key={f.q} className="group border-b border-line py-5" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[18px] font-medium text-ink">
                  {f.q}
                  <span className="font-mono text-accent transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      <section className="bg-accent py-16 text-center text-invert md:py-20">
        <Container>
          <h2 className="text-invert text-[clamp(24px,3.4vw,34px)]">Didn&apos;t find your answer?</h2>
          <p className="mx-auto mt-3 max-w-[560px] text-invert/90">Ask us directly — we reply within one business day, usually sooner.</p>
          <div className="mt-7 flex justify-center"><Button href="/contact" variant="outlineInvert">Get In Touch</Button></div>
        </Container>
      </section>
    </>
  );
}
