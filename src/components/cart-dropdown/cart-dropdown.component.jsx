import React, { useContext } from "react";

import { Button } from "../button/button.component";
import { CartContext } from "../context/cart.context";
import { CartItem } from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";
import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles";

export const CartDropdown = () => {
  const { cartItems, setIsCartOpen } = useContext(CartContext);

  const navigate = useNavigate();
  const goToCheckoutHandler = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? 
        (cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)) : 
        (<EmptyMessage>Your cart is empty! </EmptyMessage>)}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
    </CartDropdownContainer>
  );
};
