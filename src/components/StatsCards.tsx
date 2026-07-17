import Image from "next/image";

const stats = [
    {
        number: "350+",
        title: "Satisfied Clients",
        desc: "Brands we've helped grow and succeed",
        bg: "#C99434",
        text: "text-white",
        border: "",
    },
    {
        number: "35+",
        title: "Awards",
        desc: "Passion, Obsession, and Persistence always pay off",
        bg: "white",
        text: "text-black",
        border: "border border-[#C99434]",
    },
    {
        google: true,
    },
    {
        number: "40+",
        title: "Service Categories",
        desc: "Designed to suit your growth needs at every stage",
        bg: "#171E59",
        text: "text-white",
        border: "",
    },
    {
        number: "17+",
        title: "Glorious Years",
        desc: "Grueling hours that have led to remarkable branding success",
        bg: "white",
        text: "text-black",
        border: "border border-[#171E59]",
    },
];

export default function StatsCards() {
    return (
        <div className="flex justify-between">

            {stats.map((item, index) => (

                <div
                    key={index}
                    className={`flex h-[250px] w-[250px] shrink-0 items-center justify-center rounded-full ${item.border}`}
                    style={{
                        background:
                            typeof item.bg === "string" && item.bg.startsWith("#")
                                ? item.bg
                                : undefined,
                    }}
                >
                    {item.google ? (
                        <div className="text-center">

                            <Image
                                src="/google-rating.png"
                                alt="Google"
                                width={220}
                                height={120}
                            />

                        </div>
                    ) : (
                        <div className={`px-5 text-center ${item.text}`}>

                            <h2 className="text-5xl font-bold">
                                {item.number}
                            </h2>

                            <h3 className="mt-3 text-xl font-semibold">
                                {item.title}
                            </h3>

                            <p className="mt-2 text-md leading-7 opacity-90">
                                {item.desc}
                            </p>

                        </div>
                    )}
                </div>
            ))}

        </div>
    );
}