import React, { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/types/product";

interface ProductGalleryProps {
  product: Product;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    product.thumbnail
  );

  const galleryImages = [
    product.thumbnail,
    ...(product.gallery || []),
  ].filter((img): img is string => Boolean(img));

  return (
    <div className="lg:col-span-6 space-y-4">
      {/* Main Active Image Box */}
      <div className="relative h-[420px] sm:h-[480px] w-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none flex items-center justify-center p-4">
        {selectedImage ? (
          <img
            src={selectedImage}
            alt={product.title}
            className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80";
            }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
            <ShoppingBag className="w-12 h-12 stroke-1" />
            <span className="text-sm">No Preview Available</span>
          </div>
        )}

        {/* Status Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="inline-flex items-center gap-1.5 bg-emerald-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md shadow-md">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            In Stock
          </span>
          {product.is_featured && (
            <span className="bg-amber-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md shadow-md">
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Thumbnail Selector List */}
      {galleryImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(img)}
              className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 bg-white dark:bg-slate-900 ${
                selectedImage === img
                  ? "border-indigo-600 shadow-md ring-2 ring-indigo-500/20"
                  : "border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
