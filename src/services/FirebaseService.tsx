import { getDownloadURL, ref, StorageReference, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase";
import { addDoc, arrayUnion, collection, doc, DocumentData, DocumentReference, getDoc, getDocs, updateDoc } from "firebase/firestore";
import Song from "@/model/Song";
import Playlist from "@/model/Playlist";

const saveSongToFavorites = async (songId: string, uid: string) => {
    try {
        const userDocRef = doc(db, "users", uid);
        await updateDoc(userDocRef, {
            savedSongs: arrayUnion(songId)
        });
    } catch (error) {
        console.log(error);
    }
}

const getLoggedUserSongsByDocIds = async (userSongsDocIds: string[]) => {
    const userSongs: Song[] = [];

    try {
        await Promise.all(userSongsDocIds.map(async (songId: string) => {
            const songDocRef = doc(db, "songs", songId);
            const songDoc = await getDoc(songDocRef);
            if (songDoc.exists()) {
                userSongs.push({ ...songDoc.data() } as Song);
            }
        }));
    } catch (error) {
        console.log(error);
    }

    return userSongs as Song[];
}

const getAllNonPrivatePlaylists = async () => {
    const nonPrivatePlaylists: Playlist[] = [];

    try {
        const playlistsDocsRef = await getDocs(collection(db, "playlists"));

        await Promise.all(playlistsDocsRef.docs.map(async (doc) => {
            const data = doc.data();
            if (!data.isPrivate) {
                nonPrivatePlaylists.push({ ...data } as Playlist);
            }
        }));
    } catch (error) {
        console.log(error);
    }

    return nonPrivatePlaylists;
}

const getAllSongs = async () => {
    const allSongs: Song[] = [];

    try {
        const songsDocsRef = await getDocs(collection(db, "songs"));

        await Promise.all(songsDocsRef.docs.map(async (doc) => {
            const data = doc.data();
            allSongs.push({ ...data } as Song);
        }));
    } catch (error) {
        console.log(error);
    }

    return allSongs;
}

const createPlaylist = async (uid: string, playlistTitle: string, imageFile: File, isPrivate: boolean, playlistDescription?: string) => {
    try {
        let playlistData: Partial<Playlist> = {
            artistUid: uid,
            playlistTitle: playlistTitle,
            playlistDescription: playlistDescription || "",
            isPrivate: isPrivate
        };

        const createdDocumentRef: DocumentReference<DocumentData, DocumentData> = await addDoc(collection(db, "playlists"), playlistData);
        const imageUploadTaskWithRef = await uploadFileToFirebase(imageFile, `playlistsImages/${createdDocumentRef.id}`);
        const imageDownloadURL = await getDownloadURLByRef(imageUploadTaskWithRef!);

        playlistData = {
            id: createdDocumentRef.id,
            imgUrl: imageDownloadURL
        }

        await updateDoc(createdDocumentRef, playlistData);
    } catch (error) {
        console.log(error);
    }
}

const uploadSongToFirebase = async (songTitle: string, uid: string, songFile: File, songImage: File) => {
    try {
        let songData: Partial<Song> = {
            title: songTitle,
            artistUid: uid
        }

        const userDocRef: DocumentReference = doc(db, "users", uid);
        const createdDocumentRef: DocumentReference<DocumentData, DocumentData> = await addDoc(collection(db, "songs"), songData);
        const imageUploadTaskWithRef = await uploadFileToFirebase(songImage, `songsImages/${createdDocumentRef.id}`);
        const imageDownloadURL = await getDownloadURLByRef(imageUploadTaskWithRef!);
        const songFileUploadTaskWithRef = await uploadFileToFirebase(songFile, `songs/${createdDocumentRef.id}`);
        const songFileDownloadURL = await getDownloadURLByRef(songFileUploadTaskWithRef!);

        songData = {
            id: createdDocumentRef.id,
            imgUrl: imageDownloadURL,
            songUrl: songFileDownloadURL
        };

        await updateDoc(createdDocumentRef, songData);
        await updateDoc(userDocRef, { userSongs: arrayUnion(createdDocumentRef.id) });
    } catch (error) {
        console.log(error);
    }
}

const uploadFileToFirebase = async (file: File, pathWithFileName: string): Promise<StorageReference | undefined> => {
    try {
        const fileRef: StorageReference = ref(storage, pathWithFileName);

        await uploadBytes(fileRef, file);

        return fileRef;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

const getDownloadURLByRef = async (ref: StorageReference): Promise<string> => {
    try {
        return await getDownloadURL(ref);
    } catch (error) {
        console.log(error);
        return ("erro");
    }
}

const getDefaultSongURL = async () => {
    const defaultSongRef: StorageReference = ref(storage, "defaultSongs/DefaultSong.mp3");
    const defaultSongURL: string = await getDownloadURL(defaultSongRef);
    return defaultSongURL;
}

export {
    getDefaultSongURL,
    uploadSongToFirebase,
    getAllSongs,
    uploadFileToFirebase,
    getDownloadURLByRef,
    getLoggedUserSongsByDocIds,
    saveSongToFavorites,
    createPlaylist,
    getAllNonPrivatePlaylists
}