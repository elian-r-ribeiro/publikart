'use client'

import Song from "@/model/Song";
import User from "@/model/User";
import Playlist from "@/model/Playlist"; // <- certifique-se de ter o modelo Playlist
import { saveSongToPlaylist } from "@/services/FirebaseService";
import { getLoggedUserPlaylists } from "@/services/FirebaseService"; // <- importa a função que você mostrou
import { IconPlayerPlay, IconPlus } from "@tabler/icons-react";
import { useRef, useState, useEffect } from "react";

interface MiniMusicCardProps {
    song: Song;
    loggedUser: User;
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

        await saveSongToPlaylist(props.song.id, playlistId);
        setShowSelect(false);
    }

    async function handlePlusClick() {
        setShowSelect((prev) => !prev);

        if (!showSelect) {
            const userPlaylists = await getLoggedUserPlaylists(props.loggedUser.uid);
            setPlaylists(userPlaylists);
        }
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
        <div className="defaultCardsSize bg-zinc-700/40 rounded-lg p-4 backdrop-blur changeScaleOnHoverDefaultStyle">
            <img src={props.song.imgUrl} alt="Song image" className="w-full h-32 object-cover rounded-md mb-2" />
            <div className="text-center">
                <h2 className="text-lg font-semibold truncate overflow-hidden whitespace-nowrap">{props.song.title}</h2>
            </div>
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
                </div>

                {showSelect && (
                    <select
                        onChange={handleSongSaving}
                        className="bg-zinc-800 text-white rounded p-1 w-49"
                    >
                        <option value="">Selecione uma playlist...</option>
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
