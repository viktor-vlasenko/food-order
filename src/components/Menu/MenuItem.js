import React from "react";
import Button from "../UI/Button/Button";
import classes from "./MenuItem.module.css";

const MenuItem = (props) => {
  return (
    <div className={classes.item}>
      <div className={classes['item-details']}>
        <h4 className={classes.name}>{props.itemName}</h4>
        <p className={classes.description}>{props.itemDescription}</p>
        <p className={classes.price}>${props.itemPrice}</p>
      </div>
      <div className={classes['item-order']}>
        <label>Amount</label>
        <input type="number" defaultValue="1" />
        <Button text="+ Add" />
      </div>
    </div>
  );
};

export default MenuItem;
