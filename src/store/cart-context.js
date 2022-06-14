import React, { useReducer, useEffect } from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  onAddItem: () => {},
  onMinusClick: () => {},
  onPlusClick: () => {},
  onOrder: () => {},
});

const defaultState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    return {
      items: [...state.items, action.val],
      totalAmount: state.totalAmount,
    };
  } else if (action.type === "CHANGE") {
    return {
      items: action.val,
      totalAmount: state.totalAmount,
    };
  } else if (action.type === "ORDER") {
    return defaultState;
  }
  return defaultState;
};

export const CartContextProvider = (props) => {
  const [cart, cartDispatch] = useReducer(cartReducer, defaultState);

  const { items: cartItems } = cart;

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    cartDispatch({ type: "CHANGE", val: storedCart });
  }, []);

  useEffect(() => {
    updateStorage();
  }, [cartItems]);

  const itemInCart = (id) => {
    for (let i = 0; i < cart.items.length; i++) {
      if (cart.items[i].id === id) return i;
    }
    return false;
  };

  const addItemHandler = (addedItem) => {
    let inCart = itemInCart(addedItem.id);
    if (inCart !== false) {
      let newCartItems = changeAmount(addedItem.id, addedItem.amount);
      cartDispatch({ type: "CHANGE", val: newCartItems });
    } else {
      cartDispatch({ type: "ADD", val: addedItem });
    }
  };

  const updateStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart.items));
  };

  const changeAmount = (id, amount) => {
    let cartItems = [...cart.items];
    let idx = itemInCart(id);
    cartItems[idx].amount = Number(cartItems[idx].amount) + Number(amount);
    if (cartItems[idx].amount <= 0) {
      cartItems.splice(idx, 1);
    }
    return cartItems;
  };

  const calculateTotalAmount = (items) => {
    let newTotal = 0;
    for (let item of items) {
      newTotal += item.amount * item.price;
    }
    return newTotal;
  };

  const minusClickHandler = (id) => {
    cartDispatch({ type: "CHANGE", val: changeAmount(id, -1) });
  };

  const plusClickHandler = (id) => {
    cartDispatch({ type: "CHANGE", val: changeAmount(id, 1) });
  };

  const orderHandler = () => {
    console.log("Ordering...");
    cartDispatch({ type: "ORDER" });
    localStorage.clear();
  };

  return (
    <CartContext.Provider
      value={{
        items: cart.items,
        totalAmount: calculateTotalAmount(cart.items),
        onAddItem: addItemHandler,
        onMinusClick: minusClickHandler,
        onPlusClick: plusClickHandler,
        onOrder: orderHandler,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
