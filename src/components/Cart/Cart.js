import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal/Modal";
import Button from "../UI/Button/Button";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const ctx = useContext(CartContext);

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((element) => (
        <CartItem
          className={classes.item}
          key={element.id}
          id={element.id}
          name={element.name}
          price={element.price}
          amount={element.amount}
        />
      ))}
    </ul>
  );

  const orderHandler = () => {
    props.onCartClose();
    props.onCheckout();
  };

  return (
    <Modal onClose={props.onCartClose}>
      {ctx.items.length === 0 && (
        <h3>The cart is empty :( Add some tasty stuff here</h3>
      )}
      {ctx.items.length > 0 && cartItems}
      {ctx.items.length > 0 && (
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>${ctx.totalAmount.toFixed(2)}</span>
        </div>
      )}
      <div className={classes.actions}>
        <Button
          className={classes.close}
          onClick={props.onCartClose}
          text="Close"
        />
        {ctx.items.length > 0 && <Button onClick={orderHandler} text="Order" />}
      </div>
    </Modal>
  );
};

export default Cart;
