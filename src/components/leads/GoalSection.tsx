import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

export default function GoalSection() {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%]">
          <LeftSection />
          <RightSection />
        </div>
      </div>
    </section>
  );
}