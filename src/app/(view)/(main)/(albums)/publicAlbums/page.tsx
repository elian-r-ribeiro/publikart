import MiniAlbumCard from "@/components/cards/MiniAlbumCard";
import { albumsList } from "@/data/Constants";

export default function PublicAlbums() {
    return (
        <div className="flex justify-center">
            <div className="grid gridOfCardsResponsivityDefaultStyle gap-4">
                {albumsList.map(album => (
                    <MiniAlbumCard key={album.id} album={album} />
                ))}
            </div>
        </div>
    );
}