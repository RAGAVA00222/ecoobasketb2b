import type { Metadata } from "next";
import PageScaffold from "@/components/PageScaffold";

export const metadata: Metadata = {
  title: "Return and Refund Policy | Ecoo Basket Chennai",
  description: "Return and Refund Policy for Ecoo Basket, B2B FMCG distributor in Chennai. Draft pending legal review.",
  alternates: { canonical: "/returns" },
};

export default function Page() {
  return (
    <PageScaffold
      eyebrow={"Legal"}
      title={"Return and Refund Policy"}
      intro={"How returns, replacements and refunds are handled for orders placed with Ecoo Hyper Retail Private Limited."}
    />
  );
}
