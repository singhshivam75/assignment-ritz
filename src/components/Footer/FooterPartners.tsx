import Image from "next/image";

const partners = [
  "/logos/sikka.png",
  "/logos/sikka.png",
  "/logos/sikka.png",
  "/logos/sikka.png",
];

export default function FooterPartners() {
  return (
    <div className="grid grid-cols-4 gap-4">

      {partners.map((logo, i) => (
        <div
          key={`${logo}-${i}`}
          className="flex h-16 items-center justify-center rounded-md bg-white p-3"
        >
          <Image
            src={logo}
            alt="Partner Logo"
            width={100}
            height={50}
            className="object-contain"
          />
        </div>
      ))}

    </div>
  );
}
