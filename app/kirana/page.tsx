import type { Metadata } from "next";
import { BadgeCheck, Clock3, Headset, MessageCircle, PackageCheck, ShoppingBag, Truck, WalletCards } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Button, Container, Eyebrow, Section } from "@/components/primitives";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "For Kirana Stores | FMCG Wholesale in Chennai",
  description: "Bilingual FMCG wholesale and direct store delivery for Kirana, provision and grocery stores across Chennai.",
  alternates: { canonical: "/kirana" },
};

const benefits = [
  ["Best Wholesale Prices", "குறைந்த மொத்த விலை", "Competitive buying for everyday FMCG categories.", "அன்றாட FMCG பொருட்களுக்கு போட்டித்தன்மை வாய்ந்த விலை.", WalletCards],
  ["Fast Delivery", "வேகமான டெலிவரி", "Direct store delivery across Chennai.", "சென்னை முழுவதும் நேரடி கடை டெலிவரி.", Truck],
  ["Genuine Products", "அசல் பொருட்கள்", "Trusted brands with GST-compliant billing.", "நம்பகமான பிராண்டுகள் மற்றும் GST பில்.", BadgeCheck],
  ["Easy Ordering", "எளிய ஆர்டர்", "Order through WhatsApp or our digital platform.", "WhatsApp அல்லது டிஜிட்டல் தளத்தில் ஆர்டர் செய்யலாம்.", ShoppingBag],
  ["Dedicated Support", "எப்போதும் உதவி", "A responsive team for your store's needs.", "உங்கள் கடையின் தேவைகளுக்கு உடனடி உதவி.", Headset],
  ["Reliable Restocking", "நம்பகமான மறுநிரப்பு", "Plan better with dependable supply support.", "நம்பகமான விநியோகத்துடன் சிறந்த திட்டமிடல்.", PackageCheck],
] as const;

const steps = [
  ["Tell us about your store", "உங்கள் கடையைப் பற்றி சொல்லுங்கள்", "Share your area and the categories you stock.", "உங்கள் பகுதி மற்றும் விற்பனை பொருட்களை பகிருங்கள்."],
  ["Place your order", "உங்கள் ஆர்டரை பதிவு செய்யுங்கள்", "Use WhatsApp or speak to our team.", "WhatsApp மூலம் அல்லது எங்கள் குழுவிடம் பேசுங்கள்."],
  ["Receive at your shop", "கடையிலேயே பெறுங்கள்", "We plan delivery directly to your store in Chennai.", "சென்னையில் உங்கள் கடைக்கு நேரடியாக டெலிவரி செய்கிறோம்."],
] as const;

