import Link from "next/link";
import Navbar from "../../components/Navbar";
import Image from "next/image";

const categories = [
  {
    title: "Grocery",
    image: "/images/categories/grocery.svg",
    description:
      "Staple food essentials for retailers, supermarkets, and homes.",
    items: ["Rice", "Sugar", "Flour", "Pulses", "Cooking Oil"],
    brands: ["Aachi", "Fortune", "India Gate"],
  },
  {
    title: "Beverages",
    image: "/images/categories/beverages.svg",
    description:
      "Tea, coffee, juices, and soft drinks for everyday demand.",
    items: ["Tea", "Coffee", "Soft Drinks", "Juices"],
    brands: ["Tata Consumer", "Bru", "Paper Boat"],
  },
  {
    title: "Personal Care",
    image: "/images/categories/personal-care.svg",
    description:
      "Daily personal care essentials trusted by modern households.",
    items: ["Soap", "Shampoo", "Toothpaste", "Face Wash"],
    brands: ["HUL", "Dove", "Patanjali"],
  },
  {
    title: "Home Care",
    image: "/images/categories/home-care.svg",
    description:
      "Effective cleaning and hygiene products for homes and businesses.",
    items: ["Detergent", "Floor Cleaner", "Dishwash"],
    brands: ["Lizol", "Surf Excel", "Harpic"],
  },
  {
    title: "Snacks & Biscuits",
    image: "/images/categories/snacks-biscuits.svg",
    description:
      "Popular snack packs and biscuits for retail shelves and festive demand.",
    items: ["Biscuits", "Namkeen", "Chips", "Cookies"],
    brands: ["Parle", "Britannia", "Bikaji"],
  },
  {
    title: "Dairy Products",
    image: "/images/categories/dairy.svg",
    description:
      "Milk products and daily dairy staples for bulk and retail supply.",
    items: ["Milk", "Butter", "Paneer", "Curd"],
    brands: ["Amul", "Arokya", "Nandini"],
  },
];

export default function ProductsPage() {
  return (
    <>
      <Navbar />

      <main className="bg-gray-50">
        <section className="mx-auto max-w-7xl px-8 py-20">
          <div className="max-w-3xl text-center mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-600">
              Our Product Categories
            </p>
            <h1 className="mt-4 text-4xl font-bold text-green-700 sm:text-5xl">
              Premium FMCG products for wholesale and retail businesses
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Ecoo Basket delivers reliable inventory across grocery, beverages,
              personal care, home care, snacks, and dairy products.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {categories.map((category) => (
              <article
                key={category.title}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  width={900}
                  height={320}
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
                    <ul className="mt-2 space-y-1 text-sm text-gray-700">
                      {category.items.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                      Featured Brands
                    </h3>
                    <p className="mt-2 text-sm text-gray-700">
                      {category.brands.join(", ")}
                    </p>
                  </div>

                  <Link
                    href="/contact"
                    className="mt-6 inline-flex rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
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
