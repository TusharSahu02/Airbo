// src/components/ui/dropdowns/BlockTypeDropdown.tsx
import React, { useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { PlusIcon, File } from "lucide-react";

const BLOCK_TYPES = [
  {
    icon: <File size={16} className="opacity-60" />,
    title: "PDF Chat",
    description: "Chat with your PDF documents using AI",
  },
];

export const BlockTypeDropdown: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        accept=".pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setSelectedFile(file);
          }
        }}
      />
      <span className="">
        {selectedFile ? (
          <button
            className="px-2 border relative rounded-3xl border-gray-400/20 flex  items-center gap-1 "
            onClick={handleClick}
          >
            <p className="text-xs leading-0 py-3">{selectedFile.name}</p>
          </button>
        ) : (
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
              {BLOCK_TYPES.map((block, index) => (
                <DropdownMenuItem
                  key={index}
                  className="cursor-pointer"
                  onClick={handleClick}
                >
                  <div
                    className="bg-background flex size-8 items-center justify-center rounded-md border"
                    aria-hidden="true"
                  >
                    {block.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{block.title}</div>
                    <div className="text-muted-foreground text-xs">
                      {block.description}
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </span>
    </>
  );
};
