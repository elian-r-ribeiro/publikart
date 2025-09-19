import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, DocumentData, DocumentReference, getDocs, updateDoc } from "firebase/firestore";
import { getDownloadURLByRef, uploadFileToFirebase } from "./FirebaseService";
import { db, storage } from "../../firebase";
import Playlist from "@/model/Playlist";
import { deleteObject, ref } from "firebase/storage";

const deletePlaylistFromFirebase = async (playlistId: string, uid: string) => {
    try {
        await deleteDoc(doc(db, "playlists", playlistId));
        await deleteObject(ref(storage, `playlistsImages/${playlistId}`));
        await updateDoc(doc(db, "users", uid), {
            userPlaylists: arrayRemove(playlistId)
        });

        const usersSnapshot = await getDocs(collection(db, "users"));
        const promises: Promise<void>[] = [];

        usersSnapshot.forEach((userDoc) => {
            const userRef = doc(db, "users", userDoc.id);
            promises.push(
                updateDoc(userRef, {
                    savedPlaylists: arrayRemove(playlistId)
                })
            );
        });

        await Promise.all(promises);
    } catch (error) {
        console.log(error);
    }
}

const updatePlaylist = async (playlistId: string, playlistTitle: string, isPrivate: boolean, playlistDescription?: string, playlistImage?: File) => {
    try {
        const updatedData: Partial<Playlist> = {
            playlistTitle: playlistTitle,
            playlistDescription: playlistDescription,
            isPrivate: isPrivate
        }

        if (playlistImage) {
            await deleteObject(ref(storage, `playlistsImages/${playlistId}`));

            const playlistImageUploadTaskWithRef = await uploadFileToFirebase(playlistImage, `playlistsImages/${playlistId}`);
            const playlistImageDownloadUrl = await getDownloadURLByRef(playlistImageUploadTaskWithRef!);

            updatedData.imgUrl = playlistImageDownloadUrl;
        }

        const playlistDocRef = doc(db, "playlists", playlistId);

        updateDoc(playlistDocRef, updatedData);
    } catch (error) {
        console.log(error);
    }
}

const createPlaylist = async (uid: string, playlistTitle: string, imageFile: File, isPrivate: boolean, playlistDescription?: string) => {
    try {

        const playlistOwnerDocRef = doc(db, "users", uid);

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

        await updateDoc(playlistOwnerDocRef, { userPlaylists: arrayUnion(playlistData.id) });
    } catch (error) {
        console.log(error);
    }
}

const addPlaylistToLoggedUserSavedPlaylists = async (loggedUserId: string, playlistId: string) => {
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

const getAllArtistNonPrivatePlaylists = async (artistUid: string) => {
    const artistNonPrivatePlaylists: Playlist[] = [];

    try {
        const playlistsDocsRef = await getDocs(collection(db, "playlists"));

        await Promise.all(playlistsDocsRef.docs.map(async (doc) => {
            const data = doc.data();
            if (data.artistUid === artistUid && !data.isPrivate) {
                artistNonPrivatePlaylists.push({ ...data } as Playlist)
            }
        }))
    } catch (error) {
        console.log(error);
    }

    return artistNonPrivatePlaylists;
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

export {
    createPlaylist,
    saveSongToPlaylist,
    getAllNonPrivatePlaylists,
    removeSongFromPlaylist,
    addPlaylistToLoggedUserSavedPlaylists,
    getAllArtistNonPrivatePlaylists,
    deletePlaylistFromFirebase,
    updatePlaylist
}