// src/lib/api/chatApi.ts
import { ApiRequestMessage } from "@/types/chat";

export const sendChatMessage = async (message: string) => {
  try {
    const messages: ApiRequestMessage[] = [
      {
        role: "system",
        content:
          "You are a helpful financial assistant who provides concise and accurate results after evaluating the context without extra irrelevant data using vocabulary suited for a financially knowledgeable person. If file context is available, provide specific answers from the context",
      },
      {
        role: "user",
        content: message,
      },
    ];

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });

    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
