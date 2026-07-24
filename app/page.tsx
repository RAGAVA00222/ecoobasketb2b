import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  Boxes, Truck, Workflow, Users, MonitorSmartphone, ClipboardList,
  Zap, IndianRupee, LayoutGrid, ShieldCheck, Headset, Cpu,
  ReceiptText, Clock, Smartphone, UserCheck, PackageCheck, FileCheck,
  Factory, Warehouse, Route, Store, RotateCw, TrendingUp, ArrowRight,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import Stats from "@/components/Stats";
import NetworkViz from "@/components/NetworkViz";
import ManufacturerSlider from "@/components/ManufacturerSlider";
import { Container, Section, Eyebrow, Button } from "@/components/primitives";
import { site } from "@/content/site";

const services: { t: string; d: string; Icon: LucideIcon }[] = [
  { t: "FMCG Wholesale Distribution", d: "Multi-brand FMCG supplied to kirana stores, general trade and modern trade with flexible order quantities.", Icon: Boxes },
  { t: "Direct Store Delivery (DSD)", d: "Route-planned delivery direct to the storefront, keeping delivery windows consistent across the coverage area.", Icon: Truck },
  { t: "Supply Chain Management", d: "We manage the handoffs between sourcing, warehousing and last-mile so nothing stalls between steps.", Icon: Workflow },
  { t: "Retail Partner Network", d: "A growing network of retail partners with direct relationships — most deal with the same account contact weekly.", Icon: Users },
  { t: "Technology Enabled Distribution", d: "Digital ordering, GST-compliant invoicing and data on how products actually move through the network.", Icon: MonitorSmartphone },
  { t: "Inventory Management", d: "Stock tracking that flags what's low before a retailer runs out — and what's slow before it becomes dead stock.", Icon: ClipboardList },
];

const whyChoose: { t: string; d: string; Icon: LucideIcon }[] = [
  { t: "Fast Delivery", d: "Same-day dispatch with 24–48h delivery across our Chennai coverage area.", Icon: Zap },
  { t: "Competitive Pricing", d: "Strategic sourcing and operational efficiency keep pricing sharp for partners.", Icon: IndianRupee },
  { t: "Wide Product Range", d: "Multi-brand FMCG across everyday categories, plus our own Nuts & Spices line.", Icon: LayoutGrid },
  { t: "Quality Assurance", d: "Organised storage with stock rotation, so products move before they age out.", Icon: ShieldCheck },
  { t: "Dedicated Support", d: "A real account contact per partner — not a call-centre queue.", Icon: Headset },
  { t: "Technology Driven Operations", d: "Digital ordering, reorder signals and clean data across the distribution chain.", Icon: Cpu },
];

const trust: { t: string; d: string; Icon: LucideIcon }[] = [
  { t: "Clean GST Billing", d: "A GST-compliant invoice on every order, reconciled and traceable.", Icon: ReceiptText },
  { t: "On-Time Delivery", d: "The delivery window we quote is the one we aim to hit — every time.", Icon: Clock },
  { t: "Digital Ordering", d: "Reorder anytime through our B2B digital ordering platform.", Icon: Smartphone },
  { t: "Professional Team", d: "A founder-led team with 12+ years across HUL, Reliance Retail & BigBasket.", Icon: UserCheck },
  { t: "Reliable Distribution", d: "Route-planned logistics with stock visibility end to end.", Icon: PackageCheck },
  { t: "Compliance First", d: "GST, licensing and regulatory basics kept current as we grow.", Icon: FileCheck },
];

const process: { t: string; d: string; Icon: LucideIcon }[] = [
  { t: "Manufacturer", d: "Sourcing multi-brand FMCG at competitive terms.", Icon: Factory },
  { t: "Warehouse", d: "Organised storage with stock rotation.", Icon: Warehouse },
  { t: "Route Planning", d: "Delivery routes planned for consistency.", Icon: Route },
  { t: "Delivery", d: "Direct-to-store, on schedule, on invoice.", Icon: Truck },
  { t: "Retailer", d: "Shelves stocked with what sells.", Icon: Store },
  { t: "Reorder", d: "Digital reorder whenever you need it.", Icon: RotateCw },
];

const products = [
  { name: "Beverages", tag: "Drinks", img: "/assets/images/products/beverages.webp.jpg" },
  { name: "Biscuits & Snacks", tag: "Snacks", img: "/assets/images/products/biscuits-snacks.webp.jpg" },
  { name: "Staples & Groceries", tag: "Essentials", img: "/assets/images/products/staples.webp.jpg" },
  { name: "Personal Care", tag: "Daily", img: "/assets/images/products/personal-care.webp.jpg" },
  { name: "Home Care", tag: "Household", img: "/assets/images/products/home-care.webp.jpg" },
  { name: "Stationery", tag: "Office", img: "/assets/images/products/stationery.webp.jpg" },
];

