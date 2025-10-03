import { getDownloadURL, ref, StorageReference, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

const searchDocumentByField = async (collectionName: string, fieldName: string, searchTerm: string) => {

    let firestoreQuery: any = ""
    const documentsRef = collection(db, collectionName);

    if (collectionName === "playlists") {
        firestoreQuery = query(documentsRef,
            where(fieldName, ">=", searchTerm),
            where(fieldName, "<=", searchTerm + "\uf8ff"),
            where("isPrivate", "==", false)
        );
    } else if (collectionName === "users") {
        firestoreQuery = query(documentsRef,
            where(fieldName, ">=", searchTerm),
            where(fieldName, "<=", searchTerm + "\uf8ff"),
            where("isArtist", "==", true)
        );
    } else {
        firestoreQuery = query(documentsRef,
            where(fieldName, ">=", searchTerm),
            where(fieldName, "<=", searchTerm + "\uf8ff")
        );
    }

    const docSnapshot = await getDocs(firestoreQuery);
    const resultDocuments = docSnapshot.docs.map(doc => ({
        ...doc.data() as Object
    }));

    return resultDocuments;
}

const getDocumentsThatUserUidIsOwnerFromFirebase = async (uid: string, collectionName: string) => {
    const documentsArray: object[] = [];

    try {
        const collectionDocs = await getDocs(collection(db, collectionName));

        await Promise.all(collectionDocs.docs.map(async (doc) => {
            const data = doc.data();

            if (data.artistUid === uid) {
                if (data.isSavedSongs != true) {
                    documentsArray.push({ ...data });
                }
            }
        }))
    } catch (error) {
        console.log(error)
    }

    return documentsArray;
}

const getArrayOfDocumentsByDocIdsFromFirebase = async (idsArray: string[], collectionName: string) => {
    const docsArray: object[] = [];

    try {
        await Promise.all(idsArray.map(async (id) => {
            const docRef = doc(db, collectionName, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                if (docSnap.data().isSavedSongs != true) {
                    docsArray.push({ ...docSnap.data() });
                }
            }
        }));
    } catch (error) {
        console.log(error);
    }
    return docsArray;
}

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
    getEverythingFromOneCollection,
    getArrayOfDocumentsByDocIdsFromFirebase,
    getDocumentsThatUserUidIsOwnerFromFirebase,
    searchDocumentByField
}