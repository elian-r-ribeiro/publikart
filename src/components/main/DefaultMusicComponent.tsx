'use client'

import { useDefaultSong } from "@/context/DefaultSongContext";
import { getDefaultSongURL } from "@/services/SongsService";
import { IconMusic } from "@tabler/icons-react";

export default function DefaultMusicComponent() {
    const { songRef, isPlaying, setIsPlaying } = useDefaultSong();

    async function handleDefaultSongPlayAndPause() {
        if (!songRef.current) {
            const defaultSongURL = await getDefaultSongURL();
            songRef.current = new Audio(defaultSongURL);
            songRef.current.loop = true;
        }

        if (isPlaying === true) {
            songRef.current.pause();
            setIsPlaying(false);
        } else {
            songRef.current.play();
            setIsPlaying(true);
        }
    }

    return (
        <div
            onClick={handleDefaultSongPlayAndPause}
            className="bg-white rounded-full h-12 w-12 flex items-center justify-center changeScaleOnHoverDefaultStyleForSmallerElements cursor-pointer"
        >
            {isPlaying ? (
                // Visualizador animado (CSS)
                <div className="flex items-end gap-[2px] h-6">
                    <span className="w-[3px] bg-black animate-visualizer1"></span>
                    <span className="w-[3px] bg-black animate-visualizer2"></span>
                    <span className="w-[3px] bg-black animate-visualizer3"></span>
                    <span className="w-[3px] bg-black animate-visualizer4"></span>
                </div>
            ) : (
                <IconMusic size={32} color="black" />
            )}
        </div>
    );
}
