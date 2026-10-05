import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-white py-16 px-6">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-3xl font-extrabold text-[#08184A] sm:text-4xl">
          Ready to elevate your brand?
        </h2>
        <p className="mt-3 text-lg font-light text-slate-600 sm:text-xl">
          Let&apos;s discuss your next campaign, audit, or product purchase.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#contact"
            className="group inline-flex items-center gap-3 rounded-xl bg-[#08184A] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0a2160]"
          >
            Schedule free consultation
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-xl border border-[#D39B35]/40 px-6 py-3.5 text-sm font-semibold text-[#08184A] transition hover:bg-[#D39B35]/10"
          >
            View products
          </Link>
        </div>
      </div>
    </section>
  );
}
