import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import type { Product } from "@/types/product";
import { SectionHeader } from "@/components/home/SectionHeader";

type HomeFeaturedProductsProps = {
  products: Product[];
};

function formatPrice(product: Product) {
  const value = product.discount_price ?? product.price;
  return Number(value).toLocaleString("en-IN", { minimumFractionDigits: 0 });
}

export function HomeFeaturedProducts({ products }: HomeFeaturedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            eyebrow="Catalog"
            title="Featured products"
            description="Live picks from your catalog — pricing and availability stay in sync with the store."
          />
          <Link
            href="/products"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#08184A]/15 px-4 py-2.5 text-sm font-semibold text-[#08184A] transition hover:border-[#D39B35]/50 hover:text-[#D39B35]"
          >
            View all products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="animate-product-card-in group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#D39B35]/35 hover:shadow-xl"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="relative h-44 overflow-hidden bg-slate-100">
                {product.thumbnail ? (
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-400">
                    <ShoppingBag className="h-8 w-8" />
                  </div>
                )}
                {product.is_featured && (
                  <span className="absolute left-3 top-3 rounded-full bg-[#D39B35] px-2.5 py-1 text-[10px] font-bold uppercase text-white">
                    Featured
                  </span>
                )}
              </div>
              <div className="p-4">
                {product.category && (
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#D39B35]">
                    {product.category}
                  </p>
                )}
                <h3 className="mt-1 line-clamp-1 font-bold text-[#08184A] group-hover:text-[#D39B35]">
                  {product.title}
                </h3>
                <p className="mt-2 text-sm font-extrabold text-[#08184A]">
                  ₹{formatPrice(product)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
