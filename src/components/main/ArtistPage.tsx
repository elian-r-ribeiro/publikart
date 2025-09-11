import { useEffect, useState } from "react";
import ArtistCard from "../cards/ArtistCard";

import { getArrayOfDocumentsByDocIdsFromFirebase, getSomethingFromFirebaseByDocumentId } from "@/services/FirebaseService";
import User from "@/model/User";
import MiniMusicCard from "../cards/MiniMusicCard";
import Song from "@/model/Song";
import { useCurrentUser } from "@/context/UserContext";
import Playlist from "@/model/Playlist";
import MiniPlaylistCard from "../cards/MiniPlaylistCard";

interface ArtistPageProps {
    artistUid: string;
}

export default function ArtistPage(props: ArtistPageProps) {

    const [artistInfo, setArtistInfo]= useState<User | null>(null);
    const [artistSongs, setArtistSongs] = useState<Song[] | []>([]);
    const [artistPlaylists, setArtistPlaylists] = useState<Playlist[] | []>([]);
    const loggedUser = useCurrentUser();

    useEffect(() => {
        fetchArtistInfo();
    }, [props.artistUid]);

    const fetchArtistInfo = async () => {
        try{
            const artistInfoFromFirebase = await getSomethingFromFirebaseByDocumentId("users", props.artistUid) as User;
            setArtistInfo(artistInfoFromFirebase);
            await fetchArtistSongs(artistInfoFromFirebase);
            await fetchArtistPlaylists(artistInfoFromFirebase);
        } catch(error) {
            console.log(error)
        }
    }

    const fetchArtistSongs = async(user: User) => {
        try {
            const userSongsFromFirebase = await getArrayOfDocumentsByDocIdsFromFirebase(user.userSongs, "songs") as Song[];
            setArtistSongs(userSongsFromFirebase);
        } catch(error) {
            console.log(error);
        }
    }

    const fetchArtistPlaylists = async(user: User) => {
        try {
            const userPlaylistsFromFirebase = await getArrayOfDocumentsByDocIdsFromFirebase(user.userPlaylists, "playlists") as Playlist[];
            setArtistPlaylists(userPlaylistsFromFirebase);
        } catch(error) {
            console.log(error);
        }
    }

    if(!artistInfo || !loggedUser) {
        return <p>Carregando...</p>
    }

    return (
        <div className="centerItems gap-3">
            <ArtistCard artist={artistInfo}></ArtistCard>
            <div className="flex gap-3 max-w-82 md:max-w-128 lg:max-w-256 overflow-x-auto pb-3">
            {artistSongs.map(song => (
                <div key={song.id} className="shrink-0">
                <MiniMusicCard song={song} loggedUser={loggedUser} />
                </div>
            ))}
            </div>

            <div className="flex gap-3 max-w-82 md:max-w-128 lg:max-w-256 overflow-x-auto pb-3">
            {artistPlaylists.map(playlist => (
                <div key={playlist.id} className="shrink-0">
                <MiniPlaylistCard playlist={playlist}/>
                </div>
            ))}
            </div>
        </div>
    );
}