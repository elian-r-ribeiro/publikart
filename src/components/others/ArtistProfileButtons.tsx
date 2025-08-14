export default function ArtistProfileButtons() {
    return (
        <div>
            <div className="flex flex-col gap-2">
                <button className="bg-white w-100 h-10 rounded-2xl cursor-pointer changeScaleOnHoverDefaultStyle text-black">Enviar Música</button>
                <button className="bg-white w-100 h-10 rounded-2xl cursor-pointer changeScaleOnHoverDefaultStyle text-black">Criar Playlist</button>
                <button className="bg-white w-100 h-10 rounded-2xl cursor-pointer changeScaleOnHoverDefaultStyle text-black">Criar Álbum</button>
            </div>
        </div>
    );
}