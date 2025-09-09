import { deleteObject, ref, StorageReference } from "firebase/storage";
import { db, storage } from "../../firebase";
import { getDownloadURLByRef, uploadFileToFirebase } from "./FirebaseService";
import { doc, updateDoc } from "firebase/firestore";

const updateUserProfileWithProfilePicture = async (uid: string, userName: string, isArtist: boolean, profilePicture: File) => {
    try {
        await updateUserProfile(uid, userName, isArtist);

        const profilePictureRefToDelete: StorageReference = ref(storage, `profilePictures/${uid}`);

        await deleteObject(profilePictureRefToDelete);

        const profilePicutreUploadTaskWithRef = await uploadFileToFirebase(profilePicture, `profilePictures/${uid}`);
        const profilePictureDownloadURL = await getDownloadURLByRef(profilePicutreUploadTaskWithRef!);
        const loggedUserDocRef = doc(db, "users", uid);

        await updateDoc(loggedUserDocRef, { profilePictureURL: profilePictureDownloadURL });
    } catch (error) {
        console.log(error);
    }
}

const updateUserProfile = async (uid: string, userName: string, isArtist: boolean) => {
    try {
        const loggedUserDocRef = doc(db, "users", uid);
        await updateDoc(loggedUserDocRef, { userName: userName, isArtist: isArtist });
    } catch (error) {
        console.log(error);
    }
}

const changeUserPreferenceOption = async (uid: string) => {
    try {
        const loggedUserDocRef = doc(db, "users", uid);
        await updateDoc(loggedUserDocRef, {
            isArtist: true
        });
    } catch (error) {
        console.log(error);
    }
}

export {
    updateUserProfileWithProfilePicture,
    updateUserProfile,
    changeUserPreferenceOption
}