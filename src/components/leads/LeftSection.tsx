import Link from "next/link";

const services = [
  "Digital Marketing",
  "Creative Services",
  "Print Advertising",
  "Radio Advertising",
  "Content Marketing",
  "Web Development",
  "Celebrity Endorsements",
  "Influencer Marketing",
];

export default function LeftSection() {
  return (
    <div className="flex flex-col justify-center bg-white py-14 pr-12">
      <h2 className="text-[52px] font-bold leading-none text-[#1A1A1A]">
        Together
      </h2>
      <h2 className="text-[52px] font-bold leading-none text-[#C89432]">
        Toward
      </h2>
      <h2 className="mb-5 text-[52px] font-bold leading-none text-[#1A1A1A]">
        One Goal
      </h2>

      <p className="max-w-xl text-[18px] leading-8 text-gray-700">
        We at Ritz Media World help brands grow at every stage! With integrated
        expertise in PR, digital marketing, performance, influencer marketing,
        and reputation management, we build visibility locally and credibility
        globally across India.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {services.map((service) => (
          <Link
            key={service}
            href="/#contact"
            className="rounded-full border border-[#C89432] px-5 py-2 text-sm font-medium text-[#C89432] transition hover:bg-[#C89432] hover:text-white"
          >
            {service}
          </Link>
        ))}
      </div>
    </div>
  );
}
