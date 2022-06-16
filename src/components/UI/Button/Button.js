import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={props.className}
      disabled={props.disabled}
      type={props.type ? props.type : "button"}
      onClick={props.onClick}
    >
      {props.text}{props.children}
    </button>
  );
};

export default Button;
