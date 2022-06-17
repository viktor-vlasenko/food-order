import React, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Greeting from "./components/Greeting/Greeting";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import Checkout from "./components/Checkout/Checkout";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [checkout, setCheckout] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  }

  const hideCartHandler = () => {
    setCartIsShown(false);
  }

  const showCheckout = () => {
    setCheckout(true);
  }

  const hideCheckoutHandler = () => {
    setCheckout(false)
  }

  const backToCartHandler= () => {
    setCartIsShown(true);
    setCheckout(false);
  }

  return (
    <React.Fragment>
      {cartIsShown && <Cart onCheckout={showCheckout} onCartClose={hideCartHandler} />}
      {checkout && <Checkout backToCartHandler={backToCartHandler} hideCheckout={hideCheckoutHandler}/>}
      <Header onCartOpen={showCartHandler} />
      <Greeting />
      <Menu />
    </React.Fragment>
  );
}

export default App;
