"use client";

import { useEffect, useState } from "react";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);

    // Run once on mount so a restored scroll position is reflected immediately.
    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      /*
        Two fixes over the previous version:
        1. It only faded with opacity-0, so while "hidden" it was still in the
           hit-test layer AND still keyboard-focusable. Sitting at z-50 over the
           WhatsApp button's z-40, it silently swallowed clicks on the site's
           primary contact CTA. pointer-events-none + invisible + inert aria
           take it fully out of the way.
        2. It was pinned to bottom-8 right-8, overlapping the WhatsApp button at
           bottom-6 right-6. It now stacks above it instead.
      */
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      className={`fixed bottom-24 right-6 z-40 rounded-full bg-green-600 p-3 text-white shadow-lg transition-opacity duration-300 hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 ${
        isVisible ? "opacity-100" : "pointer-events-none invisible opacity-0"
      }`}
      aria-label="Go to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
