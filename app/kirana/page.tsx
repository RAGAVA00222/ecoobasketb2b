import type { Metadata } from "next";
import PageScaffold from "@/components/PageScaffold";

export const metadata: Metadata = {
  title: "For Kirana Stores | FMCG Wholesale Chennai",
  description: "How Ecoo Basket solves the real problems Chennai kirana store owners face with FMCG distributors.",
  alternates: { canonical: "/kirana" },
};

export default function Page() {
  return (
    <PageScaffold
      eyebrow={"For Kirana and General Trade"}
      title={"The problems every kirana owner knows — and how we actually fix them."}
      intro={"Not a sales pitch. Just the specific things that go wrong with distributors, and what we do differently."}
    />
  );
}
