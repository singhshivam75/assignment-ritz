import StatsCards from "./StatsCards";
import BrandLogos from "./BrandLogos";

export default function StatsSection() {
    return (
    <section className="bg-white py-24 px-6">

      <div className="mx-auto max-w-7xl">

        <StatsCards />

        <div className="mt-20">
          <BrandLogos />
        </div>

      </div>

    </section>
  );
}