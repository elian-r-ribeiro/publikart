import Artist from "./User";
import Song from "./Song";

export default interface Album {
    name: string;
    description: string;
    id: number;
    image: string;
    artist: Artist;
    songs: Song[];
};