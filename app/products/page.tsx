import type { Metadata } from "next";
import Image from "next/image";
import { Container, Eyebrow, Section, Button } from "@/components/primitives";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "FMCG Product Categories | Chennai Wholesale", description: "FMCG wholesale categories supplied to Kirana, provision and retail stores across Chennai." };

const products = [
  ["Biscuits & Snacks", "/assets/images/products/biscuits-snacks.jpg"], ["Noodles & Instant Foods", "/assets/images/products/staples.jpg"], ["Soft Drinks & Beverages", "/assets/images/products/beverages.jpg"], ["Tea & Coffee", "/assets/images/products/beverages.jpg"], ["Personal Care", "/assets/images/products/personal-care.jpg"], ["Home Care", "/assets/images/products/home-care.jpg"], ["Staples & Groceries", "/assets/images/products/staples.jpg"], ["Everyday Essentials", "/assets/images/products/stationery.jpg"],
];

export default function ProductsPage(){return <><section className="bg-navy py-18 text-invert md:py-24"><Container><Eyebrow onDark>Wholesale categories</Eyebrow><h1 className="mt-3 max-w-3xl text-[clamp(38px,5vw,58px)] text-invert">Everyday FMCG for Chennai retailers</h1><p className="mt-5 max-w-2xl text-lg text-white/80">A focused range of fast-moving categories to help Kirana and grocery stores keep their shelves ready.</p></Container></section><Section tone="surface"><Container><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{products.map(([name,img])=><article key={name} className="group overflow-hidden rounded-2xl border border-line bg-base shadow-soft transition hover:-translate-y-1 hover:shadow-soft-lg"><div className="relative aspect-[4/3]"><Image src={img} alt={`${name} FMCG wholesale category`} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105"/></div><h2 className="p-5 text-lg">{name}</h2></article>)}</div><div className="mt-12 text-center"><Button href={site.whatsapp} external>Ask about availability</Button></div></Container></Section></>}
