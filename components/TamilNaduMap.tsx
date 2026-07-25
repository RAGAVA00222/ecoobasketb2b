"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Coverage map — Chennai is live; other zones are an expansion roadmap
 * marked "coming soon". Stylised (not a surveyed boundary map), but node
 * positions are geographically faithful relative to each other.
 * CONTENT NEEDED: accurate served-zone data.
 *
 * Label anchoring: nodes on the right half anchor their label to the LEFT
 * (text-anchor="end") so long labels never overflow the viewBox; left-half
 * nodes anchor to the right. lx/ly are hand-tuned to avoid label collisions.
 */
const zones = [
  { id: "chennai", label: "Chennai", cx: 267, cy: 60, live: true, lx: 254, ly: 52, anchor: "end" as const },
  { id: "kanchipuram", label: "Kanchipuram", cx: 237, cy: 73, live: false, lx: 228, ly: 88, anchor: "end" as const },
  { id: "vellore", label: "Vellore", cx: 207, cy: 69, live: false, lx: 198, ly: 64, anchor: "end" as const },
  { id: "coimbatore", label: "Coimbatore", cx: 91, cy: 177, live: false, lx: 101, ly: 181, anchor: "start" as const },
  { id: "madurai", label: "Madurai", cx: 153, cy: 240, live: false, lx: 163, ly: 244, anchor: "start" as const },
];

export default function TamilNaduMap() {
  const reduce = useReducedMotion();
  return (
    <div className="grid items-center gap-8 md:grid-cols-[1.2fr_1fr]">
      <div className="rounded-[4px] border border-line bg-surface p-4">
        <svg viewBox="0 0 320 380" className="h-auto w-full" role="img" aria-label="Tamil Nadu coverage — Chennai live, other zones coming soon">
          {/* Simplified Tamil Nadu silhouette — illustrative, not a survey boundary.
              Chennai sits at the north-east coast; the tip is Kanyakumari. */}
          <path
            d="M150 35 L200 42 L250 52 L278 58 L272 110 L255 165 L238 205 L220 248 L198 292 L168 335 L150 360 L128 335 L108 300 L85 255 L62 205 L55 175 L68 140 L58 105 L80 72 L108 50 L130 40 Z"
            fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="2"
          />
          {zones.map((z) => (
            <g key={z.id}>
              {z.live && !reduce && (
                <motion.circle
                  cx={z.cx} cy={z.cy} r="6" fill="#15803D"
                  initial={{ r: 6, opacity: 0.6 }}
                  animate={{ r: 18, opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
              )}
              <circle cx={z.cx} cy={z.cy} r="5" fill={z.live ? "#15803D" : "#FFFFFF"} stroke={z.live ? "#15803D" : "#9CA3AF"} strokeWidth="1.5" />
              <text x={z.lx} y={z.ly} textAnchor={z.anchor} className="font-mono" fontSize="10" fill={z.live ? "#111827" : "#4B5563"}>
                {z.label}{z.live ? "" : " · soon"}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div>
        <p className="text-muted">
          The solid green marker is where we deliver today. Open markers are zones on the
          expansion roadmap — if yours isn&apos;t live yet, we&apos;ll tell you honestly where it sits.
        </p>
        <ul className="mt-5 space-y-2 text-[14px]">
          <li className="flex items-center gap-2"><span className="inline-block h-2.5 w-2.5 rounded-full bg-accent" /> <span className="text-ink">Chennai — serving now</span></li>
          <li className="flex items-center gap-2"><span className="inline-block h-2.5 w-2.5 rounded-full border border-[#9CA3AF] bg-white" /> <span className="text-muted">Other Tamil Nadu zones — expansion roadmap</span></li>
        </ul>
        {/* CONTENT NEEDED: confirmed served-zone data (map is illustrative, not a survey boundary) */}
      </div>
    </div>
  );
}
