import Artist from "./Artist";
import Song from "./Song";

export default interface Playlist {
    id: number;
    name: string;
    description?: string;
    image: string;
    artist: Artist;
    songs: Song[];
};