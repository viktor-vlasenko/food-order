import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import Button from "../UI/Button/Button";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const ctx = useContext(CartContext);

  const minusClickHandler = () => {
    ctx.onMinusClick(props.id);
  };

  const plusClickHandler = () => {
    ctx.onPlusClick(props.id);
  };
  return (
    <div className={`${props.className} ${classes.item}`}>
      <div className={classes.details}>
        <h4>{props.name}</h4>
        <div className={classes['price-amount']}>
          <p className={classes.price}>${props.price.toFixed(2)}</p>
          <div className={classes.amount}>x {props.amount}</div>
        </div>
      </div>
      <div className={classes.controls}>
        <Button text="–" onClick={minusClickHandler} />
        <Button text="+" onClick={plusClickHandler} />
      </div>
    </div>
  );
};

export default CartItem;
