import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Always initialize as []
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState("");

  function addToCart(item) {
    setCart((prev) => {
      const exists = prev.find((i) => i._id === item._id);
      if (exists) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setNotification(`${item.title} added to cart!`);
    setTimeout(() => setNotification(""), 2000);
  }

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((p) => p._id !== id));

  const increase = (id) =>
    setCart((prev) =>
      prev.map((p) => (p._id === id ? { ...p, quantity: p.quantity + 1 } : p))
    );

  const decrease = (id) =>
    setCart((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, quantity: Math.max(1, p.quantity - 1) } : p
      )
    );

  const clearCart = () => setCart([]);

  const cartCount = useMemo(
    () => cart.reduce((a, b) => a + b.quantity, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () => cart.reduce((a, b) => a + b.quantity * b.price, 0),
    [cart]
  );

  const value = {
    cart,
    addToCart,
    removeFromCart,
    increase,
    decrease,
    clearCart,
    cartCount,
    cartTotal,
    notification, // expose notification
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);