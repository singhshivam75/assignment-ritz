import { Quote } from "lucide-react";

interface Props {
  text: string;
  name: string;
  role: string;
}

export default function TestimonialCard({
  text,
  name,
  role,
}: Props) {
  return (
    <div className="min-w-[400px] bg-white p-12 shadow-sm">

      <Quote
        size={30}
        className="text-gray-200"
      />

      <p className="text-[17px] leading-7 text-[#222]">
        {text}
      </p>

      <div className="mt-10">

        <h3 className="text-2xl font-bold">
          {name}
        </h3>

        <p className="mt-2 text-md text-gray-600">
          {role}
        </p>
      </div>
    </div>
  );
}