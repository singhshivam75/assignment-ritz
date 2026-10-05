"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Product,
  ProductCategoriesResponse,
  ProductsApiResponse,
} from "@/types/product";
import { PRODUCTS_PAGE_SIZE } from "@/lib/products-query";
import { ProductsHero } from "@/components/products/ProductsHero";
import { ProductsFilter, SortOption } from "@/components/products/ProductsFilter";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductsPagination } from "@/components/products/ProductsPagination";
import {
  ProductsSkeletonGrid,
  ProductsErrorState,
  ProductsEmptyState,
} from "@/components/products/ProductsStateViews";

function parsePage(raw: string | null) {
  const page = Number(raw);
  return Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1;
}

function parseSort(raw: string | null): SortOption {
  if (
    raw === "latest" ||
    raw === "oldest" ||
    raw === "price-low" ||
    raw === "price-high"
  ) {
    return raw;
  }
  return "latest";
}

export default function ProductsCatalog() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = parsePage(searchParams.get("page"));
  const category = searchParams.get("category") ?? "";
  const sortOption = parseSort(searchParams.get("sort"));
  const featuredOnly = searchParams.get("featured") === "true";
  const urlSearch = searchParams.get("search") ?? "";

  const [searchInput, setSearchInput] = useState(urlSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(urlSearch.trim());
  const [categories, setCategories] = useState<string[]>([]);

  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSearchInput(urlSearch);
    setDebouncedSearch(urlSearch.trim());
  }, [urlSearch]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(searchInput.trim());
    }, 350);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  const replaceParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      const query = params.toString();
      router.replace(query ? `/products?${query}` : "/products", {
        scroll: false,
      });
    },
    [router, searchParams]
  );

  useEffect(() => {
    if (debouncedSearch === urlSearch.trim()) {
      return;
    }
    replaceParams({
      search: debouncedSearch || null,
      page: "1",
    });
  }, [debouncedSearch, urlSearch, replaceParams]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/products/categories");
        const data: ProductCategoriesResponse = await res.json();
        if (res.ok && data.categories) {
          setCategories(data.categories);
        }
      } catch {
        /* keep empty categories */
      }
    };
    void fetchCategories();
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: String(page),
        limit: String(PRODUCTS_PAGE_SIZE),
        active: "true",
        sort: sortOption,
      });

      if (debouncedSearch) {
        params.set("search", debouncedSearch);
      }
      if (category) {
        params.set("category", category);
      }
      if (featuredOnly) {
        params.set("featured", "true");
      }

      const response = await fetch(`/api/products?${params.toString()}`);
      const data: ProductsApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch products");
      }

      setProducts(data.products ?? []);
      setTotal(data.total ?? 0);
      setTotalPages(data.totalPages ?? Math.max(1, Math.ceil((data.total ?? 0) / (data.limit || PRODUCTS_PAGE_SIZE))));
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, category, sortOption, featuredOnly]);

  useEffect(() => {
    void fetchProducts();
  }, [fetchProducts]);

  const rangeStart = total === 0 ? 0 : (page - 1) * PRODUCTS_PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PRODUCTS_PAGE_SIZE, total);

  const categoryOptions = useMemo(
    () => ["All Categories", ...categories],
    [categories]
  );

  const handleResetFilters = () => {
    setSearchInput("");
    setDebouncedSearch("");
    router.replace("/products", { scroll: false });
  };

  return (
    <main className="min-h-screen bg-[#eef1f6] pb-20">
      <ProductsHero total={total} rangeStart={rangeStart} rangeEnd={rangeEnd} />

      <ProductsFilter
        search={searchInput}
        setSearch={setSearchInput}
        category={category}
        setCategory={(value) =>
          replaceParams({ category: value || null, page: "1" })
        }
        sortOption={sortOption}
        setSortOption={(value) =>
          replaceParams({ sort: value === "latest" ? null : value, page: "1" })
        }
        categories={categoryOptions}
        featuredOnly={featuredOnly}
        setFeaturedOnly={(value) =>
          replaceParams({ featured: value ? "true" : null, page: "1" })
        }
        loading={loading}
      />

      <section className="mx-auto mt-8 max-w-7xl px-4 sm:px-6">
        {!loading && !error && total > 0 && (
          <p className="mb-5 text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-[#08184A]">
              {rangeStart}–{rangeEnd}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#08184A]">{total}</span> products
            {debouncedSearch ? (
              <>
                {" "}
                for &ldquo;
                <span className="text-[#D39B35]">{debouncedSearch}</span>&rdquo;
              </>
            ) : null}
          </p>
        )}

        {error && <ProductsErrorState error={error} onRetry={fetchProducts} />}

        {loading && !error && <ProductsSkeletonGrid count={PRODUCTS_PAGE_SIZE} />}

        {!loading && !error && products.length === 0 && (
          <ProductsEmptyState onReset={handleResetFilters} />
        )}

        {!loading && !error && products.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
            <ProductsPagination
              page={page}
              totalPages={totalPages}
              disabled={loading}
              onPageChange={(nextPage) =>
                replaceParams({ page: nextPage <= 1 ? null : String(nextPage) })
              }
            />
          </>
        )}
      </section>
    </main>
  );
}
