import React, { useContext, useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import { FormInput } from "../form-input/form-input.componet";
import "./sign-in-form.styles.scss";
import { Button, BUTTON_TYPE_CLASSES } from "../button/button.component";

const defaultField = {
  email: "",
  password: "",
};

export const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultField);
  const { email, password } = formFields;

  const resetFormFields = () => setFormFields(defaultField);

  const handleSubmit = async (event) => {
    event.preventDefault();

    signInAuthUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        resetFormFields();
      })
      .catch((error) => {
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
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const logGoogleUser = async () => {
    await signInWithGooglePopup();
  };

  return (
    <div className="sign-in-container">
      <h2>I already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
          required
        />
        <FormInput
          label="Password"
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
          required
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={logGoogleUser}
          >
            google Sign-In
          </Button>
        </div>
      </form>
    </div>
  );
};
