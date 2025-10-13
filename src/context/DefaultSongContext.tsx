'use client'

import React, { createContext, useContext, useEffect, useRef, useState } from "react";

const DefaultSongContext = createContext<any>(null);

export function DefaultSongProvider({ children }: { children: React.ReactNode }) {

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const songRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {

    }, [songRef])

    return (
        <DefaultSongContext.Provider value={{ setIsPlaying, isPlaying, songRef }}>
            {children}
        </DefaultSongContext.Provider>
    );
}

export function useDefaultSong() {
    return useContext(DefaultSongContext);
}