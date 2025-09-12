import Playlist from "@/model/Playlist";
import User from "@/model/User";
import { getAllArtistNonPrivatePlaylists } from "@/services/PlaylistsService";
import { useEffect, useState } from "react";
import MiniPlaylistCard from "../cards/MiniPlaylistCard";

interface ArtistPlaylistsProps {
    artist: User;
}
export default function ArtistPlaylists(props: ArtistPlaylistsProps) {

    const [artistPlaylists, setArtistPlaylists] = useState<Playlist[] | []>([]);

    useEffect(() => {
        fetchArtistPlaylists();
    }, [props.artist]);

    const fetchArtistPlaylists = async () => {
        try {
            const userPlaylistsFromFirebase = await getAllArtistNonPrivatePlaylists(props.artist.uid);
            setArtistPlaylists(userPlaylistsFromFirebase);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex gap-3 max-w-82 md:max-w-128 lg:max-w-256 overflow-x-auto pb-3">
            {artistPlaylists.map(playlist => (
                <div key={playlist.id} className="shrink-0">
                    <MiniPlaylistCard playlist={playlist} />
                </div>
            ))}
        </div>
    );
}