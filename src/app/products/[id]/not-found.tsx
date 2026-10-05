import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function ProductNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#eef1f6] p-6">
      <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-[#08184A]">Product not found</h2>
        <p className="mt-2 text-sm text-slate-500">
          This item may have been removed or is no longer available.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#08184A] px-6 py-3 text-sm font-semibold text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to catalog
        </Link>
      </div>
    </main>
  );
}
