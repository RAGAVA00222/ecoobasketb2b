import type { Metadata } from "next";
import PageScaffold from "@/components/PageScaffold";

export const metadata: Metadata = {
  title: "Terms and Conditions | Ecoo Basket Chennai",
  description: "Terms and Conditions for Ecoo Basket, a B2B FMCG distributor in Chennai. Draft pending legal review.",
  alternates: { canonical: "/terms" },
};

export default function Page() {
  return (
    <PageScaffold
      eyebrow={"Legal"}
      title={"Terms and Conditions"}
      intro={"The terms governing use of this website and the services provided by Ecoo Hyper Retail Private Limited."}
    />
  );
}
