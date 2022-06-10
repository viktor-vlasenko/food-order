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
  } else if (action.type === "CHANGE") {
    return {
      isOpen: state.isOpen,
      items: action.val.cartItems,
      totalAmount: action.val.newTotalAmount,
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

  const itemInCart = (id) => {
    for (let i = 0; i < cart.items.length; i++) {
      if (cart.items[i].id === id) return i;
    }
    return false;
  };

  const addItemHandler = (addedItem) => {
    let inCart = itemInCart(addedItem.id);
    if (inCart !== false) {
      console.log("plussss");
      let newCartItems = changeAmount(addedItem.id, addedItem.amount);
      cartsDispatch({ type: "CHANGE", val: newCartItems });
    } else {
      cartsDispatch({ type: "ADD", val: addedItem });
    }
  };

  const changeAmount = (id, amount) => {
    let cartItems = [...cart.items];
    let idx = itemInCart(id);
    cartItems[idx].amount = Number(cartItems[idx].amount) + Number(amount);
    let newTotalAmount = 0;
    if (cartItems[idx].amount <= 0) {
      cartItems.splice(idx, 1);
    }
    for (let item of cartItems) {
      newTotalAmount += item.amount * item.price;
    }
    return { cartItems: cartItems, newTotalAmount: newTotalAmount };
  };

  const minusClickHandler = (id) => {
    changeAmount(id, -1);
  };

  const plusClickHandler = (id) => {
    changeAmount(id, 1);
  };

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
