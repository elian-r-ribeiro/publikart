import MiniMusicCard from "@/components/others/MiniMusicCard";
import { songsList } from "@/data/Constants";

export default function Songs() {
    return (
        <div>
            <div className="grid grid-cols-7 gap-4">
                {songsList.map(song => (
                    <div key={song.id} className="bg-zinc-700/40 rounded-lg p-4 backdrop-blur changeScaleOnHoverDefaultStyle">
                        <MiniMusicCard song={song} />
                    </div>
                ))}
            </div>
        </div>
    );
}