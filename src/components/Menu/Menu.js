import React from "react";
import Card from "../UI/Card/Card";
import MenuItem from "./MenuItem";
import classes from "./Menu.module.css";

const Menu = (props) => {
  return (
    <Card className={classes.menu}>
      {props.menu.map((item) => (
        <MenuItem
          key={item.id}
          itemId={item.id}
          itemName={item.name}
          itemDescription={item.description}
          itemPrice={item.price}
        />
      ))}
    </Card>
  );
};

export default Menu;
