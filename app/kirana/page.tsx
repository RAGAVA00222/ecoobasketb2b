import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { Container, Section, Eyebrow, Button } from "@/components/primitives";
import { deliveryPromise, site } from "@/content/site";

export const metadata: Metadata = {
  title: "For Kirana Stores | FMCG Wholesale Chennai",
  description: "How Ecoo Basket solves the real problems Chennai kirana store owners face with FMCG distributors — reliability, pricing and direct accountability.",
  alternates: { canonical: "/kirana" },
};

const issues = [
  { n: "ISSUE 01", t: "Delivery windows nobody keeps", lead: "Salesmen promise a day, the truck shows up whenever.", fix: "route-planned delivery with a WhatsApp update if something's delayed — not silence." },
  { n: "ISSUE 02", t: "Minimum orders too high for a small shop", lead: "You're forced to over-stock just to qualify for an order.", fix: "flexible order sizes that match what you actually sell." },
  { n: "ISSUE 03", t: "Messy or missing GST invoices", lead: "Handwritten slips that cause problems at filing time.", fix: "a clean, GST-compliant invoice on every single order." },
  { n: "ISSUE 04", t: "A different salesman every time", lead: "No one who actually knows your shop or remembers last week's issue.", fix: "one direct account contact per partner, order after order." },
  { n: "ISSUE 05", t: "Reordering means chasing someone by phone", lead: "Calling around, hoping someone picks up.", fix: "reorder through our digital ordering platform whenever you need to." },
  { n: "ISSUE 06", t: "Damage or shortage claims go nowhere", lead: "You report a problem and never hear back.", fix: "claims are tracked and followed up on directly by your account contact." },
];

const trust = [
  { k: "A", t: "Transparency", d: "Real pricing, real invoices, no hidden terms." },
  { k: "B", t: "Consistency", d: "The delivery window we quote is the one we aim to hit — every time, not just the first time." },
  { k: "C", t: "Accessibility", d: "A real person you can reach, not a call centre queue." },
];

export default function KiranaPage() {
  return (
    <>
      <section className="border-b border-line bg-base">
        <Container className="py-14 md:py-20">
          <Eyebrow>For Kirana &amp; General Trade</Eyebrow>
          <h1 className="mt-4 max-w-[860px] text-[clamp(30px,4.6vw,46px)]">The problems every kirana owner knows — and how we actually fix them.</h1>
          <p className="mt-5 max-w-[620px] text-muted">Not a sales pitch. Just the specific things that go wrong with distributors, and what we do differently.</p>
          <div className="mt-8"><Button href="/contact" variant="green">Talk To Us About Your Shop</Button></div>
        </Container>
      </section>

      <Section tone="dark">
        <Container className="grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <Eyebrow onDark>Delivery Promise for Kirana Stores</Eyebrow>
            <h2 className="mt-3 text-invert text-[clamp(24px,3.2vw,32px)]">{deliveryPromise.heading}</h2>
            <p className="mt-4 text-invert/80">{deliveryPromise.body}</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {deliveryPromise.cards.map((c, i) => (
              <Reveal key={c.k} delay={i * 0.08} className="rounded-[3px] border border-[rgba(251,250,247,0.18)] p-6">
                <span className="font-mono text-[11px] text-dark-accent">{c.k}</span>
                <h3 className="mt-2 text-[17px] text-invert">{c.t}</h3>
                <p className="mt-2 text-[14px] text-invert/80">{c.d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal className="max-w-[640px]">
            <Eyebrow>Problem &amp; Fix</Eyebrow>
            <h2 className="mt-3 text-[clamp(24px,3.2vw,32px)]">What usually goes wrong — and our actual answer.</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {issues.map((s, i) => (
              <Reveal key={s.n} delay={(i % 2) * 0.06} className="rounded-[3px] border border-line bg-surface p-7">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">{s.n}</span>
                <h3 className="mt-2 text-[18px]">{s.t}</h3>
                <p className="mt-2 text-muted">{s.lead} <strong className="text-ink">Our fix:</strong> {s.fix}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="dark">
        <Container>
          <Reveal className="max-w-[640px]">
            <Eyebrow onDark>How We Build Trust</Eyebrow>
            <h2 className="mt-3 text-invert text-[clamp(24px,3.2vw,32px)]">Three things we hold ourselves to.</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {trust.map((t, i) => (
              <Reveal key={t.k} delay={i * 0.06} className="rounded-[3px] border border-[rgba(251,250,247,0.18)] p-6">
                <span className="font-mono text-[11px] text-dark-accent">{t.k}</span>
                <h3 className="mt-2 text-[18px] text-invert">{t.t}</h3>
                <p className="mt-2 text-[14px] text-invert/80">{t.d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <div className="max-w-[720px]">
            <Eyebrow>To Be Upfront</Eyebrow>
            <h2 className="mt-3 text-[clamp(24px,3.2vw,32px)]">What we ask from you too.</h2>
            <p className="mt-4 text-muted">Trust runs both ways. We ask for consistent order patterns where possible, timely payment per agreed terms, and honest feedback when something&apos;s wrong — that&apos;s what lets us actually plan routes and hold delivery windows instead of guessing.</p>
          </div>
        </Container>
      </Section>

      <section className="bg-accent py-16 text-center text-invert md:py-20">
        <Container>
          <h2 className="text-invert text-[clamp(24px,3.4vw,34px)]">Want to see if we cover your area?</h2>
          <p className="mx-auto mt-3 max-w-[560px] text-invert/90">Tell us where your shop is and what you currently stock — we&apos;ll tell you honestly whether we&apos;re a fit today.</p>
          <div className="mt-7 flex justify-center"><Button href="/contact" variant="outlineInvert">Get In Touch</Button></div>
        </Container>
      </section>
    </>
  );
}
