import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Button from "../UI/Button/Button";
import classes from "./MenuItem.module.css";

const MenuItem = (props) => {
  const [amount, setAmount] = useState("1");
  const ctx = useContext(CartContext);

  const amountChangeHandler = (event) => {
    setAmount(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (amount < 1) return;
    ctx.onAddItem({
      id: props.itemId,
      name: props.itemName,
      price: props.itemPrice,
      amount: amount,
    });
  };

  return (
    <div className={classes.item}>
      <div className={classes.details}>
        <h4 className={classes.name}>{props.itemName}</h4>
        <p className={classes.description}>{props.itemDescription}</p>
        <p className={classes.price}>${props.itemPrice}</p>
      </div>
      <form onSubmit={submitHandler} className={classes["item-order"]}>
        <label>Amount</label>
        <input type="number" min='1' value={amount} onChange={amountChangeHandler} />
        <Button type="submit" text="+ Add" />
      </form>
    </div>
  );
};

export default MenuItem;
