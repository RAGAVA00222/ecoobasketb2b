import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { Smartphone, Map, MapPinned, TrendingUp, Clock, FileCheck, ShieldCheck, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Container, Section, Eyebrow, Button } from "@/components/primitives";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Our Vision | FMCG Distribution Chennai",
  description: "The roadmap for Ecoo Basket's growth across Chennai and Tamil Nadu.",
  alternates: { canonical: "/vision" },
};

const phases: { n: string; t: string; d: string; Icon: LucideIcon }[] = [
  { n: "Phase 01", t: "Digital Foundation", d: "Get the basics right: digital ordering, GST-compliant invoicing, and reliable delivery across our current Chennai coverage — the phase we're in now.", Icon: Smartphone },
  { n: "Phase 02", t: "Zone-by-Zone Expansion", d: "Grow our Chennai footprint area by area, adding retailers without letting delivery reliability slip.", Icon: Map },
  { n: "Phase 03", t: "Tamil Nadu Coverage", d: "Extend distribution beyond Chennai to other Tamil Nadu markets, using what we learn locally first.", Icon: MapPinned },
  { n: "Phase 04", t: "Category & Partner Growth", d: "Deepen the own-brand Nuts & Spices line and grow our supplier partner base as the network matures.", Icon: TrendingUp },
];

const principles: { k: string; t: string; d: string; Icon: LucideIcon }[] = [
  { k: "A", t: "Delivery Consistency", d: "We won't add new areas faster than we can serve them reliably.", Icon: Clock },
  { k: "B", t: "Honest Reporting", d: "Partners and retailers get accurate numbers, not optimistic rounding.", Icon: FileCheck },
  { k: "C", t: "Compliance First", d: "GST, licensing and regulatory basics stay current before we chase new markets.", Icon: ShieldCheck },
];

export default function VisionPage() {
  return (
    <>
      <PageHero
        eyebrow="The Road Ahead"
        title="Where we're headed — and how we plan to get there."
        subtitle="This is a roadmap, not a promise. We'd rather show you the plan honestly than dress it up as done."
      />

      {/* Roadmap — numbered timeline */}
      <Section>
        <Container>
          <Reveal className="max-w-[640px]">
            <Eyebrow>Our Roadmap</Eyebrow>
            <h2 className="mt-3 text-[clamp(24px,3.2vw,34px)]">Four phases, built in order.</h2>
          </Reveal>
          <div className="relative mt-14">
            <div aria-hidden className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-line to-transparent md:block" />
            <ol className="grid gap-y-10 sm:grid-cols-2 md:grid-cols-4 md:gap-x-5">
              {phases.map((p, i) => (
                <li key={p.n} className="relative flex flex-col items-start">
                  <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-surface text-accent shadow-soft">
                    <p.Icon size={23} strokeWidth={1.8} />
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-invert">{i + 1}</span>
                  </span>
                  <div className="mt-4 font-mono text-[12px] text-accent">{p.n}</div>
                  <h3 className="mt-1 text-[18px]">{p.t}</h3>
                  <p className="mt-2 text-[14px] text-muted">{p.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* Principles — slate */}
      <Section tone="dark">
        <Container>
          <Reveal className="max-w-[640px]">
            <Eyebrow onDark>Where We Won&apos;t Cut Corners</Eyebrow>
            <h2 className="mt-3 text-invert text-[clamp(24px,3.2vw,34px)]">Growth on our terms, not at the expense of reliability.</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.k} delay={i * 0.06} className="rounded-2xl border border-white/12 bg-white/[0.04] p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#4ADE80]"><p.Icon size={23} strokeWidth={1.8} /></span>
                <h3 className="mt-5 text-[18px] text-invert">{p.t}</h3>
                <p className="mt-2 text-[14px] text-white/80">{p.d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <section className="forest-grad relative overflow-hidden py-16 text-center text-invert md:py-24">
        <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(60% 120% at 50% -10%, rgba(255,255,255,0.14), transparent 60%)" }} />
        <Container className="relative">
          <h2 className="text-invert text-[clamp(24px,3.4vw,38px)]">Want to build toward this with us?</h2>
          <p className="mx-auto mt-3 max-w-[560px] text-white/85">Whether as a retail partner, supplier, or investor — we&apos;re glad to talk about where this is headed.</p>
          <div className="mt-8 flex justify-center"><Button href="/contact" variant="solidInvert">Join The Conversation <ArrowRight size={16} /></Button></div>
        </Container>
      </section>
    </>
  );
}
