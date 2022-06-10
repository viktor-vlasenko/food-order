import React, { useContext } from "react";
import Button from "../UI/Button/Button";
import CartContext from "../../store/cart-context";
import { BsCart2 } from "react-icons/bs";
import classes from "./CartMinimized.module.css";

const CartMinimized = () => {
  const ctx = useContext(CartContext);

  return (
    <div className={classes.cart} onClick={ctx.onOpen}>
      <BsCart2 className={classes.icon} />
      <p>Your Cart</p>
      <Button className={classes.number} text={ctx.items.length} />
    </div>
  );
};

export default CartMinimized;
