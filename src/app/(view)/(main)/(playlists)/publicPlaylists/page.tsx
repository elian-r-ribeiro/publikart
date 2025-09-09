'use client'

import MiniPlaylistCard from "@/components/cards/MiniPlaylistCard";
import Playlist from "@/model/Playlist";
import { getAllNonPrivatePlaylists } from "@/services/PlaylistsService";
import { useEffect, useState } from "react";

export default function PublicPlaylists() {

    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    useEffect(() => {
        const fetchPlaylists = async () => {
            const nonPrivatePlaylists = await getAllNonPrivatePlaylists();
            setPlaylists(nonPrivatePlaylists);
        };

        fetchPlaylists();
    }, []);

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