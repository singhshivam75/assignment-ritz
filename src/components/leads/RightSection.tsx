import Image from "next/image";

const data = [
  {
    title: "#BRANDSFIRST",
    description:
      "Every decision starts with building stronger brand authority.",
  },
  {
    title: "#VISIONTOREALITY",
    description:
      "Strategic thinking turned into real-world brand growth.",
  },
  {
    title: "#RESULTSOVERNOISE",
    description:
      "Focus on what moves the brand forward, not what just looks good.",
  },
  {
    title: "#GROWCONNECTED",
    description:
      "Reach audiences seamlessly across digital ecosystems and real-world touchpoints.",
  },
];

export default function RightSection() {
  return (
    <div className="grid grid-cols-[1fr_380px]">

      {/* Blue Content */}

      <div className="bg-[#121B52] px-10 py-20 text-white">

        <div className="space-y-12">

          {data.map((item) => (
            <div key={item.title}>
              <h3 className="mb-3 text-2xl font-bold">
                {item.title}
              </h3>

              <p className="max-w-md text-md leading-8 text-gray-200">
                {item.description}
              </p>
            </div>
          ))}

        </div>

      </div>

      {/* Image */}

      <div className="relative h-full min-h-[480px]">
        <Image
          src="/leads/goal.jpg"
          alt="Goal"
          fill
          className="object-cover"
        />
      </div>

    </div>
  );
}