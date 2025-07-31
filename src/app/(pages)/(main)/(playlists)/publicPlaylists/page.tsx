import MiniPlaylistCard from "@/components/others/cards/MiniPlaylistCard";
import { playlistsList } from "@/data/Constants";

export default function PublicPlaylists() {
    return (
        <div className="flex justify-center">
            <div className="grid gridOfCardsResponsivityDefaultStyle gap-4">
                {playlistsList.map(playlist => (
                    <MiniPlaylistCard key={playlist.id} playlist={playlist} />
                ))}
            </div>
        </div>
    );
}