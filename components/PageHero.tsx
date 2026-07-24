import type { ReactNode } from "react";
import { Container } from "@/components/primitives";

/**
 * Interior-page hero. Deep forest-green gradient with white type and a
 * soft-gold eyebrow — the premium enterprise treatment applied site-wide.
 * Contrast: white on #0F5132–#14532D ≈ 9:1 (AAA); gold eyebrow ≈ 7.5:1.
 */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  size = "default",
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  size?: "default" | "compact";
}) {
  return (
    <section className="forest-grad border-b border-[rgba(200,162,77,0.35)] text-invert">
      <Container className={size === "compact" ? "py-12 md:py-16" : "py-14 md:py-20"}>
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-dark-accent">
          {eyebrow}
        </span>
        <h1 className="mt-4 max-w-[900px] text-invert text-[clamp(30px,4.6vw,46px)]">{title}</h1>
        {subtitle && <p className="mt-5 max-w-[640px] text-[17px] text-[rgba(255,255,255,0.82)]">{subtitle}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </Container>
    </section>
  );
}
