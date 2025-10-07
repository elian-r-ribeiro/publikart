import Playlist from "@/model/Playlist";
import User from "@/model/User";
import { IconArrowsRandom, IconPlayerPlay, IconPlus } from "@tabler/icons-react";

interface PlaylistCardProps {
    playlistInfo: Playlist,
    ownerInfo: User,
    isLoggedUserPlaylistOwner: boolean,
    handlePlaylistPlay: () => void,
    isRandomOrderActivated: boolean,
    changeIsRandom: () => void
}

export default function PlaylistCard(props: PlaylistCardProps) {
    return (
        <div className="centerItemsRow gap-6 bg-zinc-700/40 backdrop-blur rounded-lg p-4 sm:w-64 md:w-128 lg:w-256">
            <img className="w-32 h-32 rounded-lg object-cover" src={props.playlistInfo?.imgUrl} alt="Playlist image" />
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl">{props.playlistInfo?.playlistTitle}</h1>
                <p className="text-lg">{props.playlistInfo?.playlistDescription}</p>
                <div className="flex gap-1">
                    <img className="w-5 h-5 rounded-full" src={props.ownerInfo?.profilePictureURL} alt="Artist image" />
                    <span className="text-sm">{props.ownerInfo?.userName}</span>
                </div>
                <div className="flex gap-3">
                    {!props.isLoggedUserPlaylistOwner && <IconPlus className="changeScaleOnHoverDefaultStyleForSmallerElements" />}
                    <IconPlayerPlay onClick={props.handlePlaylistPlay} className="changeScaleOnHoverDefaultStyleForSmallerElements cursor-pointer" />
                    {props.isRandomOrderActivated ? (
                        <span className="text-blue-600">
                            <IconArrowsRandom onClick={props.changeIsRandom} className="changeScaleOnHoverDefaultStyleForSmallerElements cursor-pointer" />
                        </span>
                    ) : (
                        <span>
                            <IconArrowsRandom onClick={props.changeIsRandom} className="changeScaleOnHoverDefaultStyleForSmallerElements cursor-pointer" />
                        </span>
                    )

                    }
                </div>
            </div>
        </div>
    );
}