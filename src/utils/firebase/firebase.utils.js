import {initializeApp} from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    signOut,
} from "firebase/auth";

import {collection, doc, getDoc, getDocs, getFirestore, query, setDoc, writeBatch,} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCvlLI9SR4H2BM_YY9vUthhnpc0JlqAWCc",
    authDomain: "crwn-clothing-db-754ad.firebaseapp.com",
    projectId: "crwn-clothing-db-754ad",
    storageBucket: "crwn-clothing-db-754ad.appspot.com",
    messagingSenderId: "755538259709",
    appId: "1:755538259709:web:997c3be009e2c4c7e19894",
};

const FirebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account",
});

export const addCollectionAndDocument = async (collectionKey, objectsToAdd) => {
    console.log(objectsToAdd);
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });
    await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, "categories");
    const q = query(collectionRef);
    const querySnapShot = await getDocs(q);
    return querySnapShot.docs.map(categories => categories.data())
    /*  const categoryMap = querySnapShot.docs.reduce((acc, decSnapShot) => {
        const { title, items } = decSnapShot.data();
        acc[title.toLowerCase()] = items;
        return acc;
      }, {});
      return categoryMap;*/
};

export const auth = getAuth();
export const signInWithGooglePopup = () =>
    signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
    signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
    const userDocRef = doc(db, "users", userAuth.uid);
    const userSanpShot = await getDoc(userDocRef);

    if (!userSanpShot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo,
            });
        } catch (error) {
            console.log("error creating the user", error.message);
        }
    }
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callBack) =>
    onAuthStateChanged(auth, callBack);
