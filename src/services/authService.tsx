import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { User as FirebaseUserModel } from "firebase/auth";
import { getDownloadURLByRef, uploadFileToFirebase } from "./FirebaseService";
import { createPlaylist } from "./PlaylistsService";
import User from "@/model/User";

function getLoggedUserInfoHook() {
  const [loggedUserData, setLoggedUserData] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setLoggedUserData(userDoc.data());
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        setLoggedUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return loggedUserData;
}

const sendPasswordRecovery = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.log(error);
  }
}

const tryLogin = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const loggedUser = userCredential.user;

    return validateIfEmailIsVerifiedWhenSigningIn(loggedUser);
  } catch (error) {
    console.log(error);
    return false;
  }
}

const validateIfEmailIsVerifiedWhenSigningIn = (user: FirebaseUserModel) => {
  if (!user.emailVerified) {
    sendEmailVerification(user);
    return false;
  } else {
    return true;
  }
}

const registerUser = async (email: string, password: string, userName: string, profilePicture: FileList | null): Promise<void> => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

    const registeredUser = userCredentials.user;
    const uid = registeredUser.uid;
    const profilePictureRef = await uploadFileToFirebase(profilePicture![0], `profilePictures/${uid}`);
    const profilePictureUrl = await getDownloadURLByRef(profilePictureRef!);

    await handleFirestoreUserDataRegister(uid, userName, profilePictureUrl);
    await createPlaylist(uid, "Músicas Salvas", profilePicture![0], true, "", true);
    await sendValidationEmail(registeredUser);
    await logoutFromFirebase();
  } catch (error) {
    console.log(error);
  }

}

const handleFirestoreUserDataRegister = async (uid: string, userName: string, profilePictureURL: string): Promise<void> => {
  try {
    const userData: Partial<User> = {
      uid: uid,
      userName: userName,
      lowerCaseUserName: userName.toLowerCase(),
      profilePictureURL: profilePictureURL,
      isArtist: false
    }

    await setDoc(doc(db, "users", uid), userData);
  } catch (error) {
    console.log(error);
  }
}

const sendValidationEmail = async (user: FirebaseUserModel) => {
  try {
    await sendEmailVerification(user);
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

export {
  registerUser,
  tryLogin,
  getLoggedUserInfoHook,
  logoutFromFirebase,
  sendPasswordRecovery
};