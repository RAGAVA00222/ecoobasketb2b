/**
 * Metadata utilities for Next.js pages
 */
import type { Metadata } from "next";
import { ASSETS, COMPANY } from "./constants";

interface PageMetadataOptions {
  title: string;
  description: string;
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
  path = "/",
  ogImage,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const fullTitle = `${title} | ${COMPANY.brandName}`;
  // Previously pages without an explicit ogImage emitted `images: []`, so every
  // subpage shared to WhatsApp/LinkedIn rendered with no preview image at all.
  const shareImage = ogImage ?? ASSETS.ogImage;

  return {
    // `absolute` bypasses the root layout's "%s | Ecoo Basket" template.
    // Without it child routes rendered "About Us | Ecoo Basket | Ecoo Basket",
    // because fullTitle already contains the brand.
    title: { absolute: fullTitle },
    description,
    metadataBase: new URL(COMPANY.siteUrl),
    alternates: {
      canonical: `${COMPANY.siteUrl}${path}`,
    },
    robots: noIndex ? "noindex, nofollow" : "index, follow",
    openGraph: {
      title: fullTitle,
      description,
      url: `${COMPANY.siteUrl}${path}`,
      siteName: COMPANY.brandName,
      type: "website",
      images: [
        {
          url: shareImage,
          width: 1536,
          height: 768,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [shareImage],
    },
  };
}
