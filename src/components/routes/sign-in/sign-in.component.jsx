import React, { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../../utils/firebase/firebase.utils";

export const SignIn = () => {
  useEffect(() => {
    getRedirectResult(auth)
      .then((response) => {
        console.log(response);
      })
      .catch(console.error());
  }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>SignIn Page</h1>
      <button onClick={logGoogleUser}>Sign in with google</button>
      <button onClick={signInWithGoogleRedirect}>
        Sign in with google redirect
      </button>
    </div>
  );
};
