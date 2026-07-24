import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import UtilityBar from "@/components/UtilityBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import { site } from "@/content/site";

const fraunces = Fraunces({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-fraunces", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["500"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: "B2B FMCG Wholesale Distribution in Chennai | Ecoo Basket",
    template: "%s | Ecoo Basket",
  },
  description:
    "Ecoo Hyper Retail Private Limited — B2B FMCG distribution and own-brand Nuts & Spices, Chennai, Tamil Nadu.",
  openGraph: {
    type: "website",
    siteName: "Ecoo Basket",
    locale: "en_IN",
    images: ["/assets/images/logo/06_Logo_Brand_Banner.png"],
  },
  twitter: { card: "summary_large_image", images: ["/assets/images/logo/06_Logo_Brand_Banner.png"] },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body>
        <UtilityBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
