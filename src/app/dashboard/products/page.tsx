"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  CheckCircle2,
  XCircle,
  Star,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { Product } from "@/types/product";
import ProductFilterBar from "@/components/Dashboard/ProductFilterBar";
import ProductTable from "@/components/Dashboard/ProductTable";

export default function DashboardProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters state
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  // Delete modal & toast state
  const [deleteProductTarget, setDeleteProductTarget] =
    useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/products?limit=100");
      if (!response.ok) throw new Error("Failed to load dashboard products.");

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

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        (product.short_description &&
          product.short_description
            .toLowerCase()
            .includes(search.toLowerCase()));

      const matchesCategory =
        !category || category === "All Categories" || product.category === category;

      const matchesStatus = !status || product.is_active.toString() === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, search, category, status]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, status]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const stats = useMemo(() => {
    const total = products.length;
    const active = products.filter((p) => p.is_active).length;
    const inactive = total - active;
    const featured = products.filter((p) => p.is_featured).length;
    return { total, active, inactive, featured };
  }, [products]);

  const confirmDelete = async () => {
    if (!deleteProductTarget) return;

    try {
      setDeleting(true);
      const response = await fetch(
        `/api/products/${deleteProductTarget.id}`,
        { method: "DELETE" }
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to delete product.");

      setProducts((prev) =>
        prev.filter((p) => p.id !== deleteProductTarget.id)
      );
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
    <main className="min-h-screen bg-black text-white p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Toast Alert Banner */}
        {toastMessage && (
          <div
            className={`p-4 rounded-xl border flex items-center justify-between text-sm font-semibold transition-all ${toastMessage.type === "success"
                ? "bg-emerald-950/40 border-emerald-800/80 text-emerald-300"
                : "bg-rose-950/40 border-rose-800/80 text-rose-300"
              }`}
          >
            <div className="flex items-center gap-2">
              {toastMessage.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-rose-400" />
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
            <div className="inline-flex items-center gap-2 text-xs font-medium text-[#D49A34] bg-[#D49A34]/10 border border-[#D49A34]/20 px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Product Catalog
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Products Overview
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Manage inventory, pricing, categories, and availability for your store catalog.
            </p>
          </div>

          <button
            onClick={() => router.push("/dashboard/products/create")}
            className="inline-flex items-center gap-2 bg-[#D49A34] hover:bg-[#b88228] text-black font-semibold text-xs px-4 py-2.5 rounded-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            Add New Product
          </button>
        </div>

        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-4">
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
              Total Products
            </div>
            <div className="text-xl font-bold text-white mt-1">{stats.total}</div>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-4">
            <div className="text-xs font-medium text-emerald-400 uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Active
            </div>
            <div className="text-xl font-bold text-white mt-1">{stats.active}</div>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-4">
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5" /> Inactive
            </div>
            <div className="text-xl font-bold text-white mt-1">{stats.inactive}</div>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-4">
            <div className="text-xs font-medium text-[#D49A34] uppercase tracking-wider flex items-center gap-1">
              <Star className="w-3.5 h-3.5" /> Featured
            </div>
            <div className="text-xl font-bold text-white mt-1">{stats.featured}</div>
          </div>
        </div>

        {/* Reusable Filter Bar */}
        <ProductFilterBar
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          status={status}
          setStatus={setStatus}
          onClear={() => {
            setSearch("");
            setCategory("");
            setStatus("");
          }}
        />

        {/* Reusable Data Table */}
        <ProductTable
          loading={loading}
          filteredProducts={filteredProducts}
          paginatedProducts={paginatedProducts}
          startIndex={startIndex}
          productsPerPage={productsPerPage}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          onEdit={(id) => router.push(`/dashboard/products/${id}/edit`)}
          onDeleteTarget={(product) => setDeleteProductTarget(product)}
        />
      </div>

      {/* Delete Confirmation Modal */}
      {deleteProductTarget && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-md w-full space-y-4">
            <div className="w-10 h-10 rounded-full bg-rose-950/60 border border-rose-800/80 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-5 h-5" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-lg font-bold text-white">Delete Product?</h3>
              <p className="text-xs text-zinc-400">
                Are you sure you want to permanently delete{" "}
                <span className="font-semibold text-zinc-200">
                  "{deleteProductTarget.title}"
                </span>
                ? This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                disabled={deleting}
                onClick={() => setDeleteProductTarget(null)}
                className="flex-1 py-2 px-3 rounded-lg border border-zinc-800 text-zinc-300 font-medium text-xs hover:bg-zinc-800 transition-all"
              >
                Cancel
              </button>
              <button
                disabled={deleting}
                onClick={confirmDelete}
                className="flex-1 py-2 px-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs transition-all disabled:opacity-50"
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