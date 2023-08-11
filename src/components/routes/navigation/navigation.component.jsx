import React, { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { ReactComponent as CrownLogo } from "../../../assets/crown.svg";

//import "./navigation.styles.scss";
import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../../utils/firebase/firebase.utils";
import { CartIcon } from "../../cart-icon/cart-icon.component";
import { CartDropdown } from "../../cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../context/cart.context";
import { Logo, NavigationContainer, NavLink, NavLinks } from "./navigation.styles";

export const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <NavigationContainer>
        <Logo to="/">
          <CrownLogo className="logo" />
        </Logo>
        <NavLinks>
          <NavLink to="/shop">
            <div>SHOP</div>
          </NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              Logout
            </NavLink>
          ) : (
            <Link className="nav-link" to="/auth">
              <div>SIGN IN</div>
            </Link>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};
