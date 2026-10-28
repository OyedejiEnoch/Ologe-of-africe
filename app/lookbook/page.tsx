import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Lookbook — OLÒGE of Africa",
  description: "A visual edit of colour, character and ways to wear the house.",
};

const looks = [
  {
    number: "01",
    title: "Colour in focus",
    src: "/media/lookbook/founder-patterned-look.jpeg",
    alt: "A woman in a vivid patterned dress with black lace sleeves",
    shape: "md:col-span-7",
    category: null,
  },
  {
    number: "02",
    title: "A point of view",
    src: "/media/lookbook/founder-yellow-frames.jpeg",
    alt: "A woman in a patterned jacket wearing oversized yellow-lens frames",
    shape: "md:col-span-5",
    category: "eyewear",
  },
  {
    number: "03",
    title: "The close-up",
    src: "/media/lookbook/founder-yellow-frames-close.jpeg",
    alt: "A close portrait of a woman in oversized yellow-lens frames",
    shape: "md:col-span-5",
    category: "eyewear",
  },
  {
    number: "04",
    title: "The whole look",
    src: "/media/hero.png",
    alt: "Four women wearing colourful patterned dress and headwraps",
    shape: "md:col-span-7",
    category: null,
  },
] as const;

export default function LookbookPage() {
  return (
    <>
      <main className="bg-cream pt-[88px] text-ink">
        <section className="mx-auto grid max-w-[1400px] border-x border-line lg:grid-cols-[1fr_0.9fr]">
          <div className="flex flex-col justify-end px-6 py-20 md:px-10 md:py-28 lg:min-h-[70vh] lg:px-16">
            <p className="eyebrow text-gold-deep">The lookbook / An editorial edit</p>
            <h1 className="mt-8 max-w-[10ch] font-display text-[clamp(4rem,8vw,8rem)] leading-[0.9]">
              Styled with <em className="italic">intention.</em>
            </h1>
            <p className="mt-9 max-w-[42ch] text-lg leading-8 text-ink-soft">
              Fashion as a language — a few ways to wear the house, put together the OLÒGE way.
            </p>
          </div>
          <div className="relative min-h-[62vh] overflow-hidden border-t border-line lg:min-h-0 lg:border-l lg:border-t-0">
            <Image
              src="/media/lookbook/founder-patterned-look.jpeg"
              alt="A woman smiling in a colourful African print dress"
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 48vw"
              className="object-cover object-top"
            />
          </div>
        </section>

        <section className="border-t border-line px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8 md:mb-16">
              <h2 className="font-display text-[clamp(2.8rem,5vw,5rem)]">The looks.</h2>
              <p className="max-w-[36ch] text-sm leading-6 text-ink-soft">
                An edit of portraits, colour and the details that make a look feel like your own.
              </p>
            </div>
            <div className="grid gap-x-6 gap-y-16 md:grid-cols-12 md:gap-x-8 md:gap-y-24">
              {looks.map((look) => (
                <figure key={look.number} className={look.shape}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-paper md:aspect-[4/4.5]">
                    <Image src={look.src} alt={look.alt} fill sizes="(max-width: 767px) 100vw, 60vw" className="object-cover object-top" />
                  </div>
                  <figcaption className="mt-5 flex items-start justify-between gap-4 border-t border-line pt-4">
                    <div className="flex items-baseline gap-4">
                      <span className="text-xs font-semibold tracking-[0.18em] text-gold-deep">{look.number}</span>
                      <span className="font-display text-[clamp(1.4rem,2.4vw,2.1rem)]">{look.title}</span>
                    </div>
                    {look.category && (
                      <Link href={`/shop/${look.category}`} className="min-h-11 shrink-0 content-center text-xs font-semibold uppercase tracking-[0.13em] underline decoration-gold underline-offset-8 hover:text-gold-deep">
                        Explore frames ↗
                      </Link>
                    )}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-line bg-paper px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-gold-deep">From the look to the piece</p>
              <h2 className="mt-5 max-w-[14ch] font-display text-[clamp(3rem,6vw,6rem)] leading-[0.94]">
                Make it your own.
              </h2>
            </div>
            <Link href="/shop" className="pressable inline-flex min-h-12 items-center rounded-full bg-ink px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-cream">
              Shop the edit <span className="ml-5" aria-hidden>↗</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
