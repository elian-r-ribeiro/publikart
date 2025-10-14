'use client'

import React, { createContext, SetStateAction, useContext, useRef, useState } from "react";

type DefaultSongContextType = {
    setIsPlaying: React.Dispatch<SetStateAction<boolean>>;
    isPlaying: boolean;
    songRef: React.RefObject<HTMLAudioElement | null>;
}

const DefaultSongContext = createContext<DefaultSongContextType | null>(null);

export function DefaultSongProvider({ children }: { children: React.ReactNode }) {

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const songRef = useRef<HTMLAudioElement | null>(null);

    return (
        <DefaultSongContext.Provider value={{ setIsPlaying, isPlaying, songRef }}>
            {children}
        </DefaultSongContext.Provider>
    );
}

export function useDefaultSong(): DefaultSongContextType {
    const context = useContext(DefaultSongContext);

    if (!context) {
        throw new Error("useDefaultSong deve ser usado dentro de um DefaultSongProvider");
    }

    return context;
}