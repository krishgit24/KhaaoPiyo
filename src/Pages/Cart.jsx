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
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-amber-100">
        <img src="/empty-cart.svg" alt="Empty Cart" className="w-40 mb-6" />
        <div className="text-2xl font-semibold text-gray-500 mb-2">Your cart is empty</div>
        <Link to="/menu" className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold shadow hover:scale-105 transition">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-amber-100 min-h-screen py-10 px-6 flex justify-center">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl">
        {/* Cart Items */}
        <div className="flex-1 bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-red-600 mb-8">🛒 Your Cart</h1>
          <ul>
            {cartItems.map((item) => (
              <li key={item._id} className="flex items-center border-b py-6 gap-6">
                <img src={item.image} alt={item.title} className="w-20 h-20 rounded-lg object-cover border" />
                <div className="flex-1">
                  <div className="font-semibold text-xl">{item.title}</div>
                  <div className="text-gray-500 mb-2">₹{item.price}</div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decrease(item._id)}
                      className="px-3 py-1 bg-gray-200 rounded-full text-lg font-bold"
                    >-</button>
                    <span className="px-4 text-lg font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => increase(item._id)}
                      className="px-3 py-1 bg-gray-200 rounded-full text-lg font-bold"
                    >+</button>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="ml-6 px-3 py-1 bg-red-100 text-red-600 rounded-full font-semibold"
                    >Remove</button>
                  </div>
                </div>
                <div className="font-bold text-red-500 text-xl ml-4">
                  ₹{item.price * item.quantity}
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={clearCart}
            className="bg-gray-200 text-gray-700 py-2 rounded-xl mt-6 w-full font-semibold"
          >
            Clear Cart
          </button>
        </div>
        {/* Summary Sidebar */}
        <div className="w-full md:w-80 bg-white rounded-xl shadow-lg p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-red-600">Order Summary</h2>
            <div className="flex justify-between mb-4 text-lg">
              <span>Items:</span>
              <span>{cartItems.length}</span>
            </div>
            <div className="flex justify-between mb-4 text-lg">
              <span>Total:</span>
              <span className="font-bold text-red-500">₹{cartTotal}</span>
            </div>
            {error && <p className="text-red-500 mb-2">{error}</p>}
          </div>
          <button
            onClick={() => navigate("/checkout")}
            className="bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold py-3 rounded-xl shadow hover:scale-105 transition mt-8"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}