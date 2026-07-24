"use client";

import { site } from "@/content/site";

/**
 * No backend in this phase (per infra rule). Submits via mailto so real
 * enquiries reach the inbox. A hosted form endpoint is a future dependency.
 */
export default function ContactForm() {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget.elements as unknown as Record<string, HTMLInputElement>;
    const body = `Name: ${f.cname.value}\nPhone: ${f.cphone.value}\nEmail: ${f.cemail.value}\nI am a: ${f.crole.value}\n\nMessage:\n${f.cmessage.value}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      "Website enquiry from " + f.cname.value
    )}&body=${encodeURIComponent(body)}`;
  }

  const field = "w-full rounded-[2px] border border-line bg-base px-3.5 py-3 text-[15px] text-ink";
  const label = "block font-mono text-[11px] uppercase tracking-[0.06em] text-muted";

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label}>Full Name</label>
          <input name="cname" type="text" required className={`mt-1.5 ${field}`} placeholder="Your full name" />
        </div>
        <div>
          <label className={label}>Phone Number</label>
          <input name="cphone" type="tel" required className={`mt-1.5 ${field}`} placeholder="+91 93423 58226" />
        </div>
      </div>
      <div>
        <label className={label}>Email Address</label>
        <input name="cemail" type="email" required className={`mt-1.5 ${field}`} placeholder="you@business.com" />
      </div>
      <div>
        <label className={label}>I am a…</label>
        <select name="crole" className={`mt-1.5 ${field}`}>
          <option>Retailer / Shop Owner</option>
          <option>Manufacturer / Supplier</option>
          <option>Investor</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className={label}>Message</label>
        <textarea name="cmessage" rows={4} required className={`mt-1.5 resize-y ${field}`} placeholder="Tell us about your requirements, business, and how we can help…" />
      </div>
      <button type="submit" className="justify-center rounded-[2px] bg-accent px-6 py-3 text-[14.5px] font-semibold text-invert hover:bg-accent-deep">
        Send Message →
      </button>
    </form>
  );
}
