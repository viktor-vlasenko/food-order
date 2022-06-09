import React from "react";
import Card from "../UI/Card/Card";
import MenuItem from "./MenuItem";

const Menu = (props) => {
  return (
    <Card>
      <ul>
        {props.menu.map((item) => (
          <MenuItem
            key={item.id}
            itemName={item.name}
            itemDescription={item.description}
            itemPrice={item.price}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Menu;
