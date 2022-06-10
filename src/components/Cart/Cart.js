import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = () => {
  const ctx = useContext(CartContext);
  return (
    <div>
      <div className={classes.backdrop} onClick={ctx.onClose}></div>
      <Card className={classes.cart}>
        {ctx.items.length === 0 && (
          <h3>The cart is empty :( Add some tasty stuff here</h3>
        )}
        {ctx.items.length > 0 &&
          ctx.items.map((element) => (
            <CartItem
              className={classes.item}
              key={element.id}
              id={element.id}
              name={element.name}
              price={element.price}
              amount={element.amount}
            />
          ))}
        {ctx.items.length > 0 && (
          <div className={classes.total}>
            <p>Total Amount</p>
            <p>${ctx.totalAmount}</p>
          </div>
        )}
        <div className={classes.actions}>
          <Button
            className={classes.close}
            onClick={ctx.onClose}
            text="Close"
          />
          <Button onClick={ctx.onOrder} text="Order" />
        </div>
      </Card>
    </div>
  );
};

export default Cart;
