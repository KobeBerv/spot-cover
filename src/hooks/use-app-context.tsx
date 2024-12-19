"use client";

import { PlaybackState } from "@spotify/web-api-ts-sdk";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AppContextProps {
  coverSize: number;
  setCoverSize: (size: number) => void;
  showTitles: boolean;
  setShowTitles: (show: boolean) => void;
  currentlyPlayingTrack: PlaybackState | undefined;
  setCurrentlyPlayingTrack: (track: PlaybackState | undefined) => void;
}

const appContext = createContext<AppContextProps>({
  coverSize: 500,
  setCoverSize: () => {},
  showTitles: false,
  setShowTitles: () => {},
  currentlyPlayingTrack: undefined,
  setCurrentlyPlayingTrack: () => {},
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const getInitialCoverSize = () => {
    if (typeof window !== "undefined") {
      const savedCoverSize = window.localStorage.getItem("coverSize");
      return savedCoverSize ? parseInt(savedCoverSize) : 500;
    }
  };

  const [coverSize, setCoverSize] = useState<number>(getInitialCoverSize()!);
  const [showTitles, setShowTitles] = useState<boolean>(false);
  const [currentlyPlayingTrack, setCurrentlyPlayingTrack] = useState<
    PlaybackState | undefined
  >(undefined);

  useEffect(() => {
    window.localStorage.setItem("coverSize", coverSize.toString());
    window.localStorage.setItem("showTitles", showTitles.toString());
  }, [coverSize, showTitles]);

  return (
    <appContext.Provider
      value={{
        coverSize,
        setCoverSize,
        showTitles,
        setShowTitles,
        currentlyPlayingTrack,
        setCurrentlyPlayingTrack,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(appContext);
};
