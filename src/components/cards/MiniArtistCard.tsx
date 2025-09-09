import Artist from "@/model/User";
import { IconDots } from "@tabler/icons-react";

interface MiniArtistCardProps {
    artist: Artist;
};

export default function MiniArtistCard(props: MiniArtistCardProps) {
    return (
        <div className="min-w-32 bg-zinc-700/40 rounded-lg p-4 backdrop-blur changeScaleOnHoverDefaultStyle">
            <img src={props.artist.profilePictureURL} alt="Artist image" className="w-full h-32 object-cover rounded-full mb-2" />
            <div className="text-center">
                <h2 className="text-lg font-semibold truncate overflow-hidden whitespace-nowrap">{props.artist.userName}</h2>
            </div>
            <div className="flex justify-center">
                <IconDots className="cursor-pointer changeScaleOnHoverDefaultStyleForSmallerElements" />
            </div>
        </div>
    );
}