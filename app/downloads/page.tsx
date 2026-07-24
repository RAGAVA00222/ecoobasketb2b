import type { Metadata } from "next";
import Placeholder from "@/components/Placeholder";
import { Container, Section, Eyebrow } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Download Center | Ecoo Basket",
  description: "Download the Ecoo Basket company profile, brochure and catalogue.",
  alternates: { canonical: "/downloads" },
};

// CONTENT NEEDED: real downloadable files. Buttons stay disabled — no dead links.
const files = [
  { t: "Company Profile", d: "An overview of Ecoo Basket — who we are, what we distribute, and how we operate.", fmt: "PDF" },
  { t: "Product Brochure", d: "The FMCG categories we distribute plus our own Nuts & Spices line.", fmt: "PDF" },
  { t: "Catalogue", d: "Category listing for retail and business partners.", fmt: "PDF" },
  { t: "Presentation", d: "A short deck for prospective partners and suppliers.", fmt: "PDF" },
];

export default function DownloadsPage() {
  return (
    <>
      <section className="border-b border-line bg-base">
        <Container className="py-14 md:py-20">
          <Eyebrow>Download Center</Eyebrow>
          <h1 className="mt-4 text-[clamp(30px,4.6vw,46px)]">Company profile, brochures and catalogues.</h1>
          <p className="mt-5 max-w-[620px] text-muted">Downloadable resources will appear here as they&apos;re finalised.</p>
        </Container>
      </section>

      {/* CONTENT NEEDED: downloadable files (company profile / brochure / catalogue / presentation) */}
      <Section tone="surface">
        <Container>
          <div className="mb-6"><Placeholder label="downloadable files — all items" /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            {files.map((f) => (
              <div key={f.t} className="flex items-start justify-between gap-4 rounded-[3px] border border-dashed border-line bg-base p-6">
                <div>
                  <h3 className="text-[18px]">{f.t}</h3>
                  <p className="mt-1.5 text-[14px] text-muted">{f.d}</p>
                  <span className="mt-2 inline-block font-mono text-[10px] uppercase tracking-[0.08em] text-accent">file pending</span>
                </div>
                <button type="button" disabled className="flex-shrink-0 cursor-not-allowed rounded-[2px] border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.06em] text-muted" title="File pending — will link when supplied">
                  {f.fmt} ↓
                </button>
              </div>
            ))}
          </div>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
            No dead links: download buttons stay disabled until real files are supplied.
          </p>
        </Container>
      </Section>
    </>
  );
}
