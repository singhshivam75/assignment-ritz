import Hero from "../../components/leads/Hero";
import ContactPage from "../../components/leads/ContectSection";
import ContactInfoSection from "../../components/leads/ContactInfoSection";
import GoalSection from "../../components/leads/GoalSection";
import MapSection from "../../components/leads/MapSection";
import FAQSection from "../../components/leads/FAQSection";
import TestimonialSection from "../../components/leads/TestimonialSection";
import StatsSection from "../../components/leads/StatsSection";
import AwardsSection from "../../components/leads/AwardsSection";
import BrandAuditSection from "../../components/leads/BrandAuditSection";
import CTASection from "../../components/leads/CTASection";

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
