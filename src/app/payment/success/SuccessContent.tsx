"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  PackageCheck,
  Mail,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";

export default function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");
  const [copied, setCopied] = useState(false);

  const handleCopyOrderId = () => {
    if (orderId && navigator.clipboard) {
      navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950 flex items-center justify-center p-4 sm:p-6 py-12 transition-colors">
      <div className="max-w-xl w-full">
        {/* Success Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-emerald-500/10 dark:shadow-none text-center relative overflow-hidden">
          {/* Top Decorative Ambient Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Animated Success Badge Icon */}
          <div className="relative z-10 mb-6">
            <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-500 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 animate-bounce duration-1000">
              <CheckCircle className="w-10 h-10" />
            </div>
          </div>

          {/* Headline & Subtitle */}
          <div className="relative z-10 space-y-2 mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Transaction
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Payment Successful! 🎉
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              Thank you for your order. Your payment has been confirmed, and we’re preparing your item for delivery.
            </p>
          </div>

          {/* Order Details Badge Box */}
          {orderId && (
            <div className="relative z-10 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/70 rounded-2xl p-4 mb-8 flex items-center justify-between gap-3 text-left">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Reference Order ID
                </span>
                <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                  #{orderId}
                </span>
              </div>

              <button
                onClick={handleCopyOrderId}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 transition-all shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    Copy ID
                  </>
                )}
              </button>
            </div>
          )}

          {/* Next Steps Progress Grid */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-left">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-start gap-3">
              <Mail className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Email Receipt Sent
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Check your inbox for order receipt details.
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-start gap-3">
              <PackageCheck className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Instant Dispatch
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Fulfillment team is processing your item.
                </div>
              </div>
            </div>
          </div>

          {/* Actions CTA Buttons */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => router.push("/products")}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-indigo-500/25 transition-all text-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              Continue Shopping
            </button>

            <Link
              href="/dashboard"
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold py-3.5 px-6 rounded-2xl transition-all text-sm border border-slate-200 dark:border-slate-700"
            >
              View Orders
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}