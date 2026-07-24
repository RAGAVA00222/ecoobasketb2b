import type { Metadata } from "next";
import PageScaffold from "@/components/PageScaffold";

export const metadata: Metadata = {
  title: "FAQ | B2B FMCG Wholesale in Chennai",
  description: "Frequently asked questions about Ecoo Basket — delivery areas, wholesale ordering, delivery times, and B2B/B2C options in Chennai.",
  alternates: { canonical: "/faq" },
};

export default function Page() {
  return (
    <PageScaffold
      eyebrow={"Questions and Answers"}
      title={"Frequently asked questions."}
      intro={"Straight answers to the things retailers and suppliers ask us most."}
    />
  );
}
