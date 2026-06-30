import Navbar from "../../components/Navbar";

import Image from "next/image";

const brands = [
  { name: "ITC", logo: "/images/brands/itc.svg" },
  { name: "Hindustan Unilever", logo: "/images/brands/hul.svg" },
  { name: "Nestlé", logo: "/images/brands/nestle.svg" },
  { name: "Britannia", logo: "/images/brands/britannia.svg" },
  { name: "Parle", logo: "/images/brands/parle.svg" },
  { name: "PepsiCo", logo: "/images/brands/pepsico.svg" },
  { name: "Coca-Cola", logo: "/images/brands/cocacola.svg" },
  { name: "Mondelez", logo: "/images/brands/mondelez.svg" },
  { name: "Godrej", logo: "/images/brands/godrej.svg" },
  { name: "Procter & Gamble", logo: "/images/brands/pg.svg" },
  { name: "Marico", logo: "/images/brands/marico.svg" },
  { name: "Colgate-Palmolive", logo: "/images/brands/colgate.svg" },
  { name: "Reckitt", logo: "/images/brands/reckitt.svg" },
  { name: "Amul", logo: "/images/brands/amul.svg" },
  { name: "Ferrero", logo: "/images/brands/ferrero.svg" },
  { name: "Mars", logo: "/images/brands/mars.svg" },
  { name: "Adani Wilmar", logo: "/images/brands/adani.svg" },
  { name: "Zydus Wellness", logo: "/images/brands/zydus.svg" },
  { name: "Haldiram's", logo: "/images/brands/haldirams.svg" },
  { name: "Kellogg's", logo: "/images/brands/kelloggs.svg" },
  { name: "GSK", logo: "/images/brands/gsk.svg" },
  { name: "Varun Beverages", logo: "/images/brands/varun.svg" },
  { name: "Bajaj Consumer Care", logo: "/images/brands/bajaj.svg" },
];

export default function BrandsPage() {
  return (
    <>
      <Navbar />

      <main className="bg-gray-50">
        <section className="mx-auto max-w-7xl px-8 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-600">
              Brand Portfolio
            </p>
            <h1 className="mt-4 text-4xl font-bold text-green-700 sm:text-5xl">
              Trusted brands powering FMCG demand across India
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Ecoo Basket distributes leading FMCG brands for grocery,
              beverages, personal care, and home care categories.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="rounded-xl bg-white p-6 text-center shadow-md transition hover:shadow-xl"
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={160}
                  height={64}
                  className="mx-auto h-16 object-contain"
                />

                <h3 className="mt-4 font-semibold text-gray-800">{brand.name}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
