import type { Metadata } from "next";
import LegalLayout, { type LegalSection } from "@/components/LegalLayout";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms & Conditions | Ecoo Basket Chennai",
  description: "Terms & Conditions for Ecoo Basket, a B2B FMCG distributor in Chennai. Draft pending legal review.",
  alternates: { canonical: "/terms" },
};

const sections: LegalSection[] = [
  { h: "1. Acceptance of Terms", body: <p>By accessing this website or using our services, you agree to these terms. If you do not agree, please do not use the website or services.</p> },
  { h: "2. Use of the Website", body: <p>You agree to use this website only for lawful purposes and not in a way that infringes the rights of, or restricts the use of, this website by others.</p> },
  { h: "3. Orders & Pricing", body: <p>All orders are subject to acceptance and availability. Prices, product ranges and delivery terms may change without notice. Confirmed pricing and terms will be reflected on your order and invoice.</p> },
  { h: "4. B2B & B2C Ordering", body: <p>We provide B2B FMCG distribution to retail and business partners, and B2C online ordering via ecoobasket.com. Certain terms (such as minimum quantities, credit terms or delivery windows) may differ between B2B and B2C channels.</p> },
  { h: "5. Payment", body: <p>Payment terms are as agreed at the time of order. Invoices are issued in accordance with applicable GST regulations.</p> },
  { h: "6. Delivery", body: <p>We aim to meet quoted delivery windows but do not guarantee specific delivery times. Risk in goods passes on delivery.</p> },
  { h: "7. Intellectual Property", body: <p>All content on this website, including logos, text and graphics, is the property of {site.legalName} or its licensors and may not be reproduced without permission.</p> },
  { h: "8. Limitation of Liability", body: <p>To the extent permitted by law, we are not liable for indirect or consequential losses arising from use of this website or our services.</p> },
  { h: "9. Governing Law", body: <p>These terms are governed by the laws of India, with jurisdiction of the courts at Chennai, Tamil Nadu.</p> },
  { h: "10. Contact", body: <p>Questions about these terms? Email <a href={`mailto:${site.email}`} className="font-semibold text-accent">{site.email}</a> or call <a href={`tel:${site.phoneRaw}`} className="font-semibold text-accent">{site.phone}</a>.</p> },
];

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms & Conditions"
      intro={`The terms governing use of this website and the services provided by ${site.legalName} ("Ecoo Basket").`}
      note="These terms are a draft template and should be reviewed by a legal professional before relying on them."
      sections={sections}
    />
  );
}
