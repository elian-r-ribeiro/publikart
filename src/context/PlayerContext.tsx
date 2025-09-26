'use client'
import { createContext, useContext, useEffect, useState } from "react";
import Song from "@/model/Song";

const PlayerContext = createContext<any>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {

    const [songsQueue, setSongsQueue] = useState<Song[]>([]);
    const [currentSong, setCurrentSong] = useState<Song>();
    const [currentIndex, setIndex] = useState<number>(0);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

    useEffect(() => {

        if (songsQueue.length == 0) return;
        if (audio) audio.pause();

        setCurrentSong(songsQueue[currentIndex]);

        const songUrl = songsQueue[currentIndex].songUrl;
        const newAudio = new Audio(songUrl);
        setAudio(newAudio);

        newAudio.play();

        newAudio.onended = () => {
            newAudio.pause();
            newAudio.src = "";
        }

    }, [songsQueue]);

    return (
        <PlayerContext.Provider value={{ currentSong, setCurrentSong, songsQueue, setSongsQueue, currentIndex, setIndex }}>
            {children}
        </PlayerContext.Provider>
    );
}

export function usePlayerContext() {
    return useContext(PlayerContext);
}
