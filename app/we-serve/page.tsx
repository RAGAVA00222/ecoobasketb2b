import type { Metadata } from "next";
import PageScaffold from "@/components/PageScaffold";

export const metadata: Metadata = {
  title: "Industries We Serve | FMCG Wholesale Chennai",
  description: "The retail sectors Ecoo Basket serves across Chennai today and where our coverage is expanding.",
  alternates: { canonical: "/we-serve" },
};

export default function Page() {
  return (
    <PageScaffold
      eyebrow={"Our Reach"}
      title={"Who we serve today, and where we're headed."}
      intro={"We'd rather be precise about our current base than list every sector we might reach someday."}
    />
  );
}
