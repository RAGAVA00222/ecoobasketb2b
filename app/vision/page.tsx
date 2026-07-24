import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { Container, Section, Eyebrow, Button } from "@/components/primitives";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Our Vision | FMCG Distribution Chennai",
  description: "The roadmap for Ecoo Basket's growth across Chennai and Tamil Nadu.",
  alternates: { canonical: "/vision" },
};

const phases = [
  { n: "Phase 01", t: "Digital Foundation", d: "Get the basics right: digital ordering, GST-compliant invoicing, and reliable delivery across our current Chennai coverage — the phase we're in now." },
  { n: "Phase 02", t: "Zone-by-Zone Expansion", d: "Grow our Chennai footprint area by area, adding retailers without letting delivery reliability slip." },
  { n: "Phase 03", t: "Tamil Nadu Coverage", d: "Extend distribution beyond Chennai to other Tamil Nadu markets, using what we learn locally first." },
  { n: "Phase 04", t: "Category & Partner Growth", d: "Deepen the own-brand Nuts & Spices line and grow our supplier partner base as the network matures." },
];

const principles = [
  { k: "A", t: "Delivery Consistency", d: "We won't add new areas faster than we can serve them reliably." },
  { k: "B", t: "Honest Reporting", d: "Partners and retailers get accurate numbers, not optimistic rounding." },
  { k: "C", t: "Compliance First", d: "GST, licensing and regulatory basics stay current before we chase new markets." },
];

export default function VisionPage() {
  return (
    <>
      <PageHero
        eyebrow="The Road Ahead"
        title="Where we're headed — and how we plan to get there."
        subtitle="This is a roadmap, not a promise. We'd rather show you the plan honestly than dress it up as done."
      />

      <Section>
        <Container>
          <Reveal className="max-w-[640px]">
            <Eyebrow>Our Roadmap</Eyebrow>
            <h2 className="mt-3 text-[clamp(24px,3.2vw,32px)]">Four phases, built in order.</h2>
          </Reveal>
          <ol className="mt-10 flex flex-col md:flex-row">
            {phases.map((p, i) => (
              <li key={p.n} className="relative flex-1 border-l-2 border-dashed border-line pb-8 pl-8 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pr-6 md:pt-6">
                <span className="absolute left-[-7px] top-1 h-3 w-3 rounded-full bg-accent-strong ring-4 ring-base md:left-0 md:top-[-7px]" />
                <div className="font-mono text-[12px] text-accent">{p.n}</div>
                <h3 className="mt-1 text-[18px]">{p.t}</h3>
                <p className="mt-2 max-w-[240px] text-[14px] text-muted">{p.d}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="dark">
        <Container>
          <Reveal className="max-w-[640px]">
            <Eyebrow onDark>Where We Won&apos;t Cut Corners</Eyebrow>
            <h2 className="mt-3 text-invert text-[clamp(24px,3.2vw,32px)]">Growth on our terms, not at the expense of reliability.</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.k} delay={i * 0.06} className="rounded-[3px] border border-[rgba(251,250,247,0.18)] p-6">
                <span className="font-mono text-[11px] text-dark-accent">{p.k}</span>
                <h3 className="mt-2 text-[18px] text-invert">{p.t}</h3>
                <p className="mt-2 text-[14px] text-invert/80">{p.d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <section className="bg-accent py-16 text-center text-invert md:py-20">
        <Container>
          <h2 className="text-invert text-[clamp(24px,3.4vw,34px)]">Want to build toward this with us?</h2>
          <p className="mx-auto mt-3 max-w-[560px] text-invert/90">Whether as a retail partner, supplier, or investor — we&apos;re glad to talk about where this is headed.</p>
          <div className="mt-7 flex justify-center"><Button href="/contact" variant="outlineInvert">Join The Conversation</Button></div>
        </Container>
      </section>
    </>
  );
}
