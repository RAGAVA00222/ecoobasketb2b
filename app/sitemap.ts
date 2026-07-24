import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const routes = [
  "", "about", "services", "we-serve", "kirana", "partner", "founders", "vision",
  "contact", "faq", "investor", "careers", "gallery", "downloads",
  "privacy", "terms", "returns",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${site.domain}/${r}`,
    lastModified: new Date("2026-07-22"),
    changeFrequency: r === "" ? "monthly" : "monthly",
    priority: r === "" ? 1 : r.match(/privacy|terms|returns/) ? 0.3 : 0.7,
  }));
}
