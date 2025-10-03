export default interface Playlist {
    id: string;
    playlistTitle: string;
    lowerCasePlaylistTitle: string;
    playlistDescription?: string;
    imgUrl: string;
    artistUid: string;
    songsIds: string[];
    isPrivate: boolean;
    isSavedSongs: boolean;
};