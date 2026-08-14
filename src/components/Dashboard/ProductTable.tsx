"use client";

import Link from "next/link";
import {
  Edit3,
  Trash2,
  Eye,
  Package,
  RefreshCw,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Product } from "@/types/product";

interface ProductTableProps {
  loading: boolean;
  filteredProducts: Product[];
  paginatedProducts: Product[];
  startIndex: number;
  productsPerPage: number;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (updater: (prev: number) => number) => void;
  onEdit: (id: number) => void;
  onDeleteTarget: (product: Product) => void;
}

export default function ProductTable({
  loading,
  filteredProducts,
  paginatedProducts,
  startIndex,
  productsPerPage,
  currentPage,
  totalPages,
  setCurrentPage,
  onEdit,
  onDeleteTarget,
}: ProductTableProps) {
  return (
    <div className="bg-zinc-900/20 border border-zinc-800/80 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-900/60 border-b border-zinc-800 text-[11px] font-medium uppercase text-zinc-400 tracking-wider">
              <th className="p-3.5 pl-5">Product Item</th>
              <th className="p-3.5">Category</th>
              <th className="p-3.5">Price</th>
              <th className="p-3.5">Visibility</th>
              <th className="p-3.5 pr-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50 text-xs">
            {loading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-zinc-400">
                  <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-[#D49A34]" />
                  Loading catalog items...
                </td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-10 text-center">
                  <Package className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                  <div className="font-medium text-zinc-300">
                    No products found
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">
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
                    className="hover:bg-zinc-900/50 transition-colors"
                  >
                    {/* Product Title + Thumbnail */}
                    <td className="p-3.5 pl-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700/60 overflow-hidden flex-shrink-0">
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
                            <div className="w-full h-full flex items-center justify-center text-zinc-500">
                              <ShoppingBag className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-white line-clamp-1 flex items-center gap-2">
                            {product.title}
                            {product.is_featured && (
                              <span className="bg-[#D49A34]/20 text-[#D49A34] text-[10px] font-semibold px-2 py-0.5 rounded border border-[#D49A34]/30">
                                Featured
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-zinc-500 font-mono mt-0.5">
                            /{product.slug}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-3.5">
                      <span className="inline-block bg-zinc-800/60 text-zinc-300 text-[11px] font-medium px-2 py-0.5 rounded">
                        {product.category || "Uncategorized"}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="p-3.5">
                      <div className="font-semibold text-white">
                        ₹
                        {Number(currentPrice).toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                        })}
                      </div>
                      {hasDiscount && (
                        <div className="text-[11px] text-zinc-500 line-through">
                          ₹
                          {Number(product.price).toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                          })}
                        </div>
                      )}
                    </td>

                    {/* Visibility Status */}
                    <td className="p-3.5">
                      {product.is_active ? (
                        <span className="inline-flex items-center gap-1.5 bg-emerald-950/40 text-emerald-400 border border-emerald-800/60 text-[11px] font-medium px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 bg-zinc-800/50 text-zinc-400 border border-zinc-700/50 text-[11px] font-medium px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* Action Buttons */}
                    <td className="p-3.5 pr-5 text-right">
                      <div className="inline-flex items-center gap-1">
                        <Link
                          href={`/products/${product.id}`}
                          target="_blank"
                          className="p-1.5 text-zinc-400 hover:text-white transition-colors"
                          title="Preview on store front"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => onEdit(product.id)}
                          className="p-1.5 text-[#D49A34] hover:text-amber-300 transition-colors"
                          title="Edit product"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => onDeleteTarget(product)}
                          className="p-1.5 text-rose-400 hover:text-rose-300 transition-colors"
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
      <div className="p-3.5 border-t border-zinc-800 bg-zinc-900/40 flex items-center justify-between text-xs text-zinc-400">
        <div>
          Showing{" "}
          <span className="font-semibold text-white">
            {filteredProducts.length > 0 ? startIndex + 1 : 0}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-white">
            {Math.min(startIndex + productsPerPage, filteredProducts.length)}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-white">
            {filteredProducts.length}
          </span>{" "}
          products
        </div>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 border border-zinc-700/60 disabled:opacity-40 hover:bg-zinc-700 transition-all text-xs"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Previous
          </button>

          <span className="px-2 font-medium">
            {currentPage} / {totalPages || 1}
          </span>

          <button
            disabled={currentPage >= totalPages || totalPages === 0}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 border border-zinc-700/60 disabled:opacity-40 hover:bg-zinc-700 transition-all text-xs"
          >
            Next <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
