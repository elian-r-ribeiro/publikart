'use client'

import Song from "@/model/Song";
import Playlist from "@/model/Playlist";
import { IconMinus, IconPlayerPlay, IconPlus, IconTrash } from "@tabler/icons-react";
import { useRef, useState, useEffect } from "react";
import { addSongsToLoggedUserSavedSongs, deleteSongFromFirebase } from "@/services/SongsService";
import { removeSongFromPlaylist, saveSongToPlaylist } from "@/services/PlaylistsService";
import { getDocumentsThatUserUidIsOwnerFromFirebase } from "@/services/FirebaseService";
import { useCurrentUser } from "@/context/UserContext";

interface MiniMusicCardProps {
    song: Song;
    isSongInProfile?: boolean;
    isSongInPlaylist?: boolean;
    isLoggedUserPlaylistOwner?: boolean;
    playlistId?: string;
    onSongRemoved?: (songId: string) => void;
};

export default function MiniMusicCard(props: MiniMusicCardProps) {

    const loggedUser = useCurrentUser();

    if (!loggedUser) {
        return <p>Carregando...</p>;
    }

    const selectRef = useRef<HTMLDivElement | null>(null);
    const songRef = useRef<HTMLAudioElement | null>(null);
    const [showSelect, setShowSelect] = useState(false);
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const isUserSongOwner = props.song.artistUid === loggedUser.uid;

    function handleSongPlayAndPause() {
        songRef.current = new Audio(props.song.songUrl);
        songRef.current.play();
    }

    async function handleSongSaving(e: React.ChangeEvent<HTMLSelectElement>) {
        const playlistId = e.target.value;

        if (!playlistId) return;
        if (playlistId === "savedSongs") {
            await addSongsToLoggedUserSavedSongs(loggedUser!.uid, props.song.id);
            setShowSelect(false);
        } else {
            await saveSongToPlaylist(props.song.id, playlistId);
            setShowSelect(false);
        }
    }

    async function handleTrashClick() {
        await deleteSongFromFirebase(props.song.id, loggedUser!.uid);
    }

    async function handlePlusClick() {
        setShowSelect((prev) => !prev);

        if (!showSelect) {
            const userPlaylists = await getDocumentsThatUserUidIsOwnerFromFirebase(loggedUser!.uid, "playlists") as Playlist[];
            setPlaylists(userPlaylists);
        }
    }

    async function handleMinusClick() {
        await removeSongFromPlaylist(props.song.id, props.playlistId!);
        props.onSongRemoved!(props.song.id);
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setShowSelect(false);
            }
        }

        if (showSelect) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showSelect]);

    return (
        <div className="centerItems defaultCardsSize bg-zinc-700/40 rounded-lg p-4 backdrop-blur changeScaleOnHoverDefaultStyle">
            <img src={props.song.imgUrl} alt="Song image" className="w-32 h-32 object-cover rounded-md mb-2" />
            <h2 className="w-full text-center text-lg font-semibold truncate overflow-hidden whitespace-nowrap">{props.song.title}</h2>
            <div className="flex flex-col items-center gap-2" ref={selectRef}>
                <div className="flex justify-center gap-2">
                    <IconPlayerPlay
                        onClick={handleSongPlayAndPause}
                        className="cursor-pointer changeScaleOnHoverDefaultStyleForSmallerElements"
                    />
                    <IconPlus
                        onClick={handlePlusClick}
                        className="cursor-pointer changeScaleOnHoverDefaultStyleForSmallerElements"
                    />
                    {props.isSongInPlaylist && props.isLoggedUserPlaylistOwner &&
                        <IconMinus
                            onClick={handleMinusClick}
                            className="cursor-pointer changeScaleOnHoverDefaultStyleForSmallerElements"
                        />
                    }
                    {props.isSongInProfile && isUserSongOwner &&
                        <IconTrash
                            onClick={handleTrashClick}
                            className="cursor-pointer changeScaleOnHoverDefaultStyleForSmallerElements"
                        />
                    }
                </div>

                {showSelect && (
                    <select
                        onChange={handleSongSaving}
                        className="bg-zinc-800 text-white rounded p-1 w-49"
                    >
                        <option value="">Selecione uma playlist...</option>
                        <option value="savedSongs">Músicas Salvas</option>
                        {playlists.map((playlist) => (
                            <option key={playlist.id} value={playlist.id}>
                                {playlist.playlistTitle}
                            </option>
                        ))}
                    </select>
                )}
            </div>
        </div>
    );
}
