'use client'

import MiniMusicCard from "@/components/cards/MiniMusicCard";
import AlbumPage from "@/components/others/main/AlbumPage";
import { albumsList } from "@/data/Constants";
import { useParams } from "next/navigation";

export default function AlbumDetails() {
    const params = useParams();
    const id = Number(params?.id);
    const album = albumsList.find((album) => album.id === id);

    return (
        <div className="centerItems gap-3">
            <AlbumPage album={album} />
        </div>
    );
}