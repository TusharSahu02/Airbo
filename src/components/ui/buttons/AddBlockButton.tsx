// src/components/ui/buttons/AddBlockButton.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const AddBlockButton: React.FC = () => {
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
        {/* Content can be added here or imported from BlockTypeDropdown */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
