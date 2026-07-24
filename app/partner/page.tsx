import type { Metadata } from "next";
import PageScaffold from "@/components/PageScaffold";

export const metadata: Metadata = {
  title: "FMCG Supplier Partnership in Chennai",
  description: "Partner with Ecoo Basket — distribution access, warehouse capacity and digital ordering for FMCG brands across Chennai.",
  alternates: { canonical: "/partner" },
};

export default function Page() {
  return (
    <PageScaffold
      eyebrow={"Grow Together"}
      title={"Partner with a distributor still small enough to answer the phone."}
      intro={"We're an emerging network, not a national giant — which means your brand gets real attention, not a line item."}
    />
  );
}
