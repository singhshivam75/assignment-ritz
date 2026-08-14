"use client";

import {
  User,
  Mail,
  Phone,
  Building2,
  ShoppingBag,
  CreditCard,
  FileText,
  Copy,
  Check,
} from "lucide-react";
import { Order } from "@/types/product";

export type DashboardOrderDetails = Order & {
  title: string;
  description: string | null;
  thumbnail: string | null;
  category: string | null;
};

interface OrderDetailsGridProps {
  order: DashboardOrderDetails;
  copiedId: string | null;
  copyToClipboard: (text: string, label: string) => void;
}

export default function OrderDetailsGrid({
  order,
  copiedId,
  copyToClipboard,
}: OrderDetailsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Card 1: Customer Details */}
      <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
          <User className="w-4 h-4 text-[#D49A34]" />
          Customer Details
        </h2>

        <div className="space-y-3.5 text-xs">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
              {order.customer_name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div>
              <div className="text-[11px] text-zinc-500">Customer Name</div>
              <div className="font-semibold text-white">
                {order.customer_name}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-[11px] text-zinc-500">Email Address</div>
              <div className="font-medium text-zinc-200">
                {order.customer_email}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-[11px] text-zinc-500">Phone Number</div>
              <div className="font-medium text-zinc-200">
                {order.customer_phone}
              </div>
            </div>
          </div>

          {order.company_name && (
            <div className="flex items-start gap-3">
              <Building2 className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-[11px] text-zinc-500">Company Name</div>
                <div className="font-medium text-zinc-200">
                  {order.company_name}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card 2: Product Purchased */}
      <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
          <ShoppingBag className="w-4 h-4 text-purple-400" />
          Purchased Product
        </h2>

        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-lg bg-zinc-800 border border-zinc-700/60 overflow-hidden flex-shrink-0">
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
              <div className="w-full h-full flex items-center justify-center text-zinc-500">
                <ShoppingBag className="w-5 h-5" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="font-semibold text-white line-clamp-1">
              {order.title || `Product #${order.product_id}`}
            </div>
            {order.category && (
              <span className="text-[10px] font-medium uppercase text-[#D49A34] bg-[#D49A34]/10 border border-[#D49A34]/20 px-2 py-0.5 rounded">
                {order.category}
              </span>
            )}
          </div>
        </div>

        <div className="pt-3 border-t border-zinc-800 flex justify-between items-baseline">
          <span className="text-[11px] text-zinc-400 uppercase font-medium">
            Total Order Amount
          </span>
          <span className="text-xl font-bold text-white">
            ₹
            {Number(order.amount).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>

      {/* Card 3: Razorpay Payment Info */}
      <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
          <CreditCard className="w-4 h-4 text-emerald-400" />
          Razorpay Gateway Verification
        </h2>

        <div className="space-y-3 text-xs">
          <div>
            <div className="text-zinc-500 font-medium mb-1 text-[11px]">
              Razorpay Order ID:
            </div>
            <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-lg p-2.5">
              <span className="font-mono text-zinc-200 text-xs">
                {order.razorpay_order_id || "Not generated"}
              </span>
              {order.razorpay_order_id && (
                <button
                  onClick={() =>
                    copyToClipboard(order.razorpay_order_id!, "order_id")
                  }
                  className="text-zinc-400 hover:text-white"
                >
                  {copiedId === "order_id" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              )}
            </div>
          </div>

          <div>
            <div className="text-zinc-500 font-medium mb-1 text-[11px]">
              Razorpay Payment ID:
            </div>
            <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-lg p-2.5">
              <span className="font-mono text-zinc-200 text-xs">
                {order.razorpay_payment_id || "Pending checkout authorization"}
              </span>
              {order.razorpay_payment_id && (
                <button
                  onClick={() =>
                    copyToClipboard(order.razorpay_payment_id!, "payment_id")
                  }
                  className="text-zinc-400 hover:text-white"
                >
                  {copiedId === "payment_id" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
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
      <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
          <FileText className="w-4 h-4 text-[#D49A34]" />
          Customer Notes & Instructions
        </h2>

        <div className="p-3.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-300 leading-relaxed italic">
          {order.notes ||
            "No special instructions provided by customer for this order."}
        </div>
      </div>
    </div>
  );
}
