export default function LeftContent() {
  return (
    <div className="flex flex-col justify-center pr-14">

      <p className="mb-2 text-lg font-semibold uppercase tracking-wide text-[#C89432]">
        CLIENTS TESTIMONIALS
      </p>

      <h2 className="text-4xl font-bold leading-tight">
        What Our Clients Say
      </h2>

      <p className="mt-4 max-w-sm text-xl leading-8 text-gray-700">
        Don't just take our word for it, hear from the brands we've helped transform.
      </p>

      <div className="mt-10 flex gap-5">

        <button className="rounded-lg bg-[#C89432] px-6 py-2 text-md font-semibold text-white">
          Text Tutorial
        </button>

        <button className="rounded-lg px-6 py-2 text-md font-semibold">
          Video Tutorial
        </button>

      </div>

    </div>
  );
}