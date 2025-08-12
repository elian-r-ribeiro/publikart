import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import User from "@/model/User";

const updateUserProfile = async (uid: string, userName: string, isArtist: boolean) => {
    const loggedUserDocRef = doc(db, "users", uid);
    await updateDoc(loggedUserDocRef, { userName: userName, isArtist: isArtist });
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
                    console.error("Erro ao buscar usuário:", error);
                }
            } else {
                setLoggedUserDataFromHook(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return loggedUserDataFromHook;
}

const login = async (email: string, password: string): Promise<UserCredential> => {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password);
    return userCredentials;
}

const handleRegister = async (email: string, password: string, userName: string, profilePicture: FileList | null): Promise<void> => {

    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const registeredUser = userCredentials.user;
        const uid = registeredUser.uid;
        let profilePictureUrl = "";
        if (profilePicture && profilePicture.length > 0) {
            profilePictureUrl = await handleProfilePictureRegister(uid, profilePicture[0]);
        }
        await handleFirestoreDataRegister(uid, userName, profilePictureUrl);
        await login(email, password);
    } catch (error) {
        console.log("Erro ao registrar: " + error);
    }

}

const handleProfilePictureRegister = async (uid: string, profileImage: File): Promise<string> => {

    try {
        const imageRef = ref(storage, `profileImages/${uid}`);

        await uploadBytes(imageRef, profileImage);

        const imageURL = await getDownloadURL(imageRef);

        return imageURL;
    } catch (error) {
        console.log(error);
        return "erro";
    }
}

const handleFirestoreDataRegister = async (uid: string, userName: string, profilePictureURL: string): Promise<void> => {
    try {
        const userData: Partial<User> = {
            uid: uid,
            userName: userName,
            profilePictureURL: profilePictureURL,
            savedAlbums: [],
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
    const loggedUserDocRef = doc(db, "users", uid);
    await updateDoc(loggedUserDocRef, {
        isArtist: true
    });
}

export { handleRegister, login, getLoggedUserInfoHook, changeUserPreferenceOption, updateUserProfile };