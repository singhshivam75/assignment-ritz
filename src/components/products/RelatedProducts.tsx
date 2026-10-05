import Link from "next/link";
import type { Product } from "@/types/product";

type RelatedProductsProps = {
  products: Product[];
};

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 border-t border-slate-200/80 pt-12">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#D39B35]">
            You may also like
          </p>
          <h2 className="mt-1 text-2xl font-extrabold text-[#08184A]">
            Related products
          </h2>
        </div>
        <Link
          href="/products"
          className="text-sm font-semibold text-[#08184A] hover:text-[#D39B35]"
        >
          View catalog →
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#D39B35]/35 hover:shadow-lg"
          >
            <div className="relative h-36 overflow-hidden bg-slate-100">
              {product.thumbnail ? (
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              ) : null}
            </div>
            <div className="p-4">
              <h3 className="line-clamp-1 font-bold text-[#08184A] group-hover:text-[#D39B35]">
                {product.title}
              </h3>
              <p className="mt-1 text-sm font-extrabold text-[#08184A]">
                ₹
                {Number(product.discount_price ?? product.price).toLocaleString(
                  "en-IN"
                )}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
