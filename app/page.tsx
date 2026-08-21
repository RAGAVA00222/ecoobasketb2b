import { generatePageMetadata } from "@/lib/metadata";
import { WebSite, WithContext } from "schema-dts";
import {
  CheckCircleIcon,
  BuildingStorefrontIcon,
  CurrencyRupeeIcon,
  TruckIcon,
  UserGroupIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BackToTopButton from "../components/BackToTopButton";
import Navbar from "../components/Navbar";
import { JsonLd } from "@/components/JsonLd";

import { COMPANY, DELIVERY_PROMISE, ORDER_TERMS } from "@/lib/constants";

/** 4.3 - approved operating-model pills. */
const FEATURE_PILLS = [
  "Fixed Weekly Beat",
  "Route Planning",
  "GST Billing",
  "WhatsApp Order Capture",
];

export const metadata: Metadata = generatePageMetadata({
  title: "FMCG Wholesale Distribution Partner for Retailers & Kirana Stores",
  description:
    "Ecoo Hyper Retail Private Limited - B2B FMCG wholesale distribution to kirana stores, pharmacies and wholesale merchants across Chennai, Tamil Nadu. GSTIN 33AAJCE8472G1ZG.",
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
    description: "Multi-brand FMCG across grocery, beverages, home care, personal care and stationery.",
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
    image: "/images/categories/grocery.jpg",
  },
  {
    name: "Beverages",
    image: "/images/categories/beverages.jpg",
  },
  {
    name: "Personal Care",
    image: "/images/categories/personal-care.jpg",
  },
  {
    name: "Home Care",
    image: "/images/categories/home-care.jpg",
  },
  {
    name: "Stationery",
    image: "/images/categories/stationery.jpg",
  },
  {
    name: "Hotel & Restaurant Supplies",
    image: "/images/categories/hotel-supplies.jpg",
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
      "Multi-brand FMCG across grocery, beverages, staples, home care, personal care and stationery - ordered in one place, on one invoice.",
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

const services = [
  {
    name: "Wholesale Supply",
    description:
      "Reliable, bulk supply of a wide range of FMCG products for Kirana stores, supermarkets, and retailers.",
    icon: BuildingStorefrontIcon,
  },
  {
    name: "Wholesale Merchant Supply",
    description:
      "Bulk supply for wholesale merchants and pharmacies on the same weekly beat, against a GST invoice.",
    icon: BuildingOffice2Icon,
  },
  {
    name: "Distribution & Logistics",
    description:
      "An efficient and trusted distribution network ensuring timely delivery and consistent product availability.",
    icon: TruckIcon,
  },
];

const websiteSchema: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: COMPANY.siteUrl,
  name: COMPANY.brandName,
  publisher: {
    "@type": "Organization",
    name: COMPANY.legalName,
  },
  // NOTE: a SearchAction was declared here pointing at /products?q={term}.
  // No search exists on that page (or anywhere on the site), and the action was
  // also missing the required `query-input` property - so it advertised a
  // sitelinks searchbox that would have led nowhere. Re-add it only once a real
  // search is implemented.
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <JsonLd data={websiteSchema} />
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
                  <span className="block">B2B FMCG Wholesale</span>
                  <span className="block text-green-600">
                    Distribution in Chennai
                  </span>
                </h1>
                <p className="mt-6 max-w-md text-lg text-gray-600 sm:text-xl md:mt-8 md:max-w-3xl">
                  Multi-brand FMCG supplied to kirana stores, pharmacies and
                  wholesale merchants across Chennai on a fixed weekly beat.
                </p>
                {/* 4.4 - delivery promise, identical wording site-wide */}
                <p className="mt-5 text-lg font-semibold text-gray-900">
                  {DELIVERY_PROMISE}
                </p>
                {/* 4.5 - order terms, identical wording site-wide */}
                <p className="mt-2 text-base text-gray-600">{ORDER_TERMS}</p>
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
              src="/images/hero.jpeg"
              alt="Ecoo Basket FMCG wholesale distribution in Chennai"
              width={1536}
              height={1024}
              sizes="(max-width: 1024px) 100vw, 50vw"
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
                    alt={`${category.name} products supplied by Ecoo Basket`}
                    width={1448}
                    height={1086}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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


        {/* About Ecoo Basket Section */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/*
              MISSING ASSETS - real photography required.
              This section previously rendered two images that do not exist
              (an operations photo and a delivery-vehicle photo).
              No equivalent photo ships with the project, so they were removed rather
              than swapped for an unrelated picture. To restore the two-column layout,
              drop the real photos at the paths above and re-add the image grid.
            */}
            <div className="mx-auto max-w-3xl text-center">
              <div>
                <h2 className="text-base font-semibold uppercase tracking-wider text-green-600">
                  About Ecoo Basket
                </h2>
                <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  B2B FMCG Wholesale Distribution in Chennai
                </p>
                <p className="mt-6 text-lg text-gray-600">
                  Ecoo Basket supplies multi-brand FMCG to kirana stores,
                  pharmacies and wholesale merchants across Chennai. We run a
                  fixed weekly beat &mdash; the same representative visits your
                  store on the same day every week, takes the order, and
                  delivers it against a GST invoice with payment on delivery.
                </p>
                <p className="mt-4 text-lg text-gray-600">
                  No credit accounts. No stock sitting in a warehouse ageing. No
                  reconciliation chasing. One accountable contact for every
                  order.
                </p>

                {/* 4.3 - four feature pills */}
                <ul className="mt-8 flex flex-wrap gap-2" aria-label="How we operate">
                  {FEATURE_PILLS.map((pill) => (
                    <li
                      key={pill}
                      className="rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700"
                    >
                      {pill}
                    </li>
                  ))}
                </ul>
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


      </main>
    </>
  );
}