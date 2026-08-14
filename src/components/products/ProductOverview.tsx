import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Product } from "@/types/product";

interface ProductOverviewProps {
  product: Product;
}

export function ProductOverview({ product }: ProductOverviewProps) {
  return (
    <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 border-t border-slate-200 dark:border-slate-800/80 pt-12">
      {/* Long Description */}
      <div className="lg:col-span-7 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          Product Overview
        </h2>
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
            {product.description || "No full description available for this product item."}
          </p>
        </div>
      </div>

      {/* Features Highlights */}
      {product.features && product.features.length > 0 && (
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            Key Features
          </h2>
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
            {product.features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
