"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { AppSidebar } from "@/components/app-sidebar";

import React, { useRef, useEffect } from "react";
import { PiOpenAiLogoThin } from "react-icons/pi";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Heading1Icon,
  Heading2Icon,
  MinusIcon,
  PlusIcon,
  TextQuoteIcon,
  TypeIcon,
} from "lucide-react";
import Link from "next/link";
export default function HomePage() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;

    // Adding a null check
    if (!textarea) return;

    const adjustHeight = () => {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 100)}px`;
    };

    textarea.addEventListener("input", adjustHeight);
    adjustHeight(); // Initial adjustment

    return () => {
      textarea.removeEventListener("input", adjustHeight);
    };
  }, []);
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
      className="h-screen"
    >
      <AppSidebar />

      {/* TODO : hide when side bar is enabled */}
      <SidebarTrigger className="-ml-1" />

      {/* Center Content div */}
      <div className="lg:max-w-5xl w-full h-full relative  mx-auto flex items-center justify-center">
        {/* Search component before prompt */}
        {/* LOGO  */}
        <div className=" absolute border size-20 bg-gray-500/50 border-white rounded-full top-40 left-1/2 -translate-x-1/2 "></div>
        <div className="border max-w-3xl w-[65%] mx-auto bg-[#3e3e3e] rounded-2xl flex flex-col items-end justify-between p-3">
          <div className=" w-full">
            {/* Input Text field or Text area */}
            <textarea
              ref={textareaRef}
              className="w-full outline-none overflow-y-auto resize-none hideScrollbar"
              rows={1}
              placeholder="Ask anything"
            ></textarea>
          </div>
          <div className="flex items-center w-full justify-between mt-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full shadow-none border border-gray-500 cursor-pointer hover:bg-transparent"
                  aria-label="Open edit menu"
                >
                  <PlusIcon size={16} aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="pb-2">
                <DropdownMenuLabel>Add block</DropdownMenuLabel>
                <DropdownMenuItem>
                  <div
                    className="bg-background flex size-8 items-center justify-center rounded-md border"
                    aria-hidden="true"
                  >
                    <TypeIcon size={16} className="opacity-60" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Text</div>
                    <div className="text-muted-foreground text-xs">
                      Start writing with plain text
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div
                    className="bg-background flex size-8 items-center justify-center rounded-md border"
                    aria-hidden="true"
                  >
                    <TextQuoteIcon size={16} className="opacity-60" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Quote</div>
                    <div className="text-muted-foreground text-xs">
                      Capture a quote
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div
                    className="bg-background flex size-8 items-center justify-center rounded-md border"
                    aria-hidden="true"
                  >
                    <MinusIcon size={16} className="opacity-60" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Divider</div>
                    <div className="text-muted-foreground text-xs">
                      Visually divide blocks
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div
                    className="bg-background flex size-8 items-center justify-center rounded-md border"
                    aria-hidden="true"
                  >
                    <Heading1Icon size={16} className="opacity-60" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Heading 1</div>
                    <div className="text-muted-foreground text-xs">
                      Big section heading
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div
                    className="bg-background flex size-8 items-center justify-center rounded-md border"
                    aria-hidden="true"
                  >
                    <Heading2Icon size={16} className="opacity-60" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Heading 2</div>
                    <div className="text-muted-foreground text-xs">
                      Medium section subheading
                    </div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger>
                {/* Model Selection */}
                <div className="flex items-center gap-0.5 cursor-pointer">
                  <PiOpenAiLogoThin size={2} />
                  <p className=" text-sm">name of model</p>
                  <ChevronDown size={15} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className=" absolute bottom-3 left-1/2 -translate-x-1/2">
          <p className=" text-sm text-gray-400">
            can make mistakes. Check important information
          </p>
        </div>
      </div>

      {/* Theme Toggle Button */}
      <div className=" absolute top-3 right-5 flex gap-2">
        {/* Upgrade Plan */}

        <Link href="/pricing">
          <span className="flex items-center justify-center rounded-md px-4 h-full border">
            <p className=" text-sm">Upgrade Plan</p>
          </span>
        </Link>

        {/* Theme toggle */}
        <ModeToggle />

        {/* Profile */}

        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className=" size-[35px] border rounded-full">
              <img
                src="https://api.dicebear.com/9.x/initials/svg?seed=Jude"
                alt=""
                className="w-full h-full rounded-full"
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </SidebarProvider>
  );
}
