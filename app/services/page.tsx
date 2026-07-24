import type { Metadata } from "next";
import PageScaffold from "@/components/PageScaffold";

export const metadata: Metadata = {
  title: "Services | B2B FMCG Distribution in Chennai",
  description: "Retail distribution, wholesale supply, warehousing, procurement and private label support from Ecoo Basket in Chennai.",
  alternates: { canonical: "/services" },
};

export default function Page() {
  return (
    <PageScaffold
      eyebrow={"What We Offer"}
      title={"Wholesale FMCG distribution, from a manufacturer's dock to a retailer's shelf."}
      intro={"A full range of services, one accountable point of contact for each partner."}
    />
  );
}
