import Link from "next/link";
import ReactMarkdown from "react-markdown";

type AiMessageContentProps = {
  content: string;
  variant: "user" | "assistant";
};

export function AiMessageContent({ content, variant }: AiMessageContentProps) {
  if (variant === "user") {
    return (
      <p className="whitespace-pre-wrap text-white/95">{content}</p>
    );
  }

  return (
    <div className="ai-message-markdown text-slate-800">
      <ReactMarkdown
        components={{
          p: ({ children }) => (
            <p className="mb-3 leading-relaxed last:mb-0">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="mb-3 list-disc space-y-2 pl-5 last:mb-0 marker:text-[#D39B35]">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-3 list-decimal space-y-2.5 pl-5 last:mb-0 marker:font-semibold marker:text-[#08184A]">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed [&>p]:mb-0">{children}</li>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-[#08184A]">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="text-slate-600 not-italic">{children}</em>
          ),
          a: ({ href, children }) => {
            const isInternal = href?.startsWith("/");
            const className =
              "font-semibold text-[#D39B35] underline-offset-2 hover:underline";

            if (isInternal && href) {
              return (
                <Link href={href} className={className}>
                  {children}
                </Link>
              );
            }

            return (
              <a
                href={href}
                className={className}
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
