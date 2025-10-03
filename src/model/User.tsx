export default interface User {
    uid: string;
    userName: string;
    lowerCaseUserName: string;
    profilePictureURL: string;
    isArtist: boolean;
    userSongs: string[];
    userPlaylists: string[];
    savedPlaylists: string[];
    savedSongsPlaylistId: string;
};