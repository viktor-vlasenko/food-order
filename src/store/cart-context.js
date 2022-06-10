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
      totalAmount: state.totalAmount,
    };
  } else if (action.type === "CHANGE") {
    return {
      isOpen: state.isOpen,
      items: action.val,
      totalAmount: state.totalAmount,
    };
  } else if (action.type === "ORDER") {
    return {
      isOpen: false,
      items: [],
      totalAmount: 0,
    };
  }
};

export const CartContextProvider = (props) => {
  const [cart, cartsDispatch] = useReducer(cartReducer, {
    isOpen: false,
    items: [],
    totalAmount: 0,
  });

  const { items: cartItems } = cart;

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    cartsDispatch({ type: "CHANGE", val: storedCart });
  }, []);

  useEffect(() => {
    updateStorage();
  }, [cartItems]);

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
      let newCartItems = changeAmount(addedItem.id, addedItem.amount);
      cartsDispatch({ type: "CHANGE", val: newCartItems });
    } else {
      cartsDispatch({ type: "ADD", val: addedItem });
    }
  };

  const updateStorage = async () => {
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
    cartsDispatch({ type: "CHANGE", val: changeAmount(id, -1) });
  };

  const plusClickHandler = (id) => {
    cartsDispatch({ type: "CHANGE", val: changeAmount(id, 1) });
  };

  const orderHandler = () => {
    if (cart.items.length === 0) {
      cartsDispatch({ type: "TOGGLE", val: false });
    } else {
      console.log("Ordering...");
      cartsDispatch({ type: "ORDER" });
      localStorage.clear();
    }
  };

  return (
    <CartContext.Provider
      value={{
        isOpen: cart.isOpen,
        items: cart.items,
        totalAmount: calculateTotalAmount(cart.items),
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
