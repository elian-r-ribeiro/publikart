import Playlist from "@/model/Playlist";
import { IconDots } from "@tabler/icons-react";
import Link from "next/link";

interface PlaylistCardProps {
    playlist: Playlist;
};

export default function MiniPlaylistCard(props: PlaylistCardProps) {
    return (
        <div className="defaultCardsSize bg-zinc-700/40 rounded-lg p-4 backdrop-blur changeScaleOnHoverDefaultStyle">
            <img src={props.playlist.imgUrl} alt="Playlist image" className="w-full h-32 object-cover rounded-lg mb-2" />
            <div className="text-center">
                <h2 className="text-lg font-semibold truncate overflow-hidden whitespace-nowrap">{props.playlist.playlistTitle}</h2>
            </div>
            <Link href={`/publicPlaylists/${props.playlist.id}`} className="flex justify-center">
                <IconDots className="cursor-pointer changeScaleOnHoverDefaultStyleForSmallerElements" />
            </Link>
        </div>
    );
}