import type { Metadata } from "next";
import PageScaffold from "@/components/PageScaffold";

export const metadata: Metadata = {
  title: "About Us | B2B FMCG Distributor in Chennai",
  description: "The story, mission and company record of Ecoo Basket (Ecoo Hyper Retail Private Limited), a B2B FMCG distributor based in Chennai, Tamil Nadu.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return (
    <PageScaffold
      eyebrow={"Our Story"}
      title={"Built to close the gap between manufacturer and shopkeeper."}
      intro={"Chennai-headquartered, founder-led, and focused on getting distribution basics right before chasing scale."}
    />
  );
}
