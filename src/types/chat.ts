export type MessageRole = "user" | "system";

export interface ChatMessage {
  role: MessageRole;
  text: string;
  loading?: boolean;
}

export interface ApiRequestMessage {
  role: MessageRole;
  content: string;
}
