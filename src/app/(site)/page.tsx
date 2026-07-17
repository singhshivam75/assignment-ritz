import Hero from "../../components/Hero";
import ContactPage from "../../components/ContectSection";
import ContactInfoSection from "../../components/ContactInfoSection";
import GoalSection from "../../components/GoalSection";
import MapSection from "../../components/MapSection";
import FAQSection from "../../components/FAQSection";
import TestimonialSection from "../../components/TestimonialSection";
import StatsSection from "../../components/StatsSection";
import AwardsSection from "../../components/AwardsSection";
import BrandAuditSection from "../../components/BrandAuditSection";
import CTASection from "../../components/CTASection";

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
