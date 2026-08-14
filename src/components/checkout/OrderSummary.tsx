import React from "react";
import { ShoppingBag, CheckCircle2 } from "lucide-react";
import { Product } from "@/types/product";

interface OrderSummaryProps {
  product: Product;
}

export function OrderSummary({ product }: OrderSummaryProps) {
  const finalPrice = product.discount_price ?? product.price;
  const hasDiscount =
    product.discount_price &&
    Number(product.discount_price) < Number(product.price);
  const discountSavings = hasDiscount
    ? Number(product.price) - Number(product.discount_price)
    : 0;

  return (
    <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6 sticky top-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center justify-between">
        Order Summary
        <ShoppingBag className="w-5 h-5 text-indigo-500" />
      </h2>

      {/* Product Thumbnail & Details Card */}
      <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
        <div className="w-20 h-20 rounded-xl bg-white dark:bg-slate-900 overflow-hidden flex-shrink-0 border border-slate-200 dark:border-slate-700">
          {product.thumbnail ? (
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400">
              <ShoppingBag className="w-6 h-6" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
            {product.title}
          </h3>
          {product.category && (
            <span className="text-[10px] font-semibold uppercase text-indigo-600 dark:text-indigo-400">
              {product.category}
            </span>
          )}
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Qty: 1 item
          </div>
        </div>
      </div>

      {/* Price Calculations */}
      <div className="space-y-3 text-sm pt-2">
        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>Original Subtotal</span>
          <span>₹{Number(product.price).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
        </div>

        {hasDiscount && (
          <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
            <span>Product Discount</span>
            <span>-₹{Number(discountSavings).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
          </div>
        )}

        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>Shipping & Delivery</span>
          <span className="text-emerald-600 font-semibold">FREE</span>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex justify-between items-baseline">
          <div>
            <div className="text-base font-extrabold text-slate-900 dark:text-white">
              Total Payable
            </div>
            <div className="text-[10px] text-slate-400">Includes all taxes</div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            ₹{Number(finalPrice).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      {/* Security Guarantee List */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          <span>Verified Razorpay Gateway checkout</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          <span>Instant automated order confirmation email</span>
        </div>
      </div>
    </div>
  );
}
