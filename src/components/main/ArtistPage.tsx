import { useEffect, useState } from "react";
import ArtistCard from "../cards/ArtistCard";
import { getSomethingFromFirebaseByDocumentId } from "@/services/FirebaseService";
import User from "@/model/User";
import { useCurrentUser } from "@/context/UserContext";
import ArtistSongs from "./ArtistSongs";
import ArtistPlaylists from "./ArtistPlaylists";
import { useLoading } from "@/context/LoadingContext";

interface ArtistPageProps {
    artistUid: string;
}

export default function ArtistPage(props: ArtistPageProps) {

    const [artistInfo, setArtistInfo] = useState<User | null>(null);
    const { setIsLoading, setLoadingMessage } = useLoading();
    const loggedUser = useCurrentUser();

    useEffect(() => {
        fetchArtistInfo();
    }, [props.artistUid]);

    const fetchArtistInfo = async () => {
        try {
            setLoadingMessage("Carregando...");
            setIsLoading(true);

            const artistInfoFromFirebase = await getSomethingFromFirebaseByDocumentId("users", props.artistUid) as User;
            setArtistInfo(artistInfoFromFirebase);
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    if (!artistInfo || !loggedUser) {
        return;
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