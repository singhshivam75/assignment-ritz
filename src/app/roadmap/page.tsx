import { Metadata } from "next";
import LearningRoadmapDashboard from "@/components/roadmap/LearningRoadmapDashboard";

export const metadata: Metadata = {
  title: "Learning Roadmap | ₹10 LPA Full-Stack Preparation",
  description:
    "Personal Full-Stack Developer preparation dashboard and syllabus tracking using Ritz Media World as practical learning project.",
};

export default function RoadmapPage() {
  return <LearningRoadmapDashboard />;
}
