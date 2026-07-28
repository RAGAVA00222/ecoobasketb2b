import type { Metadata } from "next";
import "./globals.css";
import UtilityBar from "@/components/UtilityBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import { site } from "@/content/site";

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
    <html lang="en">
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
