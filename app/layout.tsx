import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Organization } from "schema-dts";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { COMPANY, SOCIAL_LINKS } from "@/lib/constants";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: {
    default: `${COMPANY.name} | FMCG Wholesale & Distribution`,
    template: `%s | ${COMPANY.name}`,
  },
  description:
    "Ecoo Basket is a trusted FMCG wholesale and distribution partner supplying groceries, beverages, personal care, home care and bulk essentials across India.",
  keywords: [
    "FMCG wholesale",
    "bulk supply",
    "wholesale distributor",
    "Ecoo Basket",
    "distribution",
  ],
  metadataBase: new URL(COMPANY.website_b2b),
  alternates: {
    canonical: "/",
  },
  robots: "index, follow",
  openGraph: {
    description:
      "Trusted FMCG wholesale partner for retailers, supermarkets, hotels, restaurants, and institutions.",
    url: COMPANY.website_b2b,
    siteName: COMPANY.name,
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/images/social-banner.png", // Assuming this image exists in `public/images/`
        width: 1200,
        height: 630,
        alt: `${COMPANY.name} - FMCG Wholesale & Distribution Partner`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

const organizationSchema: Organization = {
  "@type": "Organization",
  name: COMPANY.name,
  url: COMPANY.website_b2b,
  logo: `${COMPANY.website_b2b}/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: COMPANY.phone,
    contactType: "Customer Service",
  },
  sameAs: SOCIAL_LINKS.map((link) => link.href),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}>
      <JsonLd
        data={organizationSchema as any}
      />
      <body className="flex min-h-full flex-col bg-gray-50">
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
