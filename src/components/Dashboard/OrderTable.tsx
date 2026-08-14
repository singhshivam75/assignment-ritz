"use client";

import { useRouter } from "next/navigation";
import {
  Eye,
  ShoppingBag,
  CheckCircle2,
  Clock,
  XCircle,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import { Order } from "@/types/product";

type DashboardOrder = Order & {
  title: string;
  thumbnail: string | null;
};

interface OrderTableProps {
  loading: boolean;
  orders: DashboardOrder[];
  page: number;
  totalPages: number;
  total: number;
  setPage: (updater: (prev: number) => number) => void;
}

export default function OrderTable({
  loading,
  orders,
  page,
  totalPages,
  total,
  setPage,
}: OrderTableProps) {
  const router = useRouter();

  const getStatusBadge = (status: string) => {
    const normalized = status?.toLowerCase() || "";
    if (normalized === "success" || normalized === "paid") {
      return (
        <span className="inline-flex items-center gap-1.5 bg-emerald-950/40 text-emerald-400 border border-emerald-800/60 text-[11px] font-medium px-2.5 py-0.5 rounded-full">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          Success
        </span>
      );
    }
    if (normalized === "pending") {
      return (
        <span className="inline-flex items-center gap-1.5 bg-amber-950/40 text-[#D49A34] border border-amber-800/60 text-[11px] font-medium px-2.5 py-0.5 rounded-full">
          <Clock className="w-3.5 h-3.5 text-[#D49A34]" />
          Pending
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 bg-rose-950/40 text-rose-400 border border-rose-800/60 text-[11px] font-medium px-2.5 py-0.5 rounded-full">
        <XCircle className="w-3.5 h-3.5 text-rose-400" />
        {status || "Failed"}
      </span>
    );
  };

  return (
    <div className="bg-zinc-900/20 border border-zinc-800/80 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-900/60 border-b border-zinc-800 text-[11px] font-medium uppercase text-zinc-400 tracking-wider">
              <th className="p-3.5 pl-5">Order Ref</th>
              <th className="p-3.5">Customer Details</th>
              <th className="p-3.5">Product Item</th>
              <th className="p-3.5">Amount</th>
              <th className="p-3.5">Payment Status</th>
              <th className="p-3.5">Date</th>
              <th className="p-3.5 pr-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50 text-xs">
            {loading ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-zinc-400">
                  <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-[#D49A34]" />
                  Fetching customer order entries...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-10 text-center">
                  <ShoppingBag className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                  <div className="font-medium text-zinc-300">
                    No orders recorded
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">
                    Try clearing search terms or status filters.
                  </div>
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-zinc-900/50 transition-colors"
                >
                  {/* Order ID */}
                  <td className="p-3.5 pl-5 font-mono font-semibold text-[#D49A34] text-xs">
                    #ORD-{order.id}
                  </td>

                  {/* Customer Info */}
                  <td className="p-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center font-bold text-xs flex-shrink-0">
                        {order.customer_name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                      <div>
                        <div className="font-semibold text-white line-clamp-1">
                          {order.customer_name}
                        </div>
                        <div className="text-[11px] text-zinc-500 line-clamp-1">
                          {order.customer_email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Product Title */}
                  <td className="p-3.5">
                    <div className="font-medium text-zinc-200 line-clamp-1">
                      {order.title || `Product #${order.product_id}`}
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="p-3.5 font-semibold text-white">
                    ₹
                    {Number(order.amount).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </td>

                  {/* Payment Status Badge */}
                  <td className="p-3.5">
                    {getStatusBadge(order.payment_status)}
                  </td>

                  {/* Date */}
                  <td className="p-3.5 text-xs text-zinc-400">
                    {order.created_at
                      ? new Date(order.created_at).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "-"}
                  </td>

                  {/* View Action */}
                  <td className="p-3.5 pr-5 text-right">
                    <button
                      onClick={() =>
                        router.push(`/dashboard/orders/${order.id}`)
                      }
                      className="inline-flex items-center gap-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium px-2.5 py-1 rounded transition-all"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#D49A34]" /> View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Table Pagination Footer */}
      <div className="p-3.5 border-t border-zinc-800 bg-zinc-900/40 flex items-center justify-between text-xs text-zinc-400">
        <div>
          Page <span className="font-semibold text-white">{page}</span> of{" "}
          <span className="font-semibold text-white">{totalPages || 1}</span> (
          {total} total orders)
        </div>

        <div className="flex items-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 border border-zinc-700/60 disabled:opacity-40 hover:bg-zinc-700 transition-all text-xs"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Previous
          </button>

          <button
            disabled={page >= totalPages || totalPages === 0}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 border border-zinc-700/60 disabled:opacity-40 hover:bg-zinc-700 transition-all text-xs"
          >
            Next <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
