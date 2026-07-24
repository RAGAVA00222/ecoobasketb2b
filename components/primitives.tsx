import type { ReactNode } from "react";
import Link from "next/link";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Section({
  children,
  className = "",
  tone = "base",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "base" | "surface" | "dark";
  id?: string;
}) {
  const toneClass =
    tone === "dark"
      ? "bg-dark text-invert"
      : tone === "surface"
        ? "bg-surface"
        : "bg-base";
  return (
    <section id={id} className={`py-16 md:py-24 ${toneClass} ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <span
      className="font-mono text-[11px] font-medium uppercase tracking-[0.16em]"
      style={{ color: onDark ? "var(--color-dark-accent)" : "var(--color-accent)" }}
    >
      {children}
    </span>
  );
}

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "green" | "outline" | "outlineInvert" | "solidInvert";
  external?: boolean;
  className?: string;
};

export function Button({ href, children, variant = "primary", external, className = "" }: BtnProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-[14.5px] font-semibold transition-all duration-200 active:translate-y-px";
  const styles: Record<string, string> = {
    // Primary + green: text-safe emerald (#15803D, white 4.7:1) with emerald lift on hover.
    primary: "bg-accent text-invert shadow-[0_14px_28px_-14px_rgba(22,163,74,0.6)] hover:bg-accent-deep hover:-translate-y-0.5",
    green: "bg-accent text-invert shadow-[0_14px_28px_-14px_rgba(22,163,74,0.6)] hover:bg-accent-deep hover:-translate-y-0.5",
    // Secondary: white with emerald border, soft-tint hover.
    outline: "border border-line bg-surface text-accent shadow-[0_6px_18px_-12px_rgba(15,23,42,0.28)] hover:border-accent-strong hover:bg-mint hover:-translate-y-0.5",
    // On dark/emerald backgrounds:
    outlineInvert: "border border-[rgba(255,255,255,0.55)] text-invert hover:bg-[rgba(255,255,255,0.12)]",
    solidInvert: "bg-invert text-accent shadow-[0_16px_30px_-16px_rgba(2,6,23,0.4)] hover:bg-mint hover:-translate-y-0.5",
  };
  const cls = `${base} ${styles[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
