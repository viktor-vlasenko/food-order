import React, {useContext} from "react";

const CartItem = (props) => {
  return (
    <div className={props.className}>
      <h4>{props.name}</h4>
      <p>${props.price}, {props.amount}</p>
    </div>
  );
};

export default CartItem;
