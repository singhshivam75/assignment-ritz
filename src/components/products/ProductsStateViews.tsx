import React from "react";
import { AlertCircle, RefreshCw, PackageX } from "lucide-react";

export function ProductsSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm animate-pulse"
        >
          <div className="h-60 bg-slate-200 dark:bg-slate-800" />
          <div className="p-5 space-y-3">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
            <div className="pt-4 flex justify-between items-center">
              <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-20" />
              <div className="h-9 bg-slate-200 dark:bg-slate-800 rounded-xl w-28" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

interface ProductsErrorStateProps {
  error: string;
  onRetry: () => void;
}

export function ProductsErrorState({ error, onRetry }: ProductsErrorStateProps) {
  return (
    <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 rounded-2xl p-6 text-center my-8 shadow-sm">
      <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
      <h3 className="text-lg font-semibold text-red-900 dark:text-red-300">
        Unable to load products
      </h3>
      <p className="text-sm text-red-600 dark:text-red-400 mt-1 max-w-md mx-auto">
        {error}
      </p>
      <button
        onClick={onRetry}
        className="mt-4 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow transition-all"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        Try Again
      </button>
    </div>
  );
}

interface ProductsEmptyStateProps {
  onReset: () => void;
}

export function ProductsEmptyState({ onReset }: ProductsEmptyStateProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-12 text-center my-8 shadow-sm">
      <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500 flex items-center justify-center mx-auto mb-4">
        <PackageX className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
        No matching products found
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
        We couldn’t find any items matching your current search or category filter. Try clearing filters or searching for something else.
      </p>
      <button
        onClick={onReset}
        className="mt-6 inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl shadow-md transition-all"
      >
        Reset All Filters
      </button>
    </div>
  );
}
