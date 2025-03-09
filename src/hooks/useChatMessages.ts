// src/hooks/useChatMessages.ts
import { useState } from "react";
import { ApiRequestMessage, ChatMessage } from "@/types/chat";
import { sendChatMessage } from "@/lib/api/chatApi";
import useChatStore from "@/stores/chatStore";

export const useChatMessages = () => {
  const { messages, addMessage, setIsLoading } = useChatStore();
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
    if (!message.trim()) return;

    try {
      setIsLoading(true);
      addUserMessage(message);
      setMessage(""); // Clear input

      const messagesToSend : ApiRequestMessage[] = [
        ...chatMessages.map(msg => ({ role: msg.role, content: msg.text })),
        { role: "user", content: message }
      ];

      const response = await sendChatMessage(messagesToSend);
      addSystemMessage(response);
    } catch (error) {
      console.error(`Error while sending message:`, error);
      addSystemMessage("An error occurred while sending the message.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    chatMessages,
    message,
    setMessage,
    handleSendMessage,
  };
};
