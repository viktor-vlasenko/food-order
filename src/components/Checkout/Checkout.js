import React, { useContext, useState } from "react";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import useInput from "../../hooks/use-input";
import CartContext from "../../store/cart-context";
import classes from "./Checkout.module.css";

const validateName = (fullName) => {
  return fullName.trim().length > 0;
};

const validatePhone = (phoneNumber) => {
  return /[0-9]{10}/.test(phoneNumber);
};

const validateAddress = (address) => {
  return /.{3,}[0-9]{1,4}/.test(address);
};

const Checkout = (props) => {
  const ctx = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [orderError, setOrderError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const {
    value: fullName,
    isValid: fullNameIsValid,
    hasError: fullNameHasError,
    changeHandler: fullNameChangeHandler,
    blurHandler: fullNameBlurHandler,
    reset: resetFullName,
  } = useInput(validateName);

  const {
    value: phoneNumber,
    isValid: phoneNumberIsValid,
    hasError: phoneNumberHasError,
    changeHandler: phoneNumberChangeHandler,
    blurHandler: phoneNumberBlurHandler,
    reset: resetPhoneNumber,
  } = useInput(validatePhone);

  const {
    value: address,
    isValid: addressIsValid,
    hasError: addressHasError,
    changeHandler: addressChangeHandler,
    blurHandler: addressBlurHandler,
    reset: resetAddress,
  } = useInput(validateAddress);

  const formIsValid =
    fullNameIsValid && phoneNumberIsValid && addressIsValid && paymentMethod;

  const choosePaymentMethodHandler = (event) => {
    setPaymentMethod(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setOrderError(null);
    setIsLoading(true);

    const orderDetails = {
      orderedItems: ctx.items,
      totalAmount: ctx.totalAmount,
      fullName,
      phoneNumber,
      deliveryAddres: address,
      paymentMethod,
    };

    try {
      const response = await fetch(
        "https://react-http-be928-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderDetails),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to place and order");
      }

      setIsLoading(false);
      ctx.onOrder();
      props.onOrderPlaced();
      resetFullName();
      resetPhoneNumber();
      resetAddress();
      setPaymentMethod(null);
    } catch (err) {
      setIsLoading(false);
      setOrderError(err.message || "Something went wrong");
    }
  };

  const fullNameClasses = fullNameHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;

  const phoneNumberClasses = phoneNumberHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;

  const addressClasses = addressHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;

  return (
    <React.Fragment>
      {/* <h2>Order Details</h2> */}
      <form className={classes.checkout} onSubmit={submitHandler}>
        <div className={fullNameClasses}>
          <Input
            label="Full Name"
            input={{
              id: "name",
              type: "text",
              value: fullName,
              onChange: fullNameChangeHandler,
              onBlur: fullNameBlurHandler,
            }}
          />
          {fullNameHasError && (
            <p className={classes["error-text"]}>Name must not be empty.</p>
          )}
        </div>
        <div className={phoneNumberClasses}>
          <Input
            label="Phone Number"
            input={{
              id: "phone",
              type: "tel",
              value: phoneNumber,
              onChange: phoneNumberChangeHandler,
              onBlur: phoneNumberBlurHandler,
            }}
          />
          {phoneNumberHasError && (
            <p className={classes["error-text"]}>
              Please enter a valid phone number.
            </p>
          )}
        </div>
        <div className={addressClasses}>
          <Input
            label="Delivery Address"
            input={{
              id: "address",
              type: "text",
              value: address,
              onChange: addressChangeHandler,
              onBlur: addressBlurHandler,
            }}
          />
          {addressHasError && (
            <p className={classes["error-text"]}>
              Please enter a valid address.
            </p>
          )}
        </div>
        <fieldset>
          <legend>Choose a Payment Method</legend>
          <label htmlFor="pay-choice-1">
            <input
              id="pay-choice-1"
              type="radio"
              name="payment"
              value="card"
              onChange={choosePaymentMethodHandler}
            />{" "}
            Card (Visa / Mastercard)
          </label>
          <label htmlFor="pay-choice-2">
            <input
              id="pay-choice-2"
              type="radio"
              name="payment"
              value="cash"
              onChange={choosePaymentMethodHandler}
            />{" "}
            Cash
          </label>
        </fieldset>
        <section className={classes["http-error"]}>
          <p className={classes["error-text"]}>{orderError}</p>
        </section>
        <div className={classes.actions}>
          <Button
            className={classes.cancel}
            onClick={props.hideCheckout}
            text="Cancel"
          />
          <Button
            type="submit"
            text={isLoading ? "Ordering..." : "Place Order"}
            disabled={!formIsValid || isLoading}
          />
        </div>
      </form>
    </React.Fragment>
  );
};

export default Checkout;
