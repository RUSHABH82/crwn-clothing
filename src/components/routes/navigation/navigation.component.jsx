import React, { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

import { ReactComponent as CrownLogo } from "../../../assets/crown.svg";

import './navigation.styles.scss';

export const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrownLogo className="logo"/>
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            <div>SHOP</div>
          </Link>
          <Link className="nav-link" to="/sign-in">
            <div>SIGN IN</div>
          </Link>          
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};
