import { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/metadata";
import { COMPANY, LEADERSHIP } from "@/lib/constants";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";

/*
  MISSING ASSETS - leadership portraits required.
  These three files were referenced but have never existed in /public:
      /images/founders/founder-1.jpg
      /images/founders/founder-2.jpg
      /images/founders/founder-3.jpg
  Until real photographs are supplied, a neutral initials avatar is rendered and
  the Person structured data omits the `image` property (rather than advertising
  a 404 to search engines). To restore photos: drop the files at the paths above
  and set `imageUrl` on the matching entry below.
*/
const leaders = [
  {
    name: LEADERSHIP[0].name,
    role: LEADERSHIP[0].title,
    bio: "Nirmala Devi established Ecoo Basket to serve kirana stores, pharmacies and wholesale merchants across Chennai through a fixed weekly beat and accountable service.",
    imageUrl: "",
    linkedinUrl: "https://www.linkedin.com/in/nirmaladevinagaraj",
  },
  {
    name: LEADERSHIP[1].name,
    role: LEADERSHIP[1].title,
    bio: "Sri Keerthana Devi leads operations and digital systems, focusing on simplifying ordering and keeping every delivery accountable to one contact.",
    imageUrl: "",
    linkedinUrl: "https://www.linkedin.com/in/srikeerthanadevic",
  },
  {
    name: LEADERSHIP[2].name,
    role: LEADERSHIP[2].title,
    bio: "Ragavendran leads strategy and route expansion, building the Chennai beat and the merchant relationships behind it.",
    imageUrl: "",
    linkedinUrl: "https://www.linkedin.com/in/ragavendrenc",
  },
];

/** Initials fallback used until real leadership photography is supplied. */
function initialsOf(name: string) {
  return name
    .replace(/^(Mrs\.|Mr\.|Ms\.|Dr\.)\s*/i, "")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

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
  path: "/founders",
});

export default function FoundersPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <section className="bg-gradient-to-br from-green-700 to-emerald-600 px-4 py-20 sm:px-6 lg:px-8 lg:py-24 text-white">
          {leaders.map((leader) => (
            <JsonLd
              key={leader.name}
              data={{
                "@context": "https://schema.org",
                "@type": "Person",
                name: leader.name,
                jobTitle: leader.role,
                url: leader.linkedinUrl,
                ...(leader.imageUrl
                  ? { image: `${COMPANY.siteUrl}${leader.imageUrl}` }
                  : {}),
              }}
            />
          ))}
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

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-green-700">
            Leadership Team
          </h2>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {leaders.map((leader) => (
              <article
                key={leader.name}
                className="group space-y-4 text-center"
              >
                <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full lg:h-48 lg:w-48">
                  {leader.imageUrl ? (
                    <Image
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      src={leader.imageUrl}
                      alt={`Photograph of ${leader.name}`}
                      width={200}
                      height={200}
                      sizes="(max-width: 1024px) 10rem, 12rem"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="flex h-full w-full items-center justify-center bg-green-700 text-4xl font-bold text-white lg:text-5xl"
                    >
                      {initialsOf(leader.name)}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="space-y-1 text-lg font-medium leading-6">
                    <h3>{leader.name}</h3>
                    <p className="text-green-600">{leader.role}</p>
                  </div>
                  <p className="text-gray-600">{leader.bio}</p>
                  <div className="flex justify-center">
                    <a
                      href={leader.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-green-600"
                    >
                      <span className="sr-only">LinkedIn</span>
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
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
                Ecoo Basket is proudly a women-led FMCG wholesale distribution company. Under the leadership of N Nirmala Devi and Sri Keerthana Devi C, the company is committed to delivering quality products, reliable service, and sustainable growth while creating opportunities for retailers and business partners.
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
              — N Nirmala Devi, Founder & Managing Director
              <br />
              — Sri Keerthana Devi C, Co-Founder & Director
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
                href={COMPANY.storeUrl}
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
