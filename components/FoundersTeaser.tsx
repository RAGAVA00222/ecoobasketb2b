import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { Container, Section, Eyebrow } from "@/components/primitives";
import { leaders } from "@/content/site";
import { founderPhoto } from "@/lib/founderPhotos";

/**
 * Home-page leadership teaser: 3 cards (headshot + name + title), each linking
 * to /founders. No bio text. Headshots are build-time gated (same rule as the
 * partner strip) — a missing webp renders name + title only, no image request.
 */
export default function FoundersTeaser() {
  return (
    <Section tone="surface">
      <Container>
        <Reveal className="mx-auto max-w-[680px] text-center">
          <Eyebrow>Leadership</Eyebrow>
          <h2 className="mt-3 text-[clamp(26px,3.4vw,40px)]">The people behind Ecoo Basket</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {leaders.map((l, i) => {
            const photo = founderPhoto(l.slug);
            return (
              <Reveal key={l.slug} delay={i * 0.06}>
                <Link href="/founders" className="group block overflow-hidden rounded-3xl border border-line bg-base shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg">
                  {photo && (
                    <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                      <Image src={photo} alt={`${l.name}, ${l.title}`} width={l.w} height={l.h} sizes="(max-width: 640px) 100vw, 33vw" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]" />
                    </div>
                  )}
                  <div className="p-6 text-center">
                    <h3 className="text-[18px]">{l.name}</h3>
                    <span className="mt-1.5 inline-block rounded-full bg-mint px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.06em] text-accent">{l.title}</span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
