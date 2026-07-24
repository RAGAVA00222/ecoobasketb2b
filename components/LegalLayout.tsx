import { Container } from "@/components/primitives";
import PageHero from "@/components/PageHero";
import { site } from "@/content/site";

export type LegalSection = { h: string; body: React.ReactNode };

export default function LegalLayout({
  title,
  intro,
  note,
  sections,
}: {
  title: string;
  intro: string;
  note: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} subtitle={intro} size="compact" />
      <section className="bg-surface py-14 md:py-20">
        <Container>
          <div className="mx-auto max-w-[820px]">
            <div className="mb-8 rounded-[3px] border-l-2 border-accent bg-base p-5">
              <p className="text-ink"><strong>Note:</strong> {note}</p>
            </div>
            {sections.map((s) => (
              <div key={s.h} className="mb-6">
                <h2 className="mb-2 text-[22px]">{s.h}</h2>
                <div className="text-muted">{s.body}</div>
              </div>
            ))}
            <p className="mt-8 text-[13px] text-muted">
              Registered office: {site.registeredOffice}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
