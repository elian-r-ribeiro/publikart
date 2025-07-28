import Album from "@/data/model/Album";
import { IconDots } from "@tabler/icons-react";
import Link from "next/link";

interface AlbumCardProps {
    album: Album;
};

export default function MiniAlbumCard(props: AlbumCardProps) {
    return (
        <div className="min-w-32 bg-zinc-700/40 rounded-lg p-4 backdrop-blur changeScaleOnHoverDefaultStyle">
            <img src={props.album.image} alt="Album image" className="w-full h-32 object-cover rounded-lg mb-2" />
            <div className="text-center">
                <h2 className="text-lg font-semibold truncate overflow-hidden whitespace-nowrap">{props.album.name}</h2>
            </div>
            <Link href={`/albums/${props.album.id}`} className="flex justify-center">
                <IconDots className="cursor-pointer changeScaleOnHoverDefaultStyleForSmallerElements" />
            </Link>
        </div>
    );
}