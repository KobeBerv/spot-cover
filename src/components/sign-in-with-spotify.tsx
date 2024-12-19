"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export const SignInWithSpotify = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<undefined | string>(undefined);

  async function handleSignIn() {
    setIsLoading(true);
    const res = await signIn("spotify");

    if (res?.error) {
      setError(res.error);
    }

    setIsLoading(false);
  }

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleSignIn}
        className="rounded-full bg-foreground text-background px-1 pr-2 py-2 flex gap-1 items-center justify-center hover:bg-foreground/80 hover:scale-1 text-md font-bold"
        disabled={isLoading}
      >
        <Image
          src="/spotify-icon.svg"
          alt="spotify logo"
          width={25}
          height={25}
          hidden={isLoading}
        />
        <Loader2
          className={cn("animate-spin", !isLoading && "hidden")}
          height={25}
          width={25}
        />
        Sign in with spotify
      </button>
    </div>
  );
};
