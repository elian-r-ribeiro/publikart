import { useCurrentUser } from "@/context/UserContext";
import MiniMusicCard from "../cards/MiniMusicCard";
import { useEffect, useState } from "react";
import Song from "@/model/Song";
import User from "@/model/User";
import { getArrayOfDocumentsByDocIdsFromFirebase } from "@/services/FirebaseService";

interface ArtistSongsProps {
    artist: User;
    isInProfilePage?: boolean;
}

export default function ArtistSongs(props: ArtistSongsProps) {

    const [artistSongs, setArtistSongs] = useState<Song[] | []>([]);

    useEffect(() => {
        fetchArtistSongs();
    }, [props.artist]);

    const fetchArtistSongs = async () => {
        try {
            const userSongsFromFirebase = await getArrayOfDocumentsByDocIdsFromFirebase(props.artist.userSongs, "songs") as Song[];
            setArtistSongs(userSongsFromFirebase);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex gap-3 max-w-112 md:max-w-128 lg:max-w-256 overflow-x-auto pb-3">
            {artistSongs.map(song => (
                <div key={song.id} className="shrink-0">
                    <MiniMusicCard isSongInProfile={props.isInProfilePage} song={song} />
                </div>
            ))}
        </div>
    );
}