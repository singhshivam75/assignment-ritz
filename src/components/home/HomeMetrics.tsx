import type { HomeStats } from "@/lib/home-data";
import { HOME_TRUST_STATS } from "@/data/home-content";

type HomeMetricsProps = {
  stats: HomeStats;
};

export function HomeMetrics({ stats }: HomeMetricsProps) {
  const dynamicMetrics = [
    {
      value: String(stats.activeProducts),
      label: "Live catalog products",
      hint: "Updated from your store",
    },
    {
      value: String(stats.categories),
      label: "Product categories",
      hint: "Filter on products page",
    },
    {
      value: String(stats.featuredProducts),
      label: "Featured picks",
      hint: "Highlighted on homepage",
    },
  ];

  return (
    <section className="relative z-20 -mt-8 px-6">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3 lg:grid-cols-6">
        {dynamicMetrics.map((item) => (
          <div
            key={item.label}
            className="animate-product-card-in rounded-2xl border border-white/80 bg-white p-5 shadow-xl shadow-[#08184A]/10"
          >
            <p className="text-2xl font-extrabold text-[#08184A]">{item.value}</p>
            <p className="mt-1 text-sm font-semibold text-[#08184A]">
              {item.label}
            </p>
            <p className="mt-1 text-xs text-slate-500">{item.hint}</p>
          </div>
        ))}

        {HOME_TRUST_STATS.map((item) => (
          <div
            key={item.label}
            className="animate-product-card-in rounded-2xl border border-[#08184A]/10 bg-[#08184A] p-5 text-white shadow-xl shadow-[#08184A]/15"
          >
            <p className="text-2xl font-extrabold text-[#D39B35]">
              {item.value}
            </p>
            <p className="mt-1 text-sm font-semibold">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
