import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={props.className}
      type={props.type ? props.type : "button"}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

export default Button;
