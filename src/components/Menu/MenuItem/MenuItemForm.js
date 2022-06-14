import React, { useContext, useState } from "react";
import CartContext from "../../../store/cart-context";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import classes from "./MenuItemForm.module.css";

const MenuItemForm = (props) => {
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
    <form onSubmit={submitHandler} className={classes["item-order"]}>
      <Input
        label="Amount"
        input={{
          id: `amount_${props.itemId}`,
          type: "number",
          min: "1",
          step: '1',
          max: "6",
          value: amount,
          onChange: amountChangeHandler,
        }}
      />
      <Button type="submit" text="+ Add" />
    </form>
  );
};

export default MenuItemForm;
