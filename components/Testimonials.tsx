import { Star, User, Quote } from "lucide-react";
import Reveal from "@/components/Reveal";

/**
 * Testimonials — STRUCTURAL SHELL ONLY.
 * CONTENT NEEDED: real, attributed partner testimonials (photo, name,
 * business, rating, quote). Do NOT invent reviews — these are empty slots.
 */
export default function Testimonials() {
  return (
    <div className="mt-14 grid gap-5 md:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <Reveal key={i} delay={i * 0.06} className="flex flex-col rounded-3xl border border-dashed border-line bg-surface p-7 shadow-soft">
          <Quote size={30} className="text-accent-strong/25" />
          <div className="mt-3 flex gap-1 text-line" aria-hidden>
            {[0, 1, 2, 3, 4].map((s) => <Star key={s} size={16} />)}
          </div>
          <div className="mt-4 flex-1 space-y-2.5" aria-hidden>
            <div className="h-2.5 w-full rounded bg-line" />
            <div className="h-2.5 w-[92%] rounded bg-line" />
            <div className="h-2.5 w-[78%] rounded bg-line" />
          </div>
          <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-soft text-muted"><User size={20} /></span>
            <div>
              <div className="h-2.5 w-24 rounded bg-line" aria-hidden />
              <div className="mt-1.5 h-2 w-16 rounded bg-line/70" aria-hidden />
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
