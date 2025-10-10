import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../../firebase";
import { getDownloadURLByRef, uploadFileToFirebase } from "./FirebaseService";
import { doc, updateDoc } from "firebase/firestore";
import User from "@/model/User";
import { validateFileType } from "./CommomService";
import { ProfileUpdateResult } from "@/model/Types";
import { FirebaseError } from "firebase/app";

const updateUserProfile = async (uid: string, userName: string, isArtist: boolean, profilePicture?: File): Promise<ProfileUpdateResult> => {
    try {

        const updatedData: Partial<User> = {
            userName: userName,
            lowerCaseUserName: userName.toLowerCase(),
            isArtist: isArtist
        }

        if (profilePicture) {

            const validadeProfilePictureFile = validateFileType(profilePicture, "image");
            if (validadeProfilePictureFile.status === "validFile") {
                await deleteObject(ref(storage, `profilePictures/${uid}`));

                const profilePictureUploadTaskWithRef = await uploadFileToFirebase(profilePicture, `profilePictures/${uid}`);
                const profilePictureDownloadURL = await getDownloadURLByRef(profilePictureUploadTaskWithRef!);

                updatedData.profilePictureURL = profilePictureDownloadURL;
            } else {
                return { status: "invalidProfilePictureFile" };
            }
        }

        const loggedUserDocRef = doc(db, "users", uid);
        await updateDoc(loggedUserDocRef, updatedData);
        return { status: "success" }
    } catch (error) {
        const err = error as FirebaseError;
        return { status: "error", code: err.code }
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