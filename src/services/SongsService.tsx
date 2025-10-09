import Song from "@/model/Song";
import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, DocumentData, DocumentReference, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { deleteObject, getDownloadURL, ref, StorageReference } from "firebase/storage";
import { getDownloadURLByRef, uploadFileToFirebase } from "./FirebaseService";
import { validateFileType } from "./CommomService";
import { SongUploadResult } from "@/model/Types";
import { FirebaseError } from "firebase/app";

const getDefaultSongURL = async () => {
    const defaultSongRef: StorageReference = ref(storage, "defaultSongs/DefaultSong.mp3");
    const defaultSongURL: string = await getDownloadURL(defaultSongRef);
    return defaultSongURL;
}

const deleteSongFromFirebase = async (songId: string, uid: string) => {
    try {
        await deleteObject(ref(storage, `songs/${songId}`));
        await deleteObject(ref(storage, `songsImages/${songId}`));
        await deleteDoc(doc(db, "songs", songId));
        await updateDoc(doc(db, "users", uid), {
            userSongs: arrayRemove(songId)
        });

        const usersSnapshot = await getDocs(collection(db, "users"));
        const promises: Promise<void>[] = [];

        usersSnapshot.forEach((userDoc) => {
            const userRef = doc(db, "users", userDoc.id);
            promises.push(
                updateDoc(userRef, {
                    savedSongs: arrayRemove(songId)
                })
            );
        });

        await Promise.all(promises);
    } catch (error) {
        console.log("Erro ao deletar música:", error);
    }
}

const tryUpdateSong = async (songId: string, songTitle: string, songImage?: File, songFile?: File): Promise<SongUploadResult> => {

    try {
        const songDocRef = doc(db, "songs", songId);

        const updatedData: Partial<Song> = {
            title: songTitle,
            lowerCaseTitle: songTitle.toLowerCase()
        }

        if (songImage) {
            const validateSongImageFile = validateFileType(songImage, "image");
            if (validateSongImageFile.status === "validFile") {
                await deleteObject(ref(storage, `songsImages/${songId}`));

                const songImageUploadTaskWithRef = await uploadFileToFirebase(songImage, `songsImages/${songId}`);
                const songImageDownloadUrl = await getDownloadURLByRef(songImageUploadTaskWithRef!);

                updatedData.imgUrl = songImageDownloadUrl;
            } else {
                return { status: "invalidSongImageFile" }
            }
        }

        if (songFile) {

            const validateSongFile = validateFileType(songFile, "audio/mpeg");
            if (validateSongFile.status === "validFile") {
                await deleteObject(ref(storage, `songs/${songId}`));

                const songFileUploadTaskWithRef = await uploadFileToFirebase(songFile, `songs/${songId}`);
                const songFileDownloadURL = await getDownloadURLByRef(songFileUploadTaskWithRef!);

                updatedData.songUrl = songFileDownloadURL;
            } else {
                return { status: "invalidSongFile" }
            }
        }

        await updateDoc(songDocRef, updatedData);
        return { status: "success" }
    } catch (error) {
        const err = error as FirebaseError;

        return { status: "error", code: err.code }
    }
}

const tryUploadSongToFirebase = async (songTitle: string, uid: string, songFile: File, songImage: File): Promise<SongUploadResult> => {
    try {
        let songData: Partial<Song> = {
            title: songTitle,
            lowerCaseTitle: songTitle.toLowerCase(),
            artistUid: uid
        }

        const userDocRef: DocumentReference = doc(db, "users", uid);
        const createdDocumentRef: DocumentReference<DocumentData, DocumentData> = await addDoc(collection(db, "songs"), songData);

        const validateSongImageFile = validateFileType(songImage, "image");
        if (validateSongImageFile.status === "invalidFile") {
            return { status: "invalidSongImageFile" };
        }

        const validateSongFile = validateFileType(songFile, "audio/mpeg");
        if (validateSongFile.status === "invalidFile") {
            return { status: "invalidSongFile" };
        }

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

        return { status: "success" };
    } catch (error) {
        const err = error as FirebaseError;
        return { status: "error", code: err.code }
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
    tryUploadSongToFirebase,
    addSongsToLoggedUserSavedSongs,
    deleteSongFromFirebase,
    tryUpdateSong
}