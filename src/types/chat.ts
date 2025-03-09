export type MessageRole = "user" | "system";

export interface ChatMessage {
  role: MessageRole;
  text: string;
}

export interface ApiRequestMessage {
  role: MessageRole;
  content: string;
}
