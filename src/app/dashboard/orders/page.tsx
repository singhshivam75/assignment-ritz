"use client";

import { useEffect, useState, useMemo } from "react";
import { Sparkles, ShoppingBag, CheckCircle2, Clock } from "lucide-react";
import { Order } from "@/types/product";
import OrderFilterBar from "@/components/Dashboard/OrderFilterBar";
import OrderTable from "@/components/Dashboard/OrderTable";

type DashboardOrder = Order & {
  title: string;
  thumbnail: string | null;
};

export default function DashboardOrdersPage() {
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

  const metrics = useMemo(() => {
    const paidCount = orders.filter(
      (o) =>
        o.payment_status?.toLowerCase() === "success" ||
        o.payment_status?.toLowerCase() === "paid"
    ).length;

    const pendingCount = orders.filter(
      (o) => o.payment_status?.toLowerCase() === "pending"
    ).length;

    return { paidCount, pendingCount };
  }, [orders]);

  return (
    <main className="min-h-screen bg-black text-white p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-medium text-[#D49A34] bg-[#D49A34]/10 border border-[#D49A34]/20 px-3 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Order Fulfillment Management
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Orders & Transactions
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Monitor incoming sales, check Razorpay payment verifications, and inspect customer transactions.
          </p>
        </div>

        {/* Metric Cards Header Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-4">
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider flex items-center justify-between">
              Total Logged Orders
              <ShoppingBag className="w-4 h-4 text-[#D49A34]" />
            </div>
            <div className="text-xl font-bold text-white mt-1">{total}</div>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-4">
            <div className="text-xs font-medium text-emerald-400 uppercase tracking-wider flex items-center justify-between">
              Successful Transactions
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-bold text-white mt-1">
              {metrics.paidCount}
            </div>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-4">
            <div className="text-xs font-medium text-[#D49A34] uppercase tracking-wider flex items-center justify-between">
              Pending Payments
              <Clock className="w-4 h-4 text-[#D49A34]" />
            </div>
            <div className="text-xl font-bold text-white mt-1">
              {metrics.pendingCount}
            </div>
          </div>
        </div>

        {/* Reusable Filter Bar */}
        <OrderFilterBar
          search={search}
          setSearch={setSearch}
          paymentStatus={paymentStatus}
          setPaymentStatus={setPaymentStatus}
          setPage={setPage}
          onReset={() => {
            setSearch("");
            setPaymentStatus("");
            setPage(1);
          }}
        />

        {/* Reusable Order Table */}
        <OrderTable
          loading={loading}
          orders={orders}
          page={page}
          totalPages={totalPages}
          total={total}
          setPage={setPage}
        />
      </div>
    </main>
  );
}