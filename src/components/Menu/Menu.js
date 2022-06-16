import React, { useCallback, useEffect, useState } from "react";
import Card from "../UI/Card/Card";
import MenuItem from "./MenuItem/MenuItem";
import classes from "./Menu.module.css";

const Menu = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMeals = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await fetch(
        "https://react-http-be928-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );
      const data = await results.json();

      const mealsList = [];
      for (let key in data) {
        mealsList.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(mealsList);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  const mealList = meals.map((item) => (
    <MenuItem
      key={item.id}
      itemId={item.id}
      itemName={item.name}
      itemDescription={item.description}
      itemPrice={item.price}
    />
  ));

  let content = (
    <p className={classes.information}>No meals available at the moment :(</p>
  );

  if (mealList.length > 0) {
    content = <ul>{mealList}</ul>;
  }

  if (isLoading) {
    content = <p className={classes.information}>Loading meals...</p>;
  }

  if (error) {
    content = <p className={classes.information}>{error}</p>;
  }

  return <Card className={classes.menu}>{content}</Card>;
};

export default Menu;
