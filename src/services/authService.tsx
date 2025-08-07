import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const login = async (email: string, password: string): Promise<UserCredential> => {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password);
    return userCredentials;
}

const handleRegister = async (email: string, password: string, userName: string, profilePicture: FileList | null): Promise<void> => {

    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const registeredUser = userCredentials.user;
        const uid = registeredUser.uid;
        let imageURL = "";
        if (profilePicture && profilePicture.length > 0) {
            imageURL = await handleProfilePictureRegister(uid, profilePicture[0]);
        }
        await handleFirestoreDataRegister(uid, userName, email, imageURL);
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

const handleFirestoreDataRegister = async (uid: string, userName: string, email: string, imageURL: string): Promise<void> => {
    try {
        const userData = {
            uid: uid,
            userName: userName,
            email: email,
            imageURL: imageURL
        }

        await setDoc(doc(db, "users", uid), userData);
    } catch (error) {
        console.log(error);
    }
}

export { handleRegister, login };