"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Slider } from "./ui/slider";
import { Ruler } from "lucide-react";
import { useAppContext } from "@/hooks/use-app-context";

export const CoverSizeDialog = () => {
  const { coverSize, setCoverSize } = useAppContext();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          role="menuitem"
          className="hover: relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-zinc-100 hover:bg-zinc-100 focus:text-zinc-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&amp;>svg]:size-4 [&amp;>svg]:shrink-0 dark:focus:bg-zinc-800 dark:focus:text-zinc-50"
          data-orientation="vertical"
          data-radix-collection-item=""
        >
          <Ruler />
          <span>Cover Size</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adjust Cover Size</DialogTitle>
          <DialogDescription>
            Use the slider to adjust the cover size.
          </DialogDescription>
        </DialogHeader>
        <span>{coverSize} px</span>
        <Slider
          value={[coverSize]}
          max={1000}
          step={100}
          onValueChange={(e) => setCoverSize(e[0])}
        />
      </DialogContent>
    </Dialog>
  );
};
