import type { Metadata } from "next";
import AwardsSection from "@/components/leads/AwardsSection";
import BrandAuditSection from "@/components/leads/BrandAuditSection";
import ContactInfoSection from "@/components/leads/ContactInfoSection";
import ContactSection from "@/components/leads/ContectSection";
import CTASection from "@/components/leads/CTASection";
import FAQSection from "@/components/leads/FAQSection";
import GoalSection from "@/components/leads/GoalSection";
import MapSection from "@/components/leads/MapSection";
import StatsSection from "@/components/leads/StatsSection";
import TestimonialSection from "@/components/leads/TestimonialSection";
import { HomeExploreStrip } from "@/components/home/HomeExploreStrip";
import { HomeFeaturedProducts } from "@/components/home/HomeFeaturedProducts";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeMetrics } from "@/components/home/HomeMetrics";
import { HomeProcess } from "@/components/home/HomeProcess";
import { HomeServices } from "@/components/home/HomeServices";
import {
  getFeaturedProducts,
  getHomeStats,
} from "@/lib/home-data";

export const metadata: Metadata = {
  title: "Home",
  description:
    "SEO, creative branding, digital marketing, live product catalog, and AI concierge by Ritz Media World.",
};

export const revalidate = 60;

export default async function Home() {
  const [stats, featuredProducts] = await Promise.all([
    getHomeStats(),
    getFeaturedProducts(4),
  ]);

  return (
    <main className="overflow-x-hidden bg-white">
      <HomeHero />
      <HomeMetrics stats={stats} />
      <HomeServices />
      <HomeFeaturedProducts products={featuredProducts} />
      <HomeExploreStrip />
      <GoalSection />
      <HomeProcess />
      <TestimonialSection />
      <StatsSection />
      <AwardsSection />
      <FAQSection />
      <ContactSection />
      <ContactInfoSection />
      <MapSection />
      <BrandAuditSection />
      <CTASection />
    </main>
  );
}
