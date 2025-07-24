import Song from "@/data/model/Song";
import { IconPlayerPlay, IconPlus } from "@tabler/icons-react";

export default function MiniMusicCard({ song }: { song: Song }) {
    return (
        <div>
            <img src={song.imgUrl} alt="Song image" className="w-full h-32 object-cover rounded-md mb-2" />
            <div className="text-center">
                <h2 className="text-lg font-semibold truncate overflow-hidden whitespace-nowrap">{song.title}</h2>
                <p className="text-zinc-400 truncate overflow-hidden whitespace-nowrap">{song.artist}</p>
            </div>
            <div className="flex justify-center">
                <IconPlayerPlay className="cursor-pointer changeScaleOnHoverDefaultStyleForSmallerElements"></IconPlayerPlay>
                <IconPlus className="cursor-pointer changeScaleOnHoverDefaultStyleForSmallerElements"></IconPlus>
            </div>
        </div>
    );
}