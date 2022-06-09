import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import classes from "./Header.module.css";

const Header = () => {
  const ctx = useContext(CartContext);
  return (
    <div className={classes.header}>
      <h2>Reactive Vegan</h2>
      <div onClick={ctx.onOpen}>Your Cart</div>
    </div>
  );
};

export default Header;
