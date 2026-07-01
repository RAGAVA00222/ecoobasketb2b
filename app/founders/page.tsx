import { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { generatePageMetadata } from "@/lib/metadata";
import { COMPANY } from "@/lib/constants";

const leaders = [
  {
    name: "Mrs. Nirmala Devi Nagaraj",
    role: "Founder & Director",
    bio: "Nirmala Devi Nagaraj established Ecoo Basket with a vision to build a reliable, transparent, and technology-driven FMCG wholesale distribution network focused on quality, supplier partnerships, and long-term customer value.",
    focus: ["Strategic Business Planning", "FMCG Wholesale Distribution", "Supplier Relationship Management", "Customer Satisfaction", "Business Growth & Expansion"],
  },
  {
    name: "Mrs. SriKeerthana Devi Chakkaravathi",
    role: "Co-Founder",
    bio: "SriKeerthana Devi Chakkaravathi leads operations, branding, customer engagement, and digital transformation initiatives to simplify wholesale procurement and strengthen the customer experience.",
    focus: ["Operations Management", "Marketing & Branding", "Customer Experience", "Digital Strategy", "Business Development"],
  },
  {
    name: "Mr. Ragavendren Chakkaravathi",
    role: "Chief Sales Officer (CSO)",
    bio: "With over 15 years of experience in retail sales, Kirana trade, FMCG distribution, and supply chain management, Ragavendren Chakkaravathi leads sales strategy and market expansion for Ecoo Basket.",
    focus: ["Retail Sales Management", "Kirana Store Network Development", "FMCG Distribution", "Supply Chain Management", "Channel Sales", "Territory Expansion", "Customer Relationship Management", "Retail Business Growth"],
  },
];

const values = [
  "Integrity – Honest and transparent business practices",
  "Customer First – Every decision begins with customer success",
  "Quality – Reliable products and dependable service",
  "Innovation – Continuous improvement through technology",
  "Teamwork – Building success together",
  "Growth – Creating long-term value for all stakeholders",
];

export const metadata: Metadata = generatePageMetadata({
  title: "Our Founders & Leadership",
  description:
    "Meet the leadership team behind Ecoo Basket. Our women-led company is driven by a mission to build the most trusted FMCG wholesale distribution network in India.",
  keywords: [
    "founders",
    "leadership team",
    "women-led company",
    "FMCG leaders",
  ],
  path: "/founders",
});

export default function FoundersPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <section className="bg-gradient-to-br from-green-700 to-emerald-600 px-4 py-20 sm:px-6 lg:px-8 lg:py-24 text-white">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-100">Meet Our Leadership</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold sm:text-5xl">
              Driving Growth Through Trust, Innovation & Excellence
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-green-50/90">
              At Ecoo Basket, our leadership team is committed to building one of India’s most trusted FMCG wholesale distribution companies for retailers, distributors, supermarkets, hotels, and institutions.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-8 py-20">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {leaders.map((leader) => (
              <article
                key={leader.name}
                className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-md"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-3xl font-semibold text-green-700">
                  {leader.name.split(" ").slice(-1)[0][0]}
                </div>
                <h2 className="mt-6 text-2xl font-semibold text-green-700">
                  {leader.name}
                </h2>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-green-600">
                  {leader.role}
                </p>
                <p className="mt-4 text-gray-600">{leader.bio}</p>
                <div className="mt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Leadership Focus
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700" role="list">
                    {leader.focus.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:px-8 lg:grid-cols-2">
            <div className="rounded-3xl bg-green-50 p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-600">Women-Led Enterprise</p>
              <h2 className="mt-3 text-3xl font-bold text-green-700">Empowering Retail. Inspiring Growth.</h2>
              <p className="mt-5 text-lg text-gray-700">
                Ecoo Basket is proudly a women-led FMCG wholesale distribution company. Under the leadership of Mrs. Nirmala Devi Nagaraj and Mrs. SriKeerthana Devi Chakkaravathi, the company is committed to delivering quality products, reliable service, and sustainable growth while creating opportunities for retailers and business partners.
              </p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-600">Our Leadership Vision</p>
              <h2 className="mt-3 text-3xl font-bold text-green-700">To become one of India’s most trusted FMCG wholesale distribution companies.</h2>
              <p className="mt-5 text-gray-700">
                By building strong partnerships, embracing innovation, and delivering exceptional value to retailers and businesses across the country, Ecoo Basket continues to strengthen India’s retail supply chain.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-green-700">
              Our Leadership Mission
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <p className="text-gray-700">
                • Deliver genuine branded FMCG products
              </p>
              <p className="text-gray-700">
                • Build long-term relationships with customers and suppliers
              </p>
              <p className="text-gray-700">
                • Strengthen India&apos;s retail supply chain
              </p>
              <p className="text-gray-700">
                • Promote innovation and operational excellence
              </p>
              <p className="text-gray-700">
                • Support the growth of retailers through dependable wholesale
                solutions
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="rounded-3xl bg-green-700 p-8 text-white">
            <h2 className="text-3xl font-bold">Leadership Values</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {values.map((value) => (
                <div key={value} className="rounded-2xl border border-white/20 bg-white/10 p-4">
                  {value}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-green-700">
              Founder&apos;s Message
            </h2>
            <p className="mt-6 text-base text-gray-700 sm:text-lg italic leading-relaxed">
              “Our vision is to make Ecoo Basket a trusted partner for every retailer by delivering quality products, dependable service, and lasting business relationships. Together, we are building a stronger and more connected FMCG distribution network for the future.”
            </p>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-green-600">
              — Mrs. Nirmala Devi Nagaraj, Founder & Director
              <br />
              — Mrs. SriKeerthana Devi Chakkaravathi, Co-Founder
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="rounded-3xl bg-gray-900 p-8 sm:p-10 text-center text-white">
            <h2 className="text-3xl font-bold">
              Ready to Partner With Ecoo Basket?
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={COMPANY.website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Order Online
              </a>
              <Link
                href="/contact"
                className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
