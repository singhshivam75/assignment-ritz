import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function FreeAudit() {
  return (
    <div className="relative overflow-hidden border border-gray-300 p-12">

      <h2 className="text-4xl font-bold leading-tight">

        Or Get a Free

        <span className="text-[#C89432]">
          {" "}Brand Audit
        </span>

      </h2>

      <p className="mt-4 max-w-xl text-xl leading-7 text-gray-700">
        Let our experts analyze your current brand positioning
        and provide actionable recommendations.
      </p>

      <ul className="mt-8 space-y-2 text-xl">
        <li>• Comprehensive brand analysis</li>
        <li>• Competitor positioning review</li>
        <li>• Growth opportunity identification</li>
        <li>• Customized strategy roadmap</li>
      </ul>

      <button className="mt-10 flex items-center gap-5 border-b-1 border-black pb-3 text-xl font-semibold">

        Request A Free Audit

        <ArrowRight />

      </button>

      <Image
        src="/leads/audit.png"
        alt="Audit"
        width={290}
        height={290}
        className="absolute bottom-0 right-0"
      />

    </div>
  );
}