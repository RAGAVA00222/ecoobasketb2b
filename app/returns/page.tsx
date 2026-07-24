import type { Metadata } from "next";
import LegalLayout, { type LegalSection } from "@/components/LegalLayout";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Return & Refund Policy | Ecoo Basket Chennai",
  description: "Return & Refund Policy for Ecoo Basket, B2B FMCG distributor in Chennai — how returns, replacements and refunds are handled.",
  alternates: { canonical: "/returns" },
};

const sections: LegalSection[] = [
  { h: "1. Damaged or Incorrect Items", body: <p>If an item arrives damaged, defective, or different from what was ordered, please report it to us at the time of delivery or within a reasonable period, with supporting details (such as photos and your invoice number).</p> },
  { h: "2. Reporting a Claim", body: <p>Claims can be raised through your account contact, by phone, WhatsApp, or email. We track claims and follow up on them directly.</p> },
  { h: "3. Replacements & Refunds", body: <p>Where a claim is accepted, we will arrange a replacement, credit, or refund as appropriate. Refund method and timelines depend on the original payment method and order channel (B2B or B2C).</p> },
  { h: "4. Perishable & FMCG Goods", body: <p>Certain FMCG and perishable goods may have specific handling and return conditions for hygiene and safety reasons. These will be communicated where applicable.</p> },
  { h: "5. Non-Returnable Situations", body: <p>Returns may not be accepted where goods have been used, altered, or where a claim is raised outside the applicable reporting window, except as required by law.</p> },
  { h: "6. Contact", body: <p>To raise a return or refund request, email <a href={`mailto:${site.email}`} className="font-semibold text-accent">{site.email}</a> or call <a href={`tel:${site.phoneRaw}`} className="font-semibold text-accent">{site.phone}</a>.</p> },
];

export default function ReturnsPage() {
  return (
    <LegalLayout
      title="Return & Refund Policy"
      intro={`How returns, replacements and refunds are handled for orders placed with ${site.legalName} ("Ecoo Basket").`}
      note="If an order arrives damaged, defective, or wrong, tell us promptly with your invoice details and we'll make it right."
      sections={sections}
    />
  );
}
