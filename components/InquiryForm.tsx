"use client";

import { FormEvent, useState } from "react";
import { COMPANY } from "@/lib/constants";

export default function InquiryForm() {
  const [status, setStatus] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    const subject = encodeURIComponent(
      `Bulk inquiry from ${values.name || "website visitor"}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${values.name || ""}`,
        `Mobile: ${values.mobile || ""}`,
        `Email: ${values.email || ""}`,
        `Business Name: ${values.businessName || ""}`,
        `Message: ${values.message || ""}`,
      ].join("\n")
    );

    window.location.href = `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
    setStatus(
      `Your email app should open. If it doesn't, please send your inquiry to ${COMPANY.email}.`
    );
  };

  return (
    <form
      className="space-y-4 rounded-2xl bg-white p-6 sm:p-8 shadow-sm"
      onSubmit={handleSubmit}
      aria-label="Bulk inquiry form"
    >
      <div>
        <label htmlFor="name" className="sr-only">
          Your Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Your Name"
          className="w-full rounded-lg border border-gray-300 p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          required
          aria-required="true"
        />
      </div>

      <div>
        <label htmlFor="mobile" className="sr-only">
          Mobile Number
        </label>
        <input
          id="mobile"
          name="mobile"
          type="tel"
          placeholder="Mobile Number"
          className="w-full rounded-lg border border-gray-300 p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          required
          pattern="[0-9\s\-\+\(\)]+"
          aria-required="true"
        />
      </div>

      <div>
        <label htmlFor="email" className="sr-only">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email Address"
          className="w-full rounded-lg border border-gray-300 p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          required
          pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$"
          aria-required="true"
        />
      </div>

      <div>
        <label htmlFor="businessName" className="sr-only">
          Business Name
        </label>
        <input
          id="businessName"
          name="businessName"
          type="text"
          placeholder="Business Name"
          className="w-full rounded-lg border border-gray-300 p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        />
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
          className="w-full rounded-lg border border-gray-300 p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          required
          aria-required="true"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
      >
        Send Inquiry
      </button>

      {status && (
        <p className="text-sm text-green-700 font-medium" role="status">
          {status}
        </p>
      )}
    </form>
  );
}
