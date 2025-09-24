import Playlist from "@/model/Playlist";
import MiniPlaylistCard from "../cards/MiniPlaylistCard";

interface SearchPlaylistsProps {
    playlists: Playlist[]
}

export default function SearchPlaylists(props: SearchPlaylistsProps) {
    return (
        <div>
            <div className="flex gap-3 max-w-112 md:max-w-128 lg:max-w-256 overflow-x-auto pb-3">
                {props.playlists.map(playlist => (
                    <div key={playlist.id} className="shrink-0">
                        <MiniPlaylistCard playlist={playlist} isPlaylistInProfile={false} />
                    </div>
                ))}
            </div>
        </div>
    );
}