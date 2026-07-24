import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Placeholder from "@/components/Placeholder";
import { Container, Section, Eyebrow, Button } from "@/components/primitives";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Careers | Ecoo Basket Chennai",
  description: "Careers at Ecoo Basket, a B2B FMCG distributor in Chennai.",
  alternates: { canonical: "/careers" },
};

// CONTENT NEEDED: careers culture copy (placeholder values below).
const culture = [
  { t: "Real ownership", d: "Small team, direct responsibility — your work reaches the shelf, not a slide deck." },
  { t: "Honest operating", d: "We hold ourselves to accurate numbers and dependable delivery windows." },
  { t: "Grow with the network", d: "As coverage expands zone by zone, so does the scope of every role." },
];

export default function CareersPage() {
  return (
    <>
      <section className="border-b border-line bg-base">
        <Container className="py-14 md:py-20">
          <Eyebrow>Careers</Eyebrow>
          <h1 className="mt-4 max-w-[860px] text-[clamp(30px,4.6vw,46px)]">Build the distribution network Chennai actually relies on.</h1>
          <p className="mt-5 max-w-[620px] text-muted">We&apos;re an emerging, founder-led team — roles are added as the network grows.</p>
        </Container>
      </section>

      {/* CONTENT NEEDED: careers culture / "why work here" copy */}
      <Section>
        <Container>
          <Reveal className="max-w-[640px]">
            <Eyebrow>Why Work Here</Eyebrow>
            <h2 className="mt-3 text-[clamp(24px,3.2vw,32px)]">A small team doing real distribution work.</h2>
            <div className="mt-4"><Placeholder label="culture copy" /></div>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {culture.map((c, i) => (
              <Reveal key={c.t} delay={i * 0.06} className="rounded-[3px] border border-line bg-surface p-7">
                <h3 className="text-[18px]">{c.t}</h3>
                <p className="mt-2 text-muted">{c.d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* CONTENT NEEDED: careers open-roles list (none confirmed yet) */}
      <Section tone="surface">
        <Container>
          <Reveal className="max-w-[640px]"><Eyebrow>Open Roles</Eyebrow><h2 className="mt-3 text-[clamp(24px,3.2vw,32px)]">Current openings.</h2></Reveal>
          <div className="mt-8 rounded-[4px] border border-dashed border-line bg-base p-8">
            <Placeholder label="open roles list" />
            <p className="mt-3 text-muted">
              No public openings are listed yet. Real role listings (title, location, description, how to apply) will
              appear here. In the meantime, introduce yourself and we&apos;ll keep you in mind.
            </p>
            <div className="mt-6"><Button href={`mailto:${site.email}?subject=Careers%20enquiry`} external variant="green">Introduce Yourself →</Button></div>
          </div>
        </Container>
      </Section>
    </>
  );
}
