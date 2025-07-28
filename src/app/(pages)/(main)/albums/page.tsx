import MiniAlbumCard from "@/components/others/MiniAlbumCard";
import { albumsList } from "@/data/Constants";

export default function Albums() {
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