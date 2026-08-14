"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  PackagePlus,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import ProductFormFields, { ProductFormData } from "@/components/Dashboard/ProductFormFields";

export default function CreateProductPage() {
  const router = useRouter();

  const [form, setForm] = useState<ProductFormData>({
    title: "",
    slug: "",
    short_description: "",
    description: "",
    price: "",
    discount_price: "",
    category: "",
    thumbnail: "",
    delivery_time: "",
    is_featured: false,
    is_active: true,
  });

  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleAutoSlug = () => {
    if (!form.title.trim()) return;
    const generatedSlug = form.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setForm((prev) => ({ ...prev, slug: generatedSlug }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setToastMessage(null);

    try {
      setLoading(true);

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          discount_price: form.discount_price
            ? Number(form.discount_price)
            : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create product.");
      }

      setToastMessage({
        type: "success",
        text: "Product created successfully! Redirecting to catalog...",
      });

      setTimeout(() => {
        router.push("/dashboard/products");
      }, 1500);
    } catch (err) {
      console.error(err);
      setToastMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Toast Alert */}
        {toastMessage && (
          <div
            className={`p-4 rounded-xl border flex items-center justify-between text-sm font-semibold transition-all ${
              toastMessage.type === "success"
                ? "bg-emerald-950/40 border-emerald-800/80 text-emerald-300"
                : "bg-rose-950/40 border-rose-800/80 text-rose-300"
            }`}
          >
            <div className="flex items-center gap-2">
              {toastMessage.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-400" />
              )}
              {toastMessage.text}
            </div>
          </div>
        )}

        {/* Page Header */}
        <div>
          <Link
            href="/dashboard/products"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-white mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Products Catalog
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 text-[#D49A34] flex items-center justify-center">
              <PackagePlus className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Add New Product
              </h1>
              <p className="text-xs text-zinc-400">
                Fill in the details below to add a product to your online store inventory.
              </p>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <ProductFormFields
            form={form}
            handleChange={handleChange}
            handleAutoSlug={handleAutoSlug}
          />

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.push("/dashboard/products")}
              className="px-4 py-2 rounded-lg border border-zinc-800 text-zinc-300 font-medium text-xs hover:bg-zinc-900 transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 bg-[#D49A34] hover:bg-[#b88228] text-black font-semibold text-xs px-6 py-2 rounded-lg transition-all disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating Product...
                </>
              ) : (
                "Create Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}