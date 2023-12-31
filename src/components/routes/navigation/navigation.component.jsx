import React, {Fragment} from "react";
import {Link, Outlet} from "react-router-dom";

import {ReactComponent as CrownLogo} from "../../../assets/crown.svg";

import {signOutUser} from "../../../utils/firebase/firebase.utils";
import {CartIcon} from "../../cart-icon/cart-icon.component";
import {CartDropdown} from "../../cart-dropdown/cart-dropdown.component";
import {Logo, NavigationContainer, NavLink, NavLinks} from "./navigation.styles";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../../store/user/user.selector";
import {selectIsCartOpen} from "../../../store/cart/cart.selector";

export const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);

    return (
        <Fragment>
            <NavigationContainer>
                <Logo to="/">
                    <CrownLogo className="logo"/>
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
                    <CartIcon/>
                </NavLinks>
                {isCartOpen && <CartDropdown/>}
            </NavigationContainer>
            <Outlet/>
        </Fragment>
    );
};
