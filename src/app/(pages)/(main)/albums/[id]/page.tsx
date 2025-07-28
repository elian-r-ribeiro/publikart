'use client'

import { useParams } from "next/navigation";

export default function AlbumDetails() {
    const params = useParams();
    const id = params?.id;

    return (
        <div>
            <h1>Detalhes do Álbum {id}</h1>
        </div>
    );
}