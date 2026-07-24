import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Container, Section, Eyebrow } from "@/components/primitives";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact | FMCG Distributor in Chennai",
  description: "Contact Ecoo Basket in Chennai — office address, phone, WhatsApp and email for B2B FMCG wholesale enquiries.",
  alternates: { canonical: "/contact" },
};

const mapSrc =
  "https://www.google.com/maps?q=Sf.+No.+215+Pt+No.+120,+Sh+No.+5,+Rajesh+Garden+Main+Road,+Vanagaram,+Poonamallee,+Tiruvallur+600095&output=embed";

const info = [
  { k: "Office", t: "Our Location", body: `${site.registeredOffice}` },
  { k: "Phone", t: "Call or WhatsApp", body: `${site.phone} · Mon–Sat, 9:00 AM–6:00 PM IST` },
  { k: "Email", t: "Write to Us", body: site.email },
  { k: "Online", t: "Websites", body: "Corporate: ecoobasketb2b.com · Order online: ecoobasket.com" },
];

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-line bg-base">
        <Container className="py-14 md:py-20">
          <Eyebrow>Reach Out</Eyebrow>
          <h1 className="mt-4 text-[clamp(30px,4.6vw,46px)]">We&apos;re easy to reach — and we actually reply.</h1>
          <p className="mt-5 max-w-[620px] text-muted">Manufacturer, retailer, or just curious — here&apos;s every way to reach the team directly.</p>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {info.map((c) => (
              <div key={c.k} className="rounded-[3px] border border-line bg-surface p-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">{c.k}</span>
                <h3 className="mt-2 text-[16px]">{c.t}</h3>
                <p className="mt-2 text-[14px] text-muted">{c.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <Eyebrow>Send A Message</Eyebrow>
            <p className="mt-3 text-muted">We reply within one business day — usually sooner.</p>
            <div className="mt-6"><ContactForm /></div>
          </div>
          <div className="overflow-hidden rounded-[4px] border border-line" style={{ minHeight: 340 }}>
            <iframe
              title="Ecoo Basket location — Vanagaram, Chennai"
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 340, display: "block" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
