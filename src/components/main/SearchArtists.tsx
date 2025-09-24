import User from "@/model/User";
import MiniArtistCard from "../cards/MiniArtistCard";

interface SearchArtistsProps {
    artists: User[]
}

export default function SearchArtists(props: SearchArtistsProps) {
    return (
        <div>
            <div className="flex gap-3 max-w-112 md:max-w-128 lg:max-w-256 overflow-x-auto pb-3">
                {props.artists.map(artist => (
                    <div key={artist.uid} className="shrink-0">
                        <MiniArtistCard artist={artist} />
                    </div>
                ))}
            </div>
        </div>
    );
}