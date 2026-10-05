"use client";

import { useState } from "react";
import { Bot, Check, Copy, User } from "lucide-react";
import type { ChatMessage } from "@/types/ai";
import { AiMessageContent } from "@/components/ai/AiMessageContent";

type AiMessageBubbleProps = {
  message: ChatMessage;
  index: number;
};

function formatTime(timestamp?: number) {
  if (!timestamp) {
    return null;
  }
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

export function AiMessageBubble({ message, index }: AiMessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";
  const timeLabel = formatTime(message.createdAt);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div
      className={`animate-ai-message-in flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}
      style={{ animationDelay: `${Math.min(index, 6) * 40}ms` }}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-sm ring-1 ${
          isUser
            ? "bg-[#08184A] text-[#D39B35] ring-[#D39B35]/30"
            : "bg-gradient-to-br from-[#D39B35]/20 to-white text-[#08184A] ring-[#D39B35]/25"
        }`}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      <div
        className={`group relative max-w-[min(85%,42rem)] ${
          isUser ? "items-end" : "items-start"
        } flex flex-col gap-1`}
      >
        <div
          className={`relative rounded-2xl px-4 py-3 text-sm leading-relaxed transition-shadow duration-300 sm:px-5 sm:py-4 sm:text-[15px] ${
            isUser
              ? "bg-gradient-to-br from-[#08184A] to-[#0a2160] text-white shadow-lg shadow-[#08184A]/20"
              : "border border-slate-200/80 bg-white text-slate-800 shadow-md shadow-slate-200/50 hover:shadow-lg"
          }`}
        >
          <AiMessageContent
            content={message.content}
            variant={isUser ? "user" : "assistant"}
          />

          {!isUser && (
            <button
              type="button"
              onClick={() => void handleCopy()}
              className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 opacity-0 shadow-sm transition hover:border-[#D39B35]/40 hover:text-[#08184A] focus:opacity-100 group-hover:opacity-100"
              aria-label={copied ? "Copied" : "Copy message"}
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-600" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          )}
        </div>

        {timeLabel && (
          <span
            className={`px-1 text-[10px] font-medium uppercase tracking-wide text-slate-400 ${
              isUser ? "text-right" : "text-left"
            }`}
          >
            {timeLabel}
          </span>
        )}
      </div>
    </div>
  );
}
