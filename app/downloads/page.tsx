import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { FileText, BookOpen, ClipboardList, Presentation, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Container, Section, Eyebrow } from "@/components/primitives";
import PageHero from "@/components/PageHero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Download Center | Ecoo Basket",
  description: "Request the Ecoo Basket company profile, product brochure, catalogue and partner presentation.",
  alternates: { canonical: "/downloads" },
};

// CONTENT NEEDED: real downloadable files (company profile / brochure / catalogue / deck).
// Until supplied, each resource is request-by-email (functional, no dead links).
const files: { t: string; d: string; Icon: LucideIcon }[] = [
  { t: "Company Profile", d: "An overview of Ecoo Basket — who we are, what we distribute, and how we operate.", Icon: FileText },
  { t: "Product Brochure", d: "The FMCG categories we distribute plus our own Nuts & Spices line.", Icon: BookOpen },
  { t: "Catalogue", d: "Category listing for retail and business partners.", Icon: ClipboardList },
  { t: "Presentation", d: "A short deck for prospective partners and suppliers.", Icon: Presentation },
];

export default function DownloadsPage() {
  return (
    <>
      <PageHero
        eyebrow="Download Center"
        title="Company profile, brochures and catalogues."
        subtitle="Request any of our partner resources and we'll send it across."
      />

      <Section tone="surface">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2">
            {files.map((f, i) => (
              <Reveal key={f.t} delay={(i % 2) * 0.06} className="flex flex-col rounded-2xl border border-line bg-base p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-strong/40 hover:shadow-soft-lg">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-mint to-mint2 text-accent"><f.Icon size={23} strokeWidth={1.8} /></span>
                <h3 className="mt-5 text-[19px]">{f.t}</h3>
                <p className="mt-2 flex-1 text-[14.5px] text-muted">{f.d}</p>
                <a href={`mailto:${site.email}?subject=${encodeURIComponent("Resource request: " + f.t)}`}
                  className="mt-5 inline-flex w-fit items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-[13.5px] font-semibold text-accent shadow-soft transition-all hover:-translate-y-0.5 hover:border-accent-strong">
                  Request a copy <ArrowRight size={15} />
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
