import {
  BarChart3,
  LayoutTemplate,
  Megaphone,
  Palette,
  Search,
  Users,
} from "lucide-react";
import { HOME_SERVICES } from "@/data/home-content";
import { SectionHeader } from "@/components/home/SectionHeader";

const ICONS = {
  search: Search,
  palette: Palette,
  megaphone: Megaphone,
  layout: LayoutTemplate,
  users: Users,
  chart: BarChart3,
} as const;

export function HomeServices() {
  return (
    <section id="services" className="bg-[#f4f6fa] py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="What we do"
          title="Integrated marketing built for growth"
          description="Specialist teams across SEO, creative, performance, and reputation — aligned to one business outcome."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HOME_SERVICES.map((service, index) => {
            const Icon = ICONS[service.icon];
            return (
              <article
                key={service.title}
                className="animate-product-card-in group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#D39B35]/40 hover:shadow-lg"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#08184A] text-[#D39B35] transition group-hover:bg-[#D39B35] group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-[#08184A]">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
