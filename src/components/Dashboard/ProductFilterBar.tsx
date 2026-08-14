"use client";

import { Search } from "lucide-react";

const CATEGORIES = ["All Categories", "Electronics", "Fashion", "Home & Living"];

interface ProductFilterBarProps {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  onClear: () => void;
}

export default function ProductFilterBar({
  search,
  setSearch,
  category,
  setCategory,
  status,
  setStatus,
  onClear,
}: ProductFilterBarProps) {
  const hasFilters = Boolean(search || category || status);

  return (
    <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-xl p-4 space-y-4">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search products by title or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-900/80 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-[#D49A34]/60 placeholder-zinc-500"
          />
        </div>

        {/* Selectors */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-zinc-900/80 border border-zinc-800 rounded-lg px-3 py-2 text-xs font-medium text-zinc-200 focus:outline-none focus:border-[#D49A34]/60"
          >
            {CATEGORIES.map((cat) => (
              <option
                key={cat}
                value={cat === "All Categories" ? "" : cat}
                className="bg-zinc-900 text-white"
              >
                {cat}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-zinc-900/80 border border-zinc-800 rounded-lg px-3 py-2 text-xs font-medium text-zinc-200 focus:outline-none focus:border-[#D49A34]/60"
          >
            <option value="" className="bg-zinc-900 text-white">
              All Statuses
            </option>
            <option value="true" className="bg-zinc-900 text-white">
              Active Only
            </option>
            <option value="false" className="bg-zinc-900 text-white">
              Inactive Only
            </option>
          </select>

          {hasFilters && (
            <button
              onClick={onClear}
              className="text-xs font-medium text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg border border-zinc-800 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
