import { MetadataRoute } from "next";
import { COMPANY, NAV_ITEMS } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = COMPANY.siteUrl;
  const lastModified = new Date();

  // Derived from NAV_ITEMS so a new page can never be silently left out of the
  // sitemap. The previous hard-coded list omitted /about and /services.
  return NAV_ITEMS.map((item) => ({
    url: `${baseUrl}${item.href === "/" ? "" : item.href}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: item.href === "/" ? 1.0 : 0.8,
  }));
}
