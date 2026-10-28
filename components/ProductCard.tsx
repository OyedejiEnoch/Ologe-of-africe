import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CATEGORY_LABEL, formatPrice, type Product } from "@/lib/catalog";

export default function ProductCard({ product }: { product: Product }) {
  const href = `/shop/${product.category}/${product.slug}`;

  return (
    <article className="product-card group min-w-0">
      <Link href={href} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-paper">
          <Image
            src={product.image}
            alt={`${product.name} — ${product.variant}`}
            fill
            sizes="(max-width: 767px) 50vw, (max-width: 1199px) 33vw, 28vw"
            className={`product-card-image object-contain p-[12%] ${
              product.category === "fascinators" ? "" : "mix-blend-multiply"
            }`}
          />
          <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-ink/15 bg-cream/90 text-lg text-ink opacity-0 transition-[opacity,transform] duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
            <ArrowUpRight aria-hidden size={16} strokeWidth={1.5} />
            <span className="sr-only">View {product.name}</span>
          </span>
        </div>
        <div className="grid gap-1 border-t border-line pt-4 sm:grid-cols-[1fr_auto] sm:gap-x-6">
          <div className="min-w-0">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted">
              {CATEGORY_LABEL[product.category]}
            </p>
            <h2 className="mt-1 font-display text-[clamp(1.25rem,2.2vw,1.75rem)] leading-[1.08] text-ink">
              {product.name}
            </h2>
            <p className="mt-1 text-sm text-muted">{product.variant}</p>
          </div>
          <p className="mt-2 whitespace-nowrap text-sm font-medium text-ink sm:mt-0 sm:text-right">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </article>
  );
}
