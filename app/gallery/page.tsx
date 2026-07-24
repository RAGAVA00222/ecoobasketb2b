import type { Metadata } from "next";
import PageScaffold from "@/components/PageScaffold";

export const metadata: Metadata = {
  title: "Gallery | Ecoo Basket Chennai",
  description: "Photo gallery of Ecoo Basket operations across Chennai.",
  alternates: { canonical: "/gallery" },
};

export default function Page() {
  return (
    <PageScaffold
      eyebrow={"Gallery"}
      title={"Inside the operation."}
      intro={"Photography of the warehouse, routes and team will be shown here."}
    />
  );
}
