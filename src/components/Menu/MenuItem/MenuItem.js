import React from "react";
import MenuItemForm from "./MenuItemForm";
import classes from "./MenuItem.module.css";

const MenuItem = (props) => {
  return (
    <li className={classes.item}>
      <div className={classes.details}>
        <h4 className={classes.name}>{props.itemName}</h4>
        <p className={classes.description}>{props.itemDescription}</p>
        <p className={classes.price}>${props.itemPrice}</p>
      </div>
      <MenuItemForm
        itemId={props.itemId}
        itemName={props.itemName}
        itemPrice={props.itemPrice}
      />
    </li>
  );
};

export default MenuItem;
