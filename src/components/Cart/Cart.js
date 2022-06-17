import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal/Modal";
import Button from "../UI/Button/Button";
import CartItem from "./CartItem";
import Checkout from "../Checkout/Checkout";
import classes from "./Cart.module.css";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
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
    setIsCheckout(true);
  };

  const modalActions = (
    <div className={classes.actions}>
      <Button
        className={classes.close}
        onClick={props.onCartClose}
        text="Close"
      />
      {ctx.items.length > 0 && <Button onClick={orderHandler} text="Order" />}
    </div>
  );

  const hideCheckout = () => {
    setIsCheckout(false);
    props.onCartClose();
  };

  const orderPlacedHandler = () => {
    setOrderPlaced(true);
  };

  const modalContent = (
    <React.Fragment>
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
      {isCheckout && (
        <Checkout
          onOrderPlaced={orderPlacedHandler}
          hideCheckout={hideCheckout}
        />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const orderPlacedContent = (
    <React.Fragment>
      <h3>
        {"Thank you! Your order is successfully placed. We'll call you soon :)"}
      </h3>
      {modalActions}
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onCartClose}>
      {!orderPlaced && modalContent}
      {orderPlaced && orderPlacedContent}
    </Modal>
  );
};

export default Cart;
