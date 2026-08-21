"use client";

import { FormEvent, useState } from "react";
import { COMPANY } from "@/lib/constants";

/*
  LEAD CAPTURE
  --------------------------------------------------------------------------
  Submits to POST /api/leads, which validates server-side and forwards the
  lead to whichever destination is configured (webhook and/or email).

  The endpoint NEVER reports success unless a destination actually accepted
  the lead. If delivery is unconfigured or fails, the visitor is told plainly
  and shown the WhatsApp fallback - the one thing this form must never do is
  claim an enquiry was sent when it was not.

  No credential is referenced here. All secrets live server-side in the route.
  --------------------------------------------------------------------------
*/

const INPUT_CLASS =
  "w-full rounded-lg border border-gray-300 p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:cursor-not-allowed disabled:bg-gray-50";

type Status = "idle" | "submitting" | "success" | "error";

export default function InquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [whatsappHref, setWhatsappHref] = useState("");

  const submitting = status === "submitting";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Guard against a double-tap racing past the disabled attribute.
    if (submitting) return;

    const form = event.currentTarget;
    const values = Object.fromEntries(
      new FormData(form).entries()
    ) as Record<string, string>;

    setStatus("submitting");
    setFieldErrors({});
    setMessage("");

    // Prepared up front so it is ready if delivery fails and we need to offer
    // the visitor a channel that definitely works.
    const summary = [
      "Bulk enquiry from " + (values.name || "website visitor"),
      "Name: " + (values.name || ""),
      "Mobile: " + (values.mobile || ""),
      "Email: " + (values.email || ""),
      "Business Name: " + (values.businessName || ""),
      "Area: " + (values.area || ""),
      "Message: " + (values.message || ""),
    ].join("\n");
    setWhatsappHref(
      "https://wa.me/" +
        COMPANY.phoneRaw +
        "?text=" +
        encodeURIComponent(summary)
    );

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.ok) {
        setStatus("success");
        setMessage(data.message || "Thank you - your enquiry has been received.");
        form.reset();
        return;
      }

      setStatus("error");
      setFieldErrors(data.fields || {});
      setMessage(
        data.error || "We could not submit your enquiry. Please try again."
      );
    } catch {
      // Network failure, offline, or the request was blocked.
      setStatus("error");
      setMessage(
        "We could not reach our server. Please check your connection, or send your enquiry on WhatsApp."
      );
    }
  };

  // After a successful submit, replace the form with a confirmation so the
  // same enquiry cannot be sent twice by accident.
  if (status === "success") {
    return (
      <div
        className="space-y-4 rounded-2xl bg-white p-6 sm:p-8 shadow-sm"
        role="status"
        aria-live="polite"
      >
        <h2 className="text-2xl font-semibold text-green-700">Enquiry received</h2>
        <p className="text-gray-700">{message}</p>
        <p className="text-sm text-gray-600">
          For anything urgent, call{" "}
          <a
            href={"tel:+" + COMPANY.phoneRaw}
            className="font-semibold text-green-700 underline"
          >
            {COMPANY.phone}
          </a>{" "}
          or message us on WhatsApp.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setMessage("");
          }}
          className="w-full rounded-full border border-green-600 px-6 py-3 font-semibold text-green-700 transition hover:bg-green-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      className="space-y-4 rounded-2xl bg-white p-6 sm:p-8 shadow-sm"
      onSubmit={handleSubmit}
      aria-label="Bulk inquiry form"
      noValidate={false}
    >
      {/*
        Honeypot. Hidden from sight and from screen readers, and skipped in the
        tab order, so no human fills it. Bots that fill every input get rejected.
      */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="company">Company (leave blank)</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="name" className="sr-only">
          Your Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your Name"
          className={INPUT_CLASS}
          required
          aria-required="true"
          aria-invalid={fieldErrors.name ? true : undefined}
          disabled={submitting}
        />
        {fieldErrors.name && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="mobile" className="sr-only">
          Mobile Number
        </label>
        <input
          id="mobile"
          name="mobile"
          type="tel"
          autoComplete="tel"
          placeholder="Mobile Number"
          className={INPUT_CLASS}
          required
          inputMode="numeric"
          aria-required="true"
          aria-invalid={fieldErrors.mobile ? true : undefined}
          disabled={submitting}
        />
        {fieldErrors.mobile && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.mobile}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="sr-only">
          Email Address (optional)
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email Address (optional)"
          className={INPUT_CLASS}
          aria-invalid={fieldErrors.email ? true : undefined}
          disabled={submitting}
        />
        {fieldErrors.email && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="businessName" className="sr-only">
          Shop / Business Name
        </label>
        <input
          id="businessName"
          name="businessName"
          type="text"
          autoComplete="organization"
          placeholder="Shop / Business Name"
          className={INPUT_CLASS}
          aria-invalid={fieldErrors.businessName ? true : undefined}
          disabled={submitting}
        />
        {fieldErrors.businessName && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.businessName}</p>
        )}
      </div>

      <div>
        <label htmlFor="area" className="sr-only">
          Area / Locality
        </label>
        <input
          id="area"
          name="area"
          type="text"
          autoComplete="address-level2"
          placeholder="Area / Locality"
          className={INPUT_CLASS}
          aria-invalid={fieldErrors.area ? true : undefined}
          disabled={submitting}
        />
        {fieldErrors.area && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.area}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us what products or quantities you need..."
          className={INPUT_CLASS}
          required
          aria-required="true"
          aria-invalid={fieldErrors.message ? true : undefined}
          disabled={submitting}
        />
        {fieldErrors.message && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        aria-busy={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:cursor-not-allowed disabled:bg-green-400"
      >
        {submitting && (
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
          />
        )}
        {submitting ? "Sending..." : "Send Inquiry"}
      </button>

      {status === "error" && message && (
        <div className="space-y-3" role="alert" aria-live="assertive">
          <p className="text-sm font-medium text-red-600">{message}</p>
          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full border border-green-600 px-6 py-3 font-semibold text-green-700 transition hover:bg-green-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Send this enquiry on WhatsApp instead
            </a>
          )}
        </div>
      )}
    </form>
  );
}
