"use client";

import { Bot } from "lucide-react";

export function AiTypingIndicator() {
  return (
    <div
      className="animate-ai-message-in flex gap-3"
      aria-live="polite"
      aria-label="Assistant is typing"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#D39B35]/25 to-[#08184A]/10 ring-1 ring-[#D39B35]/20">
        <Bot className="h-4 w-4 text-[#08184A]" />
      </div>
      <div className="rounded-2xl border border-slate-200/80 bg-white px-5 py-4 shadow-sm">
        <div className="flex items-center gap-1.5">
          <span
            className="animate-ai-typing-dot h-2 w-2 rounded-full bg-[#D39B35]"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="animate-ai-typing-dot h-2 w-2 rounded-full bg-[#D39B35]"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="animate-ai-typing-dot h-2 w-2 rounded-full bg-[#D39B35]"
            style={{ animationDelay: "300ms" }}
          />
        </div>
        <p className="mt-2 text-xs font-medium text-slate-400">
          Crafting your answer…
        </p>
      </div>
    </div>
  );
}
