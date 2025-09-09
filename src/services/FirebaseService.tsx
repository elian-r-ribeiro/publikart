import { getDownloadURL, ref, StorageReference, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const getSomethingFromFirebaseByDocumentId = async (collectionName: string, documentId: string) => {
    try {
        const docRef = doc(db, collectionName, documentId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { ...docSnap.data() };
        }
    } catch (error) {
        console.log(error);
    }
}

const uploadFileToFirebase = async (file: File, pathWithFileName: string): Promise<StorageReference | undefined> => {
    try {
        const fileRef: StorageReference = ref(storage, pathWithFileName);

        await uploadBytes(fileRef, file);

        return fileRef;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

const getDownloadURLByRef = async (ref: StorageReference): Promise<string> => {
    try {
        return await getDownloadURL(ref);
    } catch (error) {
        console.log(error);
        return ("erro");
    }
}

export {
    uploadFileToFirebase,
    getDownloadURLByRef,
    getSomethingFromFirebaseByDocumentId
}