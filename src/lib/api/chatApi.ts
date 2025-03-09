// src/lib/api/chatApi.ts
import { ApiRequestMessage } from "@/types/chat";

export const sendChatMessage = async (messages:  ApiRequestMessage[]) => {
  try {
    // const messages: ApiRequestMessage[] = [
    //   {
    //     role: "system",
    //     content: "",
    //   },
    //   {
    //     role: "user",
    //     content: message,
    //   },
    // ];

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
