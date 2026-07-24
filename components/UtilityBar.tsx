import { site } from "@/content/site";

export default function UtilityBar() {
  return (
    <div className="bg-dark text-invert">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-5 py-2 font-mono text-[11.5px] tracking-[0.06em] sm:px-8">
        <div className="hidden gap-4 sm:flex">
          <span>{site.cityLine}</span>
          <span>{site.hours}</span>
        </div>
        <div className="flex gap-3">
          <a href={`tel:${site.phoneRaw}`} className="text-dark-accent hover:underline">{site.phone}</a>
          <span aria-hidden>·</span>
          <a href={site.orderUrl} target="_blank" rel="noopener noreferrer" className="text-dark-accent hover:underline">ORDER NOW ↗</a>
        </div>
      </div>
    </div>
  );
}
