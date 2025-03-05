import React from "react";
import ReactMarkdown from "react-markdown";
import { ChatMessage as ChatMessageType } from "@/types/chat";

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUserMessage = message.role === "user";

  return (
    <div
      className={`p-3 text-white rounded-lg w-fit max-w-[75%] whitespace-pre-wrap ${
        isUserMessage ? "bg-blue-500 self-end" : "bg-gray-700 self-start"
      }`}
    >
      {isUserMessage ? (
        message.text
      ) : (
        <ReactMarkdown>{message.text}</ReactMarkdown>
      )}
    </div>
  );
};
