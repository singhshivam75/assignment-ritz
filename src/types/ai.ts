export type ChatRole = "user" | "model";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt?: number;
};

export type ChatApiMessage = {
  role: ChatRole;
  content: string;
};

export type ChatRequestBody = {
  message: string;
  history?: ChatApiMessage[];
};

export type ChatResponseBody = {
  reply: string;
  fallback?: boolean;
};

export type ChatErrorBody = {
  message: string;
};
