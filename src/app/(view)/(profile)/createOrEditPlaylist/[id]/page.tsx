'use client'

import PlaylistForm from "@/components/forms/PlaylistForm";
import { useParams } from "next/navigation";

export default function CreateOrEditPlaylist() {

    const params = useParams();
    const id = String(params.id);

    return (
        <div className="flex items-center justify-center h-screen w-screen gap-5">
            <PlaylistForm playlistId={id} />
        </div>
    );
}