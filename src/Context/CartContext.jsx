// src/Context/CartContext.jsx
import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]); // [{id,title,price,image,quantity}]

  function addToCart(item) {
    setCartItems((prev) => {
      const exists = prev.find((i) => i._id === item._id);
      if (exists) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      // Use _id from backend
      return [...prev, { ...item, quantity: 1 }];
    });
  }

  const removeFromCart = (id) => setCartItems((prev) => prev.filter((p) => p.id !== id));

  const increase = (id) =>
    setCartItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p))
    );

  const decrease = (id) =>
    setCartItems((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, quantity: Math.max(1, p.quantity - 1) } : p))
        .filter((p) => p.quantity > 0)
    );

  const clearCart = () => setCartItems([]);

  const cartCount = useMemo(() => cartItems.reduce((a, b) => a + b.quantity, 0), [cartItems]);
  const cartTotal = useMemo(() => cartItems.reduce((a, b) => a + b.quantity * b.price, 0), [cartItems]);

  const value = { cartItems, addToCart, removeFromCart, increase, decrease, clearCart, cartCount, cartTotal };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
