import Image from "next/image";

export default function ContactInfoSection() {
    return (
        <section className="py-20 bg-white">
            <div className="mx-auto max-w-7xl">

                {/* Main Layout */}
                <div className="grid grid-cols-2">

                    {/* ================= LEFT ================= */}
                    <div>

                        {/* Heading */}
                        <div className="mb-10">
                            <h2 className="text-5xl font-light leading-tight">
                                <span className="font-bold">Let's Connect</span> & Bring
                            </h2>

                            <h2 className="text-5xl font-light">
                                Your Vision to Life.
                            </h2>
                        </div>

                        {/* Bottom Cards */}
                        <div className="flex h-[200px]">

                            {/* Team Image */}
                            <div className="relative w-[220px]">
                                <Image
                                    src="/leads/team.jpg"
                                    alt="Team"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Email */}
                            <div className="flex w-[300px] flex-col justify-center bg-[#C89432] px-5 text-white">
                                <p className="mb-2 text-xl">
                                    Email Address
                                </p>

                                <h3 className="text-xl font-semibold">
                                    info@ritzmediaworld.com
                                </h3>
                            </div>

                            {/* Phone */}
                            <div className="flex flex-1 flex-col justify-center bg-[#FFF7E9] px-8">

                                <p className="mb-2 text-md">
                                    Phone Number
                                </p>

                                <p className="text-xl font-semibold">
                                    09220516777
                                </p>

                                <p className="text-xl font-semibold">
                                    07290002168
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* ================= RIGHT ================= */}

                    <div className="flex h-[350px]">

                        {/* Building Image */}

                        <div className="relative w-[320px]">

                            <Image
                                src="/leads/building.jpg"
                                alt="Building"
                                fill
                                className="object-cover"
                            />

                        </div>

                        {/* Address */}

                        <div className="relative flex flex-1 flex-col justify-center border border-gray-200 bg-white px-10">

                            <div className="mb-30">
                                <Image
                                    src="/leads/logo.png"
                                    alt="Logo"
                                    width={120}
                                    height={120}
                                    className="absolute right-6 top-6 mb-10"
                                />
                            </div>

                            <p className="mb-2 text-xl">
                                Address
                            </p>

                            <p className="text-md font-semibold leading-relaxed">
                                402 – 404,
                                4th Floor,
                                <br />
                                Corporate Park,
                                Tower A1,
                                <br />
                                Sector 142,
                                Noida
                            </p>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}