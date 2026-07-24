import type { Metadata } from "next";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { ShieldCheck, Clock, HeartHandshake, Sprout, Quote, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Container, Section, Eyebrow, Button } from "@/components/primitives";
import PageHero from "@/components/PageHero";
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

const values: { t: string; d: string; Icon: LucideIcon }[] = [
  { t: "Integrity", d: "Transparent dealings in every transaction, including the uncomfortable ones.", Icon: ShieldCheck },
  { t: "Reliability", d: "A promised delivery window is a commitment, not a suggestion.", Icon: Clock },
  { t: "Customer First", d: "Retailer success is how we measure our own.", Icon: HeartHandshake },
  { t: "Honest Growth", d: "We'd rather understate our reach than overstate it.", Icon: Sprout },
];

export default function FoundersPage() {
  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title="The people behind Ecoo Basket."
        subtitle="A small founding team, deliberately — each with a distinct, accountable role."
      />

      {/* People */}
      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {people.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08} as="article" className="group overflow-hidden rounded-3xl border border-line bg-surface shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg">
                <div className="relative aspect-[4/3] overflow-hidden bg-base">
                  <Image src={p.img} alt={`${p.name}, ${p.role}`} width={1120} height={1450} className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]" />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-[18.5px]">{p.name}</h3>
                  <span className="mt-1 inline-block rounded-full bg-mint px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.06em] text-accent">{p.role}</span>
                  <p className="mt-4 text-[14px] italic leading-relaxed text-muted">&ldquo;{p.quote}&rdquo;</p>
                  {p.bio && <p className="mt-3 border-t border-line pt-3 text-[13.5px] text-muted">{p.bio}</p>}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Founding team quote — slate */}
      <Section tone="dark">
        <Container>
          <Reveal className="mx-auto max-w-[820px] text-center">
            <Quote size={44} className="mx-auto text-[#4ADE80]/40" />
            <blockquote className="mt-4 font-display text-[clamp(19px,2.3vw,26px)] font-semibold leading-[1.45] tracking-[-0.01em] text-invert">
              We believe the future of retail distribution sits at the intersection of technology, trust, and consistent follow-through. Our leadership brings together experience across FMCG, logistics, and retail operations — and we&apos;re building deliberately, not chasing scale before we&apos;ve earned it.
            </blockquote>
            <cite className="mt-6 block font-mono text-[12px] not-italic text-dark-accent">— Founding Team, {site.legalName}</cite>
          </Reveal>
        </Container>
      </Section>

      {/* Values */}
      <Section tone="surface">
        <Container>
          <Reveal className="max-w-[640px]">
            <Eyebrow>What We Stand For</Eyebrow>
            <h2 className="mt-3 text-[clamp(24px,3.2vw,34px)]">Values that guide how we operate.</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={(i % 4) * 0.05} className="rounded-2xl border border-line bg-base p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-strong/40 hover:shadow-soft-lg">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-mint to-mint2 text-accent"><v.Icon size={23} strokeWidth={1.8} /></span>
                <h3 className="mt-5 text-[18px]">{v.t}</h3>
                <p className="mt-2 text-[13.5px] text-muted">{v.d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <section className="forest-grad relative overflow-hidden py-16 text-center text-invert md:py-24">
        <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(60% 120% at 50% -10%, rgba(255,255,255,0.14), transparent 60%)" }} />
        <Container className="relative">
          <h2 className="text-invert text-[clamp(24px,3.4vw,38px)]">Want to talk to the team directly?</h2>
          <p className="mx-auto mt-3 max-w-[560px] text-white/85">We&apos;re a small, reachable leadership team — get in touch and you&apos;ll hear from us, not a script.</p>
          <div className="mt-8 flex justify-center"><Button href="/contact" variant="solidInvert">Connect With Us <ArrowRight size={16} /></Button></div>
        </Container>
      </section>
    </>
  );
}
