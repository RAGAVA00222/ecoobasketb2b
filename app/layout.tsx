import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ecoo Basket | FMCG Wholesale & Distribution",
  description:
    "Ecoo Basket is a trusted FMCG wholesale and distribution partner supplying groceries, beverages, personal care, home care and bulk essentials across India.",
  keywords: ["FMCG wholesale", "bulk supply", "wholesale distributor", "Ecoo Basket"],
  openGraph: {
    title: "Ecoo Basket | FMCG Wholesale & Distribution",
    description:
      "Trusted FMCG wholesale partner for retailers, supermarkets, hotels, restaurants, and institutions.",
    url: "https://ecoobasketb2b.com",
    siteName: "Ecoo Basket",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ecoo Basket | FMCG Wholesale & Distribution",
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
