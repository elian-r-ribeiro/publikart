import MiniMusicCard from "@/components/others/MiniMusicCard";
import { songsList } from "@/data/Constants";

export default function Songs() {
    return (
        <div className="flex justify-center">
            <div className="grid gridOfCardsResponsivityDefaultStyle gap-4">
                {songsList.map(song => (
                    <MiniMusicCard key={song.id} song={song} />
                ))}
            </div>
        </div>
    );
}