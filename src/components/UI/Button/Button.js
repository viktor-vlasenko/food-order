import React from "react";

const Button = (props) => {
  return (
    <button type={props.type ? props.type : "button"}>{props.text}</button>
  );
};

export default Button;
