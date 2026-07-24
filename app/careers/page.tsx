import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { Target, ShieldCheck, Sprout, Send, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Container, Section, Eyebrow, Button } from "@/components/primitives";
import PageHero from "@/components/PageHero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Careers | Ecoo Basket Chennai",
  description: "Careers at Ecoo Basket, a B2B FMCG distributor in Chennai — a small, founder-led team building reliable retail distribution.",
  alternates: { canonical: "/careers" },
};

const culture: { t: string; d: string; Icon: LucideIcon }[] = [
  { t: "Real ownership", d: "Small team, direct responsibility — your work reaches the shelf, not a slide deck.", Icon: Target },
  { t: "Honest operating", d: "We hold ourselves to accurate numbers and dependable delivery windows.", Icon: ShieldCheck },
  { t: "Grow with the network", d: "As coverage expands zone by zone, so does the scope of every role.", Icon: Sprout },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build the distribution network Chennai actually relies on."
        subtitle="We're an emerging, founder-led team — roles are added as the network grows."
      />

      {/* Why work here */}
      <Section>
        <Container>
          <Reveal className="max-w-[640px]">
            <Eyebrow>Why Work Here</Eyebrow>
            <h2 className="mt-3 text-[clamp(24px,3.2vw,34px)]">A small team doing real distribution work.</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {culture.map((c, i) => (
              <Reveal key={c.t} delay={i * 0.06} className="rounded-2xl border border-line bg-surface p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-strong/40 hover:shadow-soft-lg">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-mint to-mint2 text-accent"><c.Icon size={23} strokeWidth={1.8} /></span>
                <h3 className="mt-5 text-[18px]">{c.t}</h3>
                <p className="mt-2 text-muted">{c.d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Open roles */}
      {/* CONTENT NEEDED: real open-role listings (title, location, description, how to apply) when hiring */}
      <Section tone="surface">
        <Container>
          <Reveal className="mx-auto max-w-[760px] rounded-3xl border border-line bg-base p-8 text-center shadow-soft md:p-12">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-mint to-mint2 text-accent"><Send size={26} strokeWidth={1.8} /></span>
            <div className="mt-6"><Eyebrow>Open Roles</Eyebrow></div>
            <h2 className="mt-3 text-[clamp(23px,3.2vw,32px)]">No public openings right now — but we&apos;re always listening.</h2>
            <p className="mx-auto mt-4 max-w-[520px] text-muted">
              We add roles as the network grows. If you&apos;re excited about building reliable FMCG distribution in Chennai,
              introduce yourself and we&apos;ll keep you in mind for the right opening.
            </p>
            <div className="mt-7 flex justify-center"><Button href={`mailto:${site.email}?subject=Careers%20enquiry`} external variant="primary">Introduce Yourself <ArrowRight size={16} /></Button></div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
