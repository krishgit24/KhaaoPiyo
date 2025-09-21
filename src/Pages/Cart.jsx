// src/Pages/Cart.jsx
import { useCart } from "../Context/CartContext";
import { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate, Link } from "react-router-dom";

export default function Cart() {
  const { cartItems = [], clearCart, cartTotal, increase, decrease, removeFromCart } = useCart();
  const { user } = useContext(UserContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCheckout = async () => {
    setError("");
    if (!user) {
      setError("Please login to place an order.");
      return;
    }
    if (!cartItems.length) {
      setError("Your cart is empty.");
      return;
    }
    try {
      const items = cartItems.map((item) => ({
        food: item._id, // must be _id, not id
        quantity: item.quantity,
      }));
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          // attach token
        },
        credentials: "include",
        body: JSON.stringify({ items, total: cartTotal }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Order failed");
        return;
      }
      clearCart();
      setTimeout(() => {
        navigate("/orders");
      }, 1500);
    } catch {
      setError("Network error");
    }
  };

  if (!cartItems.length) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Your cart is empty.<br />
        <Link to="/menu" className="text-red-500 underline">Browse Menu</Link>
      </div>
    );
  }

  return (
    <div className="bg-amber-100 min-h-screen py-10 px-6">
      <h1 className="text-4xl font-bold text-center text-red-600 mb-10">
        🛒 Your Cart
      </h1>
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8">
        <ul>
          {cartItems.map((item) => (
            <li key={item._id} className="flex items-center border-b py-4 gap-4">
              <img src={item.image} alt={item.title} className="w-16 h-16 rounded object-cover border" />
              <div className="flex-1">
                <div className="font-semibold text-lg">{item.title}</div>
                <div className="text-gray-500">₹{item.price}</div>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => decrease(item._id)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >-</button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    onClick={() => increase(item._id)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >+</button>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="ml-4 px-2 py-1 bg-red-100 text-red-600 rounded"
                  >Remove</button>
                </div>
              </div>
              <div className="font-bold text-red-500 ml-4">
                ₹{item.price * item.quantity}
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-3">
          <p className="text-xl font-bold text-right">Total: ₹{cartTotal}</p>
          {error && <p className="text-red-500">{error}</p>}
          <button
            onClick={() => navigate("/checkout")}
            className="bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold py-3 rounded-xl shadow hover:scale-105 transition"
          >
            Proceed to Checkout
          </button>
          <button
            onClick={clearCart}
            className="bg-gray-200 text-gray-700 py-2 rounded-xl mt-2"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}