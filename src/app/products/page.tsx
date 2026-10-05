import { Suspense } from "react";
import ProductsCatalog from "@/components/products/ProductsCatalog";
import { ProductsSkeletonGrid } from "@/components/products/ProductsStateViews";
import { ProductsHero } from "@/components/products/ProductsHero";

function ProductsPageFallback() {
  return (
    <main className="min-h-screen bg-[#eef1f6] pb-20">
      <ProductsHero total={0} rangeStart={0} rangeEnd={0} />
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6">
        <ProductsSkeletonGrid />
      </section>
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsPageFallback />}>
      <ProductsCatalog />
    </Suspense>
  );
}
