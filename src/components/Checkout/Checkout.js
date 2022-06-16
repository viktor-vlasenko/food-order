import React from "react";
import Modal from "../UI/Modal/Modal";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import classes from "./Checkout.module.css";

const Checkout = () => {
  const formIsValid = false;

  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <Modal>
      <h2>Order Details</h2>
      <form className={classes.checkout} onSubmit={submitHandler}>
        <div className={classes.control}>
          <Input label="Full Name" input={{ id: "name", type: "text" }} />
        </div>
        <div className={classes.control}>
          <Input
            label="Phone Number"
            input={{ id: "phone", type: "tel", placeholder: "(099) 987-65-34" }}
          />
        </div>
        <div className={classes.control}>
          <Input
            label="Delivery Address"
            input={{ id: "address", type: "text" }}
          />
        </div>
        <fieldset>
          <legend>Choose a Payment Method</legend>
          <label htmlFor="pay-choice-1">
            <input id="pay-choice-1" type="radio" name="payment" value="card" />{" "}
            Card (Visa / Mastercard)
          </label>
          <label htmlFor="pay-choice-2">
            <input id="pay-choice-2" type="radio" name="payment" value="cash" />{" "}
            Cash
          </label>
        </fieldset>
        <div className={classes.actions}>
          <Button className={classes.back} text="Back" />
          <Button type="submit" text="Place Order" disabled={!formIsValid}/>
        </div>
      </form>
    </Modal>
  );
};

export default Checkout;
