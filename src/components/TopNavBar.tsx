import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoginButton from "./LoginLogOutButton";

const TopNavBar = () => {
  return (
    <div className=" absolute top-3 z-10 right-5 flex gap-2">
      {/* Upgrade Plan */}

      <Link href="/pricing">
        <span className="items-center justify-cente hidden md:flex rounded-md px-4 h-full border">
          <p className=" text-sm">Upgrade Plan</p>
        </span>
      </Link>
      <LoginButton />

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
  );
};

export default TopNavBar;
