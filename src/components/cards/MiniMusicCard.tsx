import Song from "@/model/Song";
import { IconPlayerPlay, IconPlus } from "@tabler/icons-react";

interface MiniMusicCardProps {
    song: Song;
};

export default function MiniMusicCard(props: MiniMusicCardProps) {
    return (
        <div className="min-h-32 bg-zinc-700/40 rounded-lg p-4 backdrop-blur changeScaleOnHoverDefaultStyle">
            <img src={props.song.imgUrl} alt="Song image" className="w-full h-32 object-cover rounded-md mb-2" />
            <div className="text-center">
                <h2 className="text-lg font-semibold truncate overflow-hidden whitespace-nowrap">{props.song.title}</h2>
                {/* <p className="text-zinc-400 truncate overflow-hidden whitespace-nowrap">{props.song.artist}</p> */}
            </div>
            <div className="flex justify-center">
                <IconPlayerPlay className="cursor-pointer changeScaleOnHoverDefaultStyleForSmallerElements"></IconPlayerPlay>
                <IconPlus className="cursor-pointer changeScaleOnHoverDefaultStyleForSmallerElements"></IconPlus>
            </div>
        </div>
    );
}