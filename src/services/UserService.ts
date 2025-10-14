import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../../firebase";
import { getDownloadURLByRef, uploadFileToFirebase } from "./FirebaseService";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import User from "@/model/User";
import { validateFileType } from "./CommomService";
import { ProfileUpdateResult } from "@/model/Types";
import { FirebaseError } from "firebase/app";

const updateUserProfile = async (uid: string, userName: string, isArtist: boolean, profilePicture?: File): Promise<ProfileUpdateResult> => {
    try {

        const userDocRef = doc(db, "users", uid);
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
            } else if(validadeProfilePictureFile.status === "gif") {
                const userDocSnap = await getDoc(userDocRef);
                const userDocData = userDocSnap.data();

                if(userDocData!.isSupporter === false) {
                    return { status: "notASupporter" }
                } else {
                    const profilePictureUploadTaskWithRef = await uploadFileToFirebase(profilePicture, `profilePictures/${uid}`);
                    const profilePictureDownloadURL = await getDownloadURLByRef(profilePictureUploadTaskWithRef!);

                    updatedData.profilePictureURL = profilePictureDownloadURL;
                }
            } else {
                return { status: "invalidProfilePictureFile" };
            }
        }

        await updateDoc(userDocRef, updatedData);
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