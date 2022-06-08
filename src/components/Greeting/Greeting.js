import React from "react";
import Card from "../UI/Card/Card";
import classes from './Greeting.module.css'

const Greeting = () => {
  return (
    <Card className={classes.greeting}>
      <h2>Delicious Food Delivered To You</h2>
      <p>
        Choose your favourite vegan meal from our broad menu and enjoy a
        delicious lunch or dinner anywhere you want.
      </p>
      <p>

        All our meals are cruelty-free, cooked with only plant-based ingridients.
      </p>
    </Card>
  );
};

export default Greeting;
