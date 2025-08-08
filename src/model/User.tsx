export default interface User {
    uid: string;
    userName: string;
    profilePictureURL: string;
    isArtist: boolean;
    userSongs: string[];
    userPlaylists: string[];
    savedPlaylists: string[];
    userAlbums: string[];
    savedAlbums: string[];
};