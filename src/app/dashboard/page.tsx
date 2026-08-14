import { db } from "../../lib/db";
import Link from "next/link";
import {
  Package,
  ShoppingBag,
  Users,
  DollarSign,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";

async function getOverviewStats() {
  const [leadsRes, productsRes, ordersRes] = await Promise.all([
    db.query(`
      SELECT
        COUNT(*)::int AS total,
        COUNT(*) FILTER (WHERE query_status = 'Pending')::int AS pending,
        COUNT(*) FILTER (WHERE query_status = 'In Progress')::int AS in_progress,
        COUNT(*) FILTER (WHERE query_status = 'Resolved')::int AS resolved,
        COUNT(*) FILTER (WHERE query_status = 'Closed')::int AS closed
      FROM lead_details
    `),
    db.query(`
      SELECT
        COUNT(*)::int AS total,
        COUNT(*) FILTER (WHERE is_active = true)::int AS active,
        COUNT(*) FILTER (WHERE is_featured = true)::int AS featured
      FROM products
    `),
    db.query(`
      SELECT
        COUNT(*)::int AS total,
        COUNT(*) FILTER (WHERE LOWER(payment_status) IN ('success', 'paid'))::int AS paid,
        COUNT(*) FILTER (WHERE LOWER(payment_status) = 'pending')::int AS pending,
        COALESCE(SUM(amount) FILTER (WHERE LOWER(payment_status) IN ('success', 'paid')), 0)::numeric AS revenue
      FROM orders
    `),
  ]);

  return {
    leads: leadsRes.rows[0] || { total: 0, pending: 0, in_progress: 0, resolved: 0, closed: 0 },
    products: productsRes.rows[0] || { total: 0, active: 0, featured: 0 },
    orders: ordersRes.rows[0] || { total: 0, paid: 0, pending: 0, revenue: 0 },
  };
}

export default async function DashboardOverviewPage() {
  const { leads, products, orders } = await getOverviewStats();

  const formattedRevenue = Number(orders.revenue).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-medium text-[#D49A34] bg-[#D49A34]/10 border border-[#D49A34]/20 px-3 py-1 rounded-full mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Operations Hub
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Dashboard Overview
        </h1>
        <p className="mt-1 text-xs text-zinc-400">
          Real-time summary of sales revenue, inventory catalog, customer orders, and lead submissions.
        </p>
      </div>

      {/* Primary Key Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-5 backdrop-blur-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-medium">
            <span>Total Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">₹{formattedRevenue}</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
            <TrendingUp className="w-3 h-3" /> {orders.paid} Paid Orders
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-5 backdrop-blur-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-medium">
            <span>Store Products</span>
            <Package className="w-4 h-4 text-[#D49A34]" />
          </div>
          <div className="text-2xl font-bold text-white">{products.total}</div>
          <div className="text-[11px] text-zinc-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {products.active} Active Items
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-5 backdrop-blur-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-medium">
            <span>Total Orders</span>
            <ShoppingBag className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">{orders.total}</div>
          <div className="text-[11px] text-[#D49A34] flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#D49A34]" /> {orders.pending} Pending Payments
          </div>
        </div>

        {/* Total Leads */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-5 backdrop-blur-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-medium">
            <span>Website Leads</span>
            <Users className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold text-white">{leads.total}</div>
          <div className="text-[11px] text-zinc-400 flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-400" /> {leads.pending} Pending Review
          </div>
        </div>
      </div>

      {/* Lead Status Breakdown Section */}
      <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-sky-400" />
            Lead Inquiries Breakdown
          </h2>
          <Link
            href="/dashboard/leads"
            className="text-xs text-[#D49A34] hover:underline flex items-center gap-1 font-medium"
          >
            Manage Leads <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="p-3 bg-zinc-900/60 border border-zinc-800/60 rounded-lg">
            <p className="text-[11px] text-zinc-400 font-medium">Total Leads</p>
            <p className="text-lg font-bold text-white mt-1">{leads.total}</p>
          </div>
          <div className="p-3 bg-zinc-900/60 border border-zinc-800/60 rounded-lg">
            <p className="text-[11px] text-amber-400 font-medium">Pending</p>
            <p className="text-lg font-bold text-amber-400 mt-1">{leads.pending}</p>
          </div>
          <div className="p-3 bg-zinc-900/60 border border-zinc-800/60 rounded-lg">
            <p className="text-[11px] text-sky-400 font-medium">In Progress</p>
            <p className="text-lg font-bold text-sky-400 mt-1">{leads.in_progress}</p>
          </div>
          <div className="p-3 bg-zinc-900/60 border border-zinc-800/60 rounded-lg">
            <p className="text-[11px] text-emerald-400 font-medium">Resolved</p>
            <p className="text-lg font-bold text-emerald-400 mt-1">{leads.resolved}</p>
          </div>
          <div className="p-3 bg-zinc-900/60 border border-zinc-800/60 rounded-lg">
            <p className="text-[11px] text-zinc-400 font-medium">Closed</p>
            <p className="text-lg font-bold text-zinc-300 mt-1">{leads.closed}</p>
          </div>
        </div>
      </div>

      {/* Quick Access Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/dashboard/products"
          className="group bg-zinc-900/30 border border-zinc-800/80 hover:border-[#D49A34]/50 rounded-xl p-5 transition-all flex items-center justify-between"
        >
          <div>
            <h3 className="text-sm font-bold text-white group-hover:text-[#D49A34] transition-colors">
              Manage Products Catalog
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Add new products, update pricing, discount offers, and inventory availability.
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-[#D49A34] transition-colors flex-shrink-0 ml-4" />
        </Link>

        <Link
          href="/dashboard/orders"
          className="group bg-zinc-900/30 border border-zinc-800/80 hover:border-[#D49A34]/50 rounded-xl p-5 transition-all flex items-center justify-between"
        >
          <div>
            <h3 className="text-sm font-bold text-white group-hover:text-[#D49A34] transition-colors">
              Monitor Customer Orders
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Inspect order transactions, customer details, and verify Razorpay payment status.
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-[#D49A34] transition-colors flex-shrink-0 ml-4" />
        </Link>
      </div>
    </div>
  );
}
