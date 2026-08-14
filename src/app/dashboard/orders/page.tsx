"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Filter,
  Eye,
  ShoppingBag,
  CreditCard,
  CheckCircle2,
  Clock,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  TrendingUp,
  RefreshCw,
  User,
} from "lucide-react";
import { Order } from "@/types/product";

type DashboardOrder = Order & {
  title: string;
  thumbnail: string | null;
};

export default function DashboardOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<DashboardOrder[]>([]);
  const [search, setSearch] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });

      if (search.trim()) {
        params.append("search", search.trim());
      }

      if (paymentStatus) {
        params.append("status", paymentStatus);
      }

      const response = await fetch(`/api/orders?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch orders log.");
      }

      setOrders(data.orders || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, search, paymentStatus]);

  const totalPages = Math.ceil(total / limit);

  // Revenue & Status Stats Calculations
  const metrics = useMemo(() => {
    const totalRevenue = orders.reduce((acc, curr) => {
      if (curr.payment_status?.toLowerCase() === "success" || curr.payment_status?.toLowerCase() === "paid") {
        return acc + Number(curr.amount || 0);
      }
      return acc;
    }, 0);

    const paidCount = orders.filter(
      (o) => o.payment_status?.toLowerCase() === "success" || o.payment_status?.toLowerCase() === "paid"
    ).length;

    const pendingCount = orders.filter(
      (o) => o.payment_status?.toLowerCase() === "pending"
    ).length;

    return { totalRevenue, paidCount, pendingCount };
  }, [orders]);

  const getStatusBadge = (status: string) => {
    const normalized = status?.toLowerCase() || "";
    if (normalized === "success" || normalized === "paid") {
      return (
        <span className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 text-xs font-bold px-2.5 py-1 rounded-full">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          Success
        </span>
      );
    }
    if (normalized === "pending") {
      return (
        <span className="inline-flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900 text-xs font-bold px-2.5 py-1 rounded-full">
          <Clock className="w-3.5 h-3.5 text-amber-500" />
          Pending
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900 text-xs font-bold px-2.5 py-1 rounded-full">
        <XCircle className="w-3.5 h-3.5 text-rose-500" />
        {status || "Failed"}
      </span>
    );
  };

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950 p-6 lg:p-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Order Fulfillment Management
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Orders & Transactions
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Monitor incoming sales, check Razorpay payment verifications, and inspect customer transactions.
          </p>
        </div>

        {/* Metric Cards Header Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              Total Logged Orders
              <ShoppingBag className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {total}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center justify-between">
              Successful Transactions
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {metrics.paidCount}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center justify-between">
              Pending Payments
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {metrics.pendingCount}
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 min-w-[260px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by customer name, email, or product title..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={paymentStatus}
              onChange={(e) => {
                setPaymentStatus(e.target.value);
                setPage(1);
              }}
              className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              <option value="">All Payment Statuses</option>
              <option value="Success">Success</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>

            {(search || paymentStatus) && (
              <button
                onClick={() => {
                  setSearch("");
                  setPaymentStatus("");
                  setPage(1);
                }}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Orders Data Table */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/40 dark:shadow-none">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200/80 dark:border-slate-800 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                  <th className="p-4 pl-6">Order Ref</th>
                  <th className="p-4">Customer Details</th>
                  <th className="p-4">Product Item</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Payment Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 pr-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-400">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-indigo-500" />
                      Fetching customer order entries...
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-12 text-center">
                      <ShoppingBag className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                      <div className="font-semibold text-slate-700 dark:text-slate-300">
                        No orders recorded
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        Try clearing search terms or status filters.
                      </div>
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      {/* Order ID */}
                      <td className="p-4 pl-6 font-mono font-bold text-indigo-600 dark:text-indigo-400 text-xs">
                        #ORD-{order.id}
                      </td>

                      {/* Customer Info */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold text-xs flex-shrink-0">
                            {order.customer_name?.charAt(0)?.toUpperCase() || "U"}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white line-clamp-1">
                              {order.customer_name}
                            </div>
                            <div className="text-xs text-slate-400 line-clamp-1">
                              {order.customer_email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Product Title */}
                      <td className="p-4">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                          {order.title || `Product #${order.product_id}`}
                        </div>
                      </td>

                      {/* Amount */}
                      <td className="p-4 font-bold text-slate-900 dark:text-white">
                        ₹{Number(order.amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </td>

                      {/* Payment Status Badge */}
                      <td className="p-4">
                        {getStatusBadge(order.payment_status)}
                      </td>

                      {/* Date */}
                      <td className="p-4 text-xs text-slate-500 dark:text-slate-400">
                        {order.created_at
                          ? new Date(order.created_at).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "-"}
                      </td>

                      {/* View Action */}
                      <td className="p-4 pr-6 text-right">
                        <button
                          onClick={() => router.push(`/dashboard/orders/${order.id}`)}
                          className="inline-flex items-center gap-1 bg-slate-100 hover:bg-indigo-600 hover:text-white dark:bg-slate-800 dark:hover:bg-indigo-600 text-slate-700 dark:text-slate-300 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all"
                        >
                          <Eye className="w-3.5 h-3.5" /> View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Pagination Footer */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <div>
              Page <span className="font-bold text-slate-900 dark:text-white">{page}</span> of{" "}
              <span className="font-bold text-slate-900 dark:text-white">{totalPages || 1}</span> ({total} total orders)
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-semibold"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Previous
              </button>

              <button
                disabled={page >= totalPages || totalPages === 0}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-semibold"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}