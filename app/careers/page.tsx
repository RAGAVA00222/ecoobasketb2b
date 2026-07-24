import type { Metadata } from "next";
import PageScaffold from "@/components/PageScaffold";

export const metadata: Metadata = {
  title: "Careers | Ecoo Basket Chennai",
  description: "Careers at Ecoo Basket, a B2B FMCG distributor in Chennai.",
  alternates: { canonical: "/careers" },
};

export default function Page() {
  return (
    <PageScaffold
      eyebrow={"Careers"}
      title={"Build the distribution network Chennai actually relies on."}
      intro={"Roles and hiring information will be listed here."}
    />
  );
}
