import Song from "@/model/Song";
import { addDoc, arrayUnion, collection, doc, DocumentData, DocumentReference, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, StorageReference } from "firebase/storage";
import { getDownloadURLByRef, uploadFileToFirebase } from "./FirebaseService";

const getDefaultSongURL = async () => {
    const defaultSongRef: StorageReference = ref(storage, "defaultSongs/DefaultSong.mp3");
    const defaultSongURL: string = await getDownloadURL(defaultSongRef);
    return defaultSongURL;
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

const addSongsToLoggedUserSavedSongs = async (uid: string, songId: string) => {
    try {
        const userDocRef = doc(db, "users", uid);
        await updateDoc(userDocRef, {
            savedSongs: arrayUnion(songId)
        });
    } catch (error) {
        console.log(error);
    }
}

export {
    getDefaultSongURL,
    uploadSongToFirebase,
    addSongsToLoggedUserSavedSongs
}