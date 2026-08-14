"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  XCircle,
  RefreshCw,
  ShoppingBag,
  AlertTriangle,
  HelpCircle,
  ArrowLeft,
} from "lucide-react";

export default function FailedContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950 flex items-center justify-center p-4 sm:p-6 py-12 transition-colors">
      <div className="max-w-xl w-full">
        {/* Failed Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-rose-500/10 dark:shadow-none text-center relative overflow-hidden">
          {/* Top Decorative Ambient Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Animated Failed Icon */}
          <div className="relative z-10 mb-6">
            <div className="w-20 h-20 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-500 flex items-center justify-center mx-auto shadow-lg shadow-rose-500/20 animate-pulse">
              <XCircle className="w-10 h-10" />
            </div>
          </div>

          {/* Headline & Subtitle */}
          <div className="relative z-10 space-y-2 mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-400 text-xs font-bold uppercase tracking-wider">
              <AlertTriangle className="w-3.5 h-3.5" /> Transaction Unsuccessful
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Payment Failed
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              We couldn’t process your payment. Don’t worry, no funds were charged to your account.
            </p>
          </div>

          {/* Order Details Badge Box */}
          {orderId && (
            <div className="relative z-10 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/70 rounded-2xl p-4 mb-8 text-left flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Reference Order ID
                </span>
                <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                  #{orderId}
                </span>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400">
                Payment Declined
              </span>
            </div>
          )}

          {/* Helpful Troubleshooting Checklist */}
          <div className="relative z-10 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-4 sm:p-5 mb-8 text-left space-y-2.5">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Common reasons & Solutions:
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                <span>Incorrect card numbers, CVV, or expired card details.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                <span>Bank server timeout or cancelled payment authentication.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                <span>Insufficient balance or daily limit restrictions set by bank.</span>
              </li>
            </ul>
          </div>

          {/* Actions CTA Buttons */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => router.push(orderId ? `/checkout?orderId=${orderId}` : "/products")}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-indigo-500/25 transition-all text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              Try Payment Again
            </button>

            <Link
              href="/products"
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold py-3.5 px-6 rounded-2xl transition-all text-sm border border-slate-200 dark:border-slate-700"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Catalog
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}