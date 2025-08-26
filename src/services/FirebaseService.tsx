import { getDownloadURL, ref, StorageReference, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase";
import { addDoc, collection, DocumentData, DocumentReference, getDocs, updateDoc } from "firebase/firestore";
import Song from "@/model/Song";

const getDefaultSongURL = async () => {
    const defaultSongRef: StorageReference = ref(storage, "defaultSongs/DefaultSong.mp3");
    const defaultSongURL: string = await getDownloadURL(defaultSongRef);
    return defaultSongURL;
}

const getAllSongs = async () => {
    const songsDocsRef = await getDocs(collection(db, "songs"));
    const songs: Song[] = songsDocsRef.docs.map(doc => {
        const data = doc.data();
        return {
            title: data.title,
            artistUid: data.artistUid,
            imgUrl: data.imgUrl
        } as Song;
    });

    return songs;
}

const uploadSongToFirebase = async (songTitle: string, uid: string, songFile: File, songImage: File) => {
    try {
        const songData: Partial<Song> = {
            title: songTitle,
            artistUid: uid
        }

        const createdDocumentReference: DocumentReference<DocumentData, DocumentData> = await addDoc(collection(db, "songs"), songData);
        const imageUploadTaskWithRef = await handleFileUploadToFirebase(songImage, `songsImages/${createdDocumentReference.id}`)
        const imageDownloadURL = await getFileDownloadURLByRef(imageUploadTaskWithRef!);

        await updateDoc(createdDocumentReference, { imgUrl: imageDownloadURL });
    } catch (error) {
        console.log(error);
    }
}

const handleFileUploadToFirebase = async (file: File, pathWithFileName: string): Promise<StorageReference | undefined> => {
    try {
        const fileRef: StorageReference = ref(storage, pathWithFileName);

        await uploadBytes(fileRef, file);

        return fileRef;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

const getFileDownloadURLByRef = async (ref: StorageReference): Promise<string> => {
    try {
        return await getDownloadURL(ref);
    } catch (error) {
        console.log(error);
        return ("erro");
    }
}

export { getDefaultSongURL, uploadSongToFirebase, getAllSongs, handleFileUploadToFirebase, getFileDownloadURLByRef }