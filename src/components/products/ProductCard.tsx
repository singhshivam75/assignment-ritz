import Link from "next/link";
import { ChevronRight, ShoppingBag } from "lucide-react";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const currentPrice = product.discount_price ?? product.price;
  const hasDiscount =
    product.discount_price &&
    Number(product.discount_price) < Number(product.price);

  const discountPercent = hasDiscount
    ? Math.round(
        ((Number(product.price) - Number(product.discount_price)) /
          Number(product.price)) *
          100
      )
    : 0;

  return (
    <article
      className="animate-product-card-in group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#D39B35]/35 hover:shadow-xl hover:shadow-[#08184A]/10"
      style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
    >
      <div>
        <div className="relative h-60 w-full overflow-hidden bg-slate-100">
          {product.thumbnail ? (
            <img
              src={product.thumbnail}
              alt={product.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80";
              }}
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-slate-400">
              <ShoppingBag className="h-10 w-10 stroke-1" />
              <span className="text-xs font-medium">No Image</span>
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08184A]/35 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

          <div className="absolute left-3 right-3 top-3 flex items-center justify-between">
            {product.is_featured ? (
              <span className="rounded-full bg-[#D39B35] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-md">
                Featured
              </span>
            ) : (
              <span />
            )}

            {hasDiscount && (
              <span className="rounded-full bg-rose-600 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-md">
                -{discountPercent}% OFF
              </span>
            )}
          </div>
        </div>

        <div className="p-5">
          {product.category && (
            <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[#D39B35]">
              {product.category}
            </div>
          )}

          <h2 className="line-clamp-1 text-base font-bold text-[#08184A] transition group-hover:text-[#D39B35]">
            {product.title}
          </h2>

          {product.short_description ? (
            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500">
              {product.short_description}
            </p>
          ) : (
            <p className="mt-2 text-xs italic text-slate-400">
              High quality product ready for order.
            </p>
          )}
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-slate-100 p-5 pt-4">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
            Price
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-extrabold text-[#08184A]">
              ₹
              {Number(currentPrice).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}
            </span>
            {hasDiscount && (
              <span className="text-xs text-slate-400 line-through">
                ₹
                {Number(product.price).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </span>
            )}
          </div>
        </div>

        <Link
          href={`/products/${product.id}`}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#08184A] px-3.5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#D39B35] group-hover:shadow-md"
        >
          View
          <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
