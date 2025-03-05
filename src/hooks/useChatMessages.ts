// src/hooks/useChatMessages.ts
import { useState } from "react";
import { ChatMessage } from "@/types/chat";
import { sendChatMessage } from "@/lib/api/chatApi";

export const useChatMessages = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");

  const addUserMessage = (text: string) => {
    setChatMessages((prev) => [...prev, { role: "user", text }]);
  };

  const addSystemMessage = (text: string) => {
    setChatMessages((prev) => [...prev, { role: "system", text }]);
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      addUserMessage(message);
      setMessage(""); // Clear input

      try {
        const response = await sendChatMessage(message);
        addSystemMessage(response);
      } catch (error) {
        console.log(`Error while sending message: ${error}`);
        addSystemMessage("An error occurred while sending the message.");
      }
    }
  };

  return {
    chatMessages,
    message,
    setMessage,
    handleSendMessage,
  };
};
