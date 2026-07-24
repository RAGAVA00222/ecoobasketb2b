import Image from "next/image";
import Reveal from "@/components/Reveal";
import Stats from "@/components/Stats";
import NetworkViz from "@/components/NetworkViz";
import ManufacturerSlider from "@/components/ManufacturerSlider";
import { Container, Section, Eyebrow, Button } from "@/components/primitives";
import { site } from "@/content/site";

const services = [
  { t: "FMCG Wholesale Distribution", d: "Multi-brand FMCG supplied to kirana stores, general trade and modern trade with flexible order quantities.",
    icon: <path d="M3 7l9-4 9 4-9 4-9-4Z M3 7v10l9 4 9-4V7 M12 11v10" /> },
  { t: "Direct Store Delivery (DSD)", d: "Route-planned delivery direct to the storefront, keeping delivery windows consistent across the coverage area.",
    icon: <><path d="M3 13h11V6H3z M14 9h4l3 3v4h-7z" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></> },
  { t: "Supply Chain Management", d: "We manage the handoffs between sourcing, warehousing and last-mile so nothing stalls between steps.",
    icon: <><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2" /></> },
  { t: "Retail Partner Network", d: "A growing network of retail partners with direct relationships — most deal with the same account contact weekly.",
    icon: <><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0 M16 11a3 3 0 1 0 0-6 M21 20a6 6 0 0 0-5-5.9" /></> },
  { t: "Technology Enabled Distribution", d: "Digital ordering, GST-compliant invoicing and data on how products actually move through the network.",
    icon: <><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4M7 11l3-3 2 2 4-4" /></> },
  { t: "Inventory Management", d: "Stock tracking that flags what's low before a retailer runs out — and what's slow before it becomes dead stock.",
    icon: <><path d="M4 7h16M4 12h16M4 17h16" /><circle cx="8" cy="7" r="1.4" fill="currentColor" stroke="none" /><circle cx="15" cy="12" r="1.4" fill="currentColor" stroke="none" /><circle cx="11" cy="17" r="1.4" fill="currentColor" stroke="none" /></> },
];

const products = [
  { name: "Beverages", tag: "Drinks", img: "/assets/images/products/beverages.webp.jpg" },
  { name: "Biscuits & Snacks", tag: "Snacks", img: "/assets/images/products/biscuits-snacks.webp.jpg" },
  { name: "Staples & Groceries", tag: "Essentials", img: "/assets/images/products/staples.webp.jpg" },
  { name: "Personal Care", tag: "Daily", img: "/assets/images/products/personal-care.webp.jpg" },
  { name: "Home Care", tag: "Household", img: "/assets/images/products/home-care.webp.jpg" },
  { name: "Stationery", tag: "Office", img: "/assets/images/products/stationery.webp.jpg" },
];

const whyChoose = [
  { t: "Fast Delivery", d: "Same-day dispatch with 24–48h delivery across our Chennai coverage area.", icon: <path d="M13 2 4 14h7l-1 8 9-12h-7z" /> },
  { t: "Competitive Pricing", d: "Strategic sourcing and operational efficiency keep pricing sharp for partners.", icon: <><circle cx="12" cy="12" r="9" /><path d="M12 7v10M9.5 9.5C9.5 8 10.5 7.5 12 7.5s2.5.6 2.5 2-1 2-2.5 2-2.5.6-2.5 2 1 2 2.5 2 2.5-.5 2.5-2" /></> },
  { t: "Wide Product Range", d: "Multi-brand FMCG across everyday categories, plus our own Nuts & Spices line.", icon: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M8 4v5M16 4v5" /></> },
  { t: "Quality Assurance", d: "Organised storage with stock rotation, so products move before they age out.", icon: <><path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" /><path d="M9 12l2 2 4-4" /></> },
  { t: "Dedicated Support", d: "A real account contact per partner — not a call-centre queue.", icon: <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2z" /> },
  { t: "Technology Driven Operations", d: "Digital ordering, reorder signals and clean data across the distribution chain.", icon: <><rect x="4" y="4" width="16" height="12" rx="2" /><path d="M8 20h8M12 16v4M8 10l2.5 2.5L16 7" /></> },
];

function Ic({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-mint to-mint2 text-accent">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
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

      {/* ===== HERO — full-bleed warehouse photography ===== */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        {/* CONTENT NEEDED: swap for an original high-res warehouse/logistics photo */}
        <Image src="/assets/images/warehouse/01_Warehouse_Logistics.jpg" alt="Ecooo Basket warehouse and logistics operations in Chennai"
          fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 hero-grad" />
        <Container className="relative z-10 py-36 md:py-40">
          <Reveal className="max-w-[760px]">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]" /> FMCG Distribution · Chennai, India
            </span>
            <h1 className="mt-6 text-invert text-[clamp(38px,6vw,72px)] leading-[1.02] tracking-[-0.035em]">
              Powering India&apos;s <span className="text-[#4ADE80]">Retail Supply Chain</span>
            </h1>
            <p className="mt-6 max-w-[560px] text-[clamp(16px,1.6vw,20px)] leading-relaxed text-white/85">
              Delivering FMCG products faster, smarter, and more efficiently to Kirana stores, supermarkets, and retail businesses — one accountable, technology-enabled network.
            </p>
            <div className="mt-9 flex flex-wrap gap-3.5">
              <Button href="#services" variant="solidInvert">Explore Services →</Button>
              <Button href="/contact" variant="outlineInvert">Contact Sales</Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-[13px] text-white/70">
              <span><strong className="text-white">GST-compliant</strong> invoicing</span>
              <span className="h-1 w-1 rounded-full bg-[#4ADE80]" />
              <span><strong className="text-white">24–48h</strong> delivery in Chennai</span>
              <span className="h-1 w-1 rounded-full bg-[#4ADE80]" />
              <span><strong className="text-white">Own-brand</strong> Nuts &amp; Spices</span>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ===== STATS ===== */}
      <section className="relative z-10 -mt-16 pb-6">
        <Container>
          <Reveal><Stats /></Reveal>
          <p className="mt-3 text-center font-mono text-[11px] text-muted">Figures shown for illustration — confirm before publishing.</p>
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
            <Eyebrow>About Ecooo Basket</Eyebrow>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,44px)]">Technology-enabled FMCG distribution, built for reliability.</h2>
            <p className="mt-5 text-muted">Ecooo Basket connects manufacturers to retailers across Chennai — moving multi-brand FMCG and our own Nuts &amp; Spices line from warehouse to shelf on schedule, on invoice, and with a real person accountable for every order.</p>
            <ul className="mt-7 grid gap-4">
              {[["Logistics & route planning", "Consistent delivery windows, not vague promises."],
                ["Inventory management", "Stock tracking that flags low and slow-moving lines early."],
                ["Customer service", "One direct account contact per partner, order after order."]].map(([t, d]) => (
                <li key={t} className="flex gap-3.5">
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-lg bg-mint text-accent">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span className="text-[15.5px] text-muted"><strong className="text-ink">{t}</strong> — {d}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8"><Button href="#network" variant="primary">See our network</Button></div>
          </Reveal>
          <Reveal delay={0.1} className="relative aspect-[5/4.4] overflow-hidden rounded-3xl border border-line shadow-soft-lg">
            {/* CONTENT NEEDED: original facility / team photo preferred */}
            <Image src="/assets/images/services/03_Supply_Chain_Network.jpg" alt="Ecooo Basket supply chain operations" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
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
                <Ic>{s.icon}</Ic>
                <h3 className="mt-5 text-[19px] tracking-[-0.01em]">{s.t}</h3>
                <p className="mt-2.5 text-[14.5px] text-muted">{s.d}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">Learn more →</span>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ===== PRODUCTS — real photography ===== */}
      <Section id="products">
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
                  <Image src={p.img} alt={`${p.name} — FMCG category distributed by Ecooo Basket`} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
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
          {/* Own-brand highlight */}
          <Reveal className="mt-6 grid items-center gap-8 overflow-hidden rounded-3xl border border-line bg-surface shadow-soft md:grid-cols-2">
            <div className="p-8 md:p-12">
              <Eyebrow>Our Premium Line</Eyebrow>
              <h3 className="mt-3 text-[clamp(22px,2.6vw,32px)]">Ecooo Nuts &amp; Spices — our own brand.</h3>
              <p className="mt-4 text-muted">Not a reseller line. We source it, pack it and price it ourselves — a higher-margin category alongside the multi-brand FMCG we distribute, without compromising on quality.</p>
              <div className="mt-6"><Button href={site.orderUrl} external variant="primary">Order Nuts &amp; Spices online →</Button></div>
            </div>
            <div className="relative aspect-[5/4] md:aspect-auto md:h-full md:min-h-[320px]">
              <Image src="/assets/images/products/05_Premium_Dry_Fruits.jpg" alt="Ecooo Basket own-brand nuts, dry fruits and spices" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ===== WHY CHOOSE ===== */}
      <Section tone="surface">
        <Container>
          <Reveal className="mx-auto max-w-[680px] text-center">
            <Eyebrow>Why Ecooo Basket</Eyebrow>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,44px)]">The edge that keeps partners with us</h2>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((w, i) => (
              <Reveal key={w.t} delay={(i % 3) * 0.06}
                className="group rounded-2xl border border-line bg-base p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-strong/40 hover:shadow-soft">
                <Ic>{w.icon}</Ic>
                <h3 className="mt-5 text-[18px]">{w.t}</h3>
                <p className="mt-2 text-[14.5px] text-muted">{w.d}</p>
              </Reveal>
            ))}
          </div>
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
      <section className="relative overflow-hidden py-20 text-center text-invert md:py-28 forest-grad">
        <div className="absolute inset-0" style={{ background: "radial-gradient(60% 120% at 50% -10%, rgba(255,255,255,0.14), transparent 60%)" }} />
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
