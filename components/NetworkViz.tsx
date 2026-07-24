/**
 * Logistics network visualization — a live hub-and-spoke: Chennai HQ at the
 * centre feeding warehouse + retail node types, with emerald packets flowing
 * along the routes. Pure SVG + CSS/SMIL (no client JS). Illustrative model.
 */
type Node = { x: number; y: number; label: string; d: string; icon: React.ReactNode };

const routes: Node[] = [
  { x: 120, y: 92, label: "Warehouse", d: "M320 230 Q 210 150 120 92",
    icon: <path d="M-8 4 L0 -6 L8 4 M-6 4 V10 H6 V4" /> },
  { x: 520, y: 92, label: "Supermarket", d: "M320 230 Q 430 150 520 92",
    icon: <path d="M-8 -4 H8 V8 H-8 Z M-8 -4 L-6 -9 H6 L8 -4" /> },
  { x: 78, y: 250, label: "Kirana Store", d: "M320 230 Q 188 250 78 250",
    icon: <path d="M-7 -2 H7 V9 H-7 Z M-9 -2 L-6 -8 H6 L9 -2 M-2 9 V2 H2 V9" /> },
  { x: 562, y: 250, label: "Pharmacy", d: "M320 230 Q 452 250 562 250",
    icon: <path d="M-7 -7 H7 V7 H-7 Z M0 -3 V3 M-3 0 H3" /> },
  { x: 176, y: 402, label: "HORECA", d: "M320 230 Q 236 330 176 402",
    icon: <path d="M-6 -8 V0 M-3 -8 V0 M-4.5 0 V9 M5 -8 C1 -8 1 0 5 0 V9" /> },
  { x: 464, y: 402, label: "Wholesale", d: "M320 230 Q 404 330 464 402",
    icon: <path d="M-8 -3 L0 -8 L8 -3 V6 L0 10 L-8 6 Z M0 -8 V10 M-8 -3 L0 1 L8 -3" /> },
];

export default function NetworkViz() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-4 shadow-soft sm:p-6">
      <svg
        viewBox="0 0 640 470"
        className="h-auto w-full"
        role="img"
        aria-label="Logistics network: Chennai HQ connected to warehouse, kirana stores, supermarkets, pharmacies, HORECA and wholesale partners with delivery routes"
      >
        <defs>
          <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#16A34A" stopOpacity="0.28" />
            <stop offset="1" stopColor="#16A34A" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hubFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#22C55E" />
            <stop offset="1" stopColor="#15803D" />
          </linearGradient>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0V32" fill="none" stroke="#EEF2F6" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="640" height="470" fill="url(#grid)" rx="18" />
        <circle cx="320" cy="230" r="150" fill="url(#hubGlow)" />

        {/* routes */}
        {routes.map((n, i) => (
          <path key={`r${i}`} d={n.d} fill="none" stroke="#16A34A" strokeWidth="1.6"
            strokeLinecap="round" className="anim-dash" style={{ opacity: 0.65 }} />
        ))}

        {/* flowing packets */}
        {routes.map((n, i) => (
          <circle key={`p${i}`} r="4.5" fill="#16A34A">
            <animateMotion path={n.d} dur={`${4.2 + i * 0.5}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* outer nodes */}
        {routes.map((n, i) => (
          <g key={`n${i}`} transform={`translate(${n.x},${n.y})`}>
            <circle r="26" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
            <g stroke="#15803D" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round">
              {n.icon}
            </g>
            <text y="42" textAnchor="middle" fontSize="12.5" fontWeight="600" fill="#334155"
              fontFamily="ui-sans-serif, system-ui, sans-serif">{n.label}</text>
          </g>
        ))}

        {/* hub */}
        <circle className="anim-pulse" cx="320" cy="230" r="34" fill="#16A34A" opacity="0.22" />
        <circle className="anim-pulse" cx="320" cy="230" r="34" fill="#16A34A" opacity="0.22" style={{ animationDelay: "1.5s" }} />
        <circle cx="320" cy="230" r="34" fill="url(#hubFill)" />
        <g stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="translate(320,230)">
          <path d="M-12 -2 H4 V8 H-12 Z M4 1 H10 L13 5 V8 H4" />
          <circle cx="-6" cy="12" r="2.4" /><circle cx="9" cy="12" r="2.4" />
        </g>
        <text x="320" y="292" textAnchor="middle" fontSize="14" fontWeight="800" fill="#0F172A"
          fontFamily="ui-sans-serif, system-ui, sans-serif">Chennai HQ</text>
        <text x="320" y="308" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803D"
          fontFamily="ui-sans-serif, system-ui, sans-serif">LIVE OPERATIONS</text>
      </svg>
    </div>
  );
}
