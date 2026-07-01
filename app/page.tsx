import Navbar from "../components/Navbar";
import InquiryForm from "../components/InquiryForm";
import Image from "next/image";

// Product category data
const productCategories = [
  {
    icon: "🥫",
    title: "Grocery",
    description: "Rice, Oil, Sugar, Pulses",
  },
  {
    icon: "🥤",
    title: "Beverages",
    description: "Tea, Coffee, Juices",
  },
  {
    icon: "🧴",
    title: "Personal Care",
    description: "Soap, Shampoo, Toothpaste",
  },
  {
    icon: "🧹",
    title: "Home Care",
    description: "Detergent, Cleaner, Dishwash",
  },
];

// Why choose us data
const reasons = [
  {
    title: "500+ Products",
    description: "A focused range of essentials for retailers and distributors.",
  },
  {
    title: "20+ Trusted Brands",
    description: "Reliable supply from well-known FMCG names.",
  },
  {
    title: "Fast Delivery",
    description: "Timely dispatch and dependable support for your business.",
  },
  {
    title: "Dedicated B2B Support",
    description: "A responsive team for wholesale inquiries and order planning.",
  },
];

// Statistics data
const stats = [
  { value: "500+", label: "Products" },
  { value: "20+", label: "Trusted Brands" },
  { value: "100+", label: "Retailers Served" },
  { value: "24/7", label: "Customer Support" },
];

// Testimonials data
const testimonials = [
  {
    quote:
      "Ecoo Basket provides excellent service and always delivers on time.",
    author: "Rajesh Kumar",
    role: "Supermarket Owner",
  },
  {
    quote:
      "Their wholesale pricing has helped us increase our business profits.",
    author: "Priya Stores",
    role: "Retail Partner",
  },
  {
    quote: "Huge product range and reliable customer support.",
    author: "Anand Distributors",
    role: "Wholesale Dealer",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="bg-gray-50">
        {/* Hero Section */}
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:px-8 lg:py-20 md:grid-cols-2">
          <div>
            <h1 className="text-5xl font-bold leading-tight text-green-700 sm:text-6xl">
              India&apos;s Trusted
              <br />
              FMCG Wholesale
              <br />
              Distribution Partner
            </h1>

            <p className="mt-6 text-base text-gray-600 sm:text-lg">
              Ecoo Basket supplies groceries, beverages, personal care, home care
              and FMCG products to retailers, supermarkets, hotels and
              institutions across India.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/products"
                className="inline-block rounded-lg bg-green-600 px-6 py-3 text-white font-medium transition hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Explore Products
              </a>

              <a
                href="https://www.ecoobasket.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                aria-label="Order Online - Opens in new window"
              >
                Order Online
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-green-50 to-white rounded-2xl transition duration-500 hover:scale-[1.02]">
              <Image
                src="/images/warehouse.svg"
                alt="Ecoo Basket Warehouse - FMCG wholesale distribution"
                width={700}
                height={500}
                priority
                className="rounded-xl shadow-xl object-cover"
              />
            </div>
          </div>
        </section>

        {/* Product Categories Section */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h2 className="text-center text-4xl font-bold text-green-700">
            Our Product Categories
          </h2>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {productCategories.map((category) => (
              <article
                key={category.title}
                className="rounded-xl bg-white p-6 text-center shadow-lg transition hover:shadow-xl hover:scale-105"
              >
                <div
                  className="text-4xl"
                  role="img"
                  aria-label={`${category.title} icon`}
                >
                  {category.icon}
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-900">
                  {category.title}
                </h3>
                <p className="mt-2 text-gray-600">{category.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-green-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-4xl font-bold text-green-700">
              Why Choose Ecoo Basket?
            </h2>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
              {reasons.map((reason) => (
                <article
                  key={reason.title}
                  className="rounded-xl bg-white p-6 shadow-md transition hover:shadow-lg"
                >
                  <h3 className="text-lg font-bold text-gray-900">
                    ✅ {reason.title}
                  </h3>
                  <p className="mt-3 text-gray-600">{reason.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-green-50 py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:px-8 md:grid-cols-2">
            <div>
              <Image
                src="/images/warehouse.svg"
                alt="Ecoo Basket warehouse showcasing our FMCG distribution facility"
                width={800}
                height={533}
                loading="lazy"
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

              <ul className="space-y-3 text-gray-700" role="list">
                <li>✅ 500+ FMCG Products</li>
                <li>✅ 20+ Trusted Brands</li>
                <li>✅ Fast Delivery</li>
                <li>✅ Competitive Wholesale Pricing</li>
                <li>✅ Dedicated B2B Support</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section
          className="bg-green-700 py-16 sm:py-20 text-white"
          aria-label="Ecoo Basket key statistics"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 text-center sm:grid-cols-2 md:grid-cols-4">
              {stats.map((stat) => (
                <article key={stat.label} className="py-2">
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

        {/* Testimonials Section */}
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-4xl font-bold text-green-700">
              What Our Customers Say
            </h2>

            <p className="mt-3 text-center text-gray-600">
              Trusted by retailers and distributors across India.
            </p>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <article
                  key={testimonial.author}
                  className="rounded-xl bg-gray-50 p-8 shadow-md transition hover:shadow-lg"
                >
                  <blockquote className="italic text-gray-600">
                    &quot;{testimonial.quote}&quot;
                  </blockquote>
                  <footer className="mt-6">
                    <div className="font-bold text-green-700">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-green-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-4xl font-bold text-green-700">
              Contact Ecoo Basket
            </h2>

            <p className="mb-12 mt-3 text-center text-gray-600">
              We are here to help retailers, supermarkets, hotels and distributors.
            </p>

            <div className="grid gap-12 md:grid-cols-2">
              <address className="space-y-6 not-italic">
                <article>
                  <h3 className="text-xl font-semibold text-gray-900">
                    📍 Office Address
                  </h3>
                  <p className="mt-2 text-gray-700 leading-relaxed">
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
                </article>

                <article>
                  <h3 className="text-xl font-semibold text-gray-900">
                    📞 Phone
                  </h3>
                  <p className="mt-2">
                    <a
                      href="tel:+919342358226"
                      className="text-green-600 hover:text-green-700 underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 rounded"
                    >
                      +91 93423 58226
                    </a>
                  </p>
                </article>

                <article>
                  <h3 className="text-xl font-semibold text-gray-900">
                    📧 Email
                  </h3>
                  <p className="mt-2">
                    <a
                      href="mailto:info@ecoobasketb2b.com"
                      className="text-green-600 hover:text-green-700 underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 rounded"
                    >
                      info@ecoobasketb2b.com
                    </a>
                  </p>
                </article>
              </address>

              <InquiryForm />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}