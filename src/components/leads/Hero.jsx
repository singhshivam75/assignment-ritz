export default function Hero() {
  return (
    <section
      className="relative h-[550px] bg-cover bg-center"
      style={{
        backgroundImage: "url('/leads/contact-banner.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#08184A]/20" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full flex-col justify-center">

        {/* Ribbon */}
        <div className="mb-12">
          <div className="clip-tag inline-flex h-12 items-center bg-[#D39B35] px-12">
            <span className="text-xl font-bold uppercase text-white">
              GET IN TOUCH
            </span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-[70px] leading-none text-white px-8 lg:px-40">
          <span className="font-extrabold">Contact</span>{" "}
          <span className="font-light">Us</span>
        </h1>

        {/* Description */}
        <p className="mt-5 max-w-4xl text-[22px] leading-[1.8] text-white px-8 lg:px-40">
          Get started with Ritz Media World For Digital Marketing
          Strategies, best SEO services, and Creative Branding.
        </p>
      </div>
    </section>
  );
}