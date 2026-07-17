import Image from "next/image";

const logos = [
  "/logos/sikka.png",
  "/logos/sikka.png",
  "/logos/sikka.png",
  "/logos/sikka.png",
  "/logos/sikka.png",
];

export default function BrandLogos() {
  return (
    <div className="flex items-center">

      {/* Left */}

      <div className="w-[250px]">

        <h2 className="text-2xl font-bold leading-tight">
          Brands That
          <br />
          Trust Us
        </h2>

      </div>

      <div className="mx-4 h-52 w-px bg-gray-300" />

      {/* Logos */}

      <div className="flex flex-1 items-center justify-between">

        {logos.map((logo) => (
          <Image
            key={logo}
            src={logo}
            alt="logo"
            width={160}
            height={85}
            className="object-contain"
          />
        ))}

        <button className="text-md underline">
          Show more
        </button>

      </div>

    </div>
  );
}