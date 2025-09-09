'use client'

import MiniArtistCard from "@/components/cards/MiniArtistCard";
import User from "@/model/User";
import { getEverythingFromOneCollection } from "@/services/FirebaseService";
import { useEffect, useState } from "react";

export default function Artists() {

    const [allArtistsFromFirebase, setAllArtistsFromFirebase] = useState<User[] | null>(null);

    useEffect(() => {
        fetchArtists();
    });

    const fetchArtists = async () => {
        const artists = await getEverythingFromOneCollection("users") as User[];
        setAllArtistsFromFirebase(artists);
    }

    if (!allArtistsFromFirebase) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="flex justify-center">
            <div className="grid gridOfCardsResponsivityDefaultStyle gap-4">
                {allArtistsFromFirebase.map(artist => (
                    <MiniArtistCard key={artist.uid} artist={artist} />
                ))}
            </div>
        </div>
    );
}