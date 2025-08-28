'use client'

import MiniMusicCard from "@/components/cards/MiniMusicCard";
import { useCurrentUser } from "@/context/UserContext";
import Song from "@/model/Song";
import User from "@/model/User";
import { getLoggedUserSongsByDocIds } from "@/services/FirebaseService";
import { useState, useEffect } from "react";

export default function MySongs() {
    const [allLoggedUserSongsFromFirebase, setAllLoggedUserSongsFromFirebase] = useState<Song[] | null>(null);
    const loggedUserInfo: User | null = useCurrentUser();

    useEffect(() => {

        const fetchSongs = async () => {
            if (!loggedUserInfo) return;
            const songs = await getLoggedUserSongsByDocIds(loggedUserInfo.userSongs);
            console.log(songs);
            setAllLoggedUserSongsFromFirebase(songs);
        };

        fetchSongs();
    }, [loggedUserInfo]);

    if (!allLoggedUserSongsFromFirebase || !loggedUserInfo) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="flex justify-center">
            <div className="grid gridOfCardsResponsivityDefaultStyle gap-4">
                {allLoggedUserSongsFromFirebase.map((song, index) => (
                    <MiniMusicCard loggedUser={loggedUserInfo} key={index} song={song} />
                ))}
            </div>
        </div>
    );
}
