import Navbar from "../components/Navbar";

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
                href="/contact"
                className="rounded-lg border border-green-600 px-6 py-3 text-green-700 transition hover:bg-green-50"
              >
                Request Quote
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e"
              className="rounded-xl shadow-xl"
              alt="Warehouse"
            />
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
                <h3 className="text-xl font-bold">🚚 Fast Delivery</h3>
                <p className="mt-3 text-gray-600">
                  Quick delivery across Chennai and surrounding areas.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow">
                <h3 className="text-xl font-bold">🏷 Best Wholesale Price</h3>
                <p className="mt-3 text-gray-600">Competitive pricing for retailers.</p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow">
                <h3 className="text-xl font-bold">📦 5000+ Products</h3>
                <p className="mt-3 text-gray-600">
                  Grocery, Beverages, Personal Care & Home Care.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow">
                <h3 className="text-xl font-bold">🤝 Trusted Partner</h3>
                <p className="mt-3 text-gray-600">Reliable B2B wholesale supplier.</p>
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
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800"
                alt="Warehouse"
                className="rounded-xl shadow-lg"
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
                <li>✅ 5000+ FMCG Products</li>
                <li>✅ 200+ Trusted Brands</li>
                <li>✅ Fast Delivery</li>
                <li>✅ Best Wholesale Pricing</li>
                <li>✅ Dedicated B2B Support</li>
              </ul>

              <a
                href="/downloads"
                className="mt-8 inline-flex rounded-full bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
              >
                View Downloads
              </a>
            </div>
          </div>
        </section>

        <section className="bg-green-700 py-20 text-white">
          <div className="mx-auto max-w-7xl px-8">
            <div className="grid gap-8 text-center md:grid-cols-4">
              <div>
                <h2 className="text-5xl font-bold">5000+</h2>
                <p className="mt-3">Products</p>
              </div>

              <div>
                <h2 className="text-5xl font-bold">200+</h2>
                <p className="mt-3">Brands</p>
              </div>

              <div>
                <h2 className="text-5xl font-bold">1000+</h2>
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

              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full rounded-lg border p-3"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full rounded-lg border p-3"
                />

                <input
                  type="tel"
                  placeholder="Mobile Number"
                  className="w-full rounded-lg border p-3"
                />

                <textarea
                  rows={5}
                  placeholder="Tell us what products you need..."
                  className="w-full rounded-lg border p-3"
                ></textarea>

                <button className="rounded-lg bg-green-600 px-8 py-3 text-white hover:bg-green-700">
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}