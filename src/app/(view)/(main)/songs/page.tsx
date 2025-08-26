'use client'

import MiniMusicCard from "@/components/cards/MiniMusicCard";
import Song from "@/model/Song";
import { getAllSongs } from "@/services/FirebaseService";
import { useState, useEffect } from "react";

export default function Songs() {
    const [allSongsFromFirebase, setAllSongsFromFirebase] = useState<Song[] | null>(null);

    useEffect(() => {
        const fetchSongs = async () => {
            const songs = await getAllSongs();
            setAllSongsFromFirebase(songs);
        };

        fetchSongs();
    }, []);

    if (!allSongsFromFirebase) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="flex justify-center">
            <div className="grid gridOfCardsResponsivityDefaultStyle gap-4">
                {allSongsFromFirebase.map((song, index) => (
                    <MiniMusicCard key={index} song={song} />
                ))}
            </div>
        </div>
    );
}
