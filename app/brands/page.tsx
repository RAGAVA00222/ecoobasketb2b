import Navbar from "../../components/Navbar";

const brands = [
  { name: "ITC", logo: "/brands/itc.png" },
  { name: "Hindustan Unilever", logo: "/brands/hul.png" },
  { name: "Nestlé", logo: "/brands/nestle.png" },
  { name: "Britannia", logo: "/brands/britannia.png" },
  { name: "Parle", logo: "/brands/parle.png" },
  { name: "PepsiCo", logo: "/brands/pepsico.png" },
  { name: "Coca-Cola", logo: "/brands/cocacola.png" },
  { name: "Mondelez", logo: "/brands/mondelez.png" },
  { name: "Godrej", logo: "/brands/godrej.png" },
  { name: "Procter & Gamble", logo: "/brands/pg.png" },
  { name: "Marico", logo: "/brands/marico.png" },
  { name: "Colgate-Palmolive", logo: "/brands/colgate.png" },
  { name: "Reckitt", logo: "/brands/reckitt.png" },
  { name: "Amul", logo: "/brands/amul.png" },
  { name: "Ferrero", logo: "/brands/ferrero.png" },
  { name: "Mars", logo: "/brands/mars.png" },
  { name: "Adani Wilmar", logo: "/brands/adani.png" },
  { name: "Zydus Wellness", logo: "/brands/zydus.png" },
  { name: "Haldiram's", logo: "/brands/haldirams.png" },
  { name: "Kellogg's", logo: "/brands/kelloggs.png" },
  { name: "GSK", logo: "/brands/gsk.png" },
  { name: "Varun Beverages", logo: "/brands/varun.png" },
  { name: "Bajaj Consumer Care", logo: "/brands/bajaj.png" },
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
                <img
                  src={brand.logo}
                  alt={brand.name}
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
