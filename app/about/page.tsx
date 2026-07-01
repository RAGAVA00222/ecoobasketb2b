import { Metadata } from "next";
import Navbar from "../../components/Navbar";
import { generatePageMetadata } from "@/lib/metadata";

const stats = [
  { value: "5000+", label: "Products" },
  { value: "200+", label: "Trusted Brands" },
  { value: "1000+", label: "Retailers Served" },
  { value: "24/7", label: "Support" },
];

const values = [
  "Integrity in every transaction",
  "Transparent wholesale pricing",
  "Reliable logistics and delivery",
  "Customer-first B2B support",
];

export const metadata: Metadata = generatePageMetadata({
  title: "About Us",
  description:
    "Learn about Ecoo Basket's mission, vision, and values as a trusted FMCG wholesale distribution company serving retailers and institutions across India.",
  keywords: ["about us", "company mission", "FMCG distributor", "wholesale partner"],
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 bg-gray-50">
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-600">
                Company Overview
              </p>
              <h1 className="mt-4 text-4xl font-bold text-green-700 sm:text-5xl">
                About Ecoo Basket
              </h1>
              <p className="mt-6 text-base text-gray-600 sm:text-lg leading-relaxed">
                Ecoo Basket is a trusted FMCG wholesale and distribution company
                that supplies grocery, beverages, personal care, home care, and
                daily essentials to retailers, supermarkets, hotels,
                restaurants, and institutions across India.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-green-700">Vision</h2>
              <p className="mt-3 text-gray-700">
                To become the most dependable FMCG distribution partner for
                growth-focused retailers and businesses across India.
              </p>

              <h2 className="mt-8 text-2xl font-semibold text-green-700">
                Mission
              </h2>
              <p className="mt-3 text-gray-700">
                To deliver high-quality products, competitive wholesale pricing,
                and excellent service with consistency and speed.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold text-green-700">Our Values</h2>
                <ul className="mt-6 space-y-3 text-gray-700" role="list">
                  {values.map((value) => (
                    <li
                      key={value}
                      className="rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50"
                    >
                      {value}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-green-700">
                  Why Choose Ecoo Basket
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-700">
                  We help businesses stay stocked, reduce procurement complexity,
                  and access premium FMCG products with dependable delivery and
                  tailored support.
                </p>
                <div className="mt-8 rounded-2xl bg-green-50 p-6">
                  <p className="text-gray-700">
                    From small retailers to large institutions, Ecoo Basket offers
                    flexible supply solutions built for rapid growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="bg-green-700 py-16 sm:py-20 text-white"
          aria-label="Company statistics"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 text-center sm:grid-cols-2 md:grid-cols-4">
              {stats.map((stat) => (
                <article key={stat.label}>
                  <dl>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="text-4xl font-bold sm:text-5xl">
                      {stat.value}
                    </dd>
                    <dt className="mt-2 text-base sm:text-lg">{stat.label}</dt>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
