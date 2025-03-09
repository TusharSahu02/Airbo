import React from "react";
import { ChatMessage as ChatMessageType } from "@/types/chat";
import ChatMarkdownCode from "./ChatMarkdownCode";

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUserMessage = message.role === "user";

  return (
    <div
      className={`p-3 text-white rounded-lg w-fit whitespace-pre-wrap ${
        isUserMessage ? "bg-blue-500 self-end max-w-[75%]" : "w-full self-start"
      }`}
    >
      {isUserMessage ? (
        message.text
      ) : (
        <ChatMarkdownCode>{message.text}</ChatMarkdownCode>
      )}
    </div>
  );
};
