import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { deleteObject, ref, StorageReference } from "firebase/storage";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import User from "@/model/User";
import { getDownloadURLByRef, uploadFileToFirebase } from "./FirebaseService";

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

function getLoggedUserInfoHook() {

    const [loggedUserDataFromHook, setLoggedUserDataFromHook] = useState<any>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userDocRef = doc(db, "users", user.uid);
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        setLoggedUserDataFromHook(userDoc.data());
                    }
                } catch (error) {
                    console.error(error);
                }
            } else {
                setLoggedUserDataFromHook(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return loggedUserDataFromHook;
}

const login = async (email: string, password: string): Promise<void> => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
    }
}

const logoutFromFirebase = async () => {
    try {
        signOut(auth);
    } catch (error) {
        console.log(error);
    }
}

const handleRegister = async (email: string, password: string, userName: string, profilePicture: FileList | null): Promise<void> => {

    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const registeredUser = userCredentials.user;
        const uid = registeredUser.uid;
        const profilePictureRef = await uploadFileToFirebase(profilePicture![0], `profilePictures/${uid}`);
        const profilePictureUrl = await getDownloadURLByRef(profilePictureRef!);

        await handleFirestoreDataRegister(uid, userName, profilePictureUrl);
        await login(email, password);
    } catch (error) {
        console.log("Erro ao registrar: " + error);
    }

}

const handleFirestoreDataRegister = async (uid: string, userName: string, profilePictureURL: string): Promise<void> => {
    try {
        const userData: Partial<User> = {
            uid: uid,
            userName: userName,
            profilePictureURL: profilePictureURL,
            userPlaylists: [],
            savedPlaylists: [],
            isArtist: false
        }

        await setDoc(doc(db, "users", uid), userData);
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
    handleRegister,
    login,
    getLoggedUserInfoHook,
    changeUserPreferenceOption,
    updateUserProfile,
    updateUserProfileWithProfilePicture,
    logoutFromFirebase
};