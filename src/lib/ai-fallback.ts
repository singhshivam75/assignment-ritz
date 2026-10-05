function extractName(message: string): string | null {
  const match = message.match(
    /\b(?:my name is|i'm|i am|call me)\s+([a-zA-Z][a-zA-Z\s'-]{0,40})/i
  );
  const name = match?.[1]?.trim();
  return name ? name.replace(/\s+/g, " ") : null;
}

function isIdentityQuestion(message: string): boolean {
  return /\b(what is your name|what's your name|who are you|your name)\b/i.test(
    message
  );
}

export function buildFallbackReply(userMessage: string): string {
  const trimmed = userMessage.trim();
  const name = extractName(trimmed);

  if (isIdentityQuestion(trimmed)) {
    return `I'm the **Ritz Media World AI assistant** — a virtual concierge for this website.

I help visitors with **SEO**, **creative branding**, **digital marketing**, our **services**, and **products**.

How can I support you today?`;
  }

  if (name) {
    return `Nice to meet you, **${name}**!

I'm the **Ritz Media World AI assistant**, and I'm here to help you with marketing and branding on our site.

- **SEO** and search visibility
- **Brand strategy** and creative direction
- **Campaign planning** and digital growth
- **Products** and booking a **free consultation**

What would you like help with next?`;
  }

  return `I'm the **Ritz Media World AI assistant**, and I'm here to help you.

I can guide you on **SEO**, **branding**, **digital marketing**, exploring our **products** (/products), or requesting a **free brand audit**.

Tell me a bit about your goal, and I'll point you in the right direction.`;
}
