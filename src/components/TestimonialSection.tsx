"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LeftContent from "./LeftContent";
import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    text: `To me, advertising my brand was merely a means to ensure my elongated presence in the market. Thanks to Ritz Media World, my advertisements not only ensured my brand's sustenance but have also got me a great number of quality leads.`,
    name: "Madhusudan Ghee",
    role: "Managing Director",
  },
  {
    text: `They not only make sure that they deliver on their promises, but also educate you on what exactly is needed to be done for your brand, thereby preventing you from under or over spending your precious money.`,
    name: "Eldeco Group",
    role: "Managing Director",
  },
  {
    text: `Ritz Media World helped us build a stronger digital presence with measurable growth and quality leads.`,
    name: "ABC Group",
    role: "CEO",
  },
  {
    text: `Professional team with great communication and timely delivery. Highly recommended.`,
    name: "XYZ Pvt Ltd",
    role: "Founder",
  },
];

export default function TestimonialSection() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? testimonials.length - 2 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrent((prev) =>
      prev >= testimonials.length - 2 ? 0 : prev + 1
    );
  };

  return (
    <section className="bg-[#faf9f7] py-24">
      <div className="mx-auto max-w-7xl">

        <div className="grid gap-12 lg:grid-cols-[34%_66%]">

          <LeftContent />

          <div>

            {/* Navigation */}

            <div className="mb-8 flex justify-end gap-4">
              <button
                onClick={prevSlide}
                className="rounded-full border p-3 hover:bg-black hover:text-white"
              >
                <ChevronLeft />
              </button>

              <button
                onClick={nextSlide}
                className="rounded-full border p-3 hover:bg-black hover:text-white"
              >
                <ChevronRight />
              </button>
            </div>

            {/* Two Cards */}

            <div className="grid grid-cols-2 gap-6">
              <TestimonialCard
                {...testimonials[current]}
              />

              <TestimonialCard
                {...testimonials[(current + 1) % testimonials.length]}
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}