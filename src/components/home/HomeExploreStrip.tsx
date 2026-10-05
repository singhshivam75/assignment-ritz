import Link from "next/link";
import { Bot, Package, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/home/SectionHeader";

const TOOLS = [
  {
    href: "/ai",
    title: "Ritz AI Concierge",
    description: "Instant answers on SEO, branding, services, and product recommendations.",
    icon: Bot,
    cta: "Open assistant",
  },
  {
    href: "/products",
    title: "Product catalog",
    description: "Server-paginated catalog with search, filters, and secure checkout.",
    icon: Package,
    cta: "Explore catalog",
  },
] as const;

export function HomeExploreStrip() {
  return (
    <section className="bg-[#08184A] py-16 px-6 text-white">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Platform"
          title="Tools built into your site"
          description="Move from inspiration to action — chat with AI or browse live products without leaving the experience."
          dark
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {TOOLS.map(({ href, title, description, icon: Icon, cta }) => (
            <Link
              key={href}
              href={href}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-[#D39B35]/40 hover:bg-white/10"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#D39B35]/20 text-[#f0c56a]">
                  <Icon className="h-6 w-6" />
                </div>
                <Sparkles className="h-5 w-5 text-[#D39B35] opacity-0 transition group-hover:opacity-100" />
              </div>
              <h3 className="mt-4 text-xl font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {description}
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-[#D39B35] group-hover:underline">
                {cta} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
