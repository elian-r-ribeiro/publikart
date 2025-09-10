import { addDoc, arrayRemove, arrayUnion, collection, doc, DocumentData, DocumentReference, getDocs, updateDoc } from "firebase/firestore";
import { getDownloadURLByRef, uploadFileToFirebase } from "./FirebaseService";
import { db } from "../../firebase";
import Playlist from "@/model/Playlist";

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

const addPlaylistToLoggedUserSavedPlaylists = async(loggedUserId: string, playlistId: string) => {
    try {
        const userDocRef = doc(db, "users", loggedUserId);
        await updateDoc(userDocRef, {
            savedPlaylists: arrayUnion(playlistId)
        });
    } catch (error) {
        console.log(error);
    }
}

const saveSongToPlaylist = async (songId: string, playlistId: string) => {
    try {
        const playlistDocRef = doc(db, "playlists", playlistId);
        await updateDoc(playlistDocRef, {
            songsIds: arrayUnion(songId)
        });
    } catch (error) {
        console.log(error);
    }
}

const removeSongFromPlaylist = async (songId: string, playlistId: string) => {
    try {
        const playlistDocRef = doc(db, "playlists", playlistId);
        await updateDoc(playlistDocRef, {
            songsIds: arrayRemove(songId)
        });
    } catch (error) {
        console.log(error);
    }
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

const getLoggedUserPlaylists = async (uid: string) => {
    const userPlaylists: Playlist[] = [];

    try {
        const playlistsDocsRef = await getDocs(collection(db, "playlists"));
        await Promise.all(playlistsDocsRef.docs.map(async (doc) => {
            const data = doc.data();
            if (data.artistUid === uid) {
                userPlaylists.push({ ...data } as Playlist);
            }
        }));
    } catch (error) {
        console.log(error);
    }

    return userPlaylists;
}

export {
    createPlaylist,
    saveSongToPlaylist,
    getAllNonPrivatePlaylists,
    getLoggedUserPlaylists,
    removeSongFromPlaylist,
    addPlaylistToLoggedUserSavedPlaylists
}