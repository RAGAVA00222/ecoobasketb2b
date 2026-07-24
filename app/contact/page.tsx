import type { Metadata } from "next";
import PageScaffold from "@/components/PageScaffold";

export const metadata: Metadata = {
  title: "Contact | FMCG Distributor in Chennai",
  description: "Contact Ecoo Basket in Chennai — office address, phone, WhatsApp and email for B2B FMCG wholesale enquiries.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return (
    <PageScaffold
      eyebrow={"Reach Out"}
      title={"We're easy to reach — and we actually reply."}
      intro={"Manufacturer, retailer, or just curious — here's every way to reach the team directly."}
    />
  );
}
