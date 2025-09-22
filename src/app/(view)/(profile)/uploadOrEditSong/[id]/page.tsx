'use client'

import SongForm from "@/components/forms/SongForm";
import { useParams } from "next/navigation";

export default function UploadOrEditSong() {

    const params = useParams();
    const songId = String(params.id);

    return (
        <div className="flex items-center justify-center h-screen w-screen gap-5">
            <SongForm songId={songId} />
        </div>
    );
}