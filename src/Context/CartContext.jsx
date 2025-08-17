// src/Context/CartContext.jsx
import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]); // [{id,title,price,image,quantity}]

  const addToCart = (item, qty = 1) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((p) => p.id === item.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + qty };
        return next;
      }
      return [...prev, { ...item, quantity: qty }];
    });
  };

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
