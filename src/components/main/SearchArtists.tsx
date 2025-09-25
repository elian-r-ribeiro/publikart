import User from "@/model/User";
import MiniArtistCard from "../cards/MiniArtistCard";

interface SearchArtistsProps {
    artists: User[]
}

export default function SearchArtists(props: SearchArtistsProps) {
    return (
        <div>
            <div className="defaultScrollableListOfItemsStyle">
                {props.artists.map(artist => (
                    <div key={artist.uid} className="shrink-0">
                        <MiniArtistCard artist={artist} />
                    </div>
                ))}
            </div>
        </div>
    );
}