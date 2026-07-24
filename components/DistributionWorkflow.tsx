"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Factory, Warehouse, ClipboardList, Route, Truck, Store, RefreshCw } from "lucide-react";

const steps: { t: string; d: string; Icon: LucideIcon }[] = [
  { t: "Manufacturer", d: "Sourcing trusted FMCG brands and our own line.", Icon: Factory },
  { t: "Warehouse", d: "Received, inspected and stored with rotation.", Icon: Warehouse },
  { t: "Inventory", d: "Stock tracked and visible end to end.", Icon: ClipboardList },
  { t: "Route Planning", d: "Deliveries planned zone by zone.", Icon: Route },
  { t: "Delivery", d: "Direct-to-store, on a clean GST invoice.", Icon: Truck },
  { t: "Retailer", d: "Shelves kept full across Chennai.", Icon: Store },
  { t: "Reorder", d: "Reorder any time via digital ordering.", Icon: RefreshCw },
];

export default function DistributionWorkflow() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mt-14">
      <div aria-hidden className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-line to-transparent lg:block" />
      <ol className="grid grid-cols-2 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 lg:gap-x-3">
        {steps.map((s, i) => (
          <motion.li
            key={s.t}
            className="relative flex flex-col items-center text-center lg:px-1"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-surface text-accent shadow-soft">
              <s.Icon size={26} strokeWidth={1.8} />
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-invert">{i + 1}</span>
            </span>
            <h3 className="mt-4 text-[15.5px] font-semibold text-ink">{s.t}</h3>
            <p className="mt-1.5 max-w-[170px] text-[12.5px] leading-snug text-muted">{s.d}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
