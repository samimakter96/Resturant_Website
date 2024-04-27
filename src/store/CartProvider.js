import { useEffect, useState } from "react";
import CartContext from "./cart-context";


const CartProvider = (props) => {
  const [items, setItems] = useState([]);

  const addItemToCartHandler = (item) => {
    setItems([...items, item]);
  };

  const removeItemFromCartHandler = (id) => {};

  // Calculate the total amount whenever items change
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const total = items.reduce((accumulator, item) => {
      return accumulator + item.price; // Assuming each item has a 'price' property
    }, 0);

    // Format total amount to two decimal places
    setTotalAmount(parseFloat(total.toFixed(2)));
  }, [items]);

  const cartContext = {
    items: items,
    totalAmount: totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};


export default CartProvider;