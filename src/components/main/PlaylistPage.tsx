import { IconArrowsRandom, IconPlayerPlay, IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/context/UserContext";
import Playlist from "@/model/Playlist";
import User from "@/model/User";
import Song from "@/model/Song";
import MiniMusicCard from "../cards/MiniMusicCard";
import { getArrayOfDocumentsByDocIdsFromFirebase, getSomethingFromFirebaseByDocumentId } from "@/services/FirebaseService";
import { usePlayerContext } from "@/context/PlayerContext";

interface PlaylistPageProps {
    playlistId: string
}

export default function PlaylistPage(props: PlaylistPageProps) {

    const loggedUserInfo = useCurrentUser();
    const [playlistInfo, setPlaylistInfo] = useState<Playlist | null>(null);
    const [ownerInfo, setOwnerInfo] = useState<User | null>(null);
    const [playlistSongs, setPlaylistSongs] = useState<Song[]>([]);
    const [isRandom, setIsRandom] = useState<boolean>(false);
    const { setSongsQueue, setIndex } = usePlayerContext();

    useEffect(() => {
        fetchPlaylistInfo();
    }, [props.playlistId, loggedUserInfo]);

    const handlePlaylistPlay = () => {

        const songsQueue: Song[] = []

        playlistSongs.forEach(song => {
            songsQueue.push(song);
        });

        setSongsQueue(songsQueue);
        setIndex(0);
    }

    const fetchPlaylistInfo = async () => {
        try {
            const playlist = await getSomethingFromFirebaseByDocumentId("playlists", props.playlistId) as Playlist;
            if (!playlist) return;

            setPlaylistInfo(playlist);

            const owner = await getSomethingFromFirebaseByDocumentId("users", playlist.artistUid) as User;
            setOwnerInfo(owner);

            const songs = await getArrayOfDocumentsByDocIdsFromFirebase(playlist.songsIds ?? [], "songs") as Song[];
            setPlaylistSongs(songs ?? []);
        } catch (err) {
            console.error("Erro ao carregar playlist:", err);
        }
    }

    const handleRemoveSongFromState = (songId: string) => {
        setPlaylistSongs((prevSongs) => prevSongs.filter(song => song.id != songId));
    }

    const changeIsRandom = () => {
        if (isRandom) {
            setIsRandom(false);
        } else {
            setIsRandom(true);
        }
    }

    const isLoggedUserPlaylistOwner = loggedUserInfo?.uid === playlistInfo?.artistUid;

    if (!loggedUserInfo || !playlistInfo) {
        return <p>Loading...</p>;
    }

    return (
        <div className="centerItems gap-6">
            <div className="centerItemsRow gap-6 bg-zinc-700/40 backdrop-blur rounded-lg p-4 sm:w-64 md:w-128 lg:w-256">
                <img className="w-32 h-32 rounded-lg" src={playlistInfo?.imgUrl} alt="Playlist image" />
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl">{playlistInfo?.playlistTitle}</h1>
                    <p className="text-lg">{playlistInfo?.playlistDescription}</p>
                    <div className="flex gap-1">
                        <img className="w-5 h-5 rounded-full" src={ownerInfo?.profilePictureURL} alt="Artist image" />
                        <span className="text-sm">{ownerInfo?.userName}</span>
                    </div>
                    <div className="flex gap-3">
                        {!isLoggedUserPlaylistOwner && <IconPlus className="changeScaleOnHoverDefaultStyleForSmallerElements" />}
                        <IconPlayerPlay onClick={handlePlaylistPlay} className="changeScaleOnHoverDefaultStyleForSmallerElements cursor-pointer" />
                        {isRandom ? (
                            <span className="text-blue-600">
                                <IconArrowsRandom onClick={changeIsRandom} className="changeScaleOnHoverDefaultStyleForSmallerElements cursor-pointer" />
                            </span>
                        ) : (
                            <span>
                                <IconArrowsRandom onClick={changeIsRandom} className="changeScaleOnHoverDefaultStyleForSmallerElements cursor-pointer" />
                            </span>
                        )

                        }
                    </div>
                </div>
            </div>
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