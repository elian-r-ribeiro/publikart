import { useEffect, useState } from "react";
import ArtistCard from "../cards/ArtistCard";

import { getSomethingFromFirebaseByDocumentId } from "@/services/FirebaseService";
import User from "@/model/User";
import { useCurrentUser } from "@/context/UserContext";
import MiniPlaylistCard from "../cards/MiniPlaylistCard";
import ArtistSongs from "./ArtistSongs";
import ArtistPlaylists from "./ArtistPlaylists";

interface ArtistPageProps {
    artistUid: string;
}

export default function ArtistPage(props: ArtistPageProps) {

    const [artistInfo, setArtistInfo] = useState<User | null>(null);
    const loggedUser = useCurrentUser();

    useEffect(() => {
        fetchArtistInfo();
    }, [props.artistUid]);

    const fetchArtistInfo = async () => {
        try {
            const artistInfoFromFirebase = await getSomethingFromFirebaseByDocumentId("users", props.artistUid) as User;
            setArtistInfo(artistInfoFromFirebase);
        } catch (error) {
            console.log(error)
        }
    }

    if (!artistInfo || !loggedUser) {
        return <p>Carregando...</p>
    }

    return (
        <div className="centerItems gap-6">
            <ArtistCard artist={artistInfo}></ArtistCard>
            <h1 className="text-2xl">Músicas</h1>
            <ArtistSongs artist={artistInfo} />
            <h1 className="text-2xl">Playlists</h1>
            <ArtistPlaylists artist={artistInfo} />
        </div>
    );
}