import React, { useState } from "react";
import { ChatMessage as ChatMessageType } from "@/types/chat";
import ChatMarkdownCode from "./ChatMarkdownCode";
import { CheckCheck, Copy } from "lucide-react";

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUserMessage = message.role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopied(true);
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div
      className={`p-3 text-white rounded-lg w-fit whitespace-pre-wrap ${
        isUserMessage ? "bg-blue-500 self-end max-w-[75%]" : "w-full self-start"
      }`}
    >
      {isUserMessage ? (
        message.text
      ) : (
        <>
          <ChatMarkdownCode>{message.text}</ChatMarkdownCode>
          <button onClick={handleCopy} className="flex items-center gap-2 cursor-pointer">
            {copied ? (
              <CheckCheck
                size={16}
                className="text-green-500 mt-5 cursor-pointer"
              />
            ) : (
              <Copy
                size={16}
                className="text-gray-500 mt-5 cursor-pointer hover:text-gray-300"
              />
            )}
            <span className="text-sm text-gray-500 mt-5 cursor-pointer">
              {copied ? "Copied!" : "Copy response"}
            </span>
          </button>
        </>
      )}
    </div>
  );
};
