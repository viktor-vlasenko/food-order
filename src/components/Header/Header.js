import React from "react";
import classes from './Header.module.css'

const Header = () => {
  return (
    <div className={classes.header}>
      <h2>Reactive Vegan</h2>
      <div>Your Cart</div>
    </div>
  );
};

export default Header;
