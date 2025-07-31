import Album from "./Album";
import Playlist from "./Playlist";
import Song from "./Song";

export default interface Artist {
    id: number;
    name: string;
    profilePicture: string;
    songs?: Song[];
    albums?: Album[];
    playlists?: Playlist[];
};