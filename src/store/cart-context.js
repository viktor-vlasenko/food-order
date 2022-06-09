import React, { useReducer, useEffect } from "react";

const CartContext = React.createContext({
  isOpen: false,
  items: [],
  totalAmount: 0,
  onAddItem: () => {},
  onMinusClick: () => {},
  onPlusClick: () => {},
  onOrder: () => {},
  onOpen: () => {},
  onClose: () => {},
});

const cartReducer = (state, action) => {
  if (action.type === "TOGGLE") {
    return {
      isOpen: action.val,
      items: state.items,
      totalAmount: state.totalAmount,
    };
  } else if (action.type === "ADD") {
    return {
      isOpen: state.isOpen,
      items: [...state.items, action.val],
      totalAmount: state.totalAmount + action.val.price * action.val.amount,
    };
  }
};

export const CartContextProvider = (props) => {
  const [cart, cartsDispatch] = useReducer(cartReducer, {
    isOpen: false,
    items: [],
    totalAmount: 0,
  });

  const openHandler = () => {
    cartsDispatch({ type: "TOGGLE", val: true });
  };

  const closeHandler = () => {
    cartsDispatch({ type: "TOGGLE", val: false });
  };

  const addItemHandler = (addedItem) => {
    cartsDispatch({ type: "ADD", val: addedItem });
  };

  const minusClickHandler = () => {};

  const plusClickHandler = () => {};

  const orderHandler = () => {
    console.log("Ordering...");
  };

  return (
    <CartContext.Provider
      value={{
        isOpen: cart.isOpen,
        items: cart.items,
        totalAmount: cart.totalAmount,
        onAddItem: addItemHandler,
        onMinusClick: minusClickHandler,
        onPlusClick: plusClickHandler,
        onOrder: orderHandler,
        onOpen: openHandler,
        onClose: closeHandler,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
