import { CATEGORY_LABEL, type Product } from "@/lib/catalog";
import Corners from "@/components/Corners";

// One plate in the hairline cabinet used by The Edit and the shop grids: index,
// range, the cut-out centred in a fixed frame, name and finish. Corner brackets
// close in on hover. Lay plates in a `gap-px bg-line border border-line` grid so
// the gaps read as hairlines. Price is deliberately absent — every page that
// shows plates states "priced on request" once instead.
export default function ProductPlate({ product: p, index }: { product: Product; index: number }) {
  return (
    <a
      data-plate
      href={`/shop/${p.category}/${p.slug}`}
      className="group relative flex aspect-[4/5] flex-col bg-cream p-4 outline-offset-[-2px] md:p-6"
    >
      <Corners className="scale-[0.92] opacity-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100" />
      <div className="flex items-baseline justify-between">
        <span className="font-body text-[0.65rem] tabular-nums tracking-[0.2em] text-gold-deep">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="eyebrow text-[0.6rem]">{CATEGORY_LABEL[p.category]}</span>
      </div>

      {/* The plate's height comes from the cell's aspect ratio; the cut-out is
          absolutely centred so a tall fascinator can't stretch the row. */}
      <div className="relative my-3 min-h-0 flex-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          data-plate-img
          src={p.image}
          alt={`${p.name} — ${p.variant}`}
          loading="lazy"
          className={`absolute inset-0 m-auto max-h-full max-w-full object-contain transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] ${
            p.category === "fascinators" ? "h-full w-auto" : "h-auto w-[88%] mix-blend-multiply"
          }`}
        />
      </div>

      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-[clamp(1.05rem,1.5vw,1.4rem)] leading-tight text-ink">{p.name}</h3>
          <p className="mt-1 truncate font-display text-sm italic text-muted">{p.variant}</p>
        </div>
        <span
          aria-hidden
          className="hidden shrink-0 translate-x-[-6px] text-ink opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:inline"
        >
          →
        </span>
      </div>
    </a>
  );
}
