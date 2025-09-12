'use client'

import ProfileCard from "@/components/cards/ProfileCard";
import ArtistPlaylists from "@/components/main/ArtistPlaylists";
import ArtistSongs from "@/components/main/ArtistSongs";
import { useCurrentUser } from "@/context/UserContext";
import User from "@/model/User";

export default function Profile() {

    const loggedUserData: User | null = useCurrentUser();

    if (!loggedUserData) {
        return <div className="centerItems h-screen w-screen">Carregando...</div>;
    }

    return (
        <div className="flex w-screen h-screen flex-col items-center 2xl:flex-row 2xl:justify-center gap-6 p-6">
            <ProfileCard userData={loggedUserData} />
            <div className="centerItems gap-3">
                <h1 className="text-2xl">Músicas</h1>
                <ArtistSongs isInProfilePage={true} artist={loggedUserData} />
                <h1 className="text-2xl">Playlists</h1>
                <ArtistPlaylists isInProfilePage={true} artist={loggedUserData} />
            </div>
        </div>
    );
}