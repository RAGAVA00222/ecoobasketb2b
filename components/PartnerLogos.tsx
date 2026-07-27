"use client";

import { useState } from "react";
import { Container, Section } from "@/components/primitives";
import { manufacturers } from "@/content/site";

/**
 * Homepage trust strip — confirmed FMCG distribution partners.
 * Structural shell: each slot tries to load its logo from
 *   /assets/images/partners/<slug>.png
 * and renders a neutral brand-name chip until that file exists (drop the file
 * in to activate — no code change needed). CONTENT NEEDED: real, licensed logo
 * files (CONTENT-NEEDED.md #1). Static by design — no marquee, so nothing to
 * animate and nothing that could jank on low-end devices.
 */
function Slot({ name, slug }: { name: string; slug: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="flex h-16 w-32 flex-none items-center justify-center rounded-2xl border border-line bg-surface px-4 shadow-soft sm:w-36">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/assets/images/partners/${slug}.png`}
        alt={`${name} logo`}
        onLoad={() => setLoaded(true)}
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        className={`max-h-9 max-w-full object-contain ${loaded ? "block" : "hidden"}`}
      />
      {!loaded && (
        <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">{name}</span>
      )}
    </div>
  );
}

export default function PartnerLogos() {
  return (
    <Section tone="surface" className="py-12 md:py-14">
      <Container>
        <p className="mb-7 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          Trusted to distribute for leading FMCG brands
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
          {manufacturers.map((m) => (
            <Slot key={m.slug} name={m.name} slug={m.slug} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
