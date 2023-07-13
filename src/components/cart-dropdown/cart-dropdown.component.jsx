import React, { useContext } from "react";

import "./cart-dropdown.styles.scss";
import { Button } from "../button/button.component";
import { CartContext } from "../context/cart.context";
import { CartItem } from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";

export const CartDropdown = () => {
  const { cartItems, setIsCartOpen } = useContext(CartContext);

  const navigate = useNavigate();
  const goToCheckoutHandler = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
    </div>
  );
};
