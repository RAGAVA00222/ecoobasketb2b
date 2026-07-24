import type { Metadata } from "next";
import PageScaffold from "@/components/PageScaffold";

export const metadata: Metadata = {
  title: "Investor Relations | Ecoo Basket",
  description: "Ecoo Basket investor relations — growth story, roadmap and market opportunity narrative.",
  alternates: { canonical: "/investor" },
};

export default function Page() {
  return (
    <PageScaffold
      eyebrow={"Investor Relations"}
      title={"The growth story and the road ahead."}
      intro={"A roadmap and market-opportunity narrative for Ecoo Basket. No financial figures."}
    />
  );
}
