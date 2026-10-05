import type { Metadata } from "next";
import AiChatPanel, { AiPageHero } from "@/components/ai/AiChatPanel";

export const metadata: Metadata = {
  title: "AI Assistant",
  description:
    "Chat with the Ritz Media World AI concierge about SEO, branding, and products.",
};

export default function AiPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#eef1f6]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(211,155,53,0.12),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(8,24,74,0.08),transparent_45%)]" />
      <AiPageHero />
      <section className="relative z-10 -mt-10 px-6 pb-20 pt-2">
        <AiChatPanel />
      </section>
    </main>
  );
}
