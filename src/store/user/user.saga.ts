import {
    AdditionalInformation,
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    getCurrentUser,
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup,
    signOutUser
} from "../../utils/firebase/firebase.utils";
import {all, call, put, takeLatest} from "typed-redux-saga/macro";
import {USER_ACTION_TYPES} from "./user.types";
import {
    EmailSignInStart,
    signInFailed,
    signInSuccess,
    signOutFailed,
    signOutSuccess,
    signUpFailed, SignUpStart, SignUpSuccess,
    signUpSuccess
} from "./user.action";
import {User} from "firebase/auth";

export function* getSnapShotFromUserAuth(userAuth: User, additionalDetails?: AdditionalInformation) {
    try {
        const userSnapshot = yield* call(createUserDocumentFromAuth, userAuth, additionalDetails);
        if (userSnapshot) {
            yield* put(signInSuccess({id: userAuth.uid, ...userSnapshot.data()}))
        }
    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield* call(getCurrentUser);
        if (!userAuth) return;
        yield* call(getSnapShotFromUserAuth, userAuth)
    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
}

export function* signInWithGoogle() {
    try {
        const {user} = yield* call(signInWithGooglePopup)
        yield* call(getSnapShotFromUserAuth, user)
    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
}

export function* signInWithEmail({payload: {email, password}}: EmailSignInStart) {
    try {
        const userCredential = yield* call(signInAuthUserWithEmailAndPassword, email, password)
        if (userCredential) {
            const {user} = userCredential;
            yield* call(getSnapShotFromUserAuth, user)
        }
    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
}

export function* signUp({payload: {email, password, displayName}}:SignUpStart) {
    try {
        const userCredential = yield* call(createAuthUserWithEmailAndPassword, email, password)
        if(userCredential){
            const {user} = userCredential;
            yield* put(signUpSuccess(user, {displayName}))
        }
    } catch (error) {
        yield* put(signUpFailed(error as Error))
    }
}

export function* signOut() {
    try {
        yield* call(signOutUser)
        yield* put(signOutSuccess())
    } catch (error) {
        yield* put(signOutFailed(error as Error))
    }
}

export function* signInAfterSignUp({payload: {user, additionalDetails}}:SignUpSuccess) {
    yield* call(getSnapShotFromUserAuth, user, additionalDetails)
}

export function* onGoogleSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

function* onCheckUserSession() {
    yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

function* onEmailSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
}

function* onSignUpStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}

function* onSignUpSuccess() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

function* onSignOutStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}

export function* userSaga() {
    yield* all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart)])
}