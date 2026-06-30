import Link from "next/link";
import Navbar from "../../components/Navbar";

const documents = [
  { title: "Company Profile", file: "/downloads/company-profile.pdf" },
  { title: "Product Catalogue", file: "/downloads/product-catalogue.pdf" },
  { title: "GST Certificate", file: "/downloads/gst-certificate.pdf" },
  { title: "FSSAI License", file: "/downloads/fssai-license.pdf" },
];

export default function DownloadsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-gray-50">
        <section className="mx-auto max-w-7xl px-8 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-600">Downloads</p>
            <h1 className="mt-4 text-4xl font-bold text-green-700 sm:text-5xl">Company documents and product resources</h1>
            <p className="mt-6 text-lg text-gray-600">Download our business documents for quick reference and onboarding.</p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {documents.map((document) => (
              <div key={document.title} className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-green-700">{document.title}</h2>
                <p className="mt-3 text-gray-600">Download a PDF version of this document for your records.</p>
                <Link href={document.file} className="mt-6 inline-flex rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700">
                  Download PDF
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
