import MiniArtistCard from "@/components/cards/MiniArtistCard";
import { artistsList } from "@/data/Constants";

export default function Artists() {
    return (
        <div className="flex justify-center">
            <div className="grid gridOfCardsResponsivityDefaultStyle gap-4">
                {artistsList.map(artist => (
                    <MiniArtistCard key={artist.uid} artist={artist} />
                ))}
            </div>
        </div>
    );
}