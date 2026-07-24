import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  ReceiptText, Clock, Cpu, Truck, Boxes, Users, ClipboardList, Workflow, Smartphone,
  MessageCircle, MapPin, PackageCheck, ShieldCheck, IndianRupee, UserCheck, FileCheck,
  Route, Building2, ArrowRight, Plus,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import ManufacturerSlider from "@/components/ManufacturerSlider";
import DistributionWorkflow from "@/components/DistributionWorkflow";
import Testimonials from "@/components/Testimonials";
import NetworkViz from "@/components/NetworkViz";
import { Container, Section, Eyebrow, Button } from "@/components/primitives";
import { site } from "@/content/site";

const features: { t: string; Icon: LucideIcon }[] = [
  { t: "GST Compliant", Icon: ReceiptText },
  { t: "24–48 Hour Delivery", Icon: Clock },
  { t: "Technology Enabled", Icon: Cpu },
  { t: "Direct Store Delivery", Icon: Truck },
];

const services: { t: string; d: string; Icon: LucideIcon }[] = [
  { t: "Wholesale Distribution", d: "Multi-brand FMCG supplied in bulk to kirana stores, general trade and modern trade with flexible order quantities.", Icon: Boxes },
  { t: "Direct Store Delivery", d: "Route-planned delivery direct to the storefront, keeping delivery windows consistent across our coverage area.", Icon: Truck },
  { t: "Retail Partnership", d: "A growing network of retail partners with direct relationships and one accountable account contact.", Icon: Users },
  { t: "Inventory Management", d: "Stock tracking that flags what's low before a retailer runs out, and what's slow before it becomes dead stock.", Icon: ClipboardList },
  { t: "Supply Chain Management", d: "We manage the handoffs between sourcing, warehousing and last-mile so nothing stalls between steps.", Icon: Workflow },
  { t: "Digital Ordering", d: "Reorder any time through our B2B digital ordering platform, with GST-compliant invoicing on every order.", Icon: Smartphone },
];

const whyChoose: { t: string; d: string; Icon: LucideIcon }[] = [
  { t: "Direct Store Delivery", d: "Products delivered straight to the storefront on planned routes.", Icon: Truck },
  { t: "Technology Enabled", d: "Digital ordering, route planning and inventory visibility.", Icon: Cpu },
  { t: "Multi Brand Distribution", d: "Trusted FMCG brands plus our own Nuts & Spices line.", Icon: Boxes },
  { t: "GST Compliant", d: "A clean, GST-compliant invoice on every single order.", Icon: ReceiptText },
  { t: "WhatsApp Ordering", d: "Reach a real person and reorder over WhatsApp.", Icon: MessageCircle },
  { t: "Chennai Distribution Network", d: "Reliable coverage across Chennai, expanding zone by zone.", Icon: MapPin },
];

const whyTrust: { t: string; d: string; Icon: LucideIcon }[] = [
  { t: "Reliable Delivery", d: "The delivery window we quote is the one we aim to hit — every time.", Icon: PackageCheck },
  { t: "Quality Assurance", d: "Organised storage with stock rotation, so products move before they age out.", Icon: ShieldCheck },
  { t: "Competitive Pricing", d: "Strategic sourcing and operational efficiency keep pricing sharp.", Icon: IndianRupee },
  { t: "Professional Team", d: "A founder-led team with years across HUL, Reliance Retail and BigBasket.", Icon: UserCheck },
  { t: "Technology Driven", d: "Digital ordering, reorder signals and clean data across the chain.", Icon: Cpu },
  { t: "Compliance First", d: "GST, licensing and regulatory basics kept current as we grow.", Icon: FileCheck },
];

const products = [
  { name: "Beverages", img: "/assets/images/products/beverages.webp.jpg" },
  { name: "Biscuits", img: "/assets/images/products/biscuits-snacks.webp.jpg" },
  { name: "Snacks", img: "/assets/images/products/biscuits-snacks.webp.jpg" },
  { name: "Staples", img: "/assets/images/products/staples.webp.jpg" },
  { name: "Home Care", img: "/assets/images/products/home-care.webp.jpg" },
  { name: "Personal Care", img: "/assets/images/products/personal-care.webp.jpg" },
  { name: "Stationery", img: "/assets/images/products/stationery.webp.jpg" },
  { name: "Ecoo Nuts & Spices", img: "/assets/images/products/05_Premium_Dry_Fruits.jpg" },
];

