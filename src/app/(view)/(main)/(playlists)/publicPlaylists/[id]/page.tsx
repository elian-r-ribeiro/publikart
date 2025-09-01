'use client'

import PlaylistPage from "@/components/main/PlaylistPage";
import { playlistsList } from "@/data/Constants";
import { useParams } from "next/navigation";

export default function PlaylistDetails() {
    const params = useParams();
    const id = Number(params?.id);
    const playlist = playlistsList.find((playlist) => playlist.id === id);

    return (
        <div className="centerItems gap-3">
            <PlaylistPage playlist={playlist} />
        </div>
    );
}