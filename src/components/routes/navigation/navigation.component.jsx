import React, { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { ReactComponent as CrownLogo } from "../../../assets/crown.svg";

import "./navigation.styles.scss";
import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../../utils/firebase/firebase.utils";

export const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrownLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            <div>SHOP</div>
          </Link>
          {currentUser ? (
            <span onClick={signOutUser} className="nav-link">
              Logout
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              <div>SIGN IN</div>
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};
