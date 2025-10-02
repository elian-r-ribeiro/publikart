'use client'

import MiniPlaylistCard from "@/components/cards/MiniPlaylistCard";
import Loading from "@/components/others/Loading";
import { useLoading } from "@/context/LoadingContext";
import Playlist from "@/model/Playlist";
import { getAllNonPrivatePlaylists } from "@/services/PlaylistsService";
import { useEffect, useState } from "react";

export default function PublicPlaylists() {

    const [playlists, setPlaylists] = useState<Playlist[] | null>(null);
    const { setIsLoading, setLoadingMessage } = useLoading();

    useEffect(() => {
        fetchPlaylists();
    }, []);

    const fetchPlaylists = async () => {
        setLoadingMessage("Carregando...");
        setIsLoading(true);

        const nonPrivatePlaylists = await getAllNonPrivatePlaylists();
        setPlaylists(nonPrivatePlaylists);

        setIsLoading(false);
    };

    return (
        <div className="flex justify-center">
            <div className="grid gridOfCardsResponsivityDefaultStyle gap-4">
                {playlists?.map(playlist => (
                    <MiniPlaylistCard key={playlist.id} playlist={playlist} />
                ))}
            </div>
        </div>
    );
}