import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Organization, WithContext } from "schema-dts";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ASSETS, COMPANY, SOCIAL_LINKS } from "@/lib/constants";
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
    default: `${COMPANY.brandName} | FMCG Wholesale & Distribution`,
    template: `%s | ${COMPANY.brandName}`,
  },
  description:
    "Ecoo Hyper Retail Private Limited — B2B FMCG wholesale distribution to kirana stores, pharmacies and wholesale merchants across Chennai, Tamil Nadu. GSTIN 33AAJCE8472G1ZG.",
  metadataBase: new URL(COMPANY.siteUrl),
  alternates: {
    canonical: "/",
  },
  robots: "index, follow",
  openGraph: {
    description:
      "Ecoo Hyper Retail Private Limited — B2B FMCG wholesale distribution to kirana stores, pharmacies and wholesale merchants across Chennai, Tamil Nadu. GSTIN 33AAJCE8472G1ZG.",
    url: COMPANY.siteUrl,
    siteName: COMPANY.brandName,
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: ASSETS.ogImage,
        width: 1536,
        height: 768,
        alt: `${COMPANY.brandName} - FMCG Wholesale & Distribution Partner`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [ASSETS.ogImage],
  },
};

const organizationSchema: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY.brandName,
  legalName: COMPANY.legalName,
  url: COMPANY.siteUrl,
  logo: `${COMPANY.siteUrl}${ASSETS.logoSquare}`,
  image: `${COMPANY.siteUrl}${ASSETS.ogImage}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${COMPANY.address.line1}, ${COMPANY.address.line2}`,
    addressLocality: "Chennai",
    postalCode: "600095",
    addressRegion: COMPANY.address.state,
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: `+${COMPANY.phoneRaw}`,
    email: COMPANY.email,
    contactType: "Customer Service",
    areaServed: "IN",
  },
  sameAs: SOCIAL_LINKS.map((link) => link.href),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-gray-50 text-gray-900">
        <JsonLd data={organizationSchema} />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
