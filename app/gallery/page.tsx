import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { Container, Section, Eyebrow } from "@/components/primitives";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Gallery | Ecoo Basket Chennai",
  description: "A look inside Ecoo Basket — warehouse, supply-chain operations, retail partners and product lines across Chennai.",
  alternates: { canonical: "/gallery" },
};

// CONTENT NEEDED: additional original photography (delivery routes, packing, team on the floor)
const shots = [
  { src: "/assets/images/warehouse/01_Warehouse_Logistics.jpg", label: "Warehouse & logistics", wide: true },
  { src: "/assets/images/services/03_Supply_Chain_Network.jpg", label: "Supply chain network" },
  { src: "/assets/images/services/02_AI_Technology.jpg", label: "Technology & inventory" },
  { src: "/assets/images/services/04_Retail_Partner.jpg", label: "Retail partners" },
  { src: "/assets/images/background/06_Business_Meeting.jpg", label: "Team & operations" },
  { src: "/assets/images/products/05_Premium_Dry_Fruits.jpg", label: "Nuts & Spices line" },
  { src: "/assets/images/products/beverages.webp.jpg", label: "Beverages" },
  { src: "/assets/images/products/staples.webp.jpg", label: "Staples & groceries" },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Inside the operation."
        subtitle="A look at our warehouse, supply-chain operations, retail partners and product lines."
      />

      <Section tone="surface">
        <Container>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shots.map((s, i) => (
              <Reveal key={s.label} delay={(i % 3) * 0.05}
                className={`group relative overflow-hidden rounded-2xl border border-line shadow-soft ${s.wide ? "sm:col-span-2" : ""} ${s.wide ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
                <Image src={s.src} alt={`Ecoo Basket — ${s.label}`} fill sizes={s.wide ? "(max-width:640px) 100vw, 66vw" : "(max-width:640px) 100vw, 33vw"}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,23,42,0.6)] via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-[12px] font-semibold text-ink backdrop-blur">{s.label}</span>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
