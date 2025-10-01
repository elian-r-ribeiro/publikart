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
        if (!songsQueue.length) return;

        if (audio) {
            audio.pause();
        }

        const song = songsQueue[currentIndex];
        if (!song) return;

        const newAudio = new Audio(song.songUrl);
        setAudio(newAudio);
        setCurrentSong(song);

        newAudio.play();

        newAudio.onended = () => {
            if (currentIndex + 1 >= songsQueue.length) {
                setSongsQueue([]);
                setIndex(0);
                setAudio(null);
                setCurrentSong(undefined);
            } else {
                setIndex(currentIndex + 1);
            }
        };

    }, [currentIndex, songsQueue]);

    return (
        <PlayerContext.Provider value={{ 
            currentSong, setCurrentSong, 
            songsQueue, setSongsQueue, 
            currentIndex, setIndex,
            audio, setAudio
        }}>
            {children}
        </PlayerContext.Provider>
    );
}

export function usePlayerContext() {
    return useContext(PlayerContext);
}
