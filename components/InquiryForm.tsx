"use client";

import { FormEvent, useState } from "react";

export default function InquiryForm() {
  const [status, setStatus] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries()) as Record<string, string>;

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

    window.location.href = `mailto:info@ecoobasketb2b.com?subject=${subject}&body=${body}`;
    setStatus("Your email app should open with the inquiry details. Please send it to complete the request.");
  };

  return (
    <form className="space-y-4 rounded-2xl bg-white p-8 shadow-sm" onSubmit={handleSubmit}>
      <input
        name="name"
        type="text"
        placeholder="Your Name"
        className="w-full rounded-lg border border-gray-300 p-3"
        required
      />
      <input
        name="mobile"
        type="tel"
        placeholder="Mobile Number"
        className="w-full rounded-lg border border-gray-300 p-3"
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email Address"
        className="w-full rounded-lg border border-gray-300 p-3"
        required
      />
      <input
        name="businessName"
        type="text"
        placeholder="Business Name"
        className="w-full rounded-lg border border-gray-300 p-3"
      />
      <textarea
        name="message"
        rows={5}
        placeholder="Tell us what products or quantities you need..."
        className="w-full rounded-lg border border-gray-300 p-3"
        required
      />
      <button className="rounded-full bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700">
        Send Inquiry
      </button>
      {status ? <p className="text-sm text-green-700">{status}</p> : null}
    </form>
  );
}
