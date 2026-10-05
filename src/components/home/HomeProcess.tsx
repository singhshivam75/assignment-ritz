import { HOME_PROCESS } from "@/data/home-content";
import { SectionHeader } from "@/components/home/SectionHeader";

export function HomeProcess() {
  return (
    <section className="bg-[#f4f6fa] py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="How we work"
          title="A clear path from insight to impact"
          description="Structured delivery so you always know what we are doing, why, and what happens next."
          align="center"
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {HOME_PROCESS.map((item, index) => (
            <article
              key={item.step}
              className="animate-product-card-in relative rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <span className="text-3xl font-extrabold text-[#D39B35]/80">
                {item.step}
              </span>
              <h3 className="mt-3 text-lg font-bold text-[#08184A]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
