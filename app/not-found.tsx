import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-600">
            404
          </p>
          <h1 className="mt-4 text-4xl font-bold text-gray-950 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
            The page you are looking for may have moved, or the address may be
            incorrect.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/products"
              className="rounded-full bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              View Products
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-gray-300 px-6 py-3 font-semibold text-gray-800 transition hover:border-green-600 hover:text-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Contact Sales
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
