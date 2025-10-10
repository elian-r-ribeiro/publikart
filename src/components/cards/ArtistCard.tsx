'use client'

import User from "@/model/User";

interface ArtistCardProps {
    artist: User
}

export default function ArtistCard(props: ArtistCardProps) {

    return (
        <div className="centerItemsRow gap-6 bg-zinc-700/40 backdrop-blur rounded-lg p-4 sm:w-64 md:w-128">
            <img className="w-24 h-24 rounded-full object-cover" src={props.artist.profilePictureURL} alt="Artist image" />
            <p>{props.artist.userName}</p>
        </div>
    );
}
