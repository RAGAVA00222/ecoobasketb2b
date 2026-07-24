import type { Metadata } from "next";
import PageScaffold from "@/components/PageScaffold";

export const metadata: Metadata = {
  title: "Our Vision | FMCG Distribution Chennai",
  description: "The roadmap for Ecoo Basket's growth across Chennai and Tamil Nadu.",
  alternates: { canonical: "/vision" },
};

export default function Page() {
  return (
    <PageScaffold
      eyebrow={"The Road Ahead"}
      title={"Where we're headed — and how we plan to get there."}
      intro={"This is a roadmap, not a promise. We'd rather show you the plan honestly than dress it up as done."}
    />
  );
}
