import { Metadata } from "next";
import Navbar from "../../components/Navbar";
import { generatePageMetadata } from "@/lib/metadata";
import { slugify } from "@/lib/utils";
import { SERVICE_DETAILS } from "@/lib/constants";




export const metadata: Metadata = generatePageMetadata({
  title: "Services",
  description:
    "Explore Ecoo Basket's comprehensive FMCG supply services including wholesale distribution, retail supply, supermarket supply, hotel services, and logistics.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 bg-gray-50">
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-600">
              Our Services
            </p>
            <h1 className="mt-4 text-4xl font-bold text-green-700 sm:text-5xl">
              End-to-end FMCG supply solutions for business growth
            </h1>
            <p className="mt-6 text-base text-gray-600 sm:text-lg">
              Ecoo Basket supplies kirana stores, pharmacies and wholesale merchants across Chennai.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {SERVICE_DETAILS.map((service) => (
              <article
                key={service.title}
                id={slugify(service.title)}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-md"
              >
                <h2 className="text-xl font-semibold text-green-700">
                  {service.title}
                </h2>
                <p className="mt-3 text-gray-600">{service.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
