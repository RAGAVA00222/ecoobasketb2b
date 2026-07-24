"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export type Stat = { value: number; suffix?: string; label: string };

// CONTENT NEEDED: confirm these figures before publishing (shown as provided).
const defaultStats: Stat[] = [
  { value: 500, suffix: "+", label: "Retail Partners" },
  { value: 100, suffix: "+", label: "Trusted Brands" },
  { value: 4000, suffix: "+", label: "Products" },
  { value: 25, suffix: "+", label: "Delivery Vehicles" },
  { value: 99, suffix: "%", label: "On-Time Delivery" },
];

function useCountUp(target: number, run: boolean, reduce: boolean | null) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (reduce) { setN(target); return; }
    let raf = 0;
    const dur = 1400;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, reduce]);
  return n;
}

function StatItem({ s, run, reduce }: { s: Stat; run: boolean; reduce: boolean | null }) {
  const n = useCountUp(s.value, run, reduce);
  return (
    <div className="rounded-2xl border border-line bg-surface p-7 text-center shadow-soft transition-transform duration-300 hover:-translate-y-1">
      <div className="tnum text-[clamp(30px,3.4vw,46px)] font-extrabold leading-none tracking-[-0.03em] text-ink">
        {n.toLocaleString("en-IN")}
        <span className="text-accent-strong">{s.suffix}</span>
      </div>
      <div className="mt-2 text-[14px] font-medium text-muted">{s.label}</div>
    </div>
  );
}

export default function Stats({ items = defaultStats }: { items?: Stat[] }) {
  const reduce = useReducedMotion();
  const [run, setRun] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { setRun(true); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setRun(true); io.disconnect(); } }),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cols = items.length === 4 ? "sm:grid-cols-4" : "sm:grid-cols-3 lg:grid-cols-5";
  return (
    <div ref={ref} className={`grid grid-cols-2 gap-4 ${cols}`}>
      {items.map((s) => (
        <StatItem key={s.label} s={s} run={run} reduce={reduce} />
      ))}
    </div>
  );
}
