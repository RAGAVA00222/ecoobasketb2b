"use client";

import { motion, useReducedMotion } from "framer-motion";
import { manufacturers } from "@/content/site";

/**
 * Manufacturer / distribution-partner slider.
 * CONTENT NEEDED: real logo files + brand/legal usage confirmation.
 * Until then each partner renders as a text chip placeholder.
 */
export default function ManufacturerSlider() {
  const reduce = useReducedMotion();
  const row = [...manufacturers, ...manufacturers];

  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <motion.div
        className="flex w-max gap-4 py-2"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={reduce ? undefined : { duration: 26, ease: "linear", repeat: Infinity }}
      >
        {row.map((m, i) => (
          <div
            key={`${m}-${i}`}
            className="flex h-16 w-40 flex-shrink-0 items-center justify-center rounded-[3px] border border-line bg-surface"
            title={`${m} — logo pending`}
          >
            <span className="font-display text-[17px] font-semibold text-muted">{m}</span>
          </div>
        ))}
      </motion.div>
      <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
        Partner logos pending brand confirmation
      </p>
    </div>
  );
}
