import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { MapPin, Phone, Mail, Globe, MessageCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { Container, Section, Eyebrow } from "@/components/primitives";
import PageHero from "@/components/PageHero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact | FMCG Distributor in Chennai",
  description: "Contact Ecoo Basket in Chennai — office address, phone, WhatsApp and email for B2B FMCG wholesale enquiries.",
  alternates: { canonical: "/contact" },
};

const mapSrc =
  "https://www.google.com/maps?q=Sf.+No.+215+Pt+No.+120,+Sh+No.+5,+Rajesh+Garden+Main+Road,+Vanagaram,+Poonamallee,+Tiruvallur+600095&output=embed";

const info: { k: string; t: string; body: string; Icon: LucideIcon }[] = [
  { k: "Office", t: "Our Location", body: `${site.registeredOffice}`, Icon: MapPin },
  { k: "Phone", t: "Call or WhatsApp", body: `${site.phone} · Mon–Sat, 9:00 AM–6:00 PM IST`, Icon: Phone },
  { k: "Email", t: "Write to Us", body: site.email, Icon: Mail },
  { k: "Online", t: "Websites", body: "Corporate: ecoobasketb2b.com · Order online: ecoobasket.com", Icon: Globe },
];

const waDigits = site.phoneRaw.replace(/[^0-9]/g, "");

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Reach Out"
        title="We're easy to reach — and we actually reply."
        subtitle="Manufacturer, retailer, or just curious — here's every way to reach the team directly."
      />

      {/* Info cards */}
      <Section>
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {info.map((c) => (
              <div key={c.k} className="rounded-2xl border border-line bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-strong/40 hover:shadow-soft-lg">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-mint to-mint2 text-accent"><c.Icon size={22} strokeWidth={1.8} /></span>
                <span className="mt-5 block font-mono text-[11px] uppercase tracking-[0.08em] text-accent">{c.k}</span>
                <h3 className="mt-1 text-[16px]">{c.t}</h3>
                <p className="mt-2 text-[14px] text-muted">{c.body}</p>
              </div>
            ))}
          </div>
          {/* quick actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`tel:${site.phoneRaw}`} className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-5 py-3 text-[14.5px] font-semibold text-accent shadow-soft transition-all hover:-translate-y-0.5 hover:border-accent-strong"><Phone size={16} /> Call {site.phone}</a>
            <a href={`https://wa.me/${waDigits}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-5 py-3 text-[14.5px] font-semibold text-accent shadow-soft transition-all hover:-translate-y-0.5 hover:border-accent-strong"><MessageCircle size={16} /> WhatsApp</a>
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-5 py-3 text-[14.5px] font-semibold text-accent shadow-soft transition-all hover:-translate-y-0.5 hover:border-accent-strong"><Mail size={16} /> Email us</a>
          </div>
        </Container>
      </Section>

      {/* Form + map */}
      <Section tone="surface">
        <Container className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <Eyebrow>Send A Message</Eyebrow>
            <p className="mt-3 text-muted">We reply within one business day — usually sooner.</p>
            <div className="mt-6 rounded-3xl border border-line bg-base p-6 shadow-soft sm:p-8"><ContactForm /></div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-line shadow-soft-lg" style={{ minHeight: 360 }}>
            <iframe
              title="Ecoo Basket location — Vanagaram, Chennai"
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 360, display: "block" }}
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
