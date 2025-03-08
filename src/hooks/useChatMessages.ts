// src/hooks/useChatMessages.ts
import { useState } from "react";
import { ChatMessage } from "@/types/chat";
import { sendChatMessage } from "@/lib/api/chatApi";
import useChatStore from "@/stores/chatStore";

export const useChatMessages = () => {
  const { messages, addMessage } = useChatStore();
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(messages);
  const [message, setMessage] = useState("");

  const addUserMessage = (text: string) => {
    addMessage({ role: "user", text });
    setChatMessages((prev) => [...prev, { role: "user", text }]);
  };

  const addSystemMessage = (text: string) => {
    addMessage({ role: "system", text });
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
