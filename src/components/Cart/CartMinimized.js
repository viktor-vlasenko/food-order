import React, { useContext } from "react";
import Button from "../UI/Button/Button";
import CartContext from "../../store/cart-context";
import { BsCart2 } from "react-icons/bs";
import classes from "./CartMinimized.module.css";

const CartMinimized = () => {
  const ctx = useContext(CartContext);

  return (
    <Button className={classes.cart} onClick={ctx.onOpen}>
      <span>
        <BsCart2 className={classes.icon} />
      </span>
      <span>Your Cart</span>
      <span className={classes.number}>{ctx.items.length}</span>
    </Button>
  );
};

export default CartMinimized;
