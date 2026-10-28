import Image from "next/image";
import Link from "next/link";
import CategoryNav from "@/components/CategoryNav";
import ProductCard from "@/components/ProductCard";
import { type CategoryKey, type Product } from "@/lib/catalog";

type CollectionViewProps = {
  title: string;
  description: string;
  products: Product[];
  active: CategoryKey | "all";
  image?: string;
  eyewearView?: "all" | "her" | "him";
};

export default function CollectionView({
  title,
  description,
  products,
  active,
  image,
  eyewearView,
}: CollectionViewProps) {
  return (
    <main className="bg-cream pt-[88px] text-ink">
      <section className="mx-auto grid max-w-[1400px] border-x border-line lg:grid-cols-[1.05fr_.95fr]">
        <div className="flex min-h-[50vh] flex-col justify-end px-6 py-14 md:px-10 md:py-20 lg:min-h-[64vh] lg:px-14">
          <h1 className="max-w-[10ch] text-balance font-display text-[clamp(3.6rem,8vw,6rem)] leading-[0.88]">
            {title}
          </h1>
          <p className="mt-8 max-w-[46ch] text-base leading-7 text-ink-soft md:text-lg">
            {description}
          </p>
          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            {products.length} {products.length === 1 ? "piece" : "pieces"}
          </p>
        </div>

        {image ? (
          <div className="relative min-h-[48vh] overflow-hidden border-t border-line lg:min-h-0 lg:border-l lg:border-t-0">
            <Image src={image} alt="" fill priority className="object-cover" sizes="(max-width: 1023px) 100vw, 48vw" />
          </div>
        ) : (
          <div className="relative hidden overflow-hidden border-l border-line bg-ink lg:block">
            <Image
              src="/media/categories/eyewear.jpg"
              alt=""
              fill
              priority
              className="object-cover opacity-80"
              sizes="48vw"
            />
            <p className="absolute bottom-10 left-10 right-10 font-display text-4xl italic text-cream">
              Chosen for the way a look comes together.
            </p>
          </div>
        )}
      </section>

      <CategoryNav active={active} />

      {active === "eyewear" && eyewearView && (
        <nav aria-label="Eyewear edit" className="border-b border-line">
          <div className="mx-auto flex max-w-[1400px] flex-wrap gap-x-8 px-6 py-5 md:px-10">
            {([
              { key: "all", label: "All frames", href: "/shop/eyewear" },
              { key: "her", label: "For her", href: "/shop/eyewear?for=her" },
              { key: "him", label: "For him", href: "/shop/eyewear?for=him" },
            ] as const).map((view) => (
              <Link
                key={view.key}
                href={view.href}
                aria-current={eyewearView === view.key ? "page" : undefined}
                className={`min-h-11 content-center border-b text-xs font-semibold uppercase tracking-[0.15em] transition-colors ${eyewearView === view.key ? "border-ink text-ink" : "border-transparent text-muted hover:text-ink"}`}
              >
                {view.label}
              </Link>
            ))}
          </div>
        </nav>
      )}

      <section className="mx-auto max-w-[1400px] border-x border-line px-6 py-16 md:px-10 md:py-24">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-14 md:grid-cols-3 md:gap-x-5 md:gap-y-20 lg:gap-x-7">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="grid min-h-[46vh] place-items-center py-16 text-center">
            <div>
              <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)]">The edit is taking shape.</h2>
              <p className="mx-auto mt-5 max-w-[48ch] text-ink-soft">
                This collection has not been published yet. Explore the pieces already in the house, or enquire about what you are looking for.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link href="/shop/eyewear" className="pressable rounded-full bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-cream">
                  Explore eyewear
                </Link>
                <Link href="/shop/fascinators" className="pressable rounded-full border border-ink px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-ink">
                  See fascinators
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      {active !== "all" && (
        <aside className="border-t border-line bg-paper px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-8 md:flex-row md:items-end">
            <p className="max-w-[18ch] font-display text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.95]">
              Not finished looking?
            </p>
            <div className="max-w-[38ch]">
              <p className="text-ink-soft">Move through the full house and find the piece that changes the whole look.</p>
              <Link href="/shop" className="mt-5 inline-block text-sm font-semibold underline decoration-gold underline-offset-8">
                Shop all pieces →
              </Link>
            </div>
          </div>
        </aside>
      )}
    </main>
  );
}
