'use client'

import PlaylistPage from "@/components/main/PlaylistPage";
import { useParams } from "next/navigation";

export default function PlaylistDetails() {
    const params = useParams();
    const id = String(params.id);

    return (
        <div className="centerItems gap-3">
            <PlaylistPage playlistId={id} />
        </div>
    );
}