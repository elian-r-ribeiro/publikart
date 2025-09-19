import { deleteObject, ref, StorageReference } from "firebase/storage";
import { db, storage } from "../../firebase";
import { getDownloadURLByRef, uploadFileToFirebase } from "./FirebaseService";
import { doc, updateDoc } from "firebase/firestore";
import User from "@/model/User";

const updateUserProfile = async (uid: string, userName: string, isArtist: boolean, profilePicture?: File) => {
    try {
        const updatedData: Partial<User> = {
            userName: userName,
            isArtist: isArtist
        }

        if (profilePicture) {
            await deleteObject(ref(storage, `profilePictures/${uid}`));

            const profilePictureUploadTaskWithRef = await uploadFileToFirebase(profilePicture, `profilePictures/${uid}`);
            const profilePictureDownloadURL = await getDownloadURLByRef(profilePictureUploadTaskWithRef!);

            updatedData.profilePictureURL = profilePictureDownloadURL;
        }

        const loggedUserDocRef = doc(db, "users", uid);
        await updateDoc(loggedUserDocRef, updatedData);
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
    updateUserProfile,
    changeUserPreferenceOption
}