import React, { useEffect } from "react";

import { SignUpForm } from "../../sign-up-form/sign-up-form.component";
import { SignInForm } from "../../sign-in-form/sign-in-form.component";

import "./authentication.styles.scss";

export const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};
