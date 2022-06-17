import React, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Greeting from "./components/Greeting/Greeting";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  }

  const hideCartHandler = () => {
    setCartIsShown(false);
  }

  return (
    <React.Fragment>
      {cartIsShown && <Cart onCartClose={hideCartHandler} />}
      <Header onCartOpen={showCartHandler} />
      <Greeting />
      <Menu />
    </React.Fragment>
  );
}

export default App;
