'use client'

import ArtistPage from "@/components/main/ArtistPage";
import { useParams } from "next/navigation";

export default function Artist() {

    const params = useParams();
    const artistUid = String(params.artistUid);

    return (
        <div>
            <ArtistPage artistUid={artistUid} />
        </div>
    );
}