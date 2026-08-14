"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Plus,
  Search,
  SlidersHorizontal,
  Edit3,
  Trash2,
  Eye,
  Package,
  CheckCircle2,
  XCircle,
  Star,
  RefreshCw,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShoppingBag,
  ArrowUpDown,
} from "lucide-react";
import { Product } from "@/types/product";

const CATEGORIES = ["All Categories", "Electronics", "Fashion", "Home & Living"];

export default function DashboardProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters state
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  
  // Delete confirmation modal state
  const [deleteProductTarget, setDeleteProductTarget] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/products?limit=100");
      if (!response.ok) {
        throw new Error("Failed to load dashboard products.");
      }

      const data = await response.json();
      setProducts(data.products || data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err instanceof Error ? err.message : "Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        (product.short_description &&
          product.short_description.toLowerCase().includes(search.toLowerCase()));

      const matchesCategory =
        !category || category === "All Categories" || product.category === category;

      const matchesStatus =
        !status || product.is_active.toString() === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, search, category, status]);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, status]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  // Stats computation
  const stats = useMemo(() => {
    const total = products.length;
    const active = products.filter((p) => p.is_active).length;
    const inactive = total - active;
    const featured = products.filter((p) => p.is_featured).length;
    return { total, active, inactive, featured };
  }, [products]);

  // Handle Delete Confirmation
  const confirmDelete = async () => {
    if (!deleteProductTarget) return;

    try {
      setDeleting(true);
      const response = await fetch(`/api/products/${deleteProductTarget.id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete product.");
      }

      setProducts((prev) => prev.filter((p) => p.id !== deleteProductTarget.id));
      setToastMessage({
        type: "success",
        text: `"${deleteProductTarget.title}" was successfully deleted.`,
      });
      setDeleteProductTarget(null);
    } catch (err) {
      console.error(err);
      setToastMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to delete product.",
      });
    } finally {
      setDeleting(false);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950 p-6 lg:p-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Toast Alert Banner */}
        {toastMessage && (
          <div
            className={`p-4 rounded-2xl border flex items-center justify-between text-sm font-semibold shadow-lg transition-all animate-in fade-in ${
              toastMessage.type === "success"
                ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300"
                : "bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-300"
            }`}
          >
            <div className="flex items-center gap-2">
              {toastMessage.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              )}
              {toastMessage.text}
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-xs opacity-70 hover:opacity-100"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Product Management
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Products Overview
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Manage inventory, pricing, categories, and availability for your catalog.
            </p>
          </div>

          <button
            onClick={() => router.push("/dashboard/products/create")}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white text-sm font-bold px-5 py-3 rounded-2xl shadow-md transition-all shadow-indigo-500/10"
          >
            <Plus className="w-4 h-4" />
            Add New Product
          </button>
        </div>

        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Products
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {stats.total}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Active
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {stats.active}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5" /> Inactive
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {stats.inactive}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1">
              <Star className="w-3.5 h-3.5" /> Featured
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {stats.featured}
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search products by title or keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:text-white"
              />
            </div>

            {/* Selectors */}
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat === "All Categories" ? "" : cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              >
                <option value="">All Statuses</option>
                <option value="true">Active Only</option>
                <option value="false">Inactive Only</option>
              </select>

              {(search || category || status) && (
                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("");
                    setStatus("");
                  }}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Products Data Table */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/40 dark:shadow-none">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200/80 dark:border-slate-800 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                  <th className="p-4 pl-6">Product Item</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Visibility</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-indigo-500" />
                      Loading catalog items...
                    </td>
                  </tr>
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center">
                      <Package className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                      <div className="font-semibold text-slate-700 dark:text-slate-300">
                        No products found
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        Try adjusting your search criteria or add a new product.
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedProducts.map((product) => {
                    const currentPrice = product.discount_price ?? product.price;
                    const hasDiscount =
                      product.discount_price &&
                      Number(product.discount_price) < Number(product.price);

                    return (
                      <tr
                        key={product.id}
                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        {/* Product Title + Thumbnail */}
                        <td className="p-4 pl-6">
                          <div className="flex items-center gap-3.5">
                            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden flex-shrink-0">
                              {product.thumbnail ? (
                                <img
                                  src={product.thumbnail}
                                  alt={product.title}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).src =
                                      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80";
                                  }}
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                  <ShoppingBag className="w-5 h-5" />
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 dark:text-white line-clamp-1 flex items-center gap-2">
                                {product.title}
                                {product.is_featured && (
                                  <span className="bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                                    Featured
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-slate-400 font-mono mt-0.5">
                                Slug: /{product.slug}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="p-4">
                          <span className="inline-block bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold px-2.5 py-1 rounded-lg">
                            {product.category || "Uncategorized"}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="p-4">
                          <div className="font-bold text-slate-900 dark:text-white">
                            ₹{Number(currentPrice).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                          </div>
                          {hasDiscount && (
                            <div className="text-xs text-slate-400 line-through">
                              ₹{Number(product.price).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                            </div>
                          )}
                        </td>

                        {/* Visibility Status */}
                        <td className="p-4">
                          {product.is_active ? (
                            <span className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 text-xs font-bold px-2.5 py-1 rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700 text-xs font-bold px-2.5 py-1 rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                              Inactive
                            </span>
                          )}
                        </td>

                        {/* Action Buttons */}
                        <td className="p-4 pr-6 text-right">
                          <div className="inline-flex items-center gap-2">
                            <Link
                              href={`/products/${product.id}`}
                              target="_blank"
                              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                              title="Preview on store front"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>

                            <button
                              onClick={() =>
                                router.push(`/dashboard/products/${product.id}/edit`)
                              }
                              className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-xl transition-colors"
                              title="Edit product"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => setDeleteProductTarget(product)}
                              className="p-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-xl transition-colors"
                              title="Delete product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Pagination Footer */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <div>
              Showing <span className="font-semibold text-slate-800 dark:text-slate-200">{filteredProducts.length > 0 ? startIndex + 1 : 0}</span> to{" "}
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {Math.min(startIndex + productsPerPage, filteredProducts.length)}
              </span>{" "}
              of <span className="font-semibold text-slate-800 dark:text-slate-200">{filteredProducts.length}</span> products
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-semibold"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Previous
              </button>

              <span className="px-2 font-semibold">
                {currentPage} / {totalPages || 1}
              </span>

              <button
                disabled={currentPage >= totalPages || totalPages === 0}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-semibold"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      {deleteProductTarget && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Delete Product?
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Are you sure you want to permanently delete{" "}
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  "{deleteProductTarget.title}"
                </span>
                ? This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                disabled={deleting}
                onClick={() => setDeleteProductTarget(null)}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                Cancel
              </button>
              <button
                disabled={deleting}
                onClick={confirmDelete}
                className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm shadow-md shadow-rose-600/20 transition-all disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}