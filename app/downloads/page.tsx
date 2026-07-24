import type { Metadata } from "next";
import PageScaffold from "@/components/PageScaffold";

export const metadata: Metadata = {
  title: "Download Center | Ecoo Basket",
  description: "Download the Ecoo Basket company profile, brochure and catalogue.",
  alternates: { canonical: "/downloads" },
};

export default function Page() {
  return (
    <PageScaffold
      eyebrow={"Download Center"}
      title={"Company profile, brochures and catalogues."}
      intro={"Downloadable company profile, brochure, catalogue and presentation will be available here."}
    />
  );
}
