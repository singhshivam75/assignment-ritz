import React from "react";
import Link from "next/link";
import { ChevronRight, ShoppingBag } from "lucide-react";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
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
    <div className="group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:border-slate-700 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Thumbnail Image Container */}
        <div className="relative h-60 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          {product.thumbnail ? (
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80";
              }}
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 gap-2">
              <ShoppingBag className="w-10 h-10 stroke-1" />
              <span className="text-xs font-medium">No Image</span>
            </div>
          )}

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-center pointer-events-none">
            {product.is_featured ? (
              <span className="bg-amber-500 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md tracking-wider">
                Featured
              </span>
            ) : (
              <span />
            )}

            {hasDiscount && (
              <span className="bg-rose-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md tracking-wider">
                -{discountPercent}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Card Content Body */}
        <div className="p-5">
          {product.category && (
            <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 tracking-wide uppercase mb-1.5">
              {product.category}
            </div>
          )}

          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
            {product.title}
          </h2>

          {product.short_description ? (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
              {product.short_description}
            </p>
          ) : (
            <p className="text-xs text-slate-400 dark:text-slate-600 italic mt-2">
              High quality product ready for order.
            </p>
          )}
        </div>
      </div>

      {/* Card Footer (Price & Action) */}
      <div className="p-5 pt-0 mt-auto border-t border-slate-100 dark:border-slate-800/80 pt-4 flex items-center justify-between">
        <div>
          <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
            Price
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-extrabold text-slate-900 dark:text-white">
              ₹{Number(currentPrice).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>
            {hasDiscount && (
              <span className="text-xs text-slate-400 line-through">
                ₹{Number(product.price).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            )}
          </div>
        </div>

        <Link
          href={`/products/${product.id}`}
          className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-indigo-600 dark:bg-slate-800 dark:hover:bg-indigo-600 text-white text-xs font-semibold px-3.5 py-2.5 rounded-xl transition-all shadow-sm group-hover:shadow-md"
        >
          View
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
