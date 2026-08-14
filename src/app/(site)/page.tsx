import Hero from "../../components/home/Hero";
import ContactPage from "../../components/home/ContectSection";
import ContactInfoSection from "../../components/home/ContactInfoSection";
import GoalSection from "../../components/home/GoalSection";
import MapSection from "../../components/home/MapSection";
import FAQSection from "../../components/home/FAQSection";
import TestimonialSection from "../../components/home/TestimonialSection";
import StatsSection from "../../components/home/StatsSection";
import AwardsSection from "../../components/home/AwardsSection";
import BrandAuditSection from "../../components/home/BrandAuditSection";
import CTASection from "../../components/home/CTASection";

export default function Home() {
  return (
    <main>
      <Hero />
      <ContactPage />
      <ContactInfoSection />
      <GoalSection />
      <MapSection />
      <FAQSection />
      <TestimonialSection />
      <StatsSection />
      <AwardsSection />
      <BrandAuditSection />
      <CTASection />
    </main>
  );
}
