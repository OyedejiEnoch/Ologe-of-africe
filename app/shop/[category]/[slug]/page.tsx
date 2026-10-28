import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import {
  CATEGORY_LABEL,
  PRODUCTS,
  formatPrice,
  isCategoryKey,
  productBySlug,
  productsByCategory,
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

export default async function ProductPage({ params }: ProductPageProps) {
  const { category, slug } = await params;
  if (!isCategoryKey(category)) notFound();
  const product = productBySlug(category, slug);
  if (!product) notFound();

  const related = productsByCategory(category)
    .filter((item) => item.slug !== product.slug)
    .slice(0, 3);

  return (
    <>
      <main className="bg-cream pt-[88px] text-ink">
        <div className="mx-auto grid max-w-[1400px] border-x border-line lg:grid-cols-[minmax(0,1.55fr)_minmax(360px,.7fr)]">
          <section className="relative min-h-[62vh] overflow-hidden bg-paper lg:min-h-[calc(100vh-88px)]">
            <Image
              src={product.image}
              alt={`${product.name} — ${product.variant}`}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 68vw"
              className={`object-contain p-[10%] ${product.category === "fascinators" ? "" : "mix-blend-multiply"}`}
            />
            <p className="absolute bottom-5 left-6 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted md:left-10">
              One of the house edit
            </p>
          </section>

          <aside className="border-t border-line px-6 py-12 lg:sticky lg:top-[88px] lg:h-[calc(100vh-88px)] lg:border-l lg:border-t-0 lg:px-10 lg:py-14">
            <div className="flex h-full flex-col">
              <Link href={`/shop/${category}`} className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted hover:text-ink">
                <ArrowLeft aria-hidden size={14} strokeWidth={1.5} /> {CATEGORY_LABEL[category]}
              </Link>
              <h1 className="mt-10 text-balance font-display text-[clamp(3rem,5vw,5.5rem)] leading-[0.88]">
                {product.name}
              </h1>
              <p className="mt-5 font-display text-xl italic text-muted">{product.variant}</p>
              <p className="mt-8 text-lg font-medium">{formatPrice(product.price)}</p>
              <p className="mt-7 max-w-[42ch] leading-7 text-ink-soft">{product.description}</p>

              <div className="mt-10">
                <a
                  href={orderHref(product)}
                  className="pressable flex w-full items-center justify-between rounded-full bg-ink px-6 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-cream"
                >
                  Request this piece
                  <ArrowUpRight aria-hidden size={16} strokeWidth={1.5} />
                </a>
                <p className="mt-4 text-center text-xs leading-5 text-muted">
                  Availability, price and delivery are personally confirmed before payment.
                </p>
              </div>

              <div className="mt-auto border-t border-line pt-7">
                <p className="text-sm font-semibold">Ordering, kept personal.</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Send the piece to OLÒGE, ask your questions, and agree the details together.
                </p>
              </div>
            </div>
          </aside>
        </div>

        <section className="mx-auto max-w-[1400px] border-x border-t border-line px-6 py-20 md:px-10 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
            <h2 className="max-w-[9ch] font-display text-[clamp(3rem,6vw,5.5rem)] leading-[0.9]">
              Chosen to be seen.
            </h2>
            <div className="grid gap-8 border-t border-line pt-8 sm:grid-cols-2 lg:border-t-0 lg:pt-0">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em]">The piece</h3>
                <p className="mt-4 max-w-[40ch] leading-7 text-ink-soft">{product.description}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em]">The process</h3>
                <p className="mt-4 max-w-[40ch] leading-7 text-ink-soft">
                  We confirm the details directly, prepare your piece with care and arrange delivery with you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="border-t border-line bg-paper px-6 py-20 md:px-10 md:py-28">
            <div className="mx-auto max-w-[1400px]">
              <div className="flex items-end justify-between gap-8">
                <h2 className="font-display text-[clamp(2.8rem,5vw,4.8rem)] leading-[0.92]">More in the edit.</h2>
                <Link href={`/shop/${category}`} className="hidden text-sm font-semibold underline decoration-gold underline-offset-8 sm:block">
                  View {CATEGORY_LABEL[category].toLowerCase()} →
                </Link>
              </div>
              <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-14 md:mt-16 md:grid-cols-3 md:gap-x-7">
                {related.map((item) => (
                  <ProductCard key={item.slug} product={item} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
