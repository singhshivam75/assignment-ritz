"use client";

import { Search } from "lucide-react";

interface OrderFilterBarProps {
  search: string;
  setSearch: (val: string) => void;
  paymentStatus: string;
  setPaymentStatus: (val: string) => void;
  setPage: (page: number) => void;
  onReset: () => void;
}

export default function OrderFilterBar({
  search,
  setSearch,
  paymentStatus,
  setPaymentStatus,
  setPage,
  onReset,
}: OrderFilterBarProps) {
  const hasFilters = Boolean(search || paymentStatus);

  return (
    <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
      <div className="relative flex-1 min-w-[260px]">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          placeholder="Search by customer name, email, or product title..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full pl-10 pr-4 py-2 bg-zinc-900/80 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-[#D49A34]/60 placeholder-zinc-500"
        />
      </div>

      <div className="flex items-center gap-3">
        <select
          value={paymentStatus}
          onChange={(e) => {
            setPaymentStatus(e.target.value);
            setPage(1);
          }}
          className="bg-zinc-900/80 border border-zinc-800 rounded-lg px-3 py-2 text-xs font-medium text-zinc-200 focus:outline-none focus:border-[#D49A34]/60"
        >
          <option value="" className="bg-zinc-900 text-white">
            All Payment Statuses
          </option>
          <option value="Success" className="bg-zinc-900 text-white">
            Success
          </option>
          <option value="Pending" className="bg-zinc-900 text-white">
            Pending
          </option>
          <option value="Failed" className="bg-zinc-900 text-white">
            Failed
          </option>
        </select>

        {hasFilters && (
          <button
            onClick={onReset}
            className="text-xs font-medium text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg border border-zinc-800 transition-colors"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
