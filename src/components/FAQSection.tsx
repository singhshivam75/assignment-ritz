import FAQLeft from "./FAQLeft";
import FAQRight from "./FAQRight";

export default function FAQSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[38%_62%]">
        <FAQLeft />
        <FAQRight />
      </div>
    </section>
  );
}