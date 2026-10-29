import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Corners from "@/components/Corners";
import ProductPlate from "@/components/ProductPlate";
import StickyRequest from "@/components/StickyRequest";
import {
  CATEGORY_LABEL,
  PRODUCTS,
  formatPrice,
  isCategoryKey,
  productBySlug,
} from "@/lib/catalog";
import { orderHref } from "@/lib/site";

type ProductPageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ category: product.category, slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { category, slug } = await params;
  if (!isCategoryKey(category)) return {};
  const product = productBySlug(category, slug);
  if (!product) return {};
  return {
    title: `${product.name} — OLÒGE of Africa`,
    description: product.description,
  };
}

const WEARER = { her: "Her", him: "Him", both: "Her & him" } as const;

// Product page: a large studio stage for the cut-out on the left, a sticky
// details panel on the right with one clear way to request the piece, and the
// rest of the house below. Everything commercial is stated honestly — price on
// request, availability and delivery agreed in chat before payment.
export default async function ProductPage({ params }: ProductPageProps) {
  const { category, slug } = await params;
  if (!isCategoryKey(category)) notFound();
  const product = productBySlug(category, slug);
  if (!product) notFound();

  const index = PRODUCTS.indexOf(product);
  // Same range first, then the rest of the house, four in all.
  const more = [
    ...PRODUCTS.filter((p) => p.category === category && p !== product),
    ...PRODUCTS.filter((p) => p.category !== category),
  ].slice(0, 4);
  const request = orderHref(product);

  const details = [
    { term: "The piece", detail: product.description },
    ...(product.wearer ? [{ term: "Worn by", detail: WEARER[product.wearer] }] : []),
    { term: "Ordering", detail: "Send us the piece. We confirm availability and price with you personally, and you pay only once it's agreed." },
    { term: "Delivery", detail: "Arranged with you in chat, to suit where you are." },
  ];

  return (
    <>
      <main className="bg-cream pt-[84px] text-ink">
        <nav aria-label="Breadcrumb" className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-5 md:px-10">
          <ol className="flex min-w-0 items-center gap-2 text-xs text-muted">
            <li><Link href="/shop" className="hover:text-ink">The house</Link></li>
            <li aria-hidden>/</li>
            <li><Link href={`/shop/${category}`} className="hover:text-ink">{CATEGORY_LABEL[category]}</Link></li>
            <li aria-hidden className="hidden sm:block">/</li>
            <li className="hidden truncate text-ink sm:block" aria-current="page">{product.name}</li>
          </ol>
          <span className="font-body text-[0.65rem] tabular-nums tracking-[0.2em] text-gold-deep">
            {String(index + 1).padStart(2, "0")} / {String(PRODUCTS.length).padStart(2, "0")}
          </span>
        </nav>

        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 md:px-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <section data-reveal-img aria-label="Product image" className="relative aspect-square overflow-hidden bg-paper lg:aspect-[5/6]">
            <Corners className="inset-6 md:inset-8" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={`${product.name} — ${product.variant}`}
              className={`absolute inset-0 m-auto max-h-[80%] max-w-[82%] object-contain ${
                product.category === "fascinators" ? "h-[80%] w-auto" : "h-auto w-[82%] mix-blend-multiply"
              }`}
            />
            <p className="absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-sm italic text-muted md:bottom-10">
              {product.variant}
            </p>
          </section>

          <aside className="lg:sticky lg:top-[108px] lg:self-start">
            <p className="eyebrow text-gold-deep">{CATEGORY_LABEL[category]}</p>
            <h1 className="font-display mt-4 text-balance text-[clamp(2.6rem,4.6vw,4.6rem)] leading-[0.92] tracking-[-0.025em]">
              {product.name}
            </h1>
            <p className="mt-4 font-display text-xl italic text-muted">{product.variant}</p>

            <div className="mt-8 flex items-baseline justify-between border-y border-line py-5">
              <span className="eyebrow">Price</span>
              <span className="font-display text-2xl">{formatPrice(product.price)}</span>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto]">
              <a
                data-magnetic
                id="request-cta"
                href={request}
                className="pressable inline-flex min-h-14 items-center justify-between gap-4 rounded-full bg-ink px-7 text-xs font-medium uppercase tracking-[0.18em] text-cream hover:bg-ink-deep"
              >
                Request this piece <span aria-hidden>→</span>
              </a>
              <Link
                href="/contact"
                className="pressable inline-flex min-h-14 items-center justify-center rounded-full border border-ink px-7 text-xs font-medium uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-cream"
              >
                Ask a question
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted">
              Nothing is paid until availability, price and delivery are confirmed with you.
            </p>

            <dl className="mt-10 border-t border-line">
              {details.map((d) => (
                <div key={d.term} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
                  <dt className="eyebrow pt-1">{d.term}</dt>
                  <dd className="leading-relaxed text-ink-soft">{d.detail}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <section className="mx-auto max-w-[1400px] px-6 py-[var(--spacing-section)] md:px-10">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-[clamp(2.2rem,4vw,3.6rem)]">
              More from the <em className="italic">house.</em>
            </h2>
            <Link href={`/shop/${category}`} className="hidden text-sm font-medium underline decoration-line underline-offset-8 hover:decoration-ink sm:block">
              All {CATEGORY_LABEL[category].toLowerCase()} →
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 border-l border-t border-line lg:grid-cols-4">
            {more.map((p) => (
              <div key={p.slug} className="border-b border-r border-line">
                <ProductPlate product={p} index={PRODUCTS.indexOf(p)} />
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <StickyRequest name={product.name} href={request} />
    </>
  );
}
