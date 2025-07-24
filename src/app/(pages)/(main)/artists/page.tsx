import MiniArtistCard from "@/components/others/MiniArtistCard";
import { artistsList } from "@/data/Constants";

export default function Artists() {
    return (
        <div>
            <div className="grid grid-cols-9 gap-4">
                {artistsList.map(artist => (
                    <div key={artist.id} className="bg-zinc-700/40 rounded-lg p-4 backdrop-blur changeScaleOnHoverDefaultStyle">
                        <MiniArtistCard artist={artist} />
                    </div>
                ))}
            </div>
        </div>
    );
}