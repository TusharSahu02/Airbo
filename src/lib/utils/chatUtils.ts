// src/lib/utils/chatUtils.ts
import { ChatMessage, MessageRole } from "@/types/chat";

export const formatChatMessage = (
  text: string,
  role: MessageRole
): ChatMessage => ({
  role,
  text,
});

export const filterSensitiveContent = (message: string): string => {
  // Example of basic content filtering
  const sensitivePatterns = [/password/i, /credit card/i, /social security/i];

  return sensitivePatterns.reduce(
    (filteredMsg, pattern) => filteredMsg.replace(pattern, "[REDACTED]"),
    message
  );
};

export const truncateMessage = (
  message: string,
  maxLength: number = 1000
): string => {
  return message.length > maxLength
    ? message.substring(0, maxLength) + "..."
    : message;
};
