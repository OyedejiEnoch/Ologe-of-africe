import Link from "next/link";
import CategoryNav from "@/components/CategoryNav";
import ProductPlate from "@/components/ProductPlate";
import OrderBand from "@/components/OrderBand";
import { CATEGORY_LABEL, PRODUCTS, type CategoryKey, type Product } from "@/lib/catalog";
import { orderHref } from "@/lib/site";

// Shared layout for /shop and /shop/[category]: an editorial masthead, sticky
// range tabs, then the hairline cabinet of plates (bordered per cell so a short
// last row simply ends on white). One lifestyle frame is hung into the grid on
// pages that have enough pieces to carry it. Empty ranges get a designed
// "being chosen" state that keeps the visitor moving rather than a dead end.
type Editorial = { src: string; alt: string; caption: string; href: string };

type CollectionViewProps = {
  title: string;
  description: string;
  products: Product[];
  active: CategoryKey | "all";
  image?: string;
  eyewearView?: "all" | "her" | "him";
  editorial?: Editorial;
};

const CELL = "border-b border-r border-line";

export default function CollectionView({
  title,
  description,
  products,
  active,
  image,
  eyewearView,
  editorial,
}: CollectionViewProps) {
  const label = active === "all" ? null : CATEGORY_LABEL[active];
  const showEditorial = editorial && products.length >= 6;
  const before = showEditorial ? products.slice(0, 5) : products;
  const after = showEditorial ? products.slice(5) : [];

  return (
    <>
      <main className="bg-cream pt-[84px] text-ink">
        <header className="mx-auto grid max-w-[1400px] gap-10 px-6 pb-14 pt-16 md:grid-cols-12 md:px-10 md:pb-20 md:pt-24">
          <div className="md:col-span-8">
            <p className="eyebrow text-gold-deep">
              <Link href="/shop" className="hover:text-ink">The house</Link>
              {label && <span className="text-muted"> · {label}</span>}
            </p>
            <h1 className="font-display mt-5 max-w-[12ch] text-[clamp(3.4rem,8.6vw,8.25rem)] leading-[0.86] tracking-[-0.03em]">
              {title}
            </h1>
          </div>
          <div className="self-end md:col-span-4">
            <p className="text-lg leading-relaxed text-ink-soft">{description}</p>
            <p className="mt-6 border-t border-line pt-4 text-sm text-muted">
              <span className="text-ink">{products.length > 0 ? `${products.length} ${products.length === 1 ? "piece" : "pieces"}` : "Coming soon"}</span>
              {" · "}Priced on request, confirmed with you in chat.
            </p>
          </div>
        </header>

        <CategoryNav active={active} />

        {active === "eyewear" && eyewearView && (
          <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-6 pt-8 md:px-10">
            <p className="eyebrow">Frames for</p>
            <nav aria-label="Eyewear edit" className="flex rounded-full border border-line p-1">
              {([
                { key: "all", label: "Everyone", href: "/shop/eyewear" },
                { key: "her", label: "Her", href: "/shop/eyewear?for=her" },
                { key: "him", label: "Him", href: "/shop/eyewear?for=him" },
              ] as const).map((view) => (
                <Link
                  key={view.key}
                  href={view.href}
                  aria-current={eyewearView === view.key ? "page" : undefined}
                  className={`inline-flex min-h-10 items-center rounded-full px-5 text-xs font-medium uppercase tracking-[0.15em] transition-colors ${
                    eyewearView === view.key ? "bg-ink text-cream" : "text-muted hover:text-ink"
                  }`}
                >
                  {view.label}
                </Link>
              ))}
            </nav>
          </div>
        )}

        <section className="mx-auto max-w-[1400px] px-6 py-10 md:px-10 md:py-14">
          {products.length > 0 ? (
            <div className="grid grid-cols-2 border-l border-t border-line md:grid-cols-3 lg:grid-cols-4">
              {before.map((p, i) => (
                <div key={p.slug} className={CELL}>
                  <ProductPlate product={p} index={i} />
                </div>
              ))}
              {showEditorial && (
                <Link
                  data-reveal-img
                  href={editorial.href}
                  className={`group relative col-span-2 block aspect-[4/3] overflow-hidden md:aspect-auto ${CELL}`}
                >
                  {/* Absolute so the photo fills the row the plates set, rather
                      than its own height deciding the row. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={editorial.src}
                    alt={editorial.alt}
                    className="absolute inset-0 h-full w-full object-cover object-[50%_30%] transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/75 via-transparent to-transparent" />
                  <p className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-cream md:bottom-7 md:left-7 md:right-7">
                    <span className="font-display text-[clamp(1.3rem,2.2vw,2rem)] italic leading-tight">{editorial.caption}</span>
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </p>
                </Link>
              )}
              {after.map((p, i) => (
                <div key={p.slug} className={CELL}>
                  <ProductPlate product={p} index={before.length + i} />
                </div>
              ))}
            </div>
          ) : (
            <BeingChosen label={label ?? "house"} image={image} />
          )}
        </section>
      </main>
      <OrderBand />
    </>
  );
}

// A range with nothing published yet: say so plainly, invite the request, and
// show what the house already has.
function BeingChosen({ label, image }: { label: string; image?: string }) {
  const lower = label.toLowerCase();
  return (
    <div>
      <div className="grid items-center gap-10 border border-line md:grid-cols-2">
        {image && (
          <div data-reveal-img className="overflow-hidden bg-cream">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt="" className="aspect-[4/3] w-full object-cover mix-blend-multiply md:aspect-square" />
          </div>
        )}
        <div className="px-6 pb-10 md:px-12 md:py-12">
          <p className="eyebrow text-gold-deep">Being chosen</p>
          <h2 className="font-display mt-4 max-w-[14ch] text-[clamp(2.2rem,4.4vw,3.8rem)]">
            The {lower} edit is taking shape.
          </h2>
          <p className="mt-5 max-w-[42ch] text-ink-soft">
            The house is still selecting its {lower}. Tell us what you&rsquo;re looking for and we&rsquo;ll reply personally when something fits.
          </p>
          <a
            href={orderHref()}
            className="pressable mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-ink px-7 text-xs font-medium uppercase tracking-[0.18em] text-cream hover:bg-ink-deep"
          >
            Ask about {lower} <span aria-hidden>→</span>
          </a>
        </div>
      </div>

      <div className="mt-20 flex items-end justify-between gap-6">
        <h3 className="font-display text-[clamp(1.8rem,3vw,2.6rem)]">Meanwhile, in the house</h3>
        <Link href="/shop" className="text-sm font-medium underline decoration-line underline-offset-8 hover:decoration-ink">
          All pieces →
        </Link>
      </div>
      <div className="mt-8 grid grid-cols-2 border-l border-t border-line lg:grid-cols-4">
        {PRODUCTS.slice(0, 4).map((p, i) => (
          <div key={p.slug} className={CELL}>
            <ProductPlate product={p} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}
