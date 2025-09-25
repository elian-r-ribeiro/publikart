'use client'

import Playlist from "@/model/Playlist";
import Song from "@/model/Song";
import User from "@/model/User";
import { searchDocumentByField } from "@/services/FirebaseService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SearchSongs from "./SearchSongs";
import SearchPlaylists from "./SearchPlaylists";
import SearchArtists from "./SearchArtists";

export default function SearchPage() {
    const params = useParams();
    const searchTerm = String(params.searchTerm);
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const [songs, setSongs] = useState<Song[]>([]);
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [artists, setArtists] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAllSearchedData();
    }, [searchTerm]);

    const fetchAllSearchedData = async () => {
        setLoading(true);

        const fetchedSongs = await fetchSearchedSongs();
        const fetchedPlaylists = await fetchSearchedPlaylists();
        const fetchedArtists = await fetchSearchedArtists();

        setSongs(fetchedSongs);
        setPlaylists(fetchedPlaylists);
        setArtists(fetchedArtists);

        setLoading(false);
    }

    const fetchSearchedSongs = async () => {
        const songs = await searchDocumentByField("songs", "lowerCaseTitle", lowerCaseSearchTerm) as Song[];
        console.log(songs);
        return songs;
    }

    const fetchSearchedPlaylists = async () => {
        const playlists = await searchDocumentByField("playlists", "lowerCasePlaylistTitle", lowerCaseSearchTerm) as Playlist[];

        return playlists;
    }

    const fetchSearchedArtists = async () => {
        const artists = await searchDocumentByField("users", "lowerCaseUserName", lowerCaseSearchTerm) as User[];

        return artists;
    }

    if (loading) {
        return <p>Carregando...</p>
    }

    return (
        <div className="centerItems gap-6">
            <h1 className="text-2xl">Músicas</h1>
            <SearchSongs songs={songs} />
            <h1 className="text-2xl">Playlists</h1>
            <SearchPlaylists playlists={playlists} />
            <h1 className="text-2xl">Artistas</h1>
            <SearchArtists artists={artists} />
        </div>
    );
}