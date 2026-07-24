"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Coverage map — Chennai is live; other zones are an expansion roadmap
 * marked "coming soon". Stylised (not a surveyed boundary map) until
 * real zone data is confirmed. CONTENT NEEDED: accurate served-zone data.
 */
const zones = [
  { id: "chennai", label: "Chennai", cx: 250, cy: 150, live: true },
  { id: "kanchipuram", label: "Kanchipuram", cx: 210, cy: 190, live: false },
  { id: "vellore", label: "Vellore", cx: 165, cy: 120, live: false },
  { id: "coimbatore", label: "Coimbatore", cx: 70, cy: 210, live: false },
  { id: "madurai", label: "Madurai", cx: 110, cy: 290, live: false },
];

export default function TamilNaduMap() {
  const reduce = useReducedMotion();
  return (
    <div className="grid items-center gap-8 md:grid-cols-[1.2fr_1fr]">
      <div className="rounded-[4px] border border-line bg-surface p-4">
        <svg viewBox="0 0 320 380" className="h-auto w-full" role="img" aria-label="Tamil Nadu coverage — Chennai live, other zones coming soon">
          {/* simplified TN silhouette (illustrative, not a survey boundary) */}
          <path
            d="M150 20 L200 40 L230 90 L280 130 L270 190 L230 250 L190 330 L140 360 L110 330 L70 300 L40 230 L60 170 L50 110 L90 70 L120 40 Z"
            fill="#F1EEE6" stroke="#E6E2D9" strokeWidth="2"
          />
          {zones.map((z, i) => (
            <g key={z.id}>
              {z.live && !reduce && (
                <motion.circle
                  cx={z.cx} cy={z.cy} r="6" fill="#2E9E3A"
                  initial={{ r: 6, opacity: 0.6 }}
                  animate={{ r: 18, opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
              )}
              <circle cx={z.cx} cy={z.cy} r="5" fill={z.live ? "#167C2A" : "#FFFFFF"} stroke={z.live ? "#167C2A" : "#98A2B0"} strokeWidth="1.5" />
              <text x={z.cx + 10} y={z.cy + 4} className="font-mono" fontSize="10" fill={z.live ? "#14324F" : "#566072"}>
                {z.label}{z.live ? "" : " · soon"}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div>
        <p className="text-muted">
          We onboard retailers zone by zone rather than spreading thin — so delivery reliability
          doesn&apos;t slip as we add partners.
        </p>
        <ul className="mt-5 space-y-2 text-[14px]">
          <li className="flex items-center gap-2"><span className="inline-block h-2.5 w-2.5 rounded-full bg-accent" /> <span className="text-ink">Chennai — serving now</span></li>
          <li className="flex items-center gap-2"><span className="inline-block h-2.5 w-2.5 rounded-full border border-[#98A2B0] bg-white" /> <span className="text-muted">Other Tamil Nadu zones — expansion roadmap</span></li>
        </ul>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
          Illustrative coverage — exact zones pending confirmation
        </p>
      </div>
    </div>
  );
}
