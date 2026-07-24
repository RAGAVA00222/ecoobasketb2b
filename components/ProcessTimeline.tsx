"use client";

import { motion, useReducedMotion } from "framer-motion";
import { processSteps } from "@/content/site";

/**
 * Animated distribution timeline: Manufacturer → Warehouse → Route
 * Planning → Delivery → Retailer → Reorder. Horizontal rail on desktop,
 * vertical on mobile. The connecting line draws in on scroll.
 */
export default function ProcessTimeline() {
  const reduce = useReducedMotion();
  return (
    <ol className="relative flex flex-col gap-0 md:flex-row md:gap-0">
      {processSteps.map((s, i) => (
        <li key={s.n} className="relative flex-1 pl-8 pb-8 md:pl-0 md:pr-6 md:pt-8">
          {/* connector line */}
          <span
            aria-hidden
            className="absolute left-[5px] top-3 h-full w-px bg-line md:left-0 md:top-0 md:h-px md:w-full"
          />
          {!reduce && (
            <motion.span
              aria-hidden
              className="absolute left-[5px] top-3 w-px bg-accent-strong md:left-0 md:top-0 md:h-px md:w-full"
              initial={{ scaleY: 0, scaleX: 0 }}
              whileInView={{ scaleY: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{ transformOrigin: "top left", height: "100%" }}
            />
          )}
          {/* node */}
          <motion.span
            aria-hidden
            className="absolute left-0 top-2 h-3 w-3 rounded-full bg-accent-strong ring-4 ring-base md:top-[-6px]"
            initial={reduce ? undefined : { scale: 0 }}
            whileInView={reduce ? undefined : { scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.08 }}
          />
          <div className="md:pt-6">
            <div className="font-mono text-[12px] text-accent">{s.n}</div>
            <h3 className="mt-1 text-[18px]">{s.t}</h3>
            <p className="mt-2 max-w-[220px] text-[14px] text-muted">{s.d}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
