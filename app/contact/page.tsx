import { Metadata } from "next";
import Navbar from "../../components/Navbar";
import InquiryForm from "../../components/InquiryForm";
import { generatePageMetadata } from "@/lib/metadata";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Ecoo Basket for wholesale inquiries, bulk supply requests, and product information. Contact us via phone, email, or inquiry form.",
  keywords: ["contact us", "inquiry", "wholesale contact", "customer support"],
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 bg-gray-50">
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-600">
              Contact Us
            </p>
            <h1 className="mt-4 text-4xl font-bold text-green-700 sm:text-5xl">
              Reach out for product inquiries and bulk supply requests
            </h1>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            <address className="not-italic">
              <div className="rounded-2xl bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-green-700">
                  Office Address
                </h2>
                <p className="mt-4 leading-relaxed text-gray-700">
                  {COMPANY.address.street}
                  <br />
                  {COMPANY.address.area}
                  <br />
                  {COMPANY.address.city} – {COMPANY.address.postalCode}
                  <br />
                  {COMPANY.address.state}, {COMPANY.address.country}
                </p>

                <div className="mt-8 space-y-4 text-gray-700">
                  <p>
                    <span className="block font-semibold">Phone</span>
                    <a
                      href={`tel:${COMPANY.phone_link}`}
                      className="text-green-600 hover:text-green-700 underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                      {COMPANY.phone}
                    </a>
                  </p>
                  <p>
                    <span className="block font-semibold">Email</span>
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="text-green-600 hover:text-green-700 underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                      {COMPANY.email}
                    </a>
                  </p>
                </div>

                <div className="mt-8 overflow-hidden rounded-xl border border-gray-200">
                  <iframe
                    title="Ecoo Basket Location"
                    src="https://www.google.com/maps?q=Plot%20No.%20120,%20Shop%20No.%205,%20Raajas%20Garden,%20Chettiyar%20Agaram,%20Vanagaram,%20Chennai%20600095&output=embed"
                    className="h-64 w-full"
                    loading="lazy"
                    style={{ border: "none" }}
                  />
                </div>
              </div>
            </address>

            <InquiryForm />
          </div>
        </section>
      </main>
    </>
  );
}
