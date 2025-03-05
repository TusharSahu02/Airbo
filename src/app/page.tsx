"use client";
import React from "react";
import { ChatContainer } from "@/components/chat/ChatContainer";
import ChatLayout from "@/components/layout/ChatLayout";

export default function HomePage() {
  return (
    <ChatLayout>
      <ChatContainer />
    </ChatLayout>
  );
}
