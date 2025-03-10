"use client";
import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import TopNavBar from "@/components/TopNavBar";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
      className="h-screen"
    >
      <TopNavBar />
      <AppSidebar />
      <SidebarTrigger className="ml-2 mt-7 absolute cursor-pointer" />
      {children}
    </SidebarProvider>
  );
};

export default ChatLayout;
