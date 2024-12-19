"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Track } from "@spotify/web-api-ts-sdk";
import { useAppContext } from "@/hooks/use-app-context";
import { AuthUser } from "@/auth";
import { getSpotifyClient } from "@/lib/spotify-client";
import { signIn } from "next-auth/react";

interface CurrentSongProps {
  user: AuthUser;
}

export const CurrentSong = ({ user }: CurrentSongProps) => {
  const { coverSize, setCurrentlyPlayingTrack, currentlyPlayingTrack } =
    useAppContext();

  const { data, isLoading, error } = useQuery({
    queryKey: ["currentlyPlayingTrack"],
    queryFn: async () =>
      await getSpotifyClient(user).player.getCurrentlyPlayingTrack(),
    refetchInterval: 3000,
  });

  useEffect(() => {
    if (error) {
      signIn("spotify");
    }
  }, [error]);

  useEffect(() => {
    console.log(error);
    setCurrentlyPlayingTrack(data);
  }, [data, setCurrentlyPlayingTrack, error]);

  if (isLoading) return <div>Loading...</div>;

  if (!currentlyPlayingTrack?.item) return <div>No song playing</div>;

  return (
    <div className="p-16 flex items-center justify-center">
      <motion.div
        key={(currentlyPlayingTrack.item as Track).id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={(currentlyPlayingTrack.item as Track).album.images[0].url}
          alt="album cover"
          height={coverSize}
          width={coverSize}
          className={`h-full`}
          loader={({ src }) => src}
          priority={true}
        />
      </motion.div>
    </div>
  );
};
