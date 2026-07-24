import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { Container, Section, Eyebrow, Button } from "@/components/primitives";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Founders | B2B FMCG Distributor in Chennai",
  description: "Meet the founding team behind Ecoo Basket, a B2B FMCG distribution company headquartered in Vanagaram, Chennai.",
  alternates: { canonical: "/founders" },
};

const people = [
  {
    name: "Nagaraj Nirmala Devi",
    role: "Founder & Managing Director",
    img: "/assets/images/founders/FOUNDER_NIRMALA%20DEVI%20NAGARAJ.JPG.jpeg",
    quote: "Our aim is a supply ecosystem where every retailer, no matter how small, has access to quality products at fair prices.",
  },
  {
    name: "Sri Keerthana Devi C",
    role: "Co-Founder & Director",
    img: "/assets/images/founders/CO%20FOUNDER_SRI%20KEERTHANA%20DEVI%20CHAKARAVARTH.JPG.jpeg",
    quote: "Connecting manufacturers with retailers well is what creates real value at every point in the supply chain.",
  },
  {
    name: "Ragavendren Chakaravarthi",
    role: "Chief Strategy Officer",
    img: "/assets/images/founders/CSO-RAGAVENDREN%20CHAKARAVARTHI_.JPG.jpeg",
    quote: "Strategy without execution is a dream. We combine a clear plan with disciplined day-to-day execution.",
    bio: "Twelve years in B2B retail — across HUL, Reliance Retail (Area Manager) and BigBasket, plus a prior co-founder/COO role at a wholesale distribution venture — before founding Ecoo Basket.",
  },
];

const values = [
  { t: "Integrity", d: "Transparent dealings in every transaction, including the uncomfortable ones." },
  { t: "Reliability", d: "A promised delivery window is a commitment, not a suggestion." },
  { t: "Customer First", d: "Retailer success is how we measure our own." },
  { t: "Honest Growth", d: "We'd rather understate our reach than overstate it." },
];

export default function FoundersPage() {
  return (
    <>
      <section className="border-b border-line bg-base">
        <Container className="py-14 md:py-20">
          <Eyebrow>Leadership</Eyebrow>
          <h1 className="mt-4 text-[clamp(30px,4.6vw,46px)]">The people behind Ecoo Basket.</h1>
          <p className="mt-5 max-w-[620px] text-muted">A small founding team, deliberately — each with a distinct, accountable role.</p>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {people.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08} as="article" className="overflow-hidden rounded-[4px] border border-line bg-surface">
                <div className="aspect-[4/3] bg-base">
                  <Image src={p.img} alt={`${p.name}, ${p.role}`} width={1120} height={1450} className="h-full w-full object-cover object-top" />
                </div>
                <div className="p-6">
                  <h3 className="text-[18px]">{p.name}</h3>
                  <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.06em] text-accent">{p.role}</span>
                  <p className="mt-3 text-[14px] italic text-muted">&ldquo;{p.quote}&rdquo;</p>
                  {p.bio && <p className="mt-3 text-[13.5px] text-muted">{p.bio}</p>}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="dark">
        <Container>
          <blockquote className="mx-auto max-w-[760px] border-l-2 border-dark-accent pl-6 font-display text-[20px] leading-[1.55] text-invert">
            We believe the future of retail distribution sits at the intersection of technology, trust, and consistent follow-through. Our leadership brings together experience across FMCG, logistics, and retail operations — and we&apos;re building deliberately, not chasing scale before we&apos;ve earned it.
            <cite className="mt-4 block font-mono text-[12px] not-italic text-dark-accent">— Founding Team, {site.legalName}</cite>
          </blockquote>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <Reveal className="max-w-[640px]">
            <Eyebrow>What We Stand For</Eyebrow>
            <h2 className="mt-3 text-[clamp(24px,3.2vw,32px)]">Values that guide how we operate.</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={(i % 4) * 0.05} className="rounded-[3px] border border-line bg-base p-6">
                <h3 className="text-[18px]">{v.t}</h3>
                <p className="mt-2 text-[13.5px] text-muted">{v.d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <section className="bg-accent py-16 text-center text-invert md:py-20">
        <Container>
          <h2 className="text-invert text-[clamp(24px,3.4vw,34px)]">Want to talk to the team directly?</h2>
          <p className="mx-auto mt-3 max-w-[560px] text-invert/90">We&apos;re a small, reachable leadership team — get in touch and you&apos;ll hear from us, not a script.</p>
          <div className="mt-7 flex justify-center"><Button href="/contact" variant="outlineInvert">Connect With Us</Button></div>
        </Container>
      </section>
    </>
  );
}
