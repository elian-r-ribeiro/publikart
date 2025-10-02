'use client'

import MiniPlaylistCard from "@/components/cards/MiniPlaylistCard";
import Loading from "@/components/others/Loading";
import { useCurrentUser } from "@/context/UserContext";
import Playlist from "@/model/Playlist";
import { getDocumentsThatUserUidIsOwnerFromFirebase } from "@/services/FirebaseService";
import { useEffect, useState } from "react";

export default function MyPlaylists() {

    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const loggedUserData = useCurrentUser();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchPlaylists();
    }, [loggedUserData]);

    const fetchPlaylists = async () => {
        if (!loggedUserData) return;
        const loggedUserPlaylists = await getDocumentsThatUserUidIsOwnerFromFirebase(loggedUserData.uid, "playlists") as Playlist[];
        setPlaylists(loggedUserPlaylists);
        setIsLoading(false);
    };

    if (isLoading) {
        return <Loading isSupposedToBeStatic={true} text="Carregando..." />
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