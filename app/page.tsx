import Navbar from "../components/Navbar";
import InquiryForm from "../components/InquiryForm";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="bg-gray-50">
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-8 py-20 md:grid-cols-2">
          <div>
            <h1 className="text-6xl font-bold leading-tight text-green-700">
              India&apos;s Trusted
              <br />
              FMCG Wholesale
              <br />
              Distribution Partner
            </h1>

            <p className="mt-6 text-lg text-gray-600">
              Ecoo Basket supplies groceries, beverages, personal care, home care
              and FMCG products to retailers, supermarkets, hotels and
              institutions across India.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/products"
                className="rounded-lg bg-green-600 px-6 py-3 text-white transition hover:bg-green-700"
              >
                Explore Products
              </a>

              <a
                href="https://www.ecoobasket.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition-all duration-300"
              >
                Order Online
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-green-50 to-white rounded-2xl transition duration-500 hover:scale-[1.02]">
              <Image
                src="/images/hero-store.svg"
                alt="Ecoo Basket Kirana Store"
                width={700}
                height={500}
                priority
                className="rounded-xl shadow-xl object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-8 py-20">
          <h2 className="text-center text-4xl font-bold text-green-700">
            Our Product Categories
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-4">
            <div className="rounded-xl bg-white p-6 text-center shadow-lg">
              <h3 className="text-xl font-bold">🥫 Grocery</h3>
              <p className="mt-2 text-gray-600">Rice, Oil, Sugar, Pulses</p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow-lg">
              <h3 className="text-xl font-bold">🥤 Beverages</h3>
              <p className="mt-2 text-gray-600">Tea, Coffee, Juices</p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow-lg">
              <h3 className="text-xl font-bold">🧴 Personal Care</h3>
              <p className="mt-2 text-gray-600">Soap, Shampoo, Toothpaste</p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow-lg">
              <h3 className="text-xl font-bold">🧹 Home Care</h3>
              <p className="mt-2 text-gray-600">Detergent, Cleaner, Dishwash</p>
            </div>
          </div>
        </section>

        <section className="bg-green-50 py-20">
          <div className="mx-auto max-w-7xl px-8">
            <h2 className="text-center text-4xl font-bold text-green-700">
              Why Choose Ecoo Basket?
            </h2>

            <div className="mt-12 grid gap-8 md:grid-cols-4">
              <div className="rounded-xl bg-white p-6 shadow">
                <h3 className="text-xl font-bold">✅ 500+ Products</h3>
                <p className="mt-3 text-gray-600">
                  A focused range of essentials for retailers and distributors.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow">
                <h3 className="text-xl font-bold">✅ 20+ Trusted Brands</h3>
                <p className="mt-3 text-gray-600">Reliable supply from well-known FMCG names.</p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow">
                <h3 className="text-xl font-bold">✅ Fast Delivery</h3>
                <p className="mt-3 text-gray-600">
                  Timely dispatch and dependable support for your business.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow">
                <h3 className="text-xl font-bold">✅ Dedicated B2B Support</h3>
                <p className="mt-3 text-gray-600">A responsive team for wholesale inquiries and order planning.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-8">
            <h2 className="text-center text-4xl font-bold text-green-700">
              Featured Brands
            </h2>

            <p className="mt-3 text-center text-gray-600">
              We distribute India&apos;s leading FMCG brands.
            </p>

            <div className="mt-12 grid gap-6 md:grid-cols-5">
              <div className="rounded-xl border p-6 text-center shadow hover:shadow-lg">
                <h3 className="font-bold">Nestlé</h3>
              </div>

              <div className="rounded-xl border p-6 text-center shadow hover:shadow-lg">
                <h3 className="font-bold">HUL</h3>
              </div>

              <div className="rounded-xl border p-6 text-center shadow hover:shadow-lg">
                <h3 className="font-bold">ITC</h3>
              </div>

              <div className="rounded-xl border p-6 text-center shadow hover:shadow-lg">
                <h3 className="font-bold">Britannia</h3>
              </div>

              <div className="rounded-xl border p-6 text-center shadow hover:shadow-lg">
                <h3 className="font-bold">Parle</h3>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-green-50 py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-8 md:grid-cols-2">
            <div>
              <Image
                src="/images/warehouse.svg"
                alt="Warehouse"
                width={800}
                height={533}
                className="rounded-xl shadow-lg object-cover w-full h-auto"
              />
            </div>

            <div>
              <h2 className="mb-6 text-4xl font-bold text-green-700">
                About Ecoo Basket
              </h2>

              <p className="mb-6 leading-8 text-gray-700">
                Ecoo Basket is a trusted FMCG wholesale and distribution company
                supplying grocery, beverages, personal care, home care and daily
                essentials to retailers, supermarkets, hotels, restaurants and
                institutions across India.
              </p>

              <ul className="space-y-3 text-gray-700">
                <li>✅ 500+ FMCG Products</li>
                <li>✅ 20+ Trusted Brands</li>
                <li>✅ Fast Delivery</li>
                <li>✅ Competitive Wholesale Pricing</li>
                <li>✅ Dedicated B2B Support</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-green-700 py-20 text-white">
          <div className="mx-auto max-w-7xl px-8">
            <div className="grid gap-8 text-center md:grid-cols-4">
              <div>
                <h2 className="text-5xl font-bold">500+</h2>
                <p className="mt-3">Products</p>
              </div>

              <div>
                <h2 className="text-5xl font-bold">20+</h2>
                <p className="mt-3">Trusted Brands</p>
              </div>

              <div>
                <h2 className="text-5xl font-bold">100+</h2>
                <p className="mt-3">Retailers Served</p>
              </div>

              <div>
                <h2 className="text-5xl font-bold">24/7</h2>
                <p className="mt-3">Customer Support</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-8">
            <h2 className="text-center text-4xl font-bold text-green-700">
              What Our Customers Say
            </h2>

            <p className="mt-3 text-center text-gray-600">
              Trusted by retailers and distributors across India.
            </p>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="rounded-xl bg-gray-50 p-8 shadow">
                <p className="italic text-gray-600">
                  &quot;Ecoo Basket provides excellent service and always delivers on time.&quot;
                </p>
                <h3 className="mt-6 font-bold text-green-700">Rajesh Kumar</h3>
                <p className="text-sm text-gray-500">Supermarket Owner</p>
              </div>

              <div className="rounded-xl bg-gray-50 p-8 shadow">
                <p className="italic text-gray-600">
                  &quot;Their wholesale pricing has helped us increase our business profits.&quot;
                </p>
                <h3 className="mt-6 font-bold text-green-700">Priya Stores</h3>
                <p className="text-sm text-gray-500">Retail Partner</p>
              </div>

              <div className="rounded-xl bg-gray-50 p-8 shadow">
                <p className="italic text-gray-600">
                  &quot;Huge product range and reliable customer support.&quot;
                </p>
                <h3 className="mt-6 font-bold text-green-700">Anand Distributors</h3>
                <p className="text-sm text-gray-500">Wholesale Dealer</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-green-50 py-20">
          <div className="mx-auto max-w-7xl px-8">
            <h2 className="text-center text-4xl font-bold text-green-700">
              Contact Ecoo Basket
            </h2>

            <p className="mb-12 mt-3 text-center text-gray-600">
              We are here to help retailers, supermarkets, hotels and distributors.
            </p>

            <div className="grid gap-12 md:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold">📍 Office Address</h3>
                  <p className="text-gray-700">
                    Plot No. 120, Shop No. 5
                    <br />
                    Raajas Garden,
                    <br />
                    Chettiyar Agaram,
                    <br />
                    Vanagaram,
                    <br />
                    Chennai – 600095,
                    <br />
                    Tamil Nadu, India
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold">📞 Phone</h3>
                  <p className="text-gray-700">+91 93423 58226</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold">📧 Email</h3>
                  <p className="text-gray-700">info@ecoobasketb2b.com</p>
                </div>
              </div>

              <InquiryForm />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}