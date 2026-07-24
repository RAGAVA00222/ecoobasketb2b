"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { manufacturers } from "@/content/site";

/**
 * Trusted-manufacturers strip. Neutral "Partner Logo" placeholder tiles until
 * official logo files + brand/legal usage confirmation arrive.
 * CONTENT NEEDED: real logo files for intended partners —
 *   Nestlé, HUL, ITC, Britannia, Parle, PepsiCo, Coca-Cola, Dabur.
 *   (PENDING BRAND CONFIRMATION — not shown as visible text.)
 */
export default function ManufacturerSlider() {
  const reduce = useReducedMotion();
  const row = [...manufacturers, ...manufacturers];

  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]">
      <motion.div
        className="flex w-max gap-4 py-2"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={reduce ? undefined : { duration: 30, ease: "linear", repeat: Infinity }}
      >
        {row.map((_, i) => (
          <div
            key={i}
            className="flex h-20 w-44 flex-shrink-0 flex-col items-center justify-center gap-1.5 rounded-2xl border border-line bg-surface shadow-soft"
          >
            <ImageIcon size={22} className="text-muted/50" aria-hidden />
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">Partner Logo</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
