import { getDownloadURL, ref, StorageReference, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase";
import { addDoc, collection, doc, DocumentData, DocumentReference, getDocs, setDoc, updateDoc } from "firebase/firestore";
import Song from "@/model/Song";

const getDefaultSongURL = async () => {
    const defaultSongRef: StorageReference = ref(storage, "defaultSongs/DefaultSong.mp3");
    const defaultSongURL: string = await getDownloadURL(defaultSongRef);
    return defaultSongURL;
}

const getAllSongs = async () => {
    const songsDocsRef = await getDocs(collection(db, "songs"));
    const songs = songsDocsRef.docs.map(doc => ({
        ...doc.data()
    }));
    return songs;
}

const sendSongToFirebase = async (songTitle: string, uid: string, songFile: File, songImage: File) => {
    try {
        const songData: Partial<Song> = {
            title: songTitle,
            artistUid: uid
        }

        const createdDocumentReference: DocumentReference<DocumentData, DocumentData> = await addDoc(collection(db, "songs"), songData);
        const imageDownloadURL = await handleSongImageSending(songImage, createdDocumentReference.id);

        await updateDoc(createdDocumentReference, { imgUrl: imageDownloadURL });
    } catch (error) {
        console.log(error);
    }
}

const handleSongImageSending = async (imageFile: File, fileName: string): Promise<string> => {
    try {
        const songImageRef: StorageReference = ref(storage, `songsImages/${fileName}`);

        await uploadBytes(songImageRef, imageFile);

        return getDownloadURL(songImageRef);
    } catch (error) {
        console.log(error);
        return ("erro");
    }
}

// const sendSongImage = async (image: File) => {
//     const songImagesStorageRef: StorageReference = ref()
//     uploadBytes()
// }

export { getDefaultSongURL, sendSongToFirebase, getAllSongs }