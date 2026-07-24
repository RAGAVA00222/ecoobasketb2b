import type { Metadata } from "next";
import Placeholder from "@/components/Placeholder";
import { Container, Section, Eyebrow } from "@/components/primitives";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Gallery | Ecoo Basket Chennai",
  description: "Photo gallery of Ecoo Basket operations across Chennai.",
  alternates: { canonical: "/gallery" },
};

// CONTENT NEEDED: real photography for each tile below.
const tiles = [
  { label: "Warehouse floor", span: "md:col-span-2 md:row-span-2 aspect-[4/3]" },
  { label: "Delivery vehicle", span: "aspect-square" },
  { label: "Route loading", span: "aspect-square" },
  { label: "Team on the floor", span: "aspect-[4/3]" },
  { label: "Retail partner store", span: "aspect-[4/3]" },
  { label: "Nuts & Spices packing", span: "aspect-square" },
  { label: "Stock rotation", span: "aspect-square" },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Inside the operation."
        subtitle="Real photography of the warehouse, routes, packing and team will live here."
      />

      {/* CONTENT NEEDED: gallery photography (all tiles are placeholders) */}
      <Section tone="surface">
        <Container>
          <div className="mb-6"><Placeholder label="gallery photography — all tiles" /></div>
          <div className="grid auto-rows-[minmax(0,1fr)] grid-cols-2 gap-3 md:grid-cols-4">
            {tiles.map((t, i) => (
              <div
                key={i}
                className={`flex flex-col items-center justify-center gap-2 rounded-[3px] border border-dashed border-line bg-base p-4 text-center ${t.span}`}
              >
                <span aria-hidden className="text-2xl text-line">▨</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted">{t.label}</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-accent">photo pending</span>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
