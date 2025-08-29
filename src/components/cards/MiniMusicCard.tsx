'use client'

import Song from "@/model/Song";
import User from "@/model/User";
import { saveSongToFavorites } from "@/services/FirebaseService";
import { IconPlayerPlay, IconPlus } from "@tabler/icons-react";
import { useRef } from "react";

interface MiniMusicCardProps {
    song: Song;
    loggedUser: User;
};

export default function MiniMusicCard(props: MiniMusicCardProps) {

    const songRef = useRef<HTMLAudioElement | null>(null);

    function handleSongPlayAndPause() {

        songRef.current = new Audio(props.song.songUrl);

        songRef.current.play();
    }

    async function handleSongSaving() {
        await saveSongToFavorites(props.song.id, props.loggedUser.uid);
    }

    return (
        <div className="defaultCardsSize bg-zinc-700/40 rounded-lg p-4 backdrop-blur changeScaleOnHoverDefaultStyle">
            <img src={props.song.imgUrl} alt="Song image" className="w-full h-32 object-cover rounded-md mb-2" />
            <div className="text-center">
                <h2 className="text-lg font-semibold truncate overflow-hidden whitespace-nowrap">{props.song.title}</h2>
                {/* <p className="text-zinc-400 truncate overflow-hidden whitespace-nowrap">{props.song.artist}</p> */}
            </div>
            <div className="flex justify-center">
                <IconPlayerPlay onClick={handleSongPlayAndPause} className="cursor-pointer changeScaleOnHoverDefaultStyleForSmallerElements"></IconPlayerPlay>
                <IconPlus onClick={handleSongSaving} className="cursor-pointer changeScaleOnHoverDefaultStyleForSmallerElements"></IconPlus>
            </div>
        </div>
    );
}