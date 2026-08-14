import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Truck, ShieldCheck, RefreshCw, CreditCard, ChevronRight } from "lucide-react";
import { Product } from "@/types/product";

interface ProductPurchasePanelProps {
  product: Product;
}

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const finalPrice = product.discount_price ?? product.price;
  const hasDiscount =
    product.discount_price &&
    Number(product.discount_price) < Number(product.price);

  const savings = hasDiscount
    ? Number(product.price) - Number(product.discount_price)
    : 0;

  return (
    <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
      <div className="space-y-4">
        {/* Category Pill */}
        {product.category && (
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full">
            {product.category}
          </span>
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          {product.title}
        </h1>

        {/* Short Description */}
        {product.short_description && (
          <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
            {product.short_description}
          </p>
        )}

        {/* Pricing Section */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-2">
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Total Price
          </div>
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              ₹{Number(finalPrice).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>

            {hasDiscount && (
              <span className="text-lg text-slate-400 line-through">
                ₹{Number(product.price).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            )}

            {hasDiscount && (
              <span className="bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-lg">
                Save ₹{Number(savings).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            )}
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-4 pt-2">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Quantity:
          </span>
          <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3.5 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold transition-colors"
            >
              -
            </button>
            <span className="px-4 py-2 text-sm font-bold text-slate-900 dark:text-white border-x border-slate-100 dark:border-slate-800">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3.5 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Primary Buy Button CTA */}
        <div className="pt-4">
          <button
            onClick={() =>
              router.push(`/checkout?productId=${product.id}`)
            }
            className="w-full group bg-slate-900 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-bold py-4 px-6 rounded-2xl shadow-xl shadow-indigo-500/10 hover:shadow-indigo-500/25 transition-all flex items-center justify-center gap-3 text-base"
          >
            <CreditCard className="w-5 h-5" />
            Proceed to Checkout
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Key Trust Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <Truck className="w-4 h-4 text-indigo-500 flex-shrink-0" />
            <div className="text-[11px] leading-tight">
              <div className="font-bold text-slate-800 dark:text-slate-200">
                {product.delivery_time || "Fast Delivery"}
              </div>
              <div className="text-slate-400">Direct to doorstep</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <div className="text-[11px] leading-tight">
              <div className="font-bold text-slate-800 dark:text-slate-200">
                Safe Payment
              </div>
              <div className="text-slate-400">Razorpay Secured</div>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <RefreshCw className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <div className="text-[11px] leading-tight">
              <div className="font-bold text-slate-800 dark:text-slate-200">
                Guaranteed
              </div>
              <div className="text-slate-400">Authentic product</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
