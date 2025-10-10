'use client'

import { useRouter } from "next/navigation";

export default function ArtistProfileButtons() {

    const router = useRouter();

    function goToUploadSongPage() {
        router.push("/uploadOrEditSong/new");
    }

    function goToCreatePlaylistPage() {
        router.push("/createOrEditPlaylist/new");
    }

    return (
        <div>
            <div className="flex flex-col gap-2">
                <button type="button" onClick={goToUploadSongPage} className="buttonDefaultStyle changeScaleOnHoverDefaultStyle">Enviar Música</button>
                <button type="button" onClick={goToCreatePlaylistPage} className="buttonDefaultStyle changeScaleOnHoverDefaultStyle">Criar Playlist</button>
            </div>
        </div>
    );
}