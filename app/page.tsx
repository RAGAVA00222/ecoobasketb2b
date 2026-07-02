import { generatePageMetadata } from "@/lib/metadata";
import { WebSite } from "schema-dts";
import {
  CheckCircleIcon,
  BuildingStorefrontIcon,
  CurrencyRupeeIcon,
  TruckIcon,
  UserGroupIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BackToTopButton from "../components/BackToTopButton";
import Navbar from "../components/Navbar";
import { JsonLd } from "@/components/JsonLd";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = generatePageMetadata({
  title: "FMCG Wholesale Distribution Partner for Retailers & Kirana Stores",
  description:
    "Ecoo Basket is India's trusted B2B FMCG wholesale distribution partner, supplying grocery, beverages, personal care, and more to Kirana stores, supermarkets, hotels, and restaurants with competitive pricing and reliable delivery.",
  keywords: [
    "FMCG wholesale",
    "B2B distribution",
    "Kirana store supply",
    "wholesale grocery",
    "FMCG distributor India",
  ],
  path: "/",
});

const ecooSolutions = [
  {
    name: "Competitive Wholesale Pricing",
    description: "Maximize your margins with our fair and transparent pricing.",
  },
  {
    name: "Fast & Reliable Delivery",
    description: "Keep your shelves stocked with our on-time delivery network.",
  },
  {
    name: "Wide FMCG Product Range",
    description: "Access over 500+ products from 20+ trusted brands in one place.",
  },
  {
    name: "Bulk Purchase Benefits",
    description: "Enjoy special pricing and offers on bulk orders.",
  },
  {
    name: "Easy Ordering Process",
    description: "Order anytime via our website or dedicated support.",
  },
  {
    name: "Dedicated Relationship Manager",
    description: "Get personalized support for your business needs.",
  },
  {
    name: "Consistent Product Availability",
    description: "Reduce stockouts and meet customer demand reliably.",
  },
  {
    name: "Flexible Business Support",
    description: "We adapt to your needs to help your business grow.",
  },
  {
    name: "Trusted Distribution Network",
    description: "Leverage our robust and efficient supply chain.",
  },
  {
    name: "Long-Term Business Partnership",
    description: "We are invested in your success for the long haul.",
  },
];

const newProductCategories = [
  {
    name: "Grocery & Staples",
    image: "/images/categories/grocery.webp",
  },
  {
    name: "Beverages",
    image: "/images/categories/beverages.webp",
  },
  {
    name: "Personal Care",
    image: "/images/categories/personal-care.webp",
  },
  {
    name: "Home Care",
    image: "/images/categories/home-care.webp",
  },
  {
    name: "Stationery",
    image: "/images/categories/stationary.webp",
  },
  {
    name: "Hotel & Restaurant Supplies",
    image: "/images/categories/hotel-supplies.webp",
  },
];

const whyChooseUsReasons = [
  {
    name: "Competitive Wholesale Pricing",
    description:
      "Our direct sourcing and efficient supply chain allow us to offer competitive prices, helping you increase your profit margins.",
    icon: CurrencyRupeeIcon,
  },
  {
    name: "One-Stop Sourcing",
    description:
      "Access a wide range of 500+ FMCG products across all major categories from over 20+ trusted brands in a single order.",
    icon: BuildingStorefrontIcon,
  },
  {
    name: "Fast & Reliable Delivery",
    description:
      "Our dedicated logistics network ensures your orders are delivered on time, every time, keeping your shelves stocked.",
    icon: TruckIcon,
  },
  {
    name: "Dedicated Business Support",
    description:
      "From ordering to delivery, our relationship managers provide personalized support to help your business succeed.",
    icon: UserGroupIcon,
  },
];

const testimonials = [
  {
    rating: 5,
    quote:
      "Ecoo Basket's wholesale pricing is unmatched. It has significantly boosted our profit margins. Their delivery is always on time, which is crucial for our business.",
    author: "Rajesh Kumar",
    company: "Kumar Provisions",
    image: "/images/testimonials/rajesh-kumar.jpg",
  },
  {
    rating: 5,
    quote:
      "The wide product range and consistent availability have made inventory management so much easier. Our customers are happier because we rarely run out of stock.",
    author: "Priya Sharma",
    company: "Sharma Supermarket",
    image: "/images/testimonials/priya-sharma.jpg",
  },
  {
    rating: 5,
    quote:
      "As a hotel manager, sourcing quality supplies is key. Ecoo Basket provides top-tier products with professional service. They are a trusted partner for our daily needs.",
    author: "Anand Verma",
    company: "The Grand Hotel",
    image: "/images/testimonials/anand-verma.jpg",
  },
];

const services = [
  {
    name: "Wholesale Supply",
    description:
      "Reliable, bulk supply of a wide range of FMCG products for Kirana stores, supermarkets, and retailers.",
    icon: BuildingStorefrontIcon,
  },
  {
    name: "HORECA & Institutional Supply",
    description:
      "Customized sourcing and delivery for hotels, restaurants, cafes (HORECA), and other institutions.",
    icon: BuildingOffice2Icon,
  },
  {
    name: "Distribution & Logistics",
    description:
      "An efficient and trusted distribution network ensuring timely delivery and consistent product availability.",
    icon: TruckIcon,
  },
];

const trustedBrands = [
  { name: "Brand 1", logo: "/images/brands/logo1.svg" },
  { name: "Brand 2", logo: "/images/brands/logo2.svg" },
  { name: "Brand 3", logo: "/images/brands/logo3.svg" },
  { name: "Brand 4", logo: "/images/brands/logo4.svg" },
  { name: "Brand 5", logo: "/images/brands/logo5.svg" },
  { name: "Brand 6", logo: "/images/brands/logo6.svg" },
  { name: "Brand 7", logo: "/images/brands/logo7.svg" },
  { name: "Brand 8", logo: "/images/brands/logo8.svg" },
];

const stats = [
  { name: "Products", value: "500+" },
  { name: "Trusted Brands", value: "20+" },
  { name: "Retailers Served", value: "100+" },
  { name: "Delivery Network", value: "24/7" },
];

export default function HomePage() {
  const websiteSchema: WebSite = {
    "@type": "WebSite",
    url: COMPANY.website_b2b,
    name: COMPANY.name,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${COMPANY.website_b2b}/products?q={search_term_string}`,
      },
      queryInput: "required name=search_term_string",
    },
  };

  return (
    <>
      <Navbar />
      <JsonLd data={{ "@context": "https://schema.org", ...websiteSchema }} />
      <BackToTopButton />

      <main className="bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="relative z-10 lg:w-full lg:max-w-2xl">
              <svg
                className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform text-white lg:block"
                fill="currentColor"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <polygon points="0,0 90,0 50,100 0,100" />
              </svg>
              <div className="relative px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">India&apos;s Trusted</span>
                  <span className="block text-green-600">
                    FMCG Wholesale Partner
                  </span>
                </h1>
                <p className="mt-6 max-w-md text-lg text-gray-600 sm:text-xl md:mt-8 md:max-w-3xl">
                  Empowering Kirana stores, supermarkets, hotels, and
                  restaurants with a reliable supply of top-quality FMCG
                  products at competitive wholesale prices.
                </p>
                <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      href="/products"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-green-700 md:py-4 md:px-10 md:text-lg"
                    >
                      Explore Products
                    </Link>
                  </div>
                  <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                    <Link
                      href="/contact"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-green-100 px-8 py-3 text-base font-medium text-green-700 hover:bg-green-200 md:py-4 md:px-10 md:text-lg"
                    >
                      Contact Sales
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-64 w-full sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">
            <Image
              className="h-full w-full object-cover"
              src="/images/hero-banner.jpg"
              alt="Ecoo Basket FMCG wholesale distribution warehouse"
              width={1920}
              height={1080}
              priority
            />
          </div>
        </section>

        {/* Product Categories Section */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold uppercase tracking-wider text-green-600">
                Our Categories
              </h2>
              <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                A Wide Range of FMCG Products
              </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {newProductCategories.map((category) => (
                <div
                  key={category.name}
                  className="group relative overflow-hidden rounded-lg shadow-lg"
                >
                  <Image
                    src={category.image}
                    alt={`Illustration for ${category.name}`}
                    width={400}
                    height={300}
                    className="h-64 w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 w-full p-6">
                    <h3 className="text-xl font-semibold text-white">
                      {category.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-green-700 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.name} className="flex flex-col">
                  <dt className="order-2 mt-2 text-lg font-medium leading-6 text-green-100">
                    {stat.name}
                  </dt>
                  <dd className="order-1 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Ecoo Basket Section */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
              <div>
                <h2 className="text-base font-semibold uppercase tracking-wider text-green-600">
                  About Ecoo Basket
                </h2>
                <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  India&apos;s Modern FMCG Distribution Backbone
                </p>
                <p className="mt-6 text-lg text-gray-600">
                  Ecoo Basket is a trusted B2B wholesale and distribution
                  company dedicated to strengthening India&apos;s retail supply
                  chain. We supply a comprehensive range of groceries,
                  beverages, personal care, and daily essentials to retailers,
                  supermarkets, hotels, and restaurants.
                </p>
                <p className="mt-4 text-lg text-gray-600">
                  Our mission is to empower businesses by providing competitive
                  pricing, consistent product availability, and a reliable
                  delivery network, all powered by technology and a commitment
                  to long-term partnerships.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Image
                  className="h-auto w-full rounded-lg object-cover shadow-lg"
                  src="/images/about/warehouse.jpg"
                  alt="Ecoo Basket warehouse interior"
                  width={400}
                  height={500}
                />
                <Image
                  className="mt-8 h-auto w-full rounded-lg object-cover shadow-lg"
                  src="/images/about/delivery-vehicle.jpg"
                  alt="Ecoo Basket delivery vehicle"
                  width={400}
                  height={500}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-gray-50 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base font-semibold uppercase tracking-wider text-green-600">
                The Ecoo Basket Advantage
              </h2>
              <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Why Partner With Us?
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                We are more than just a supplier; we are a growth partner
                committed to helping your business thrive in a competitive
                market.
              </p>
            </div>

            <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {whyChooseUsReasons.map((reason) => (
                <div
                  key={reason.name}
                  className="transform rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <reason.icon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-gray-900">{reason.name}</h3>
                  <p className="mt-2 text-base text-gray-500">{reason.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Kirana Store Success Section */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base font-semibold uppercase tracking-wide text-green-600">
                Our Commitment
              </h2>
              <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                Empowering India&apos;s Kirana Stores
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Kirana stores are the backbone of India&apos;s retail economy. We
                understand their challenges and provide tailored solutions to
                help them thrive against modern competition.
              </p>
            </div>

            <div className="mt-12">
              <h3 className="text-center text-2xl font-semibold text-gray-900">
                How Ecoo Basket Solves Kirana Challenges
              </h3>
              <div className="mt-10">
                <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
                  {ecooSolutions.map((solution) => (
                    <div key={solution.name} className="relative">
                      <dt>
                        <CheckCircleIcon
                          className="absolute h-6 w-6 text-green-500"
                          aria-hidden="true"
                        />
                        <p className="ml-9 text-lg font-medium leading-6 text-gray-900">
                          {solution.name}
                        </p>
                      </dt>
                      <dd className="mt-2 ml-9 text-base text-gray-500">
                        {solution.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="mt-16 text-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-8 py-3 text-base font-medium text-white shadow-md transition-colors hover:bg-green-700"
              >
                Grow Your Kirana Store with Ecoo Basket
              </Link>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold uppercase tracking-wider text-green-600">
                Our Services
              </h2>
              <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Comprehensive B2B Solutions
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                We offer a suite of services designed to streamline your
                procurement process and support your business growth.
              </p>
            </div>
            <div className="mt-16 grid gap-10 sm:grid-cols-1 md:grid-cols-3">
              {services.map((service) => (
                <div
                  key={service.name}
                  className="group rounded-xl p-8 text-center transition-shadow duration-300 hover:shadow-xl"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 transition-all duration-300 group-hover:scale-110 group-hover:bg-green-200">
                    <service.icon
                      className="h-8 w-8 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900">{service.name}</h3>
                  <p className="mt-2 text-base text-gray-500">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trusted Brands Section */}
        <section className="bg-gray-50 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold uppercase tracking-wider text-green-600">
                Our Brand Partners
              </h2>
              <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Supplying Brands You Trust
              </p>
            </div>
            <div className="mt-12 overflow-hidden">
              <div className="flex animate-scroll-x space-x-12">
                {[...trustedBrands, ...trustedBrands].map((brand, index) => (
                  <div
                    key={`${brand.name}-${index}`}
                    className="flex-shrink-0"
                  >
                    <Image
                      className="h-12 w-auto"
                      src={brand.logo}
                      alt={brand.name}
                      width={158}
                      height={48}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Customer Testimonials Section */}
        <section className="bg-green-50 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold uppercase tracking-wider text-green-600">
                Trusted by Businesses Across India
              </h2>
              <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                What Our Partners Say
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.author}
                  className="flex flex-col rounded-xl bg-white shadow-lg"
                >
                  <div className="flex-1 p-8">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-5 w-5 ${
                            i < testimonial.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <blockquote className="mt-6 text-lg text-gray-600">
                      <p>&quot;{testimonial.quote}&quot;</p>
                    </blockquote>
                  </div>
                  <div className="mt-auto bg-gray-50 p-6">
                    <div className="flex items-center">
                      <Image
                        className="h-12 w-12 rounded-full object-cover"
                        src={testimonial.image}
                        alt={`Photograph of ${testimonial.author}`}
                        width={48}
                        height={48}
                      />
                      <div className="ml-4">
                        <div className="text-base font-semibold text-gray-900">{testimonial.author}</div>
                        <div className="text-base text-gray-500">{testimonial.company}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}