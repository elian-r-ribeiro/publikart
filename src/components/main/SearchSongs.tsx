import MiniMusicCard from "../cards/MiniMusicCard";
import MiniPlaylistCard from "../cards/MiniPlaylistCard";
import Song from "@/model/Song";

interface SearchSongsProps {
    songs: Song[]
}

export default function SearchSongs(props: SearchSongsProps) {
    return (
        <div>
            <div className="flex gap-3 max-w-112 md:max-w-128 lg:max-w-256 overflow-x-auto pb-3">
                {props.songs.map(song => (
                    <div key={song.id} className="shrink-0">
                        <MiniMusicCard song={song} isSongInPlaylist={false} isSongInProfile={false} />
                    </div>
                ))}
            </div>
        </div>
    );
}