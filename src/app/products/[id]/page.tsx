"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, AlertCircle, ChevronRight, Share2, Check } from "lucide-react";
import { Product } from "@/types/product";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductPurchasePanel } from "@/components/products/ProductPurchasePanel";
import { ProductOverview } from "@/components/products/ProductOverview";

export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const id = resolvedParams?.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch product details");
        }

        const loadedProduct: Product = data.product || data;
        setProduct(loadedProduct);
      } catch (err) {
        console.error(err);
        setError(
          err instanceof Error ? err.message : "Failed to load product."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-48" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="h-[460px] bg-slate-200 dark:bg-slate-800 rounded-3xl" />
            <div className="space-y-4">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-24" />
              <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
              <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
              <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
              <div className="h-14 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center shadow-xl">
          <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-500 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Product Not Found
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            {error || "The requested product does not exist or may have been removed."}
          </p>
          <Link
            href="/products"
            className="mt-6 inline-flex items-center gap-2 bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-md transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products Catalog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-8 pb-16 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Header */}
        <nav className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <Link
              href="/products"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            {product.category && (
              <>
                <span className="font-medium text-slate-600 dark:text-slate-300">
                  {product.category}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </>
            )}
            <span className="font-semibold text-slate-900 dark:text-white line-clamp-1">
              {product.title}
            </span>
          </div>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                Copied Link!
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-400" />
                Share
              </>
            )}
          </button>
        </nav>

        {/* Top Split Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <ProductGallery product={product} />
          <ProductPurchasePanel product={product} />
        </div>

        {/* Detailed Sections: Description & Features */}
        <ProductOverview product={product} />
      </div>
    </main>
  );
}