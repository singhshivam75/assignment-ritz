"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AwardsCard from "./AwardsCard";
import { awards } from "../../data/awards";

export default function AwardsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((prev) =>
      prev === 0 ? awards.length - 3 : prev - 1
    );
  };

  const next = () => {
    setCurrent((prev) =>
      prev >= awards.length - 3 ? 0 : prev + 1
    );
  };

  return (
    <section
      className="relative overflow-hidden bg-[#11152F] py-24 text-white"
      style={{
        backgroundImage: "url('/awards-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}

        <div className="mb-14 flex items-center justify-between">

          <div>
            <p className="mb-2 text-lg font-semibold uppercase tracking-wider text-[#D39B33]">
              Achievement Awards
            </p>

            <h2 className="text-5xl font-bold">
              Awards & Company Recognitions
            </h2>
          </div>

          <div className="flex gap-4">

            <button
              onClick={prev}
              className="rounded-full border border-white/30 p-3 hover:bg-white hover:text-black"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={next}
              className="rounded-full border border-white/30 p-3 hover:bg-white hover:text-black"
            >
              <ChevronRight />
            </button>

          </div>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-3 gap-6">

          {awards
            .slice(current, current + 3)
            .map((item) => (
              <AwardsCard
                key={item.title}
                {...item}
              />
            ))}

        </div>

      </div>
    </section>
  );
}