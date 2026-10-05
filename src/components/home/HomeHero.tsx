import Link from "next/link";
import { ArrowRight, Bot, Sparkles } from "lucide-react";

export function HomeHero() {
  return (
    <section className="relative min-h-[620px] overflow-hidden bg-[#08184A] text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/leads/contact-banner.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#08184A]/95 via-[#08184A]/80 to-[#08184A]/55" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[620px] max-w-7xl flex-col justify-center px-6 py-20 lg:px-10">
        <div className="animate-ai-hero-fade-up mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#D39B35]/35 bg-[#D39B35]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#f0c56a]">
          <Sparkles className="h-3.5 w-3.5" />
          Ritz Media World
        </div>

        <h1
          className="animate-ai-hero-fade-up max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          style={{ animationDelay: "80ms" }}
        >
          Grow your brand with{" "}
          <span className="bg-gradient-to-r from-[#f0c56a] via-[#D39B35] to-[#f0c56a] bg-clip-text text-transparent">
            strategy, SEO & creative
          </span>{" "}
          that converts
        </h1>

        <p
          className="animate-ai-hero-fade-up mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
          style={{ animationDelay: "160ms" }}
        >
          Full-stack digital marketing partner for ambitious brands — from
          audits and campaigns to our live product catalog and AI concierge.
        </p>

        <div
          className="animate-ai-hero-fade-up mt-10 flex flex-wrap gap-3"
          style={{ animationDelay: "220ms" }}
        >
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-[#D39B35] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#D39B35]/25 transition hover:bg-[#bc872b]"
          >
            Free consultation
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
          >
            Browse products
          </Link>
          <Link
            href="/ai"
            className="inline-flex items-center gap-2 rounded-xl border border-[#D39B35]/40 px-6 py-3.5 text-sm font-semibold text-[#f0c56a] transition hover:bg-[#D39B35]/10"
          >
            <Bot className="h-4 w-4" />
            AI assistant
          </Link>
        </div>
      </div>
    </section>
  );
}
