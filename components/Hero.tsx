import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="container mx-auto py-20">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Text Content */}
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your Trusted FMCG Wholesale Partner
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Ecooo Basket B2B offers a wide range of FMCG products at competitive wholesale prices. We provide reliable supply for retailers, supermarkets, hotels, and restaurants.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
            <a
              href="#"
              className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Get started
            </a>
            <Link href="/products" className="text-sm font-semibold leading-6 text-gray-900">
              View products <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="flex justify-center lg:justify-end">
          <Image
            src="/images/hero.jpeg"
            alt="Ecooo Basket FMCG Wholesale"
            width={700}
            height={600}
            priority
            className="w-full h-auto object-cover rounded-2xl shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}