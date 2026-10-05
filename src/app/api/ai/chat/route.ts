import { NextRequest, NextResponse } from "next/server";
import { buildFallbackReply } from "@/lib/ai-fallback";
import { generateChatReply } from "@/lib/gemini";
import { rateLimit } from "@/lib/rate-limit";
import type { ChatApiMessage, ChatErrorBody, ChatResponseBody } from "@/types/ai";

const MAX_MESSAGE_LENGTH = 4000;
const MAX_HISTORY_TURNS = 20;

function parseHistory(raw: unknown): ChatApiMessage[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  const parsed: ChatApiMessage[] = [];

  for (const item of raw) {
    if (
      item &&
      typeof item === "object" &&
      (item as ChatApiMessage).role &&
      typeof (item as ChatApiMessage).content === "string"
    ) {
      const role = (item as ChatApiMessage).role;
      const content = (item as ChatApiMessage).content.trim();
      if ((role === "user" || role === "model") && content) {
        parsed.push({ role, content });
      }
    }
  }

  return parsed.slice(-MAX_HISTORY_TURNS);
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json<ChatErrorBody>(
      { message: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const message =
    typeof (body as { message?: unknown }).message === "string"
      ? (body as { message: string }).message.trim()
      : "";

  if (!message) {
    return NextResponse.json<ChatErrorBody>(
      { message: "Message is required." },
      { status: 400 }
    );
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json<ChatErrorBody>(
      { message: `Message must be at most ${MAX_MESSAGE_LENGTH} characters.` },
      { status: 400 }
    );
  }

  const history = parseHistory((body as { history?: unknown }).history);

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "local";
  const { allowed } = rateLimit(`ai-chat:${ip}`, 30, 60_000);
  if (!allowed) {
    return NextResponse.json<ChatResponseBody>({
      reply: buildFallbackReply(message),
      fallback: true,
    });
  }

  try {
    const reply = await generateChatReply(message, history);
    return NextResponse.json<ChatResponseBody>({ reply });
  } catch (error) {
    console.error("Gemini chat error:", error);

    if (error instanceof Error && error.message === "MISSING_API_KEY") {
      return NextResponse.json<ChatErrorBody>(
        { message: "AI assistant is not configured." },
        { status: 503 }
      );
    }

    const reply = buildFallbackReply(message);
    return NextResponse.json<ChatResponseBody>({ reply, fallback: true });
  }
}
