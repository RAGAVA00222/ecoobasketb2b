import { MetadataRoute } from "next";
import { COMPANY } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = COMPANY.website_b2b;

  // Add all your static routes here
  const staticRoutes = ["/", "/founders", "/contact", "/products"];

  const sitemapEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: route === "/" ? 1.0 : 0.8,
  }));

  // If you add dynamic pages later (e.g., for individual products),
  // you would fetch them from your database and map them here.
  // const productEntries = ...

  return [...sitemapEntries];
}