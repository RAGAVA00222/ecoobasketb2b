import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import TamilNaduMap from "@/components/TamilNaduMap";
import { Container, Section, Eyebrow, Button } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Industries We Serve | FMCG Wholesale Chennai",
  description: "The retail sectors Ecoo Basket serves across Chennai today and where our coverage is expanding.",
  alternates: { canonical: "/we-serve" },
};

const servingNow = [
  { t: "Kirana & General Trade", d: "The largest share of our retail partners — neighbourhood stores that need dependable, regular delivery over flashy minimums." },
  { t: "Pharmacies", d: "Retail pharmacies stocking FMCG and personal care alongside their core inventory." },
  { t: "Wholesale Outlets", d: "Wholesale and semi-wholesale traders who buy in volume and redistribute locally." },
];

const expanding = [
  { t: "Supermarkets", d: "Modern trade outlets, as our volume capacity grows." },
  { t: "HORECA (Hotels, Restaurants & Catering)", d: "Hospitality and catering partners needing consistent FMCG supply — Now Delivery available, free above ₹10,000." },
  { t: "Corporate Offices", d: "Workplace pantry and hygiene essentials." },
  { t: "Institutions", d: "Schools, hospitals and similar bulk buyers, evaluated case by case." },
];

export default function WeServePage() {
  return (
    <>
      <section className="border-b border-line bg-base">
        <Container className="py-14 md:py-20">
          <Eyebrow>Our Reach</Eyebrow>
          <h1 className="mt-4 text-[clamp(30px,4.6vw,46px)]">Who we serve today, and where we&apos;re headed.</h1>
          <p className="mt-5 max-w-[620px] text-muted">We&apos;d rather be precise about our current base than list every sector we might reach someday.</p>
        </Container>
      </section>

      <Section>
        <Container>
          <Reveal className="max-w-[640px]">
            <Eyebrow>Serving Now</Eyebrow>
            <h2 className="mt-3 text-[clamp(24px,3.2vw,32px)]">Our core base is Chennai&apos;s neighbourhood retail.</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {servingNow.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.06} className="rounded-[3px] border border-line bg-surface p-7">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">Core</span>
                <h3 className="mt-2 text-[19px]">{s.t}</h3>
                <p className="mt-2 text-muted">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <Reveal className="max-w-[640px]">
            <Eyebrow>Expanding Toward</Eyebrow>
            <h2 className="mt-3 text-[clamp(24px,3.2vw,32px)]">Sectors on our roadmap, not yet our core base.</h2>
            <p className="mt-3 text-muted">We&apos;re building toward these — we won&apos;t claim to serve them at scale before we actually do.</p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {expanding.map((s, i) => (
              <Reveal key={s.t} delay={(i % 4) * 0.05} className="rounded-[3px] border border-line bg-base p-6">
                <h3 className="text-[17px]">{s.t}</h3>
                <p className="mt-2 text-[13.5px] text-muted">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="dark">
        <Container>
          <Reveal className="max-w-[640px]">
            <Eyebrow onDark>Coverage Approach</Eyebrow>
            <h2 className="mt-3 text-invert text-[clamp(24px,3.2vw,32px)]">We grow area by area, not all at once.</h2>
            <p className="mt-4 text-invert/80">Rather than spreading thin across Chennai, we onboard retailers zone by zone — so delivery reliability doesn&apos;t slip as we add partners. If we&apos;re not in your area yet, tell us and we&apos;ll let you know honestly where you sit on the expansion plan.</p>
          </Reveal>
          <div className="mt-8 rounded-[4px] bg-base p-5 text-ink md:p-7">
            <TamilNaduMap />
          </div>
          <div className="mt-7"><Button href="/contact" variant="outlineInvert">Check Your Area →</Button></div>
        </Container>
      </Section>

      <section className="bg-accent py-16 text-center text-invert md:py-20">
        <Container>
          <h2 className="text-invert text-[clamp(24px,3.4vw,34px)]">Is your business on this list?</h2>
          <p className="mx-auto mt-3 max-w-[560px] text-invert/90">Reach out and we&apos;ll tell you plainly whether we can serve you today or what timeline to expect.</p>
          <div className="mt-7 flex justify-center"><Button href="/contact" variant="outlineInvert">Talk To Us</Button></div>
        </Container>
      </section>
    </>
  );
}
