/**
 * Visible placeholder marker for sections awaiting real content.
 * Pair each on-page use with a {/* CONTENT NEEDED: ... *\/} source
 * comment so open placeholders are greppable by "CONTENT NEEDED".
 */
export default function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[2px] border border-dashed border-accent/60 bg-accent-strong/8 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-accent ${className}`}
    >
      <span aria-hidden>◇</span> Placeholder · {label}
    </span>
  );
}
