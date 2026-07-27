import fs from "node:fs";
import path from "node:path";
import { Container, Section } from "@/components/primitives";
import { manufacturers } from "@/content/site";

/**
 * Homepage trust strip — confirmed FMCG distribution partners.
 *
 * Build-time gated: reads public/assets/images/partners/ and renders ONLY the
 * partners whose logo file actually exists — so it never requests a missing
 * file (no 404s / no 404-page bytes).
 *
 * Empty-state policy (approved): with ZERO logo files present the whole section
 * does not render — an empty trust strip reads as unfinished. With 1+ files it
 * renders only what exists, centre-laid so a partial set still looks deliberate.
 *
 * To activate: drop <slug>.png (or .svg/.webp/.jpg) into that directory and
 * redeploy. Slugs come from content/site.ts → manufacturers[].slug.
 * CONTENT NEEDED: real, licensed logo files (CONTENT-NEEDED.md #1). Static —
 * nothing animates, nothing to jank.
 */
const PARTNERS_DIR = path.join(process.cwd(), "public", "assets", "images", "partners");
const EXTS = [".svg", ".png", ".webp", ".jpg", ".jpeg"];

function presentLogos() {
  let files: string[] = [];
  try { files = fs.readdirSync(PARTNERS_DIR); } catch { files = []; }
  const set = new Set(files.map((f) => f.toLowerCase()));
  return manufacturers
    .map((m) => {
      const ext = EXTS.find((e) => set.has(`${m.slug}${e}`));
      return ext ? { name: m.name, slug: m.slug, src: `/assets/images/partners/${m.slug}${ext}` } : null;
    })
    .filter((x): x is { name: string; slug: string; src: string } => x !== null);
}

export default function PartnerLogos() {
  const logos = presentLogos();
  if (logos.length === 0) return null; // no files -> section is absent entirely

  return (
    <Section tone="surface" className="py-12 md:py-14">
      <Container>
        <p className="mb-7 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          Trusted to distribute for leading FMCG brands
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
          {logos.map((m) => (
            <div key={m.slug} className="flex h-16 w-32 flex-none items-center justify-center rounded-2xl border border-line bg-surface px-4 shadow-soft sm:w-36">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.src} alt={`${m.name} logo`} className="max-h-9 max-w-full object-contain" />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
