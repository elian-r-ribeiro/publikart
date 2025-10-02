'use client'

import MiniMusicCard from "@/components/cards/MiniMusicCard";
import Loading from "@/components/others/Loading";
import { useCurrentUser } from "@/context/UserContext";
import Song from "@/model/Song";
import User from "@/model/User";
import { getArrayOfDocumentsByDocIdsFromFirebase } from "@/services/FirebaseService";
import { useState, useEffect } from "react";

export default function SavedSongs() {
    const [loggedUserSongs, setLoggedUserSongs] = useState<Song[] | null>(null);
    const loggedUserInfo: User | null = useCurrentUser();


    useEffect(() => {
        fetchSongs();
    }, [loggedUserInfo]);

    const fetchSongs = async () => {
        if (!loggedUserInfo) return;
        const songs = await getArrayOfDocumentsByDocIdsFromFirebase(loggedUserInfo.savedSongs, "songs") as Song[];
        setLoggedUserSongs(songs);
    };

    if (!loggedUserSongs || !loggedUserInfo) {
        return <Loading isSupposedToBeStatic={true} text="Carregando..." />;
    }

    return (
        <div className="flex justify-center">
            <div className="grid gridOfCardsResponsivityDefaultStyle gap-4">
                {loggedUserSongs.map((song, index) => (
                    <MiniMusicCard key={index} song={song} />
                ))}
            </div>
        </div>
    );
}
