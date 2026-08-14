"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  XCircle,
  Printer,
} from "lucide-react";
import OrderDetailsGrid, { DashboardOrderDetails } from "@/components/Dashboard/OrderDetailsGrid";

export default function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const id = resolvedParams?.id;

  const [order, setOrder] = useState<DashboardOrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/orders/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load order details.");
        }

        setOrder(data);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Failed to load order.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  const copyToClipboard = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(label);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const getStatusBadge = (status: string) => {
    const normalized = status?.toLowerCase() || "";
    if (normalized === "success" || normalized === "paid") {
      return (
        <span className="inline-flex items-center gap-1.5 bg-emerald-950/40 text-emerald-400 border border-emerald-800/60 text-xs font-medium px-3 py-1 rounded-full">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          Payment Successful
        </span>
      );
    }
    if (normalized === "pending") {
      return (
        <span className="inline-flex items-center gap-1.5 bg-amber-950/40 text-[#D49A34] border border-amber-800/60 text-xs font-medium px-3 py-1 rounded-full">
          <Clock className="w-4 h-4 text-[#D49A34]" />
          Payment Pending
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 bg-rose-950/40 text-rose-400 border border-rose-800/60 text-xs font-medium px-3 py-1 rounded-full">
        <XCircle className="w-4 h-4 text-rose-400" />
        Payment {status || "Failed"}
      </span>
    );
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white p-6 lg:p-8">
        <div className="max-w-5xl mx-auto space-y-6 animate-pulse">
          <div className="h-8 bg-zinc-900 rounded w-48" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-60 bg-zinc-900/60 rounded-xl" />
            <div className="h-60 bg-zinc-900/60 rounded-xl" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 text-center">
          <XCircle className="w-12 h-12 text-rose-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white">Order Record Not Found</h2>
          <p className="text-xs text-zinc-400 mt-2">
            {error || "The requested order ID does not exist."}
          </p>
          <Link
            href="/dashboard/orders"
            className="mt-6 inline-flex items-center gap-2 bg-[#D49A34] hover:bg-[#b88228] text-black font-semibold text-xs px-5 py-2.5 rounded-lg transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Orders Log
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link
              href="/dashboard/orders"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-white mb-2 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Orders Log
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Order #ORD-{order.id}
              </h1>
              {getStatusBadge(order.payment_status)}
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Created on{" "}
              {order.created_at
                ? new Date(order.created_at).toLocaleString("en-IN", {
                    dateStyle: "full",
                    timeStyle: "short",
                  })
                : "Unknown date"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-zinc-800 bg-zinc-900/80 text-zinc-200 hover:bg-zinc-800 text-xs font-medium transition-all"
            >
              <Printer className="w-4 h-4 text-zinc-400" />
              Print Receipt
            </button>
          </div>
        </div>

        {/* Reusable Details Grid */}
        <OrderDetailsGrid
          order={order}
          copiedId={copiedId}
          copyToClipboard={copyToClipboard}
        />
      </div>
    </main>
  );
}