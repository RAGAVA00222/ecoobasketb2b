import type { Metadata, Viewport } from "next";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { COMPANY } from "@/lib/constants";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: `${COMPANY.name} | FMCG Wholesale & Distribution`,
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
    title: `${COMPANY.name} | FMCG Wholesale & Distribution`,
    description:
      "Trusted FMCG wholesale partner for retailers, supermarkets, hotels, restaurants, and institutions.",
    url: COMPANY.website_b2b,
    siteName: COMPANY.name,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY.name} | FMCG Wholesale & Distribution`,
    description:
      "Trusted FMCG wholesale partner for retailers, supermarkets, hotels, restaurants, and institutions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className="flex min-h-full flex-col bg-gray-50">
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
