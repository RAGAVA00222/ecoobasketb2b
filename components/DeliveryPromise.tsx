import { Truck, Clock, IndianRupee } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Container, Eyebrow } from "@/components/primitives";
import { deliveryPromise } from "@/content/site";

/**
 * Home section #2 — the "Now Delivery" hook as its own band.
 * Surfaces the three facts (same-day dispatch, 24–48h across Chennai,
 * free above ₹10,000) on a green→navy gradient. No stat counters.
 * Icons map 1:1 to deliveryPromise.highlights order.
 */
const icons = [Truck, Clock, IndianRupee];

export default function DeliveryPromise() {
  return (
    <section className="forest-grad relative overflow-hidden py-16 text-invert md:py-20">
      <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(60% 120% at 50% -10%, rgba(255,255,255,0.12), transparent 60%)" }} />
      <Container className="relative">
        <Reveal className="max-w-[680px]">
          <Eyebrow onDark>{deliveryPromise.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-invert text-[clamp(26px,3.4vw,40px)]">{deliveryPromise.heading}</h2>
          <p className="mt-4 max-w-[620px] text-[16px] leading-relaxed text-white/85">{deliveryPromise.body}</p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {deliveryPromise.highlights.map((h, i) => {
            const Icon = icons[i] ?? Truck;
            return (
              <Reveal key={h.t} delay={i * 0.06} className="rounded-2xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-sm">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12 text-[#4ADE80]"><Icon size={23} strokeWidth={1.8} /></span>
                <h3 className="mt-4 text-[18px] text-invert">{h.t}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/75">{h.d}</p>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