function Chip({ Icon, tone = "emerald" }: { Icon: LucideIcon; tone?: "emerald" | "gold" }) {
  return (
    <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
      tone === "gold" ? "bg-gold-soft text-gold" : "bg-gradient-to-br from-mint to-mint2 text-accent"
    }`}>
      <Icon size={23} strokeWidth={1.8} />
    </span>
  );
}

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.brand,
    legalName: site.legalName,
    url: site.domain,
    logo: `${site.domain}/assets/images/logo/08_Logo_Full_Primary.png`,
    image: `${site.domain}/assets/images/logo/06_Logo_Brand_Banner.png`,
    description: "Technology-enabled B2B FMCG distribution and own-brand Nuts & Spices, headquartered in Chennai, Tamil Nadu.",
    telephone: "+91-93423-58226",
    email: site.email,
    address: { "@type": "PostalAddress", streetAddress: "Sf. No. 215 Pt No. 120, Sh No. 5, Rajesh Garden Main Road, Vanagaram, Poonamallee, Tiruvallur", addressLocality: "Chennai", addressRegion: "Tamil Nadu", postalCode: "600095", addressCountry: "IN" },
    areaServed: "Chennai",
    openingHours: "Mo-Sa 09:00-18:00",
    sameAs: [site.social.facebook, site.social.instagram],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ===== HERO — split: copy left, photo + floating metrics right ===== */}
      <section className="relative overflow-hidden bg-base">
        <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full bg-accent-strong/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-24 h-[440px] w-[440px] rounded-full bg-gold-bright/10 blur-3xl" />
        <Container className="grid items-center gap-14 py-20 md:grid-cols-2 md:py-28">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent shadow-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-strong" /> FMCG Distribution · Chennai, India
            </span>
            <h1 className="mt-6 text-[clamp(38px,5.6vw,66px)] leading-[1.02]">
              Powering India&apos;s{" "}
              <span className="bg-gradient-to-r from-accent to-accent-deep bg-clip-text text-transparent">Retail Supply Chain</span>
            </h1>
            <p className="mt-6 max-w-[540px] text-[clamp(16px,1.5vw,19px)] leading-relaxed text-muted">
              Delivering FMCG products faster, smarter, and more efficiently to Kirana stores, supermarkets, and retail businesses — one accountable, technology-enabled network.
            </p>
            <div className="mt-9 flex flex-wrap gap-3.5">
              <Button href="#services" variant="primary">Explore Services <ArrowRight size={17} /></Button>
              <Button href="/contact" variant="outline">Contact Sales</Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-[13px] text-muted">
              <span className="inline-flex items-center gap-1.5"><ShieldCheck size={15} className="text-accent" /> GST-compliant</span>
              <span className="inline-flex items-center gap-1.5"><Clock size={15} className="text-accent" /> 24–48h delivery</span>
              <span className="inline-flex items-center gap-1.5"><PackageCheck size={15} className="text-accent" /> Own-brand line</span>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="relative">
            <div className="relative aspect-[4/4.3] overflow-hidden rounded-[28px] border border-line shadow-soft-lg">
              {/* CONTENT NEEDED: original high-res warehouse/logistics photo preferred */}
              <Image src="/assets/images/warehouse/01_Warehouse_Logistics.jpg" alt="Ecoo Basket warehouse and logistics operations in Chennai"
                fill priority sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,23,42,0.28)] to-transparent" />
            </div>
            {/* floating metric cards */}
            <div className="anim-float absolute -left-4 top-8 hidden items-center gap-3 rounded-2xl glass p-3.5 shadow-soft md:flex sm:-left-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-strong/12 text-accent"><TrendingUp size={19} /></span>
              <div><div className="text-[18px] font-extrabold leading-none tracking-[-0.02em] text-ink">99%</div><div className="text-[11px] text-muted">On-time delivery</div></div>
            </div>
            <div className="anim-float absolute -right-3 top-1/2 hidden items-center gap-3 rounded-2xl glass p-3.5 shadow-soft md:flex sm:-right-6" style={{ animationDelay: "1.2s" }}>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-soft text-gold"><Truck size={19} /></span>
              <div><div className="text-[18px] font-extrabold leading-none tracking-[-0.02em] text-ink">24–48h</div><div className="text-[11px] text-muted">Delivery window</div></div>
            </div>
            <div className="anim-float absolute -bottom-4 left-10 hidden items-center gap-3 rounded-2xl glass p-3.5 shadow-soft md:flex" style={{ animationDelay: "2.1s" }}>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-strong/12 text-accent"><ShieldCheck size={19} /></span>
              <div><div className="text-[13px] font-bold leading-tight text-ink">GST-Compliant</div><div className="text-[11px] text-muted">On every order</div></div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ===== STATS ===== */}
      <section className="bg-base pb-4 pt-2">
        <Container>
          <Reveal><Stats /></Reveal>
          {/* CONTENT NEEDED: confirm the stat figures in components/Stats.tsx before relying on them publicly */}
        </Container>
      </section>

      {/* ===== TRUSTED BRANDS ===== */}
      <Section tone="surface" className="py-12 md:py-14">
        <Container>
          <p className="mb-7 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Trusted to distribute for established FMCG manufacturers</p>
          <ManufacturerSlider />
        </Container>
      </Section>

      {/* ===== ABOUT ===== */}
      <Section id="about">
        <Container className="grid items-center gap-14 md:grid-cols-2">
          <Reveal>
            <Eyebrow>About Ecoo Basket</Eyebrow>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,44px)]">Technology-enabled FMCG distribution, built for reliability.</h2>
            <p className="mt-5 text-muted">Ecoo Basket connects manufacturers to retailers across Chennai — moving multi-brand FMCG and our own Nuts &amp; Spices line from warehouse to shelf on schedule, on invoice, and with a real person accountable for every order.</p>
            <ul className="mt-7 grid gap-4">
              {[["Logistics & route planning", "Consistent delivery windows, not vague promises."],
                ["Inventory management", "Stock tracking that flags low and slow-moving lines early."],
                ["Customer service", "One direct account contact per partner, order after order."]].map(([t, d]) => (
                <li key={t} className="flex gap-3.5">
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-lg bg-mint text-accent"><ShieldCheck size={13} /></span>
                  <span className="text-[15.5px] text-muted"><strong className="text-ink">{t}</strong> — {d}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8"><Button href="#network" variant="primary">See our network <ArrowRight size={17} /></Button></div>
          </Reveal>
          <Reveal delay={0.1} className="relative aspect-[5/4.4] overflow-hidden rounded-3xl border border-line shadow-soft-lg">
            <Image src="/assets/images/services/03_Supply_Chain_Network.jpg" alt="Ecoo Basket supply chain operations" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
          </Reveal>
        </Container>
      </Section>

      {/* ===== SERVICES ===== */}
      <Section tone="surface" id="services">
        <Container>
          <Reveal className="mx-auto max-w-[680px] text-center">
            <Eyebrow>What We Offer</Eyebrow>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,44px)]">Full-stack FMCG distribution services</h2>
            <p className="mt-4 text-muted">From a manufacturer&apos;s dock to a retailer&apos;s shelf — one accountable point of contact for each partner.</p>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.t} delay={(i % 3) * 0.06}
                className="group rounded-2xl border border-line bg-base p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-strong/40 hover:shadow-soft-lg">
                <Chip Icon={s.Icon} />
                <h3 className="mt-5 text-[19px] tracking-[-0.01em]">{s.t}</h3>
                <p className="mt-2.5 text-[14.5px] text-muted">{s.d}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">Learn more <ArrowRight size={14} /></span>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ===== PROCESS TIMELINE ===== */}
      <Section>
        <Container>
          <Reveal className="mx-auto max-w-[680px] text-center">
            <Eyebrow>How We Deliver</Eyebrow>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,44px)]">Manufacturer to reorder, one accountable chain</h2>
          </Reveal>
          <div className="relative mt-16">
            <div aria-hidden className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-line to-transparent lg:block" />
            <ol className="grid gap-y-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-x-4">
              {process.map((p, i) => (
                <Reveal as="li" key={p.t} delay={i * 0.08} className="relative flex flex-col items-center text-center lg:px-2">
                  <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-surface text-accent shadow-soft">
                    <p.Icon size={24} strokeWidth={1.8} />
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-invert">{i + 1}</span>
                  </span>
                  <h3 className="mt-4 text-[16px]">{p.t}</h3>
                  <p className="mt-1.5 max-w-[180px] text-[13px] text-muted">{p.d}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* ===== PRODUCTS — real photography ===== */}
      <Section tone="surface" id="products">
        <Container>
          <Reveal className="mx-auto max-w-[680px] text-center">
            <Eyebrow>Product Categories</Eyebrow>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,44px)]">Everyday categories, dependable supply</h2>
            <p className="mt-4 text-muted">The FMCG categories we move across our retail network. Shown for reference — not a full catalogue.</p>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.name} delay={(i % 3) * 0.06}
                className="group overflow-hidden rounded-2xl border border-line bg-surface shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg">
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image src={p.img} alt={`${p.name} — FMCG category distributed by Ecoo Basket`} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.06]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="flex items-center justify-between px-6 py-4">
                  <h3 className="text-[17px]">{p.name}</h3>
                  <span className="rounded-full bg-mint px-2.5 py-1 text-[11px] font-semibold text-accent">{p.tag}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-6 grid items-center gap-8 overflow-hidden rounded-3xl border border-line bg-base shadow-soft md:grid-cols-2">
            <div className="p-8 md:p-12">
              <Eyebrow>Our Premium Line</Eyebrow>
              <h3 className="mt-3 text-[clamp(22px,2.6vw,32px)]">Ecoo Nuts &amp; Spices — our own brand.</h3>
              <p className="mt-4 text-muted">Not a reseller line. We source it, pack it and price it ourselves — a higher-margin category alongside the multi-brand FMCG we distribute, without compromising on quality.</p>
              <div className="mt-6"><Button href={site.orderUrl} external variant="primary">Order Nuts &amp; Spices online <ArrowRight size={17} /></Button></div>
            </div>
            <div className="relative aspect-[5/4] md:aspect-auto md:h-full md:min-h-[320px]">
              <Image src="/assets/images/products/05_Premium_Dry_Fruits.jpg" alt="Ecoo Basket own-brand nuts, dry fruits and spices" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ===== WHY CHOOSE ===== */}
      <Section>
        <Container>
          <Reveal className="mx-auto max-w-[680px] text-center">
            <Eyebrow>Why Ecoo Basket</Eyebrow>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,44px)]">The edge that keeps partners with us</h2>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((w, i) => (
              <Reveal key={w.t} delay={(i % 3) * 0.06}
                className="group rounded-2xl border border-line bg-surface p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-strong/40 hover:shadow-soft-lg">
                <Chip Icon={w.Icon} />
                <h3 className="mt-5 text-[18px]">{w.t}</h3>
                <p className="mt-2 text-[14.5px] text-muted">{w.d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ===== TRUST ===== */}
      <Section tone="surface">
        <Container>
          <Reveal className="mx-auto max-w-[680px] text-center">
            <Eyebrow>Why Partners Trust Us</Eyebrow>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,44px)]">Built on reliability, not promises</h2>
          </Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trust.map((t, i) => (
              <Reveal key={t.t} delay={(i % 3) * 0.05}
                className="flex items-start gap-4 rounded-2xl border border-line bg-base p-6 transition-all duration-300 hover:border-gold-bright/40 hover:shadow-soft">
                <Chip Icon={t.Icon} tone={i % 2 === 1 ? "gold" : "emerald"} />
                <div><h3 className="text-[16.5px]">{t.t}</h3><p className="mt-1.5 text-[14px] text-muted">{t.d}</p></div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-center font-mono text-[11px] tracking-[0.06em] text-muted">
            Registered entity · CIN {site.cin}
          </p>
          {/* CONTENT NEEDED: add GST / MSME / FSSAI badges once real registration numbers are confirmed */}
        </Container>
      </Section>

      {/* ===== DISTRIBUTION NETWORK ===== */}
      <Section id="network">
        <Container className="grid items-center gap-14 md:grid-cols-2">
          <Reveal>
            <Eyebrow>Distribution Network</Eyebrow>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,44px)]">Chennai operations, expanding across Tamil Nadu</h2>
            <p className="mt-5 text-muted">We onboard retailers zone by zone rather than spreading thin — so delivery reliability doesn&apos;t slip as the network grows. Every route runs from our Chennai hub to warehouses, kirana stores, supermarkets, pharmacies, HORECA and wholesale partners.</p>
            <div className="mt-8 flex flex-wrap gap-8">
              {[["Chennai", "Live operations"], ["24–48h", "Delivery window"], ["Zone-by-zone", "Expansion model"]].map(([b, s]) => (
                <div key={b}>
                  <div className="text-[24px] font-extrabold tracking-[-0.02em] text-accent">{b}</div>
                  <div className="text-[12.5px] text-muted">{s}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}><NetworkViz /></Reveal>
        </Container>
      </Section>

      {/* ===== CTA ===== */}
      <section className="forest-grad relative overflow-hidden py-20 text-center text-invert md:py-28">
        <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(60% 120% at 50% -10%, rgba(255,255,255,0.14), transparent 60%)" }} />
        <Container className="relative">
          <Reveal>
            <h2 className="text-invert text-[clamp(30px,4vw,52px)]">Ready to Grow Your Retail Business?</h2>
            <p className="mx-auto mt-4 max-w-[560px] text-[17px] text-white/85">Tell us your area and order pattern — we&apos;ll tell you honestly whether we&apos;re a fit today or on the roadmap, and get you set up.</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3.5">
              <Button href="/contact" variant="solidInvert">Become a Retail Partner</Button>
              <Button href="/contact" variant="outlineInvert">Contact Sales</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
