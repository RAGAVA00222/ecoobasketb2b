import { Info } from "lucide-react";
import { Container } from "@/components/primitives";
import PageHero from "@/components/PageHero";
import { site } from "@/content/site";

export type LegalSection = { h: string; body: React.ReactNode };

/* CONTENT NEEDED: these policy templates should be reviewed by a legal
   professional before being relied upon. Reminder kept in code, not shown. */

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
            <div className="mb-10 flex gap-4 rounded-2xl border border-line bg-base p-5 shadow-soft sm:p-6">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-mint to-mint2 text-accent"><Info size={20} strokeWidth={1.9} /></span>
              <p className="text-[15px] leading-relaxed text-ink"><strong className="text-accent">Note:</strong> {note}</p>
            </div>
            <div className="grid gap-8">
              {sections.map((s) => (
                <div key={s.h} className="border-t border-line pt-6 first:border-t-0 first:pt-0">
                  <h2 className="mb-2.5 text-[20px] tracking-[-0.01em]">{s.h}</h2>
                  <div className="text-[15px] leading-relaxed text-muted [&_a]:text-accent [&_a]:font-semibold">{s.body}</div>
                </div>
              ))}
            </div>
            <p className="mt-10 rounded-xl bg-base px-4 py-3 font-mono text-[12px] text-muted">
              Registered office: {site.registeredOffice}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
