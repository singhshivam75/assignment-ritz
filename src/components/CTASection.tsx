import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-white py-15">
      <div className="mx-auto max-w-5xl text-center">

        <h2 className="text-4xl font-bold text-[#111]">
          Ready to Elevate Your Brand?
        </h2>

        <p className="mt-2 text-3xl font-light text-[#111]">
          Let's discuss your next brand-elevating campaign
        </p>

        <div className="mt-10 flex justify-center">

          <button className="group">

            <div className="flex items-center justify-between gap-12">

              <span className="text-xl font-semibold text-[#111]">
                Schedule Free Consultation
              </span>

              <ArrowRight
                size={34}
                className="transition-transform duration-300 group-hover:translate-x-2"
              />

            </div>

            <div className="mt-2 h-[2px] w-full bg-[#111]" />

          </button>

        </div>

      </div>
    </section>
  );
}