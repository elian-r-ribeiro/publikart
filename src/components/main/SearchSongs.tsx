import MiniMusicCard from "../cards/MiniMusicCard";
import Song from "@/model/Song";

interface SearchSongsProps {
    songs: Song[]
}

export default function SearchSongs(props: SearchSongsProps) {
    return (
        <div>
            <div className="defaultScrollableListOfItemsStyle">
                {props.songs.map(song => (
                    <div key={song.id} className="shrink-0">
                        <MiniMusicCard song={song} isSongInPlaylist={false} isSongInProfile={false} />
                    </div>
                ))}
            </div>
        </div>
    );
}