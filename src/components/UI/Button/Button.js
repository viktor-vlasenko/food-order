import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={props.className}
      type={props.type ? props.type : "button"}
      onClick={props.onClick}
    >
      {props.text}{props.children}
    </button>
  );
};

export default Button;
