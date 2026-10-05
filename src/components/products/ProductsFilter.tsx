"use client";

import { Search, SlidersHorizontal, ArrowUpDown, Tag, Star, Loader2 } from "lucide-react";

export type SortOption = "latest" | "oldest" | "price-low" | "price-high";

interface ProductsFilterProps {
  search: string;
  setSearch: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
  sortOption: SortOption;
  setSortOption: (val: SortOption) => void;
  categories: string[];
  featuredOnly: boolean;
  setFeaturedOnly: (val: boolean) => void;
  loading?: boolean;
}

export function ProductsFilter({
  search,
  setSearch,
  category,
  setCategory,
  sortOption,
  setSortOption,
  categories,
  featuredOnly,
  setFeaturedOnly,
  loading,
}: ProductsFilterProps) {
  const activeCategory = category === "" ? "All Categories" : category;

  return (
    <section className="relative z-20 mx-auto -mt-10 max-w-7xl px-4 sm:px-6">
      <div className="rounded-2xl border border-white/70 bg-white/95 p-4 shadow-2xl shadow-[#08184A]/10 backdrop-blur-xl sm:p-6">
        <div className="flex flex-col items-stretch justify-between gap-4 lg:flex-row lg:items-center">
          <div className="relative min-w-[280px] flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search products by title or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 transition placeholder:text-slate-400 focus:border-[#D39B35] focus:outline-none focus:ring-2 focus:ring-[#D39B35]/20"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded bg-slate-200/70 px-2 py-1 text-xs text-slate-500 transition hover:text-[#08184A]"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {loading && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Updating
              </span>
            )}

            <div className="relative min-w-[160px]">
              <select
                value={activeCategory}
                onChange={(e) =>
                  setCategory(
                    e.target.value === "All Categories" ? "" : e.target.value
                  )
                }
                className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 text-sm font-medium text-[#08184A] focus:border-[#D39B35] focus:outline-none focus:ring-2 focus:ring-[#D39B35]/20"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <SlidersHorizontal className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>

            <div className="relative min-w-[170px]">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 text-sm font-medium text-[#08184A] focus:border-[#D39B35] focus:outline-none focus:ring-2 focus:ring-[#D39B35]/20"
              >
                <option value="latest">Sort: Latest</option>
                <option value="oldest">Sort: Oldest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ArrowUpDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
          <span className="mr-1 flex items-center gap-1 text-xs font-medium text-slate-400">
            <Tag className="h-3.5 w-3.5" /> Quick filters:
          </span>

          {categories.map((cat) => {
            const isSelected =
              (cat === "All Categories" && !category) || category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() =>
                  setCategory(cat === "All Categories" ? "" : cat)
                }
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 ${
                  isSelected
                    ? "bg-[#08184A] text-white shadow-md shadow-[#08184A]/20"
                    : "bg-slate-100 text-slate-600 hover:-translate-y-0.5 hover:bg-[#D39B35]/10 hover:text-[#08184A]"
                }`}
              >
                {cat}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setFeaturedOnly(!featuredOnly)}
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 ${
              featuredOnly
                ? "bg-[#D39B35] text-white shadow-md shadow-[#D39B35]/30"
                : "bg-slate-100 text-slate-600 hover:-translate-y-0.5 hover:bg-[#D39B35]/10 hover:text-[#08184A]"
            }`}
          >
            <Star className="h-3.5 w-3.5" />
            Featured
          </button>
        </div>
      </div>
    </section>
  );
}
