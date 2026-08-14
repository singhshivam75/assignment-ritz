"use client";

import { useEffect, useState } from "react";
import { Product, ProductsApiResponse } from "@/types/product";
import { ProductsHero } from "@/components/products/ProductsHero";
import { ProductsFilter, SortOption } from "@/components/products/ProductsFilter";
import { ProductCard } from "@/components/products/ProductCard";
import {
  ProductsSkeletonGrid,
  ProductsErrorState,
  ProductsEmptyState,
} from "@/components/products/ProductsStateViews";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("latest");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 350);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        limit: "50",
        active: "true",
      });

      if (debouncedSearch) {
        params.append("search", debouncedSearch);
      }

      if (category && category !== "All Categories") {
        params.append("category", category);
      }

      if (sortOption === "oldest") {
        params.append("sort", "oldest");
      } else {
        params.append("sort", "latest");
      }

      const response = await fetch(`/api/products?${params.toString()}`);
      const data: ProductsApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch products");
      }

      let fetchedProducts = data.products || [];

      if (sortOption === "price-low") {
        fetchedProducts = [...fetchedProducts].sort((a, b) => {
          const priceA = a.discount_price ?? a.price;
          const priceB = b.discount_price ?? b.price;
          return Number(priceA) - Number(priceB);
        });
      } else if (sortOption === "price-high") {
        fetchedProducts = [...fetchedProducts].sort((a, b) => {
          const priceA = a.discount_price ?? a.price;
          const priceB = b.discount_price ?? b.price;
          return Number(priceB) - Number(priceA);
        });
      }

      setProducts(fetchedProducts);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [debouncedSearch, category, sortOption]);

  const handleResetFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setCategory("");
    setSortOption("latest");
  };

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-16 transition-colors">
      <ProductsHero count={products.length} />

      <ProductsFilter
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        {error && <ProductsErrorState error={error} onRetry={fetchProducts} />}

        {loading && !error && <ProductsSkeletonGrid />}

        {!loading && !error && products.length === 0 && (
          <ProductsEmptyState onReset={handleResetFilters} />
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}