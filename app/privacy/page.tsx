import type { Metadata } from "next";
import PageScaffold from "@/components/PageScaffold";

export const metadata: Metadata = {
  title: "Privacy Policy | Ecoo Basket Chennai",
  description: "Privacy Policy for Ecoo Basket, a B2B FMCG distributor in Chennai. Draft pending legal review.",
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return (
    <PageScaffold
      eyebrow={"Legal"}
      title={"Privacy Policy"}
      intro={"How Ecoo Hyper Retail Private Limited handles information collected through this website and our services."}
    />
  );
}
