'use client'

import MiniPlaylistCard from "@/components/cards/MiniPlaylistCard";
import { useCurrentUser } from "@/context/UserContext";
import Playlist from "@/model/Playlist";
import { getLoggedUserPlaylists } from "@/services/PlaylistsService";
import { useEffect, useState } from "react";

export default function MyPlaylists() {

    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const loggedUserData = useCurrentUser();

    if (!loggedUserData) {
        return <div>Carregando...</div>;
    }

    useEffect(() => {
        fetchPlaylists();
    }, [loggedUserData.uid]);

    const fetchPlaylists = async () => {
        const loggedUserPlaylists = await getLoggedUserPlaylists(loggedUserData.uid);
        setPlaylists(loggedUserPlaylists);
    };

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