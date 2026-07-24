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
  variant?: "primary" | "green" | "outline" | "outlineInvert";
  external?: boolean;
  className?: string;
};

export function Button({ href, children, variant = "primary", external, className = "" }: BtnProps) {
  const base =
    "inline-flex items-center gap-2 rounded-[2px] px-6 py-3 text-[14.5px] font-semibold transition-colors";
  const styles: Record<string, string> = {
    primary: "bg-ink text-invert hover:bg-dark",
    green: "bg-accent text-invert hover:bg-accent-deep",
    outline: "border border-ink text-ink hover:bg-ink hover:text-invert",
    outlineInvert: "border border-invert text-invert hover:bg-invert hover:text-ink",
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
