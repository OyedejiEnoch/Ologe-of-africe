import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { GRACE } from "@/lib/placeholders";

export const metadata: Metadata = {
  title: "Our Story — OLÒGE of Africa",
  description: "The name, the feeling and the point of view behind OLÒGE of Africa.",
};

export default function StoryPage() {
  return (
    <>
      <main className="bg-cream pt-[88px] text-ink">
        <section className="mx-auto grid max-w-[1400px] border-x border-line lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex min-h-[60vh] flex-col justify-between px-6 py-12 md:px-10 md:py-16 lg:min-h-[calc(100vh-88px)] lg:px-16">
            <p className="eyebrow text-gold-deep">The house / Our story</p>
            <div className="py-16">
              <h1 className="max-w-[10ch] font-display text-[clamp(3.8rem,8vw,8rem)] leading-[0.9]">
                A name given with <em className="italic">love.</em>
              </h1>
              <p className="mt-9 max-w-[40ch] text-lg leading-8 text-ink-soft">
                OLÒGE of Africa began as a name my father called me. Today, it is a way of sharing the beauty of African fashion with the world.
              </p>
            </div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Fashion meets grace</p>
          </div>
          <div className="relative min-h-[66vh] overflow-hidden border-t border-line lg:min-h-0 lg:border-l lg:border-t-0">
            <Image
              src="/media/founder/founder-teal.jpg"
              alt="The founder of OLÒGE of Africa in a teal patterned dress"
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 55vw"
              className="object-cover object-[center_24%]"
            />
          </div>
        </section>

        <section className="border-y border-line bg-paper px-6 py-24 md:px-10 md:py-36">
          <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
            <p className="eyebrow text-gold-deep">Where it began / 01</p>
            <div>
              <h2 className="max-w-[17ch] font-display text-[clamp(2.7rem,5.6vw,5.5rem)] leading-[0.98]">
                It began as a name my father called me.
              </h2>
              <blockquote className="mt-12 max-w-[48rem] border-l border-gold pl-6 md:pl-10">
                <p className="font-yoruba text-[clamp(1.5rem,3vw,2.6rem)] italic leading-[1.3]">
                  “OLÒGE of Africa, ẹni kankan lo kù àbí bó jẹ́ mọ́?”
                </p>
                <cite className="mt-6 block text-sm not-italic text-muted">
                  Said on Sunday mornings, while everyone waited at the door.
                </cite>
              </blockquote>
              <p className="mt-12 max-w-[55ch] text-lg leading-8 text-ink-soft">
                A father’s love, a lifetime of effortless <em>shakara</em>, and a desire to share the beauty of African fashion with the world.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1400px] border-x border-line lg:grid-cols-[0.8fr_1.2fr]">
          <div className="relative min-h-[65vh] overflow-hidden bg-paper">
            <Image
              src="/media/founder/founder-suit.jpg"
              alt="The founder in a suit and glasses"
              fill
              sizes="(max-width: 1023px) 100vw, 45vw"
              className="object-cover object-top"
            />
          </div>
          <div className="flex flex-col justify-center border-t border-line px-6 py-20 md:px-10 lg:border-l lg:border-t-0 lg:px-16 lg:py-28">
            <p className="eyebrow text-gold-deep">The feeling / 02</p>
            <h2 className="mt-6 max-w-[12ch] font-display text-[clamp(3rem,6vw,6rem)] leading-[0.92]">
              Five letters. <em className="italic">One feeling.</em>
            </h2>
            <p className="mt-8 max-w-[44ch] text-lg leading-8 text-ink-soft">
              Gratitude, rarity, authenticity, confidence and elegance are the words that guide the house.
            </p>
            <ol className="mt-12 border-t border-line">
              {GRACE.map((item, index) => (
                <li key={item.letter} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-line py-5 md:grid-cols-[3rem_8rem_1fr] md:gap-6">
                  <span className="font-display text-2xl text-gold-deep">{item.letter}</span>
                  <span className="font-medium">{item.word}</span>
                  <span className="col-start-2 text-sm leading-6 text-ink-soft md:col-start-3">{item.line}</span>
                  <span className="sr-only">Value {index + 1} of {GRACE.length}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-ink px-6 py-24 text-cream md:px-10 md:py-32">
          <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-gold">The house continues</p>
              <h2 className="mt-5 max-w-[14ch] font-display text-[clamp(3rem,6vw,6rem)] leading-[0.94]">
                Find your own way to wear it.
              </h2>
            </div>
            <Link href="/shop" className="pressable inline-flex min-h-12 items-center rounded-full border border-cream px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] hover:bg-cream hover:text-ink">
              Explore the house <span className="ml-5" aria-hidden>↗</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
