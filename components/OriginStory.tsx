// Homepage teaser for the origin story — the founder, the nickname and the line
// her father called out. The full telling lives on /story.
export default function OriginStory() {
  return (
    <section id="story" className="bg-cream px-6 py-[var(--spacing-section)] md:px-10">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 md:grid-cols-[5fr_6fr] md:gap-20">
        {/* The founder: main portrait, with a second look overlapping its corner. */}
        <div className="relative pb-16 md:pb-24">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/founder/founder-teal.jpg"
            alt="The founder of OLÒGE of Africa, smiling in a teal patterned dress"
            className="aspect-[4/5] w-[84%] object-cover object-top"
          />
          <figure className="absolute bottom-0 right-0 w-[44%] border-[6px] border-cream bg-cream shadow-[0_30px_60px_-30px_rgba(14,14,14,0.45)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/founder/founder-suit.jpg"
              alt="The founder in a navy pinstripe suit and glasses"
              className="aspect-[3/4] w-full object-cover"
            />
          </figure>
        </div>

        <div>
          <p className="eyebrow text-gold-deep">Our story</p>
          <h2 className="font-display mt-5 text-[clamp(2.2rem,4.6vw,3.9rem)] text-ink">
            It began as a name
            <br />
            my father called me.
          </h2>

          <blockquote className="my-10 border-l border-gold pl-6">
            <p className="font-yoruba text-[clamp(1.25rem,2.2vw,1.75rem)] italic text-ink">
              “OLÒGE of Africa, ẹni kankan lo kù àbí bó jẹ́ mọ́?”
            </p>
            <cite className="mt-3 block text-sm not-italic text-muted">
              — said on Sunday mornings, while everyone waited at the door.
            </cite>
          </blockquote>

          <p className="max-w-[48ch] text-ink-soft">
            A father’s love, a lifetime of effortless <em className="italic">shakara</em>,
            and a desire to share the beauty of African fashion with the world.
          </p>

          <a
            href="/story"
            className="mt-10 inline-flex items-center gap-3 rounded-full border border-ink px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            Read the full story <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
