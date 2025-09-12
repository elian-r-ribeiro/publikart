import Playlist from "@/model/Playlist";
import User from "@/model/User";
import { getAllArtistNonPrivatePlaylists } from "@/services/PlaylistsService";
import { useEffect, useState } from "react";
import MiniPlaylistCard from "../cards/MiniPlaylistCard";
import { getArrayOfDocumentsByDocIdsFromFirebase } from "@/services/FirebaseService";

interface ArtistPlaylistsProps {
    artist: User;
    isInProfilePage?: boolean;
}
export default function ArtistPlaylists(props: ArtistPlaylistsProps) {

    const [artistPlaylists, setArtistPlaylists] = useState<Playlist[] | []>([]);

    useEffect(() => {
        fetchArtistPlaylists();
    }, [props.artist]);

    const fetchArtistPlaylists = async () => {
        let userPlaylistsFromFirebase: Playlist[] | [] = [];

        try {
            if (!props.isInProfilePage) {
                userPlaylistsFromFirebase = await getAllArtistNonPrivatePlaylists(props.artist.uid);
            } else {
                userPlaylistsFromFirebase = await getArrayOfDocumentsByDocIdsFromFirebase(props.artist.userPlaylists, "playlists") as Playlist[];
            }

            setArtistPlaylists(userPlaylistsFromFirebase);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex gap-3 max-w-112 md:max-w-128 lg:max-w-256 overflow-x-auto pb-3">
            {artistPlaylists.map(playlist => (
                <div key={playlist.id} className="shrink-0">
                    <MiniPlaylistCard isPlaylistInProfile={props.isInProfilePage} playlist={playlist} />
                </div>
            ))}
        </div>
    );
}