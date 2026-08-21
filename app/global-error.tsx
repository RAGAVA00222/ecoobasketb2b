"use client";

import { useEffect } from "react";
import "./globals.css";

/**
 * global-error.tsx replaces the ROOT layout when it fires, so it must render its
 * own <html> and <body>. It also cannot rely on anything from the normal tree
 * (navbar, footer, router-dependent components), because the failure it catches
 * may be the very thing that broke them - hence the self-contained markup below.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (!error) return;
    // Surfaced in the browser console and in the host's function logs.
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-gray-50 text-gray-900">
        <main className="flex-1">
          <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-600">
              Something went wrong
            </p>
            <h1 className="mt-4 text-4xl font-bold text-gray-950 sm:text-5xl">
              We hit a problem
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
              {/*
                A plain <a> rather than next/link: global-error sits outside the
                normal router tree, so a hard navigation is the reliable escape.
              */}
              <a
                href="/contact"
                className="rounded-full border border-gray-300 px-6 py-3 font-semibold text-gray-800 transition hover:border-green-600 hover:text-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Contact Sales
              </a>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
