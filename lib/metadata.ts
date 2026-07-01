/**
 * Metadata utilities for Next.js pages
 */
import type { Metadata } from "next";
import { COMPANY, SEO } from "./constants";

interface PageMetadataOptions {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
}

/**
 * Generate consistent metadata for all pages
 */
export function generatePageMetadata({
  title,
  description,
  keywords = [],
  path = "/",
  ogImage,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const fullTitle = `${title} | ${COMPANY.name}`;
  const allKeywords = [...SEO.baseKeywords, ...keywords];

  return {
    title: fullTitle,
    description,
    keywords: allKeywords,
    metadataBase: new URL(COMPANY.website_b2b),
    alternates: {
      canonical: `${COMPANY.website_b2b}${path}`,
    },
    robots: noIndex ? "noindex, nofollow" : "index, follow",
    openGraph: {
      title: fullTitle,
      description,
      url: `${COMPANY.website_b2b}${path}`,
      siteName: COMPANY.name,
      type: "website",
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}
