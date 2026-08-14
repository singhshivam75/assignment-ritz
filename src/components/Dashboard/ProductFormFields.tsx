"use client";

import { Sparkles, Wand2, DollarSign, Image as ImageIcon } from "lucide-react";

export interface ProductFormData {
  title: string;
  slug: string;
  short_description: string;
  description: string;
  price: string;
  discount_price: string;
  category: string;
  thumbnail: string;
  delivery_time: string;
  is_featured: boolean;
  is_active: boolean;
}

interface ProductFormFieldsProps {
  form: ProductFormData;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleAutoSlug: () => void;
}

export default function ProductFormFields({
  form,
  handleChange,
  handleAutoSlug,
}: ProductFormFieldsProps) {
  const priceNum = Number(form.price) || 0;
  const discountNum = Number(form.discount_price) || 0;
  const hasDiscount = discountNum > 0 && discountNum < priceNum;
  const savings = hasDiscount ? priceNum - discountNum : 0;

  return (
    <>
      {/* Section 1: Basic Information */}
      <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
          <Sparkles className="w-4 h-4 text-[#D49A34]" />
          Basic Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Product Title */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Product Title <span className="text-rose-500">*</span>
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full px-3.5 py-2 bg-zinc-900/80 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-[#D49A34]/60 placeholder-zinc-500"
              placeholder="e.g. Ergonomic Office Chair"
            />
          </div>

          {/* Slug */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-medium text-zinc-300">
                Product Slug <span className="text-rose-500">*</span>
              </label>
              <button
                type="button"
                onClick={handleAutoSlug}
                className="text-[11px] font-medium text-[#D49A34] hover:underline flex items-center gap-1"
              >
                <Wand2 className="w-3 h-3" /> Auto-generate
              </button>
            </div>
            <input
              name="slug"
              value={form.slug}
              onChange={handleChange}
              required
              className="w-full px-3.5 py-2 bg-zinc-900/80 border border-zinc-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-[#D49A34]/60 placeholder-zinc-500"
              placeholder="ergonomic-office-chair"
            />
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1.5">
            Short Description
          </label>
          <input
            name="short_description"
            value={form.short_description}
            onChange={handleChange}
            className="w-full px-3.5 py-2 bg-zinc-900/80 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-[#D49A34]/60 placeholder-zinc-500"
            placeholder="Brief high-level summary of the product..."
          />
        </div>

        {/* Full Description */}
        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1.5">
            Full Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-3.5 py-2 bg-zinc-900/80 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-[#D49A34]/60 placeholder-zinc-500 resize-none"
            placeholder="Detailed specifications, features, and user guidance..."
          />
        </div>
      </div>

      {/* Section 2: Pricing Details */}
      <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
          <DollarSign className="w-4 h-4 text-emerald-400" />
          Pricing & Discounts
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Regular Price (₹) <span className="text-rose-500">*</span>
            </label>
            <input
              name="price"
              type="number"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full px-3.5 py-2 bg-zinc-900/80 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-[#D49A34]/60 placeholder-zinc-500"
              placeholder="e.g. 4999.00"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Discount Price (₹){" "}
              <span className="text-zinc-500 font-normal">(Optional)</span>
            </label>
            <input
              name="discount_price"
              type="number"
              step="0.01"
              value={form.discount_price}
              onChange={handleChange}
              className="w-full px-3.5 py-2 bg-zinc-900/80 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-[#D49A34]/60 placeholder-zinc-500"
              placeholder="e.g. 3999.00"
            />
          </div>
        </div>

        {hasDiscount && (
          <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-xs font-medium text-emerald-300 flex items-center justify-between">
            <span>Discount Offer Active</span>
            <span>
              Customers save ₹
              {savings.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>
          </div>
        )}
      </div>

      {/* Section 3: Media & Classification */}
      <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
          <ImageIcon className="w-4 h-4 text-purple-400" />
          Category & Image Media
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Category Name
            </label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-3.5 py-2 bg-zinc-900/80 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-[#D49A34]/60 placeholder-zinc-500"
              placeholder="e.g. Electronics, Fashion, Home & Living"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Estimated Delivery Time
            </label>
            <input
              name="delivery_time"
              value={form.delivery_time}
              onChange={handleChange}
              className="w-full px-3.5 py-2 bg-zinc-900/80 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-[#D49A34]/60 placeholder-zinc-500"
              placeholder="e.g. 3-5 Business Days"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1.5">
            Thumbnail Image URL
          </label>
          <input
            name="thumbnail"
            value={form.thumbnail}
            onChange={handleChange}
            className="w-full px-3.5 py-2 bg-zinc-900/80 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-[#D49A34]/60 placeholder-zinc-500"
            placeholder="https://images.unsplash.com/..."
          />
        </div>

        {/* Thumbnail Live Preview */}
        {form.thumbnail && (
          <div className="pt-2">
            <div className="text-xs font-medium text-zinc-400 mb-2">
              Image Preview:
            </div>
            <div className="w-28 h-28 rounded-lg border border-zinc-800 overflow-hidden bg-zinc-900">
              <img
                src={form.thumbnail}
                alt="Thumbnail Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80";
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Section 4: Visibility Controls */}
      <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-white border-b border-zinc-800 pb-3">
          Visibility & Publishing Status
        </h2>

        <div className="flex flex-col sm:flex-row gap-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="is_active"
              checked={form.is_active}
              onChange={handleChange}
              className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-[#D49A34] focus:ring-0"
            />
            <div>
              <div className="text-xs font-bold text-white">Active Product</div>
              <div className="text-[11px] text-zinc-400">
                Visible to customers in storefront listings.
              </div>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="is_featured"
              checked={form.is_featured}
              onChange={handleChange}
              className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-[#D49A34] focus:ring-0"
            />
            <div>
              <div className="text-xs font-bold text-white">Featured Item</div>
              <div className="text-[11px] text-zinc-400">
                Highlighted with featured badge on catalog hero.
              </div>
            </div>
          </label>
        </div>
      </div>
    </>
  );
}