export default function KiranaPage() {
  return <>
    <section className="forest-grad relative overflow-hidden py-20 text-invert md:py-28">
      <div aria-hidden className="absolute -right-28 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.15fr_.85fr]">
        <Reveal>
          <Eyebrow onDark>Built for Chennai&apos;s neighbourhood retail</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-[clamp(38px,5vw,62px)] text-invert">For Kirana Store Owners</h1>
          <p lang="ta" className="mt-2 text-[clamp(20px,2.4vw,30px)] font-semibold text-[#bbf7d0]">கிராணா கடை உரிமையாளர்களுக்காக</p>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/85">A dependable FMCG wholesale partner for the shelves your customers rely on every day.</p>
          <p lang="ta" className="mt-1 max-w-2xl text-[16px] leading-relaxed text-white/75">உங்கள் வாடிக்கையாளர்கள் தினமும் நம்பும் பொருட்களுக்கு நம்பகமான FMCG மொத்த விற்பனை கூட்டாளர்.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/partner" variant="solidInvert">Become a Partner <span lang="ta">· கூட்டாளராக இணையுங்கள்</span></Button>
            <Button href={site.whatsapp} external variant="outlineInvert"><MessageCircle size={18} /> Order on WhatsApp</Button>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="rounded-3xl border border-white/20 bg-white/10 p-7 backdrop-blur-sm md:p-9">
          <span className="font-mono text-xs tracking-[.16em] text-[#bbf7d0]">CHENNAI ONLY</span>
          <h2 className="mt-3 text-3xl text-invert">Stock smarter. Serve better.</h2>
          <p lang="ta" className="mt-2 text-lg text-[#dcfce7]">சிறப்பாக இருப்பு வையுங்கள். சிறப்பாக சேவை செய்யுங்கள்.</p>
          <div className="mt-7 grid gap-4 border-t border-white/15 pt-6 text-sm text-white/85"><p>Direct store delivery</p><p lang="ta">நேரடி கடை டெலிவரி</p><p>GST-compliant invoices</p><p lang="ta">GST-க்கு இணக்கமான பில்கள்</p></div>
        </Reveal>
      </Container>
    </section>

    <Section tone="surface"><Container>
      <Reveal className="mx-auto max-w-2xl text-center"><Eyebrow>Why choose Ecoo Basket</Eyebrow><h2 className="mt-3 text-[clamp(28px,4vw,44px)]">Everything your store needs to keep moving</h2><p lang="ta" className="mt-2 text-lg text-muted">உங்கள் கடை தொடர்ந்து இயங்க தேவையான அனைத்தும்</p></Reveal>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{benefits.map(([en, ta, copy, tamilCopy, Icon], i) => <Reveal key={en} delay={(i % 3) * .06} className="rounded-2xl border border-line bg-base p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-soft-lg"><Icon className="text-accent" size={25}/><h3 className="mt-5 text-xl">{en}</h3><p lang="ta" className="mt-1 text-[16px] font-semibold text-accent">{ta}</p><p className="mt-3 text-sm text-muted">{copy}</p><p lang="ta" className="mt-1 text-sm text-muted">{tamilCopy}</p></Reveal>)}</div>
    </Container></Section>

    <Section><Container className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
      <Reveal><Eyebrow>How it works</Eyebrow><h2 className="mt-3 text-[clamp(28px,4vw,42px)]">Simple ordering. Reliable delivery.</h2><p lang="ta" className="mt-2 text-lg text-muted">எளிய ஆர்டர். நம்பகமான டெலிவரி.</p><p className="mt-5 text-muted">We keep the process clear so you can focus on your customers.</p></Reveal>
      <div className="grid gap-4">{steps.map(([en, ta, copy, tamilCopy], i) => <Reveal key={en} delay={i*.08} className="flex gap-5 rounded-2xl border border-line bg-surface p-6 shadow-soft"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mint font-bold text-accent">0{i+1}</span><div><h3 className="text-lg">{en}</h3><p lang="ta" className="font-semibold text-accent">{ta}</p><p className="mt-2 text-sm text-muted">{copy}</p><p lang="ta" className="text-sm text-muted">{tamilCopy}</p></div></Reveal>)}</div>
    </Container></Section>

    <Section tone="surface"><Container><Reveal className="text-center"><Eyebrow>Available categories</Eyebrow><h2 className="mt-3 text-[clamp(28px,4vw,42px)]">Everyday FMCG, ready for your shelves</h2><p lang="ta" className="mt-2 text-lg text-muted">உங்கள் அலமாரிகளுக்கு அன்றாட FMCG பொருட்கள்</p></Reveal><div className="mx-auto mt-9 flex max-w-4xl flex-wrap justify-center gap-3">{["Biscuits & Snacks", "Noodles", "Soft Drinks", "Tea & Coffee", "Personal Care", "Home Care", "Staples"].map((x)=><span key={x} className="rounded-full border border-line bg-surface px-5 py-3 text-sm font-semibold text-ink shadow-soft">{x}</span>)}</div></Container></Section>

    <section className="forest-grad py-20 text-center text-invert"><Container><Reveal><h2 className="text-[clamp(30px,4vw,48px)] text-invert">Become Our Partner Today</h2><p lang="ta" className="mt-2 text-xl text-[#dcfce7]">இன்றே எங்கள் கூட்டாளராக இணையுங்கள்</p><p className="mx-auto mt-5 max-w-xl text-white/80">Tell us where your shop is and the categories you need. We&apos;ll confirm Chennai delivery availability.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Button href="/partner" variant="solidInvert">Register Now <span lang="ta">· இப்போதே பதிவு செய்யுங்கள்</span></Button><Button href={site.whatsapp} external variant="outlineInvert"><Clock3 size={17}/> Order on WhatsApp</Button></div></Reveal></Container>
    </section>
  </>;
}
