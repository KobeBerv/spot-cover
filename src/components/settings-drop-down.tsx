"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Maximize, Settings } from "lucide-react";
import { signOut } from "next-auth/react";
import { CoverSizeDialog } from "./cover-size-dialog";

export const SettingsDropDown = () => {
  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  async function handleSignOut() {
    await signOut();
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="z-50 absolute top-5 opacity-10 transition-all hover:opacity-100 left-1/2 transform -translate-x-1/2 -translate-y-1/2 data-[state=open]:opacity-100">
        <Settings size={25} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="*:cursor-pointer ">
        <DropdownMenuLabel className="text-center">Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => toggleFullScreen()}>
          <Maximize />
          Full screen
        </DropdownMenuItem>
        <CoverSizeDialog />

        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
