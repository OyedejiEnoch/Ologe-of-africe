// Two campaign tiles side by side, eyewear for her and for him, the way the
// luxury references (Jimmy Fairly, Sarah & Sebastian) split a range into two
// full-height photographs with a small caption and an underlined link at the
// foot. Stacks on phones. Both portraits are Nigerian looks (gele and coral
// beads, fila and aso-oke) shot on the same deep teal, so the pair reads as
// one campaign.
const TILES = [
  {
    label: "Eyewear for her",
    note: "Cat-eye, round, oversized",
    href: "/shop/eyewear?for=her",
    src: "/media/editorial/her-gele-coral.webp",
    alt: "A woman in a red gele, cream lace and coral beads, lowering a pair of crystal cat-eye sunglasses",
    position: "object-[50%_30%]",
  },
  {
    label: "Eyewear for him",
    note: "Slim, square, statement",
    href: "/shop/eyewear?for=him",
    src: "/media/editorial/him-fila-aso-oke.webp",
    alt: "A man in a beaded fila, aso-oke and long coral beads, wearing slim gold sunglasses",
    position: "object-[50%_20%]",
  },
];

export default function ForHerHim() {
  return (
    <section aria-label="Eyewear for her and for him" className="bg-cream px-6 pt-[var(--spacing-section)] md:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-3 md:grid-cols-2">
        {TILES.map((t) => (
          <a key={t.href} href={t.href} className="group relative block overflow-hidden bg-ink">
            <div data-reveal-img className="relative aspect-[4/5] overflow-hidden md:aspect-[5/6]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t.src}
                alt={t.alt}
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover ${t.position} transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]`}
              />
              <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-5 p-6 md:flex-row md:items-end md:justify-between md:gap-6 text-cream md:p-9">
              <div>
                <p className="font-display text-[clamp(1.8rem,3vw,2.8rem)] leading-none">{t.label}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-cream/70">{t.note}</p>
              </div>
              <span className="shrink-0 text-[0.7rem] font-medium uppercase tracking-[0.2em] underline decoration-cream/50 underline-offset-[0.6em] transition-colors group-hover:decoration-cream">
                Shop now
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
