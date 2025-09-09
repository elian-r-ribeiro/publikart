import { getDownloadURL, ref, StorageReference, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

const getEverythingFromOneCollection = async (collectionName: string) => {
    const allItemsArray: any[] = [];
    
        try {
            const songsDocsRef = await getDocs(collection(db, collectionName));
    
            await Promise.all(songsDocsRef.docs.map(async (doc) => {
                const data = doc.data();
                allItemsArray.push({ ...data });
            }));
        } catch (error) {
            console.log(error);
        }
    
        return allItemsArray;
}

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
    getSomethingFromFirebaseByDocumentId,
    getEverythingFromOneCollection
}