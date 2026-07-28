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
