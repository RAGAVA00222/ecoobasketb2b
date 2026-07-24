import type { Metadata } from "next";
import LegalLayout, { type LegalSection } from "@/components/LegalLayout";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Ecoo Basket Chennai",
  description: "Privacy Policy for Ecoo Basket, a B2B FMCG distributor in Chennai — how we handle information collected through this website and our services.",
  alternates: { canonical: "/privacy" },
};

const sections: LegalSection[] = [
  { h: "1. Information We Collect", body: <p>We may collect information you provide directly — such as your name, business name, phone number, email address and order details — when you contact us, place an order, or register as a retail or supplier partner. We may also collect basic technical information (such as browser type and pages visited) automatically when you use this website.</p> },
  { h: "2. How We Use Information", body: <p>We use information to process and deliver orders, provide customer support, manage partner relationships, issue GST-compliant invoices, improve our services, and communicate about your orders and enquiries. We do not sell your personal information.</p> },
  { h: "3. Sharing of Information", body: <p>We may share information with service providers who help us operate (for example, logistics and payment partners), and where required by law. Any such sharing is limited to what is necessary for the stated purpose.</p> },
  { h: "4. Data Security & Retention", body: <p>We take reasonable measures to protect information against unauthorised access, and retain it only as long as necessary for the purposes described here or as required by applicable law.</p> },
  { h: "5. Cookies", body: <p>This website may use basic cookies or similar technologies to support functionality and understand usage. You can control cookies through your browser settings.</p> },
  { h: "6. Your Rights", body: <p>Subject to applicable law, you may request access to, correction of, or deletion of your personal information by contacting us using the details below.</p> },
  { h: "7. Contact Us", body: <p>Questions about this policy? Email <a href={`mailto:${site.email}`} className="font-semibold text-accent">{site.email}</a> or call <a href={`tel:${site.phoneRaw}`} className="font-semibold text-accent">{site.phone}</a>.</p> },
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      intro={`How ${site.legalName} ("Ecoo Basket", "we") handles information collected through this website and our services.`}
      note="We collect only what we need to serve you, and we never sell your personal information. Questions are welcome — our contact details are at the end."
      sections={sections}
    />
  );
}
