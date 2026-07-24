import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { Clock, Package, ReceiptText, UserCheck, Smartphone, ShieldAlert, Eye, Repeat, Headset, Check, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Container, Section, Eyebrow, Button } from "@/components/primitives";
import PageHero from "@/components/PageHero";
import { deliveryPromise } from "@/content/site";

export const metadata: Metadata = {
  title: "For Kirana Stores | FMCG Wholesale Chennai",
  description: "How Ecoo Basket solves the real problems Chennai kirana store owners face with FMCG distributors — reliability, pricing and direct accountability.",
  alternates: { canonical: "/kirana" },
};

const issues: { n: string; t: string; lead: string; fix: string; Icon: LucideIcon }[] = [
  { n: "ISSUE 01", t: "Delivery windows nobody keeps", lead: "Salesmen promise a day, the truck shows up whenever.", fix: "route-planned delivery with a WhatsApp update if something's delayed — not silence.", Icon: Clock },
  { n: "ISSUE 02", t: "Minimum orders too high for a small shop", lead: "You're forced to over-stock just to qualify for an order.", fix: "flexible order sizes that match what you actually sell.", Icon: Package },
  { n: "ISSUE 03", t: "Messy or missing GST invoices", lead: "Handwritten slips that cause problems at filing time.", fix: "a clean, GST-compliant invoice on every single order.", Icon: ReceiptText },
  { n: "ISSUE 04", t: "A different salesman every time", lead: "No one who actually knows your shop or remembers last week's issue.", fix: "one direct account contact per partner, order after order.", Icon: UserCheck },
  { n: "ISSUE 05", t: "Reordering means chasing someone by phone", lead: "Calling around, hoping someone picks up.", fix: "reorder through our digital ordering platform whenever you need to.", Icon: Smartphone },
  { n: "ISSUE 06", t: "Damage or shortage claims go nowhere", lead: "You report a problem and never hear back.", fix: "claims are tracked and followed up on directly by your account contact.", Icon: ShieldAlert },
];

const trust: { k: string; t: string; d: string; Icon: LucideIcon }[] = [
  { k: "A", t: "Transparency", d: "Real pricing, real invoices, no hidden terms.", Icon: Eye },
  { k: "B", t: "Consistency", d: "The delivery window we quote is the one we aim to hit — every time, not just the first time.", Icon: Repeat },
  { k: "C", t: "Accessibility", d: "A real person you can reach, not a call centre queue.", Icon: Headset },
];

export default function KiranaPage() {
  return (
    <>
      <PageHero
        eyebrow="For Kirana & General Trade"
        title="The problems every kirana owner knows — and how we actually fix them."
        subtitle="Not a sales pitch. Just the specific things that go wrong with distributors, and what we do differently."
      >
        <Button href="/contact" variant="solidInvert">Talk To Us About Your Shop</Button>
      </PageHero>

      {/* Delivery promise — slate */}
      <Section tone="dark">
        <Container className="grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <Eyebrow onDark>Delivery Promise for Kirana Stores</Eyebrow>
            <h2 className="mt-3 text-invert text-[clamp(24px,3.2vw,34px)]">{deliveryPromise.heading}</h2>
            <p className="mt-4 text-white/80">{deliveryPromise.body}</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {deliveryPromise.cards.map((c, i) => (
              <Reveal key={c.k} delay={i * 0.08} className="rounded-2xl border border-white/12 bg-white/[0.04] p-6">
                <span className="font-mono text-[11px] text-dark-accent">{c.k}</span>
                <h3 className="mt-2 text-[17px] text-invert">{c.t}</h3>
                <p className="mt-2 text-[14px] text-white/80">{c.d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Problem & fix */}
      <Section>
        <Container>
          <Reveal className="max-w-[640px]">
            <Eyebrow>Problem &amp; Fix</Eyebrow>
            <h2 className="mt-3 text-[clamp(24px,3.2vw,34px)]">What usually goes wrong — and our actual answer.</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {issues.map((s, i) => (
              <Reveal key={s.n} delay={(i % 2) * 0.06} className="group rounded-2xl border border-line bg-surface p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-strong/40 hover:shadow-soft-lg">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-mint to-mint2 text-accent"><s.Icon size={23} strokeWidth={1.8} /></span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-line group-hover:text-accent-strong/50">{s.n}</span>
                </div>
                <h3 className="mt-5 text-[18px]">{s.t}</h3>
                <p className="mt-2 text-[14.5px] text-muted">{s.lead}</p>
                <p className="mt-3 flex gap-2 rounded-xl bg-mint/70 p-3 text-[14px] text-ink">
                  <Check size={17} className="mt-0.5 flex-none text-accent" />
                  <span><strong className="text-accent">Our fix:</strong> {s.fix}</span>
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* How we build trust — slate */}
      <Section tone="dark">
        <Container>
          <Reveal className="max-w-[640px]">
            <Eyebrow onDark>How We Build Trust</Eyebrow>
            <h2 className="mt-3 text-invert text-[clamp(24px,3.2vw,34px)]">Three things we hold ourselves to.</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {trust.map((t, i) => (
              <Reveal key={t.k} delay={i * 0.06} className="rounded-2xl border border-white/12 bg-white/[0.04] p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#4ADE80]"><t.Icon size={23} strokeWidth={1.8} /></span>
                <h3 className="mt-5 text-[18px] text-invert">{t.t}</h3>
                <p className="mt-2 text-[14px] text-white/80">{t.d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* To be upfront */}
      <Section tone="surface">
        <Container>
          <Reveal className="mx-auto max-w-[760px] rounded-3xl border border-gold-bright/30 bg-gold-soft/50 p-8 md:p-12">
            <Eyebrow>To Be Upfront</Eyebrow>
            <h2 className="mt-3 text-[clamp(24px,3.2vw,34px)]">What we ask from you too.</h2>
            <p className="mt-4 text-muted">Trust runs both ways. We ask for consistent order patterns where possible, timely payment per agreed terms, and honest feedback when something&apos;s wrong — that&apos;s what lets us actually plan routes and hold delivery windows instead of guessing.</p>
          </Reveal>
        </Container>
      </Section>

      {/* CTA */}
      <section className="forest-grad relative overflow-hidden py-16 text-center text-invert md:py-24">
        <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(60% 120% at 50% -10%, rgba(255,255,255,0.14), transparent 60%)" }} />
        <Container className="relative">
          <h2 className="text-invert text-[clamp(24px,3.4vw,38px)]">Want to see if we cover your area?</h2>
          <p className="mx-auto mt-3 max-w-[560px] text-white/85">Tell us where your shop is and what you currently stock — we&apos;ll tell you honestly whether we&apos;re a fit today.</p>
          <div className="mt-8 flex justify-center"><Button href="/contact" variant="solidInvert">Get In Touch <ArrowRight size={16} /></Button></div>
        </Container>
      </section>
    </>
  );
}
