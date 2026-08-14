import { Download } from "lucide-react";

export default function DownloadReport() {
  return (
    <div className="bg-[#F8F8F8] p-12">

      <p className=" text-md font-semibold uppercase text-[#C89432]">
        Free Resource
      </p>

      <h2 className="text-3xl font-bold leading-tight">
        Download Our
      </h2>

      <h2 className="mt-2 text-4xl font-bold">
        2026 Brand Impact Report
      </h2>

      <p className="mt-4 text-xl leading-7 text-gray-700">
        Get exclusive insights into real estate and lifestyle brand
        marketing trends, strategies, and ROI benchmarks for 2026.
      </p>

      <ul className="mt-6 space-y-2 text-xl">
        <li>• Industry benchmarks for real estate marketing ROI</li>
        <li>• Proven strategies for UHNI audience targeting</li>
        <li>• 2026 digital and print advertising trends</li>
        <li>• Case studies with measurable results</li>
      </ul>

      <div className="mt-8 flex gap-4">

        <input
          type="text"
          placeholder="Enter your phone (e.g., +91 9220516777)"
          className="flex-1 rounded border border-gray-300 px-6 text-md py-2 outline-none"
        />

        <button className="flex items-center gap-3 rounded bg-[#C89432] px-10 text-xl font-semibold text-white">

          Free Download

          <Download size={22} />

        </button>

      </div>

      <p className="mt-4 text-md text-gray-500">
        No spam, unsubscribe anytime. We respect your privacy.
      </p>

    </div>
  );
}