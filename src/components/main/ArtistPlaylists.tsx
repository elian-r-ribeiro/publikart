import Playlist from "@/model/Playlist";
import User from "@/model/User";
import { getAllArtistNonPrivatePlaylists } from "@/services/PlaylistsService";
import { useEffect, useState } from "react";
import MiniPlaylistCard from "../cards/MiniPlaylistCard";
import { getArrayOfDocumentsByDocIdsFromFirebase } from "@/services/FirebaseService";
import { useLoading } from "@/context/LoadingContext";

interface ArtistPlaylistsProps {
    artist: User;
    isInProfilePage?: boolean;
}
export default function ArtistPlaylists(props: ArtistPlaylistsProps) {

    const [artistPlaylists, setArtistPlaylists] = useState<Playlist[] | []>([]);
    const { setIsLoading, setLoadingMessage } = useLoading();

    useEffect(() => {
        fetchArtistPlaylists();
    }, [props.artist]);

    const fetchArtistPlaylists = async () => {
        let userPlaylistsFromFirebase: Playlist[] | [] = [];

        setLoadingMessage("Carregando...");
        setIsLoading(true);

        try {
            if (!props.isInProfilePage) {
                userPlaylistsFromFirebase = await getAllArtistNonPrivatePlaylists(props.artist.uid);
            } else {
                userPlaylistsFromFirebase = await getArrayOfDocumentsByDocIdsFromFirebase(props.artist.userPlaylists, "playlists") as Playlist[];
            }

            setArtistPlaylists(userPlaylistsFromFirebase);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="defaultScrollableListOfItemsStyle">
            {artistPlaylists.map(playlist => (
                <div key={playlist.id} className="shrink-0">
                    <MiniPlaylistCard isPlaylistInProfile={props.isInProfilePage} playlist={playlist} />
                </div>
            ))}
        </div>
    );
}