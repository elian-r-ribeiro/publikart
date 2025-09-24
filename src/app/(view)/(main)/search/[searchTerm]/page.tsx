'use client'

import SearchArtists from "@/components/main/SearchArtists";
import SearchPlaylists from "@/components/main/SearchPlaylists";
import SearchSongs from "@/components/main/SearchSongs";
import Playlist from "@/model/Playlist";
import Song from "@/model/Song";
import User from "@/model/User";
import { searchDocumentByField } from "@/services/FirebaseService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search() {

    const params = useParams();
    const searchTerm = String(params.searchTerm);

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
        const songs = await searchDocumentByField("songs", "title", searchTerm) as Song[];
        console.log(songs);
        return songs;
    }

    const fetchSearchedPlaylists = async () => {
        const playlists = await searchDocumentByField("playlists", "playlistTitle", searchTerm) as Playlist[];

        return playlists;
    }

    const fetchSearchedArtists = async () => {
        const artists = await searchDocumentByField("users", "userName", searchTerm) as User[];

        return artists;
    }

    if (loading) {
        return <p>Carregando...</p>
    }

    return (
        <div className="flex flex-col">
            <SearchSongs songs={songs} />
            <SearchPlaylists playlists={playlists} />
            <SearchArtists artists={artists} />
        </div>
    );
}