import { useContext } from "react";

import { CartContext } from "../context/cart.context";
import {
  ShopingIcon,
  ItemCount,
  CartIconContainer,
} from "./cart-icon.styles.jsx";

export const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShopingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};
