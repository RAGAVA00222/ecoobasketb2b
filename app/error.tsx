"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-600">
            Something went wrong
          </p>
          <h1 className="mt-4 text-4xl font-bold text-gray-950 sm:text-5xl">
            We could not load this page
          </h1>
          <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
            Please try again. If the issue continues, our team can help you
            with product and bulk supply inquiries directly.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="rounded-full bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Try Again
            </button>
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
