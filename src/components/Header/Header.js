import React, { useContext } from "react";
import CartMinimized from "../Cart/CartMinimized";
import CartContext from "../../store/cart-context";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <div className={classes.header}>
      <h2>Reactive Vegan</h2>
      <CartMinimized />
    </div>
  );
};

export default Header;
