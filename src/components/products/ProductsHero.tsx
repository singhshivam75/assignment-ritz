import { Sparkles, ShoppingBag, TrendingUp } from "lucide-react";

interface ProductsHeroProps {
  total: number;
  rangeStart: number;
  rangeEnd: number;
}

export function ProductsHero({ total, rangeStart, rangeEnd }: ProductsHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#08184A] px-6 pb-20 pt-12 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(211,155,53,0.28),_transparent_55%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl animate-ai-hero-fade-up">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D39B35]/30 bg-[#D39B35]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#f0c56a]">
              <Sparkles className="h-3.5 w-3.5" />
              Premium Catalog
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Discover Our{" "}
              <span className="bg-gradient-to-r from-[#f0c56a] via-[#D39B35] to-[#f0c56a] bg-clip-text text-transparent">
                Products
              </span>
            </h1>
            <p className="mt-3 text-base leading-relaxed text-white/75 sm:text-lg">
              Server-filtered catalog with fast search, category filters, and
              pagination — built for speed and clarity.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 animate-ai-hero-fade-up" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md">
              <ShoppingBag className="h-5 w-5 text-[#D39B35]" />
              <div>
                <p className="text-xs text-white/60">Total products</p>
                <p className="text-lg font-bold">{total}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md">
              <TrendingUp className="h-5 w-5 text-[#D39B35]" />
              <div>
                <p className="text-xs text-white/60">This page</p>
                <p className="text-lg font-bold">
                  {total === 0 ? "0" : `${rangeStart}–${rangeEnd}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
