import React from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";

export function CheckoutLoadingSkeleton() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-8 animate-pulse">
        <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-48" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 h-96 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
          <div className="lg:col-span-5 h-80 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
        </div>
      </div>
    </main>
  );
}

export function CheckoutNotFound() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center shadow-xl">
        <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Product Not Found
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Please select a valid product from our catalog before checking out.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 text-white text-sm font-semibold px-6 py-3 rounded-xl shadow transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Products
        </Link>
      </div>
    </main>
  );
}
