import type { ReactNode } from "react";
import { Container, Eyebrow, Button } from "@/components/primitives";
import { site } from "@/content/site";

/**
 * Building scaffold for routes whose verbatim copy port / real content
 * is still pending. Renders the real page hero + an explicit, honest
 * migration marker — never fabricated body copy.
 */
export default function PageScaffold({
  eyebrow,
  title,
  intro,
  status = "Content migration in progress — verbatim copy is being ported from the current live page; no copy is invented here.",
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  status?: string;
  children?: ReactNode;
}) {
  return (
    <>
      <section className="border-b border-line bg-base">
        <Container className="py-14 md:py-20">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-4 max-w-[860px] text-[clamp(30px,4.4vw,46px)]">{title}</h1>
          {intro && <p className="mt-5 max-w-[620px] text-muted">{intro}</p>}
        </Container>
      </section>
      <section className="bg-surface py-16 md:py-20">
        <Container>
          {children ?? (
            <div className="max-w-[720px] rounded-[4px] border border-dashed border-line bg-base p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent">Migration status</p>
              <p className="mt-3 text-muted">{status}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/contact" variant="outline">Contact us</Button>
                <Button href={site.orderUrl} external variant="green">Order Now →</Button>
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
