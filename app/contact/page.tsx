import Navbar from "../../components/Navbar";
import InquiryForm from "../../components/InquiryForm";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="bg-gray-50">
        <section className="mx-auto max-w-7xl px-8 py-20">
          <div className="max-w-3xl text-center mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-600">
              Contact Us
            </p>
            <h1 className="mt-4 text-4xl font-bold text-green-700 sm:text-5xl">
              Reach out for product inquiries and bulk supply requests
            </h1>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-green-700">Office Address</h2>
              <p className="mt-4 leading-8 text-gray-700">
                Plot No. 120, Shop No. 5
                <br />
                Raajas Garden,
                <br />
                Chettiyar Agaram,
                <br />
                Vanagaram,
                <br />
                Chennai – 600095,
                <br />
                Tamil Nadu, India
              </p>

              <div className="mt-8 space-y-4 text-gray-700">
                <p>📞 +91 93423 58226</p>
                <p>📧 info@ecoobasketb2b.com</p>
              </div>

              <div className="mt-8 overflow-hidden rounded-xl border border-gray-200">
                <iframe
                  title="Ecoo Basket Location"
                  src="https://www.google.com/maps?q=Plot%20No.%20120,%20Shop%20No.%205,%20Raajas%20Garden,%20Chettiyar%20Agaram,%20Vanagaram,%20Chennai%20600095&output=embed"
                  className="h-64 w-full"
                  loading="lazy"
                />
              </div>
            </div>

            <InquiryForm />
          </div>
        </section>
      </main>
    </>
  );
}
