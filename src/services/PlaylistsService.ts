import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, DocumentData, DocumentReference, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { getDownloadURLByRef, uploadFileToFirebase } from "./FirebaseService";
import { db, storage } from "../../firebase";
import Playlist from "@/model/Playlist";
import { deleteObject, ref } from "firebase/storage";
import { PlaylistUploadOrUpdateResult } from "@/model/Types";
import { validateFileType } from "./CommomService";
import { FirebaseError } from "firebase/app";
import User from "@/model/User";

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

const updatePlaylist = async (uid: string, playlistId: string, playlistTitle: string, isPrivate: boolean, playlistDescription?: string, playlistImage?: File): Promise<PlaylistUploadOrUpdateResult> => {
    try {
        const userDocRef = doc(db, "users", uid);
        const updatedData: Partial<Playlist> = {
            playlistTitle: playlistTitle,
            lowerCasePlaylistTitle: playlistTitle.toLowerCase(),
            playlistDescription: playlistDescription,
            isPrivate: isPrivate
        }

        if (playlistImage) {
            const validatePlaylistImage = validateFileType(playlistImage, "image");
            if (validatePlaylistImage.status === "invalidFile") {
                return { status: "invalidPlaylistImageFile" }
            } else if(validatePlaylistImage.status === "gif") {
                const userDocSnap = await getDoc(userDocRef);
                const userDocData = userDocSnap.data() as User;

                if(userDocData.isSupporter === false) {
                    return { status: "notASupporter" }
                }
            }

            await deleteObject(ref(storage, `playlistsImages/${playlistId}`));

            const playlistImageUploadTaskWithRef = await uploadFileToFirebase(playlistImage, `playlistsImages/${playlistId}`);
            const playlistImageDownloadUrl = await getDownloadURLByRef(playlistImageUploadTaskWithRef!);

            updatedData.imgUrl = playlistImageDownloadUrl;
        }

        const playlistDocRef = doc(db, "playlists", playlistId);

        await updateDoc(playlistDocRef, updatedData);
        return { status: "success" }
    } catch (error) {
        const err = error as FirebaseError;
        return { status: "error", code: err.code }
    }
}

const createPlaylist = async (
    uid: string,
    playlistTitle: string,
    imageFileOrLink: File | string,
    isPrivate: boolean,
    playlistDescription?: string,
    isSavedSongs?: boolean
): Promise<PlaylistUploadOrUpdateResult> => {

    try {
        const playlistOwnerDocRef = doc(db, "users", uid);
        let imageDownloadURL: string;

        let playlistData: Partial<Playlist> = {
            artistUid: uid,
            playlistTitle: playlistTitle,
            lowerCasePlaylistTitle: playlistTitle.toLowerCase(),
            playlistDescription: playlistDescription || "",
            isPrivate: isPrivate,
            isSavedSongs: isSavedSongs || false
        };

        let createdDocumentRef: DocumentReference<DocumentData,DocumentData>;

        if (typeof (imageFileOrLink) === "string") {
            createdDocumentRef = await addDoc(collection(db, "playlists"), playlistData);
            imageDownloadURL = imageFileOrLink;
        } else {
            const validatePlaylistImage = validateFileType(imageFileOrLink, "image");
            if (validatePlaylistImage.status === "gif") {
                const userDocSnap = await getDoc(playlistOwnerDocRef);
                const userDocData = userDocSnap.data() as User;

                if(userDocData.isSupporter === false) {
                    return { status: "notASupporter" }
                }
            } else if (validatePlaylistImage.status === "invalidFile") {
                return { status: "invalidPlaylistImageFile" }
            }
            createdDocumentRef = await addDoc(collection(db, "playlists"), playlistData);
            const imageUploadTaskWithRef = await uploadFileToFirebase(imageFileOrLink, `playlistsImages/${createdDocumentRef.id}`);
            imageDownloadURL = await getDownloadURLByRef(imageUploadTaskWithRef!);
        }

        playlistData = {
          id: createdDocumentRef.id,
          imgUrl: imageDownloadURL,
        };

        await updateDoc(createdDocumentRef, playlistData);
        await updateDoc(playlistOwnerDocRef, { userPlaylists: arrayUnion(playlistData.id) });

        if (isSavedSongs) {
            await updateDoc(playlistOwnerDocRef, { savedSongsPlaylistId: playlistData.id });
        }
        return { status: "success" }
    } catch (error) {
        const err = error as FirebaseError
        return { status: "error", code: err.code }
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