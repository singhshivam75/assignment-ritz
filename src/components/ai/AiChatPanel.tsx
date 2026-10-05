"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  MessageSquare,
  Send,
  Sparkles,
  Zap,
} from "lucide-react";
import type {
  ChatApiMessage,
  ChatErrorBody,
  ChatMessage,
  ChatResponseBody,
} from "@/types/ai";
import { AiChatSidebar } from "@/components/ai/AiChatSidebar";
import { AiMessageBubble } from "@/components/ai/AiMessageBubble";
import { AiTypingIndicator } from "@/components/ai/AiTypingIndicator";
import { buildFallbackReply } from "@/lib/ai-fallback";

const SUGGESTED_PROMPTS = [
  "What digital marketing services does Ritz Media World offer?",
  "How do I request a free brand audit?",
  "Can you help me choose a product from your catalog?",
];

const WELCOME_MESSAGE_ID = "ritz-welcome";

const WELCOME_MESSAGE: ChatMessage = {
  id: WELCOME_MESSAGE_ID,
  role: "model",
  content:
    "Hi! I'm the Ritz Media World assistant. Ask about **SEO**, **branding**, our services, or **products** — I'm here to help.",
  createdAt: Date.now(),
};

function createId() {
  return crypto.randomUUID();
}

function toApiHistory(messages: ChatMessage[]): ChatApiMessage[] {
  return messages
    .filter((m) => m.id !== WELCOME_MESSAGE_ID)
    .map(({ role, content }) => ({ role, content }));
}

