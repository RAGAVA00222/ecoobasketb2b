import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono, Noto_Sans_Tamil } from "next/font/google";
import "./globals.css";
import UtilityBar from "@/components/UtilityBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import { site } from "@/content/site";

// Self-hosted by next/font at build time — no runtime request to Google, and
// fallback metrics are size-adjusted so swapping in the real face causes no CLS.
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-jakarta", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["500"], variable: "--font-jetbrains", display: "swap" });
// Tamil (bilingual /kirana copy). preload:false — only pages that actually
// render Tamil glyphs pull the file down, so English-only pages pay nothing.
const notoTamil = Noto_Sans_Tamil({ subsets: ["tamil"], weight: ["400", "600"], variable: "--font-tamil", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: "B2B FMCG Wholesale Distributor in Chennai | Ecoo Basket",
    template: "%s | Ecoo Basket",
  },
  description:
    "Ecoo Basket supplies FMCG products to kirana and retail stores across Chennai with wholesale case rates, GST billing, same-day dispatch and 24–48 hour delivery.",
  keywords: [
    "B2B FMCG wholesale Chennai", "FMCG distributor Chennai", "kirana store supplier Chennai",
    "grocery wholesale Chennai", "biscuit wholesale Chennai", "beverage wholesale Chennai",
  ],
  applicationName: "Ecoo Basket",
  category: "B2B FMCG Wholesale Distribution",
  openGraph: {
    type: "website",
    url: site.domain,
    siteName: "Ecoo Basket",
    title: "B2B FMCG Wholesale Distributor in Chennai | Ecoo Basket",
    description: "Wholesale FMCG supply for kirana and retail stores across Chennai with GST billing and reliable delivery.",
    locale: "en_IN",
    images: [{ url: "/assets/images/logo/06_Logo_Brand_Banner.png", alt: "Ecoo Basket B2B FMCG Wholesale Chennai" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "B2B FMCG Wholesale Distributor in Chennai | Ecoo Basket",
    description: "Wholesale FMCG supply for kirana and retail stores across Chennai.",
    images: ["/assets/images/logo/06_Logo_Brand_Banner.png"],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable} ${jetbrains.variable} ${notoTamil.variable}`}>
      <body>
        {/* Self-heal any stale service worker / cache-storage from earlier deployments */}
        <script
          dangerouslySetInnerHTML={{
            __html: "(function(){try{if('serviceWorker' in navigator){navigator.serviceWorker.getRegistrations().then(function(rs){rs.forEach(function(r){r.unregister()})}).catch(function(){})}if(window.caches&&caches.keys){caches.keys().then(function(ks){ks.forEach(function(k){caches.delete(k)})}).catch(function(){})}}catch(e){}})();",
          }}
        />
        <UtilityBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
