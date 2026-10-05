"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Megaphone,
  Palette,
  RotateCcw,
  Search,
  ShoppingBag,
} from "lucide-react";

const CAPABILITIES = [
  {
    icon: Search,
    title: "SEO guidance",
    description: "Audits, keywords, and visibility tips",
  },
  {
    icon: Palette,
    title: "Brand strategy",
    description: "Identity, messaging, and creative direction",
  },
  {
    icon: Megaphone,
    title: "Campaign ideas",
    description: "Digital marketing plans tailored to you",
  },
  {
    icon: BarChart3,
    title: "Next steps",
    description: "Consultations, audits, and product picks",
  },
];

type AiChatSidebarProps = {
  onClear: () => void;
  onPrompt: (text: string) => void;
  disabled?: boolean;
  messageCount: number;
};

export function AiChatSidebar({
  onClear,
  onPrompt,
  disabled,
  messageCount,
}: AiChatSidebarProps) {
  return (
    <aside className="flex flex-col gap-4 lg:sticky lg:top-6 lg:self-start">
      <div className="overflow-hidden rounded-2xl border border-[#08184A]/10 bg-white p-5 shadow-lg shadow-[#08184A]/5">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#08184A]">
          What I can help with
        </h2>
        <ul className="mt-4 space-y-3">
          {CAPABILITIES.map(({ icon: Icon, title, description }) => (
            <li
              key={title}
              className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3 transition hover:border-[#D39B35]/30 hover:bg-[#D39B35]/5"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#08184A] text-[#D39B35]">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#08184A]">{title}</p>
                <p className="text-xs leading-relaxed text-slate-500">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-[#D39B35]/20 bg-gradient-to-br from-[#08184A] to-[#0c2252] p-5 text-white shadow-xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#f0c56a]">
          Quick links
        </p>
        <div className="mt-3 flex flex-col gap-2">
          <Link
            href="/products"
            className="inline-flex items-center justify-between rounded-xl bg-white/10 px-4 py-2.5 text-sm font-medium transition hover:bg-white/15"
          >
            <span className="inline-flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-[#D39B35]" />
              Browse products
            </span>
            <ArrowRight className="h-4 w-4 opacity-70" />
          </Link>
          <button
            type="button"
            disabled={disabled || messageCount <= 1}
            onClick={onClear}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-medium transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RotateCcw className="h-4 w-4" />
            New conversation
          </button>
        </div>
        <p className="mt-3 text-xs text-white/55">
          {messageCount > 1
            ? `${messageCount - 1} messages in this session`
            : "Start with a question below"}
        </p>
      </div>

      <div className="hidden rounded-2xl border border-slate-200/80 bg-white/80 p-4 backdrop-blur-sm lg:block">
        <p className="text-xs font-semibold text-slate-500">Try asking</p>
        <button
          type="button"
          disabled={disabled}
          onClick={() =>
            onPrompt("Give me a 3-step SEO checklist for my business")
          }
          className="mt-2 w-full rounded-xl border border-dashed border-[#D39B35]/40 px-3 py-2 text-left text-xs text-[#08184A] transition hover:bg-[#D39B35]/5 disabled:opacity-50"
        >
          “Give me a 3-step SEO checklist for my business”
        </button>
      </div>
    </aside>
  );
}
