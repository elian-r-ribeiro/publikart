import Playlist from "@/model/Playlist";
import MiniPlaylistCard from "../cards/MiniPlaylistCard";

interface SearchPlaylistsProps {
    playlists: Playlist[]
}

export default function SearchPlaylists(props: SearchPlaylistsProps) {
    return (
        <div>
            <div className="defaultScrollableListOfItemsStyle">
                {props.playlists.map(playlist => (
                    <div key={playlist.id} className="shrink-0">
                        <MiniPlaylistCard playlist={playlist} isPlaylistInProfile={false} />
                    </div>
                ))}
            </div>
        </div>
    );
}