// src/components/ui/dropdowns/BlockTypeDropdown.tsx
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  PlusIcon,
  TypeIcon,
  TextQuoteIcon,
  MinusIcon,
  Heading1Icon,
  Heading2Icon,
} from "lucide-react";

const BLOCK_TYPES = [
  {
    icon: <TypeIcon size={16} className="opacity-60" />,
    title: "Text",
    description: "Start writing with plain text",
  },
  {
    icon: <TextQuoteIcon size={16} className="opacity-60" />,
    title: "Quote",
    description: "Capture a quote",
  },
  {
    icon: <MinusIcon size={16} className="opacity-60" />,
    title: "Divider",
    description: "Visually divide blocks",
  },
  {
    icon: <Heading1Icon size={16} className="opacity-60" />,
    title: "Heading 1",
    description: "Big section heading",
  },
  {
    icon: <Heading2Icon size={16} className="opacity-60" />,
    title: "Heading 2",
    description: "Medium section subheading",
  },
];

export const BlockTypeDropdown: React.FC = () => {
  return (
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
          <DropdownMenuItem key={index}>
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
  );
};
