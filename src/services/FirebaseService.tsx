import { getDownloadURL, ref, StorageReference } from "firebase/storage";
import { auth, db, storage } from "../../firebase";

const getDefaultSongURL = async () => {
    const defaultSongRef: StorageReference = ref(storage, "defaultSongs/DefaultSong.mp3");
    const defaultSongURL: string = await getDownloadURL(defaultSongRef);
    return defaultSongURL;
}

export { getDefaultSongURL }