import Artist from "@/data/model/Artist";
import { IconDots } from "@tabler/icons-react";

interface MiniArtistCardProps {
    artist: Artist;
};

export default function MiniArtistCard(props: MiniArtistCardProps) {
    return (
        <div>
            <img src={props.artist.profilePicture} alt="Artist image" className="w-full h-full object-cover rounded-full mb-2" />
            <div className="text-center">
                <h2 className="text-lg font-semibold truncate overflow-hidden whitespace-nowrap">{props.artist.name}</h2>
            </div>
            <div className="flex justify-center">
                <IconDots className="cursor-pointer changeScaleOnHoverDefaultStyleForSmallerElements" />
            </div>
        </div>
    );
}