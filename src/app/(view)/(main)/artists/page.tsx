'use client'

import MiniArtistCard from "@/components/cards/MiniArtistCard";
import { useLoading } from "@/context/LoadingContext";
import User from "@/model/User";
import { getEverythingFromOneCollection } from "@/services/FirebaseService";
import { useEffect, useState } from "react";

export default function Artists() {

    const [allArtistsFromFirebase, setAllArtistsFromFirebase] = useState<User[] | null>(null);
    const { setIsLoading, setLoadingMessage } = useLoading();

    useEffect(() => {
        fetchArtists();
    }, []);

    const fetchArtists = async () => {
        setLoadingMessage("Carregando...");
        setIsLoading(true);

        console.log("a");

        const artists = await getEverythingFromOneCollection("users") as User[];
        setAllArtistsFromFirebase(artists);

        setIsLoading(false);
    }

    return (
        <div className="flex justify-center">
            <div className="grid gridOfCardsResponsivityDefaultStyle gap-4">
                {allArtistsFromFirebase?.map(artist => (
                    <MiniArtistCard key={artist.uid} artist={artist} />
                ))}
            </div>
        </div>
    );
}