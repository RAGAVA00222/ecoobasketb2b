import { Container, Eyebrow } from "@/components/primitives";
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
      <section className="border-b border-line bg-base">
        <Container className="py-12 md:py-16">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-4 text-[clamp(28px,4.2vw,42px)]">{title}</h1>
          <p className="mt-4 max-w-[720px] text-muted">{intro}</p>
        </Container>
      </section>
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
