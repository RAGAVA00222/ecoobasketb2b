import Navbar from "@/components/Navbar";

export default function Loading() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <section
          className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
          aria-label="Loading page content"
        >
          <div className="mx-auto max-w-3xl animate-pulse text-center">
            <div className="mx-auto h-4 w-40 rounded bg-green-100" />
            <div className="mx-auto mt-5 h-10 w-full max-w-xl rounded bg-gray-200" />
            <div className="mx-auto mt-4 h-5 w-full max-w-2xl rounded bg-gray-200" />
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div
                key={item}
                className="h-56 animate-pulse rounded-lg border border-gray-200 bg-white"
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
