import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    getCurrentUser,
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup,
    signOutUser
} from "../../utils/firebase/firebase.utils";
import {all, call, put, takeLatest} from "redux-saga/effects";
import {USER_ACTION_TYPES} from "./user.types";
import {signInFailed, signInSuccess, signOutFailed, signOutSuccess, signUpFailed, signUpSuccess} from "./user.action";

export function* getSnapShotFromUserAuth(userAuth, additionalDetails) {
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails);
        yield put(signInSuccess({id: userAuth.uid, ...userSnapshot.data()}))
    } catch (error) {
        yield put(signInFailed(error))
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapShotFromUserAuth, userAuth)
    } catch (error) {
        yield put(signInFailed(error))
    }
}

export function* signInWithGoogle() {
    try {
        const {user} = yield call(signInWithGooglePopup)
        yield call(getSnapShotFromUserAuth, user)
    } catch (error) {
        yield put(signInFailed(error))
    }
}

export function* signInWithEmail({payload: {email, password}}) {
    try {
        const {user} = yield call(signInAuthUserWithEmailAndPassword, email, password)
        yield call(getSnapShotFromUserAuth, user)
    } catch (error) {
        switch (error.code) {
            case "auth/user-not-found":
                alert("invalid Username!");
                break;
            case "auth/wrong-password":
                alert("invalid password for email!");
                break;
            default:
                console.log(error);
        }
        yield put(signInFailed(error))
    }
}

export function* signUp({payload: {email, password, displayName}}) {
    try {
        const {user} = yield call(createAuthUserWithEmailAndPassword, email, password)
        yield put(signUpSuccess(user, {displayName}))
    } catch (error) {
        if (error.code === "auth/email-already-in-use") {
            alert("Email already in use, try with another email");
        } else {
            alert(error.code)
        }
        yield put(signUpFailed(error))
    }
}

export function* signOut() {
    try {
        yield call(signOutUser)
        yield put(signOutSuccess())
    } catch (error) {
        yield put(signOutFailed(error))
    }
}

export function* signInAfterSignUp({payload: {user, additionalDetails}}) {
    console.log(user)
    yield call(getSnapShotFromUserAuth, user, additionalDetails)
}

export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
}

function* onSignUpStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}

function* onSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

function* onSignOutStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}

export function* userSaga() {
    yield all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart)])
}