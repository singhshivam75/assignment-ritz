"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Building2,
  CreditCard,
  ShoppingBag,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  ShieldCheck,
  Tag,
  DollarSign,
  Printer,
  Copy,
  Check,
} from "lucide-react";
import { Order } from "@/types/product";

type DashboardOrderDetails = Order & {
  title: string;
  description: string | null;
  thumbnail: string | null;
  category: string | null;
};

export default function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
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
        <span className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 text-xs font-bold px-3 py-1 rounded-full">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          Payment Successful
        </span>
      );
    }
    if (normalized === "pending") {
      return (
        <span className="inline-flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900 text-xs font-bold px-3 py-1 rounded-full">
          <Clock className="w-4 h-4 text-amber-500" />
          Payment Pending
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900 text-xs font-bold px-3 py-1 rounded-full">
        <XCircle className="w-4 h-4 text-rose-500" />
        Payment {status || "Failed"}
      </span>
    );
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 lg:p-8">
        <div className="max-w-5xl mx-auto space-y-6 animate-pulse">
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-48" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-60 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
            <div className="h-60 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center shadow-xl">
          <XCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Order Record Not Found
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            {error || "The requested order ID does not exist."}
          </p>
          <Link
            href="/dashboard/orders"
            className="mt-6 inline-flex items-center gap-2 bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 text-white text-sm font-semibold px-6 py-3 rounded-xl shadow transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Orders Log
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950 p-6 lg:p-8 transition-colors">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link
              href="/dashboard/orders"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 mb-2 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Orders Log
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Order #ORD-{order.id}
              </h1>
              {getStatusBadge(order.payment_status)}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
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
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold shadow-sm transition-all"
            >
              <Printer className="w-4 h-4 text-slate-400" />
              Print Receipt
            </button>
          </div>
        </div>

        {/* 4-Card Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Customer Details */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <User className="w-4 h-4 text-indigo-500" />
              Customer Details
            </h2>

            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  {order.customer_name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Customer Name</div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    {order.customer_name}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs text-slate-400 font-medium">Email Address</div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">
                    {order.customer_email}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs text-slate-400 font-medium">Phone Number</div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">
                    {order.customer_phone}
                  </div>
                </div>
              </div>

              {order.company_name && (
                <div className="flex items-start gap-3">
                  <Building2 className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Company Name</div>
                    <div className="font-semibold text-slate-800 dark:text-slate-200">
                      {order.company_name}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Card 2: Product Purchased */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <ShoppingBag className="w-4 h-4 text-purple-500" />
              Purchased Product
            </h2>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden flex-shrink-0">
                {order.thumbnail ? (
                  <img
                    src={order.thumbnail}
                    alt={order.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-bold text-slate-900 dark:text-white line-clamp-1">
                  {order.title || `Product #${order.product_id}`}
                </div>
                {order.category && (
                  <span className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-full">
                    {order.category}
                  </span>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-baseline">
              <span className="text-xs text-slate-400 uppercase font-semibold">
                Total Order Amount
              </span>
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                ₹{Number(order.amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Card 3: Razorpay Payment Info */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <CreditCard className="w-4 h-4 text-emerald-500" />
              Razorpay Gateway Verification
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <div className="text-slate-400 font-medium mb-1">Razorpay Order ID:</div>
                <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-2.5">
                  <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                    {order.razorpay_order_id || "Not generated"}
                  </span>
                  {order.razorpay_order_id && (
                    <button
                      onClick={() => copyToClipboard(order.razorpay_order_id!, "order_id")}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {copiedId === "order_id" ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              </div>

              <div>
                <div className="text-slate-400 font-medium mb-1">Razorpay Payment ID:</div>
                <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-2.5">
                  <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                    {order.razorpay_payment_id || "Pending checkout authorization"}
                  </span>
                  {order.razorpay_payment_id && (
                    <button
                      onClick={() => copyToClipboard(order.razorpay_payment_id!, "payment_id")}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {copiedId === "payment_id" ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Order Notes */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <FileText className="w-4 h-4 text-amber-500" />
              Customer Notes & Instructions
            </h2>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
              {order.notes || "No special instructions provided by customer for this order."}
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}