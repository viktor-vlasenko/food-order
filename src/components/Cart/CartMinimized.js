import React, { useContext, useEffect, useState } from "react";
import Button from "../UI/Button/Button";
import CartContext from "../../store/cart-context";
import { BsCart2 } from "react-icons/bs";
import classes from "./CartMinimized.module.css";

const CartMinimized = (props) => {
  const [btnIsHishlighted, setBtnIsHighlighted] = useState(false);

  const ctx = useContext(CartContext);

  const { items } = ctx;

  const buttonClasses = `${classes.cart} ${
    btnIsHishlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return +item.amount + curNumber;
  }, 0);

  return (
    <Button className={buttonClasses} onClick={props.onCartOpen}>
      <span>
        <BsCart2 className={classes.icon} />
      </span>
      <span>Your Cart</span>
      <span className={classes.number}>{numberOfCartItems}</span>
    </Button>
  );
};

export default CartMinimized;
