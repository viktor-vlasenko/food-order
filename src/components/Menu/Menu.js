import React from "react";
import Card from "../UI/Card/Card";
import MenuItem from "./MenuItem/MenuItem";
import classes from "./Menu.module.css";

const Menu = (props) => {
  const menu = props.menu.map((item) => (
    <MenuItem
      key={item.id}
      itemId={item.id}
      itemName={item.name}
      itemDescription={item.description}
      itemPrice={item.price}
    />
  ));

  return (
    <Card className={classes.menu}>
      <ul>{menu}</ul>
    </Card>
  );
};

export default Menu;
