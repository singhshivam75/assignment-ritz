import React from "react";
import { Sparkles, ShoppingBag } from "lucide-react";

interface ProductsHeroProps {
  count: number;
}

export function ProductsHero({ count }: ProductsHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-12 pb-20 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Premium Catalog
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Discover Our{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
                Products
              </span>
            </h1>
            <p className="mt-3 text-slate-400 text-base sm:text-lg leading-relaxed">
              Explore handpicked high-quality solutions, services, and physical
              items designed to elevate your everyday workflow.
            </p>
          </div>

          <div className="flex items-center gap-3 text-slate-300 text-sm bg-slate-800/60 backdrop-blur-md border border-slate-700/60 rounded-xl p-3 px-4 shadow-inner">
            <ShoppingBag className="w-5 h-5 text-indigo-400" />
            <div>
              <span className="font-semibold text-white">{count}</span>
              <span className="text-slate-400 font-normal ml-1">
                {count === 1 ? "Product available" : "Products available"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
