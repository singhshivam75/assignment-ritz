"use client";

import Link from "next/link";
import { ArrowLeft, Check, ChevronRight, Share2 } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/types/product";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductPurchasePanel } from "@/components/products/ProductPurchasePanel";
import { ProductOverview } from "@/components/products/ProductOverview";
import { RelatedProducts } from "@/components/products/RelatedProducts";

type ProductDetailViewProps = {
  product: Product;
  related: Product[];
};

export function ProductDetailView({ product, related }: ProductDetailViewProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      void navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-[#eef1f6] py-8 pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <nav className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
            <Link
              href="/products"
              className="flex items-center gap-1 font-medium text-[#08184A] transition hover:text-[#D39B35]"
            >
              <ArrowLeft className="h-4 w-4" />
              Products
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            {product.category && (
              <>
                <span className="font-medium text-slate-600">
                  {product.category}
                </span>
                <ChevronRight className="h-3.5 w-3.5" />
              </>
            )}
            <span className="line-clamp-1 font-semibold text-[#08184A]">
              {product.title}
            </span>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition hover:border-[#D39B35]/40"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                Copied
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5" />
                Share
              </>
            )}
          </button>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <ProductGallery product={product} />
          <ProductPurchasePanel product={product} />
        </div>

        <ProductOverview product={product} />
        <RelatedProducts products={related} />
      </div>
    </main>
  );
}
