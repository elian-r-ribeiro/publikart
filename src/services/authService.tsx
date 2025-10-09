import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { User as FirebaseUserModel } from "firebase/auth";
import { getDownloadURLByRef, uploadFileToFirebase } from "./FirebaseService";
import { createPlaylist } from "./PlaylistsService";
import User from "@/model/User";
import { FirebaseError } from "firebase/app";
import { LoginOrRegisterResult } from "@/model/Types";

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

const tryLogin = async (email: string, password: string): Promise<LoginOrRegisterResult> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const loggedUser = userCredential.user;

    return validateIfEmailIsVerifiedWhenSigningIn(loggedUser);
  } catch (error) {
    const err = error as FirebaseError;

    return { status: "error", code: err.code };
  }
}

const validateIfEmailIsVerifiedWhenSigningIn = async (user: FirebaseUserModel): Promise<LoginOrRegisterResult> => {
  if (!user.emailVerified) {
    await sendEmailVerification(user);
    return { status: "unverified" };
  } else {
    return { status: "success" };
  }
}

const tryRegisterUser = async (email: string, password: string, userName: string, profilePicture: FileList | null): Promise<LoginOrRegisterResult> => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

    const registeredUser = userCredentials.user;
    const uid = registeredUser.uid;
    const profilePictureRef = await uploadFileToFirebase(profilePicture![0], `profilePictures/${uid}`);
    const profilePictureUrl = await getDownloadURLByRef(profilePictureRef!);

    await handleFirestoreUserDataRegister(uid, userName, profilePictureUrl);
    await createPlaylist(uid, "Músicas Salvas", "https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_1280.png", true, "", true);
    await sendValidationEmail(registeredUser);
    await logoutFromFirebase();
    return { status: "success" }
  } catch (error) {
    const err = error as FirebaseError;

    return { status: "error", code: err.code };
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
  tryRegisterUser,
  tryLogin,
  getLoggedUserInfoHook,
  logoutFromFirebase,
  sendPasswordRecovery
};