export default function AiChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior,
    });
  }, []);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) {
      return;
    }
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setShowScrollDown(distanceFromBottom > 120);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  useEffect(() => {
    const el = scrollRef.current;
    el?.addEventListener("scroll", handleScroll, { passive: true });
    return () => el?.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const clearChat = () => {
    setMessages([{ ...WELCOME_MESSAGE, createdAt: Date.now() }]);
    inputRef.current?.focus();
  };

  const appendAssistantReply = (content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: createId(),
        role: "model",
        content,
        createdAt: Date.now(),
      },
    ]);
  };

  const requestChat = async (
    trimmed: string,
    historyForApi: ChatApiMessage[]
  ) => {
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: historyForApi,
        }),
      });

      let reply = buildFallbackReply(trimmed);

      try {
        const data = (await res.json()) as ChatResponseBody | ChatErrorBody;
        if (res.ok && "reply" in data && data.reply) {
          reply = data.reply;
        }
      } catch {
        reply = buildFallbackReply(trimmed);
      }

      appendAssistantReply(reply);
    } catch {
      appendAssistantReply(buildFallbackReply(trimmed));
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) {
      return;
    }

    setInput("");

    const historyForApi = toApiHistory(messages);

    const userMessage: ChatMessage = {
      id: createId(),
      role: "user",
      content: trimmed,
      createdAt: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    await requestChat(trimmed, historyForApi);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage(input);
    }
  };

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-8">
      <div className="relative">
        <div className="absolute -inset-px rounded-[1.35rem] bg-gradient-to-br from-[#D39B35]/50 via-[#08184A]/20 to-[#D39B35]/30 opacity-80 blur-sm" />
        <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white shadow-2xl shadow-[#08184A]/15">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 bg-gradient-to-r from-[#08184A] via-[#0a2160] to-[#08184A] px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D39B35]/20 ring-1 ring-[#D39B35]/40">
                <MessageSquare className="h-5 w-5 text-[#f0c56a]" />
              </div>
              <div>
                <p className="text-sm font-bold tracking-wide">
                  Ritz AI Concierge
                </p>
                <div className="mt-0.5 flex items-center gap-2 text-xs text-white/70">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ai-status-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                  </span>
                  Online · Gemini powered
                </div>
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-[#f0c56a] ring-1 ring-white/10">
              <Zap className="h-3.5 w-3.5" />
              Instant answers
            </div>
          </header>

          <div className="relative">
            <div
              ref={scrollRef}
              className="ai-chat-scroll flex max-h-[min(58vh,560px)] min-h-[360px] flex-col gap-5 overflow-y-auto bg-[radial-gradient(ellipse_at_top,_rgba(211,155,53,0.06),_transparent_50%)] bg-slate-50/50 p-5 sm:p-6"
            >
              {messages.map((msg, index) => (
                <AiMessageBubble key={msg.id} message={msg} index={index} />
              ))}
              {loading && <AiTypingIndicator />}
            </div>

            {showScrollDown && (
              <button
                type="button"
                onClick={() => scrollToBottom()}
                className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#08184A] shadow-lg transition hover:border-[#D39B35]/50 hover:text-[#D39B35]"
                aria-label="Scroll to latest messages"
              >
                <ArrowDown className="h-4 w-4" />
              </button>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-slate-200/80 bg-white p-4 sm:p-5"
          >
            <div className="rounded-2xl border border-slate-200/90 bg-slate-50/50 p-2 shadow-inner transition focus-within:border-[#D39B35]/50 focus-within:ring-2 focus-within:ring-[#D39B35]/15">
              <label className="sr-only" htmlFor="ai-message">
                Message
              </label>
              <textarea
                id="ai-message"
                ref={inputRef}
                rows={2}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                placeholder="Ask about SEO, branding, or our products…"
                className="min-h-[56px] w-full resize-none bg-transparent px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 disabled:opacity-60"
              />
              <div className="flex items-center justify-between gap-3 px-2 pb-1 pt-1">
                <p className="text-[11px] text-slate-400">
                  Enter to send · Shift+Enter for new line
                </p>
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D39B35] to-[#c4892f] px-5 text-sm font-semibold text-white shadow-md shadow-[#D39B35]/25 transition hover:shadow-lg hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
                >
                  <Send className="h-4 w-4" />
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <AiChatSidebar
        messageCount={messages.length}
        disabled={loading}
        onClear={clearChat}
        onPrompt={(text) => void sendMessage(text)}
      />

      <div className="flex flex-col gap-4 lg:col-span-2">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
          Suggested prompts
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {SUGGESTED_PROMPTS.map((prompt, i) => (
            <button
              key={prompt}
              type="button"
              disabled={loading}
              onClick={() => void sendMessage(prompt)}
              className="animate-ai-message-in rounded-full border border-[#08184A]/10 bg-white px-4 py-2.5 text-left text-xs font-medium text-[#08184A] shadow-sm transition hover:-translate-y-0.5 hover:border-[#D39B35]/45 hover:bg-[#D39B35]/5 hover:shadow-md disabled:opacity-50 sm:text-sm"
              style={{ animationDelay: `${120 + i * 60}ms` }}
            >
              {prompt}
            </button>
          ))}
        </div>

        <p className="text-center text-sm text-slate-500">
          Prefer a human?{" "}
          <Link
            href="/#"
            className="font-semibold text-[#D39B35] underline-offset-2 hover:underline"
          >
            Request free consulting
          </Link>{" "}
          or browse{" "}
          <Link
            href="/products"
            className="font-semibold text-[#08184A] underline-offset-2 hover:underline"
          >
            products
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export function AiPageHero() {
  return (
    <section className="relative overflow-hidden bg-[#08184A] px-6 pb-20 pt-12 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(211,155,53,0.28),_transparent_55%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <div
          className="animate-ai-hero-fade-up mb-4 inline-flex items-center gap-2 rounded-full border border-[#D39B35]/30 bg-[#D39B35]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#f0c56a]"
          style={{ animationDelay: "0ms" }}
        >
          <Sparkles className="h-3.5 w-3.5" />
          AI Assistant
        </div>
        <h1
          className="animate-ai-hero-fade-up text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl"
          style={{ animationDelay: "80ms" }}
        >
          Ask{" "}
          <span className="bg-gradient-to-r from-[#f0c56a] via-[#D39B35] to-[#f0c56a] bg-clip-text text-transparent">
            Ritz Media World
          </span>{" "}
          anything
        </h1>
        <p
          className="animate-ai-hero-fade-up mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
          style={{ animationDelay: "160ms" }}
        >
          Premium, fast answers about digital marketing, SEO, branding, and our
          services — with a concierge-style chat experience.
        </p>
      </div>
    </section>
  );
}
