import { IconArrowsRandom, IconPlayerPlay, IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/context/UserContext";
import Playlist from "@/model/Playlist";
import User from "@/model/User";
import Song from "@/model/Song";
import MiniMusicCard from "../cards/MiniMusicCard";
import { getArrayOfDocumentsByDocIdsFromFirebase, getSomethingFromFirebaseByDocumentId } from "@/services/FirebaseService";
import { usePlayerContext } from "@/context/PlayerContext";
import Loading from "../others/Loading";
import { useLoading } from "@/context/LoadingContext";
import PlaylistCard from "../cards/PlaylistCard";

interface PlaylistPageProps {
    playlistId: string | undefined
}

export default function PlaylistPage(props: PlaylistPageProps) {

    const loggedUserInfo = useCurrentUser();
    const [playlistInfo, setPlaylistInfo] = useState<Playlist | null>(null);
    const [ownerInfo, setOwnerInfo] = useState<User | null>(null);
    const [playlistSongs, setPlaylistSongs] = useState<Song[]>([]);
    const [isRandomOrderActivated, setIsRandomOrderActivated] = useState<boolean>(false);
    const { setSongsQueue, setIndex } = usePlayerContext();
    const { setIsLoading, setLoadingMessage } = useLoading();

    useEffect(() => {
        fetchPlaylistInfo();
    }, [props.playlistId, loggedUserInfo]);

    const handlePlaylistPlay = () => {

        let songsQueue: Song[] = [];
        const randomizedSongsQueue: Song[] = [];

        playlistSongs.forEach(song => {
            songsQueue.push(song);
        });

        if (isRandomOrderActivated) {
            while (songsQueue.length > 0) {
                const randomIndex = Math.floor(Math.random() * songsQueue.length);

                randomizedSongsQueue.push(songsQueue[randomIndex]);
                songsQueue.splice(randomIndex, 1);
            };

            songsQueue = randomizedSongsQueue;
        }

        setSongsQueue(songsQueue);
        setIndex(0);
    }

    const fetchPlaylistInfo = async () => {
        try {

            setLoadingMessage("Carregando...");
            setIsLoading(true);

            const playlist = await getSomethingFromFirebaseByDocumentId("playlists", props.playlistId!) as Playlist;
            if (!playlist) return;

            setPlaylistInfo(playlist);

            const owner = await getSomethingFromFirebaseByDocumentId("users", playlist.artistUid) as User;
            setOwnerInfo(owner);

            const songs = await getArrayOfDocumentsByDocIdsFromFirebase(playlist.songsIds ?? [], "songs") as Song[];
            setPlaylistSongs(songs ?? []);

            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    const handleRemoveSongFromState = (songId: string) => {
        setPlaylistSongs((prevSongs) => prevSongs.filter(song => song.id != songId));
    }

    const changeIsRandom = () => {
        if (isRandomOrderActivated) {
            setIsRandomOrderActivated(false);
        } else {
            setIsRandomOrderActivated(true);
        }
    }

    const isLoggedUserPlaylistOwner = loggedUserInfo?.uid === playlistInfo?.artistUid;

    return (
        <div className="centerItems gap-6">
            <PlaylistCard
                changeIsRandom={changeIsRandom}
                handlePlaylistPlay={handlePlaylistPlay}
                isLoggedUserPlaylistOwner={isLoggedUserPlaylistOwner}
                isRandomOrderActivated={isRandomOrderActivated}
                ownerInfo={ownerInfo!}
                playlistInfo={playlistInfo!}
            />
            <div className="grid gridOfCardsResponsivityDefaultStyle gap-4">
                {playlistSongs?.map(song => (
                    <MiniMusicCard
                        key={song.id}
                        song={song}
                        isSongInPlaylist={true}
                        isLoggedUserPlaylistOwner={isLoggedUserPlaylistOwner}
                        playlistId={props.playlistId}
                        onSongRemoved={handleRemoveSongFromState}
                    />
                ))}
            </div>
        </div>
    );
}