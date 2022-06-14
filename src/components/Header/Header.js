import React from "react";
import CartMinimized from "../Cart/CartMinimized";
import classes from "./Header.module.css";
import backgroundImage from "../../assets/background.jpg";

const Header = () => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>Reactive Vegan</h1>
        <CartMinimized />
      </header>
      <div className={classes.image}>
        <img src={backgroundImage} alt='A table full of vegan meals' />
      </div>
    </React.Fragment>
  );
};

export default Header;
