import {initializeApp} from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    NextOrObserver,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    signOut,
    User,
} from "firebase/auth";

import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    QueryDocumentSnapshot,
    setDoc,
    writeBatch
} from "firebase/firestore";
import {Category} from "../../store/categories/categories.types";

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

export type ObjectToAdd = {
    title: string
}

export const addCollectionAndDocument = async <T extends ObjectToAdd>(collectionKey: string, objectsToAdd: T[]): Promise<void> => {
    console.log(objectsToAdd);
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });
    await batch.commit();
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
    const collectionRef = collection(db, "categories");
    const q = query(collectionRef);
    const querySnapShot = await getDocs(q);
    return querySnapShot.docs.map(categories => categories.data() as Category)
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

export type AdditionalInformation = {
    displayName?: string
}
export type UserData = {
    createdAt: Date;
    displayName: string;
    email: string;
}

export const createUserDocumentFromAuth = async (
    userAuth: User, additionalInfo = {} as AdditionalInformation
): Promise<QueryDocumentSnapshot<UserData> | void> => {
    if (!userAuth) return;
    const userDocRef = doc(db, "users", userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);


    if (!userSnapshot.exists()) {
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
            console.log("error creating the user", error);
        }
    }
    return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callBack: NextOrObserver<User>) =>
    onAuthStateChanged(auth, callBack);

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise(
        (resolve, reject) => {
            const unsubscribe = onAuthStateChanged(
                auth,
                (userAuth) => {
                    unsubscribe();
                    resolve(userAuth);
                },
                reject)
        });
}
