'use client'

import Song from "@/model/Song";
import User from "@/model/User";
import Playlist from "@/model/Playlist";
import { IconMinus, IconPlayerPlay, IconPlus } from "@tabler/icons-react";
import { useRef, useState, useEffect } from "react";
import { addSongsToLoggedUserSavedSongs } from "@/services/SongsService";
import { getLoggedUserPlaylists, removeSongFromPlaylist, saveSongToPlaylist } from "@/services/PlaylistsService";

interface MiniMusicCardProps {
    song: Song;
    loggedUser: User;
    isLoggedUserPlaylistOwner?: boolean;
    playlistId?: string;
};

export default function MiniMusicCard(props: MiniMusicCardProps) {

    const selectRef = useRef<HTMLDivElement | null>(null);
    const songRef = useRef<HTMLAudioElement | null>(null);
    const [showSelect, setShowSelect] = useState(false);
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    function handleSongPlayAndPause() {
        songRef.current = new Audio(props.song.songUrl);
        songRef.current.play();
    }

    async function handleSongSaving(e: React.ChangeEvent<HTMLSelectElement>) {
        const playlistId = e.target.value;

        if (!playlistId) return;
        if (playlistId === "savedSongs") {
            await addSongsToLoggedUserSavedSongs(props.loggedUser.uid, props.song.id);
            setShowSelect(false);
            window.location.reload();
        } else {
            await saveSongToPlaylist(props.song.id, playlistId);
            setShowSelect(false);
        }
    }

    async function handlePlusClick() {
        setShowSelect((prev) => !prev);

        if (!showSelect) {
            const userPlaylists = await getLoggedUserPlaylists(props.loggedUser.uid);
            setPlaylists(userPlaylists);
        }
    }

    async function handleMinusClick() {
        await removeSongFromPlaylist(props.song.id, props.playlistId!);
        window.location.reload();
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
                    {props.isLoggedUserPlaylistOwner &&
                        <IconMinus
                            onClick={handleMinusClick}
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
