import type { LucideIcon } from "lucide-react";
import { MessageCircle, Truck, Wallet } from "lucide-react";
import Reveal from "@/components/Reveal";

/**
 * Buyer-facing "How We Deliver": order → dispatch → pay-on-delivery.
 * Replaces the old 7-step internal DistributionWorkflow. Uses only facts
 * already published on the site. Reveal is slide-only (opacity never animated).
 */
const steps: { n: string; t: string; d: string; Icon: LucideIcon }[] = [
  // Step 1 — CONTENT-NEEDED #5: when the client supplies the minimum order value,
  // append a sentence to this copy, e.g. " Minimum order ₹X." Do NOT invent it.
  { n: "1", t: "Place your order", d: "Order on WhatsApp, by phone, or through our B2B platform at ecoobasket.com. A real account contact sets you up — not a call-centre queue.", Icon: MessageCircle },
  { n: "2", t: "Dispatched same day", d: "Same-day dispatch with 24–48 hour delivery anywhere in Chennai. Orders above ₹10,000 ship free.", Icon: Truck },
  { n: "3", t: "Pay on delivery", d: "Cash or UPI when your stock arrives, against a clean GST-compliant invoice. No credit accounts, no reconciliation chasing.", Icon: Wallet },
];

export default function HowWeDeliver() {
  return (
    <div className="mt-14 grid gap-5 md:grid-cols-3">
      {steps.map((s, i) => (
        <Reveal key={s.n} delay={i * 0.08} className="rounded-2xl border border-line bg-base p-8 shadow-soft">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-gradient-to-br from-mint to-mint2 text-accent"><s.Icon size={23} strokeWidth={1.8} /></span>
            <span className="font-mono text-[13px] font-bold text-accent">Step {s.n}</span>
          </div>
          <h3 className="mt-5 text-[20px]">{s.t}</h3>
          <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{s.d}</p>
        </Reveal>
      ))}
    </div>
  );
}
