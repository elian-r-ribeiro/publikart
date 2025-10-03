'use client'

import PlaylistPage from "@/components/main/PlaylistPage";
import { useCurrentUser } from "@/context/UserContext";
import User from "@/model/User";

export default function SavedSongs() {

    const loggedUserInfo: User | null = useCurrentUser();

    return (
        <div className="flex justify-center">
            <PlaylistPage playlistId={loggedUserInfo?.savedSongsPlaylistId} />
        </div>
    );
}
