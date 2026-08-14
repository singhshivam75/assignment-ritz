import Image from "next/image";
import { Sparkles } from "lucide-react";

interface Props {
  image: string;
  title: string;
}

export default function AwardsCard({
  image,
  title,
}: Props) {
  return (
    <div className="overflow-hidden border border-[#8B6B2F] bg-[#332A2A]">

      <div className="relative">

        <div className="absolute text-sm left-4 top-4 z-10 flex items-center gap-2 rounded-full bg-white px-5 py-2 text-[#F59E0B]">

          <Sparkles size={16} />

          <span className="font-semibold">
            Excellence
          </span>

        </div>

        <div className="relative h-[300px] bg-[#2A2323]">

          <Image
            src={image}
            alt={title}
            fill
            className="object-cover p-4"
          />

        </div>

      </div>

      <div className="bg-[#332A2A] p-4">

        <h3 className="text-xl font-semibold leading-relaxed">
          {title}
        </h3>

      </div>

    </div>
  );
}