const faqs = [
  { q: "How do I place an order?", a: "Order through our B2B digital platform at ecoobasket.com, or by phone, WhatsApp or the contact form — we'll set you up with a dedicated account contact." },
  { q: "What are your delivery timelines?", a: "Same-day dispatch with 24–48 hour delivery across Chennai. Any single order above ₹10,000 delivers free anywhere in Chennai." },
  { q: "What payment terms do you offer?", a: "Payment terms are agreed at the time of order, and every order comes with a clean, GST-compliant invoice." },
  { q: "Do you provide GST invoices?", a: "Yes — a GST-compliant invoice on every single order, reconciled and traceable end to end." },
  { q: "How are damaged or incorrect items handled?", a: "Report damaged, defective or wrong items at delivery or within a reasonable window with your invoice details, and we'll arrange a replacement, credit or refund." },
];

function Chip({ Icon }: { Icon: LucideIcon }) {
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-mint to-mint2 text-accent">
      <Icon size={23} strokeWidth={1.8} />
    </span>
  );
}

export default function Home() {
  const orgLd = {
    "@context": "https://schema.org", "@type": "Organization",
    name: site.brand, legalName: site.legalName, url: site.domain,
    logo: `${site.domain}/assets/images/logo/08_Logo_Full_Primary.png`,
    email: site.email, telephone: "+91-93423-58226",
    sameAs: [site.social.facebook, site.social.instagram],
  };
  const localLd = {
    "@context": "https://schema.org", "@type": "LocalBusiness",
    name: site.brand, legalName: site.legalName, url: site.domain,
    image: `${site.domain}/assets/images/logo/06_Logo_Brand_Banner.png`,
    description: "Technology-enabled B2B FMCG distribution and own-brand Nuts & Spices, headquartered in Chennai, Tamil Nadu.",
    telephone: "+91-93423-58226", email: site.email,
    address: { "@type": "PostalAddress", streetAddress: "Sf. No. 215 Pt No. 120, Sh No. 5, Rajesh Garden Main Road, Vanagaram, Poonamallee, Tiruvallur", addressLocality: "Chennai", addressRegion: "Tamil Nadu", postalCode: "600095", addressCountry: "IN" },
    areaServed: "Chennai", openingHours: "Mo-Sa 09:00-18:00",
    sameAs: [site.social.facebook, site.social.instagram],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localLd) }} />

      {/* 1. HERO */}
      <section className="relative overflow-hidden bg-base">
        <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full bg-accent-strong/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-24 h-[440px] w-[440px] rounded-full bg-navy/5 blur-3xl" />
        <Container className="grid items-center gap-14 py-20 md:grid-cols-2 md:py-28">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent shadow-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-strong" /> FMCG Distribution · Chennai, India
            </span>
            <h1 className="mt-6 text-[clamp(38px,5.4vw,64px)] leading-[1.03]">
              Powering India&apos;s <span className="bg-gradient-to-r from-accent to-navy bg-clip-text text-transparent">Retail Supply Chain</span>
            </h1>
            <p className="mt-6 max-w-[560px] text-[clamp(16px,1.5vw,19px)] leading-relaxed text-muted">
              Technology-enabled FMCG distribution delivering trusted brands from warehouse to retailer with reliable logistics, transparent pricing, and dedicated customer support.
            </p>
            <div className="mt-9 flex flex-wrap gap-3.5">
              <Button href="#services" variant="primary">Explore Services <ArrowRight size={17} /></Button>
              <Button href="/contact" variant="outline">Contact Sales</Button>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="relative">
            <div className="relative aspect-[4/4.3] overflow-hidden rounded-[28px] border border-line shadow-soft-lg">
              {/* CONTENT NEEDED: original high-res warehouse/logistics photo */}
              <Image src="/assets/images/warehouse/01_Warehouse_Logistics.jpg" alt="Ecoo Basket warehouse and logistics operations in Chennai" fill priority sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,30,54,0.3)] to-transparent" />
            </div>
            <div className="anim-float absolute -left-4 top-8 hidden items-center gap-3 rounded-2xl glass p-3.5 shadow-soft sm:-left-6 md:flex">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-strong/12 text-accent"><ReceiptText size={19} /></span>
              <div><div className="text-[13px] font-bold leading-tight text-ink">GST Compliant</div><div className="text-[11px] text-muted">Every order</div></div>
            </div>
            <div className="anim-float absolute -right-3 bottom-10 hidden items-center gap-3 rounded-2xl glass p-3.5 shadow-soft sm:-right-6 md:flex" style={{ animationDelay: "1.4s" }}>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-soft text-navy"><Truck size={19} /></span>
              <div><div className="text-[13px] font-bold leading-tight text-ink">Direct Store Delivery</div><div className="text-[11px] text-muted">24–48h in Chennai</div></div>
            </div>
          </Reveal>
        </Container>

        {/* floating feature bar */}
        <Container className="pb-16">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.t} className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4 shadow-soft">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-mint to-mint2 text-accent"><f.Icon size={20} strokeWidth={1.8} /></span>
                <span className="text-[14px] font-semibold text-ink">{f.t}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 2. TRUSTED MANUFACTURERS */}
      <Section tone="surface" className="py-12 md:py-14">
        <Container>
          <p className="mb-7 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Trusted to distribute for leading FMCG manufacturers</p>
          <ManufacturerSlider />
        </Container>
      </Section>

      {/* 3. ABOUT */}
      <Section id="about">
        <Container className="grid items-center gap-14 md:grid-cols-2">
          <Reveal>
            <Eyebrow>About Ecoo Basket</Eyebrow>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,44px)]">Technology-enabled FMCG Distribution Built for Reliability</h2>
            <p className="mt-5 text-muted">Ecoo Basket connects manufacturers to retailers across Chennai — moving multi-brand FMCG and our own Nuts &amp; Spices line from warehouse to shelf on schedule, on invoice, and with a real person accountable for every order.</p>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2">
              {[["Route Planning", Route], ["Inventory Visibility", ClipboardList], ["GST Billing", ReceiptText], ["Dedicated Support", UserCheck]].map(([t, Ic]) => {
                const I = Ic as LucideIcon;
                return (
                  <li key={t as string} className="flex items-center gap-3">
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-mint text-accent"><I size={19} strokeWidth={1.8} /></span>
                    <span className="text-[15px] font-semibold text-ink">{t as string}</span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-8"><Button href="/about" variant="primary">More about us <ArrowRight size={17} /></Button></div>
          </Reveal>
          <Reveal delay={0.1} className="relative aspect-[5/4.4] overflow-hidden rounded-3xl border border-line shadow-soft-lg">
            {/* CONTENT NEEDED: original facility / operations photo */}
            <Image src="/assets/images/services/03_Supply_Chain_Network.jpg" alt="Ecoo Basket supply chain operations" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
          </Reveal>
        </Container>
      </Section>

      {/* 4. SERVICES */}
      <Section tone="surface" id="services">
        <Container>
          <Reveal className="mx-auto max-w-[680px] text-center">
            <Eyebrow>What We Offer</Eyebrow>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,44px)]">Full-stack FMCG distribution services</h2>
            <p className="mt-4 text-muted">From a manufacturer&apos;s dock to a retailer&apos;s shelf — one accountable point of contact for each partner.</p>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.t} delay={(i % 3) * 0.06} className="group rounded-2xl border border-line bg-base p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-strong/40 hover:shadow-soft-lg">
                <Chip Icon={s.Icon} />
                <h3 className="mt-5 text-[19px] tracking-[-0.01em]">{s.t}</h3>
                <p className="mt-2.5 text-[14.5px] text-muted">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. WHY CHOOSE ECOO BASKET (replaces statistics) */}
      <Section>
        <Container>
          <Reveal className="mx-auto max-w-[680px] text-center">
            <Eyebrow>Why Choose Ecoo Basket</Eyebrow>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,44px)]">Built for retailers who need reliability</h2>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((w, i) => (
              <Reveal key={w.t} delay={(i % 3) * 0.06} className="group rounded-2xl border border-line bg-surface p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-strong/40 hover:shadow-soft-lg">
                <Chip Icon={w.Icon} />
                <h3 className="mt-5 text-[18px]">{w.t}</h3>
                <p className="mt-2 text-[14.5px] text-muted">{w.d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 6. DISTRIBUTION WORKFLOW */}
      <Section tone="surface">
        <Container>
          <Reveal className="mx-auto max-w-[680px] text-center">
            <Eyebrow>How We Deliver</Eyebrow>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,44px)]">Manufacturer to reorder, one accountable chain</h2>
          </Reveal>
          <DistributionWorkflow />
        </Container>
      </Section>

      {/* 7. PRODUCT CATEGORIES */}
      <Section>
        <Container>
          <Reveal className="mx-auto max-w-[680px] text-center">
            <Eyebrow>Product Categories</Eyebrow>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,44px)]">Everyday categories, dependable supply</h2>
            <p className="mt-4 text-muted">The FMCG categories we move across our retail network. Shown for reference — not a full catalogue.</p>
          </Reveal>
          {/* CONTENT NEEDED: uniform original product photography (some categories share a placeholder) */}
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((p, i) => (
              <Reveal key={p.name} delay={(i % 4) * 0.05} className="group overflow-hidden rounded-2xl border border-line bg-surface shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={p.img} alt={`${p.name} — FMCG category distributed by Ecoo Basket`} fill sizes="(max-width:640px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.06]" />
                </div>
                <div className="px-5 py-4"><h3 className="text-[16px]">{p.name}</h3></div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 8. WHY PARTNERS TRUST US */}
      <Section tone="surface">
        <Container>
          <Reveal className="mx-auto max-w-[680px] text-center">
            <Eyebrow>Why Partners Trust Us</Eyebrow>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,44px)]">Built on reliability, not promises</h2>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyTrust.map((t, i) => (
              <Reveal key={t.t} delay={(i % 3) * 0.05} className="flex items-start gap-4 rounded-2xl border border-line bg-base p-6 transition-all duration-300 hover:border-accent-strong/40 hover:shadow-soft">
                <Chip Icon={t.Icon} />
                <div><h3 className="text-[16.5px]">{t.t}</h3><p className="mt-1.5 text-[14px] text-muted">{t.d}</p></div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 9. CHENNAI DISTRIBUTION NETWORK */}
      <Section>
        <Container className="grid items-center gap-14 md:grid-cols-2">
          <Reveal>
            <Eyebrow>Chennai Distribution Network</Eyebrow>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,44px)]">Chennai operations, expanding across Tamil Nadu</h2>
            <p className="mt-5 text-muted">We onboard retailers zone by zone rather than spreading thin — so delivery reliability doesn&apos;t slip as the network grows. Every route runs from our Chennai hub to warehouses, kirana stores, supermarkets, pharmacies, HORECA and wholesale partners.</p>
            <div className="mt-8 flex flex-wrap gap-8">
              {[["Chennai", "Live operations"], ["24–48h", "Delivery window"], ["Zone-by-zone", "Expansion roadmap"]].map(([b, s]) => (
                <div key={b}><div className="text-[24px] font-extrabold tracking-[-0.02em] text-accent">{b}</div><div className="text-[12.5px] text-muted">{s}</div></div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}><NetworkViz /></Reveal>
        </Container>
      </Section>

      {/* 10. TESTIMONIALS */}
      <Section tone="surface">
        <Container>
          <Reveal className="mx-auto max-w-[680px] text-center">
            <Eyebrow>Retail Partners</Eyebrow>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,44px)]">What partners say</h2>
          </Reveal>
          <Testimonials />
        </Container>
      </Section>

      {/* 11. FAQ */}
      <Section>
        <Container>
          <Reveal className="mx-auto max-w-[680px] text-center">
            <Eyebrow>Questions &amp; Answers</Eyebrow>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,44px)]">Frequently asked questions</h2>
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-[820px] gap-4">
            {faqs.map((f, i) => (
              <details key={f.q} className="group rounded-2xl border border-line bg-surface p-6 shadow-soft transition-colors open:border-accent-strong/40 sm:p-7" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-semibold text-ink">
                  {f.q}
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-mint text-accent transition-transform duration-300 group-open:rotate-45"><Plus size={18} /></span>
                </summary>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      {/* 12. CONTACT CTA */}
      <section className="forest-grad relative overflow-hidden py-20 text-center text-invert md:py-28">
        <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(60% 120% at 50% -10%, rgba(255,255,255,0.14), transparent 60%)" }} />
        <Container className="relative">
          <Reveal>
            <h2 className="text-invert text-[clamp(30px,4vw,52px)]">Ready to Grow Your Retail Business?</h2>
            <p className="mx-auto mt-4 max-w-[560px] text-[17px] text-white/85">Tell us your area and order pattern — we&apos;ll tell you honestly whether we&apos;re a fit today or on the roadmap, and get you set up.</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3.5">
              <Button href="/contact" variant="solidInvert">Become Retail Partner</Button>
              <Button href="/contact" variant="outlineInvert">Contact Sales</Button>
              <Button href={site.whatsapp} external variant="outlineInvert"><MessageCircle size={17} /> WhatsApp</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
