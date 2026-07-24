import type { Metadata } from "next";
import PageScaffold from "@/components/PageScaffold";

export const metadata: Metadata = {
  title: "Founders | B2B FMCG Distributor in Chennai",
  description: "Meet the founding team behind Ecoo Basket, a B2B FMCG distribution company headquartered in Vanagaram, Chennai.",
  alternates: { canonical: "/founders" },
};

export default function Page() {
  return (
    <PageScaffold
      eyebrow={"Leadership"}
      title={"The people behind Ecoo Basket."}
      intro={"A small founding team, deliberately — each with a distinct, accountable role."}
    />
  );
}
