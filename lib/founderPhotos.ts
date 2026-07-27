import fs from "node:fs";
import path from "node:path";

/**
 * Server-only build-time headshot gate (same rule as the partner-logo strip):
 * returns the public path to a leader's webp headshot only if the file exists,
 * otherwise null — so the image region is skipped and no request is made for a
 * missing file. NOTE: fs — import from server components only.
 */
const DIR = path.join(process.cwd(), "public", "assets", "images", "founders");

export function founderPhoto(slug: string): string | null {
  try {
    return fs.existsSync(path.join(DIR, `${slug}.webp`)) ? `/assets/images/founders/${slug}.webp` : null;
  } catch {
    return null;
  }
}
