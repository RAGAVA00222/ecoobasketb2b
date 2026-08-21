import { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import { generatePageMetadata } from "@/lib/metadata";
import { slugify } from "@/lib/utils";
import { PRODUCT_CATEGORY_DETAILS } from "@/lib/constants";




export const metadata: Metadata = generatePageMetadata({
  title: "Products",
  description:
    "Browse our comprehensive range of FMCG products including grocery, beverages, personal care, home care, snacks, and dairy. Premium wholesale products for retailers and institutions.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 bg-gray-50">
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-600">
              Our Product Categories
            </p>
            <h1 className="mt-4 text-4xl font-bold text-green-700 sm:text-5xl">
              Premium FMCG products for wholesale and retail businesses
            </h1>
            <p className="mt-6 text-base text-gray-600 sm:text-lg">
              Ecoo Basket delivers reliable inventory across grocery, beverages,
              personal care, home care, snacks, and dairy products.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCT_CATEGORY_DETAILS.map((category) => (
              <article
                key={category.title}
                id={slugify(category.title)}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <Image
                  src={category.image}
                  alt={`${category.title} products supplied by Ecoo Basket`}
                  width={900}
                  height={320}
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-48 w-full object-cover"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-green-700">
                    {category.title}
                  </h2>
                  <p className="mt-3 text-gray-600">{category.description}</p>

                  <div className="mt-5">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                      Key Items
                    </h3>
                    <ul className="mt-2 space-y-1 text-sm text-gray-700" role="list">
                      {category.items.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href="/contact"
                    className="mt-6 inline-flex rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  >
                    Request Quote
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
