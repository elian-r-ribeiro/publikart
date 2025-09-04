export default interface User {
    uid: string;
    userName: string;
    profilePictureURL: string;
    isArtist: boolean;
    userSongs: string[];
    savedSongs: string[];
    userPlaylists: string[];
    savedPlaylists: string[];
};