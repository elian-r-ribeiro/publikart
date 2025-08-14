import MiniMusicCard from "../../cards/MiniMusicCard";
import { IconPlayerPlay, IconPlus } from "@tabler/icons-react";
import Playlist from "@/model/Playlist";

interface PlaylistPageProps {
    playlist?: Playlist;
}

export default function PlaylistPage(props: PlaylistPageProps) {
    return (
        <div className="centerItems gap-6">
            <div className="centerItemsRow gap-6 bg-zinc-700/40 backdrop-blur rounded-lg p-4 max-w-3xl min-w-2xs w-full">
                <img className="w-32 h-32 rounded-lg" src={props.playlist?.image} alt={props.playlist?.name} />
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl">{props.playlist?.name}</h1>
                    <p className="text-lg">{props.playlist?.description}</p>
                    <div className="flex gap-1">
                        <img className="w-5 h-5 rounded-full" src={props.playlist?.artist.profilePicture} alt="Artist image" />
                        <span className="text-sm">{props.playlist?.artist.name}</span>
                    </div>
                    <div className="flex">
                        <IconPlus className="changeScaleOnHoverDefaultStyleForSmallerElements" />
                        <IconPlayerPlay className="changeScaleOnHoverDefaultStyleForSmallerElements" />
                    </div>
                </div>
            </div>
            <div className="grid gridOfCardsResponsivityDefaultStyle gap-4">
                {props.playlist?.songs.map(song => (
                    <MiniMusicCard key={song.id} song={song} />
                ))}
            </div>
        </div>
    );
}