'use client'

import { useRouter } from "next/navigation";

export default function ArtistProfileButtons() {

    const router = useRouter();

    function goToSendSongPage() {
        router.push("/sendSong");
    }

    return (
        <div>
            <div className="flex flex-col gap-2">
                <button type="button" onClick={goToSendSongPage} className="bg-white w-100 h-10 rounded-2xl cursor-pointer changeScaleOnHoverDefaultStyle text-black">Enviar Música</button>
                <button type="button" className="bg-white w-100 h-10 rounded-2xl cursor-pointer changeScaleOnHoverDefaultStyle text-black">Criar Playlist</button>
                <button type="button" className="bg-white w-100 h-10 rounded-2xl cursor-pointer changeScaleOnHoverDefaultStyle text-black">Criar Álbum</button>
            </div>
        </div>
    );
}