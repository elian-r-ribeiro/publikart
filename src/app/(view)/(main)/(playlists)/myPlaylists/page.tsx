'use client'

import MiniPlaylistCard from "@/components/cards/MiniPlaylistCard";
import { useCurrentUser } from "@/context/UserContext";
import Playlist from "@/model/Playlist";
import { getDocumentsThatUserUidIsOwnerFromFirebase } from "@/services/FirebaseService";
import { useEffect, useState } from "react";

export default function MyPlaylists() {

    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const loggedUserData = useCurrentUser();

    useEffect(() => {
        fetchPlaylists();
    }, [loggedUserData]);

    const fetchPlaylists = async () => {
        if(!loggedUserData) return;
        const loggedUserPlaylists = await getDocumentsThatUserUidIsOwnerFromFirebase(loggedUserData.uid, "playlists") as Playlist[];
        setPlaylists(loggedUserPlaylists);
    };

    if (!loggedUserData || !playlists) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="flex justify-center">
            <div className="grid gridOfCardsResponsivityDefaultStyle gap-4">
                {playlists.map(playlist => (
                    <MiniPlaylistCard key={playlist.id} playlist={playlist} />
                ))}
            </div>
        </div>
    );
}