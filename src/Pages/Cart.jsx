// src/Pages/Cart.jsx
import { useCart } from "../Context/CartContext";
import { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate, Link } from "react-router-dom";

export default function Cart() {
  const { cartItems = [], clearCart, cartTotal } = useCart();
  const { user } = useContext(UserContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleCheckout = async () => {
    setError("");
    setSuccess("");
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
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ items, total: cartTotal }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Order failed");
        return;
      }
      setSuccess("Order placed successfully!");
      clearCart();
      setTimeout(() => {
        navigate("/orders");
      }, 1500);
    } catch {
      setError("Network error");
    }
  };

  if (!cartItems.length) {
    return <div className="text-center mt-10 text-gray-500">Your cart is empty.</div>;
  }

  return (
    <div className="bg-amber-100 min-h-screen py-10 px-6">
      <h1 className="text-4xl font-bold text-center text-red-600 mb-10">
        🛒 Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center bg-white p-10 rounded-2xl shadow-md max-w-lg mx-auto">
          <p className="text-gray-600 text-lg mb-4">Your cart is empty!</p>
          <Link
            to="/menu"
            className="inline-block bg-gradient-to-r from-red-500 to-orange-400 text-white px-6 py-3 rounded-xl font-semibold shadow hover:scale-105 transition"
          >
            Browse Menu 🍴
          </Link>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto mt-10 bg-white rounded-xl shadow p-8">
          <h2 className="text-3xl font-bold mb-4 text-red-600">Your Cart</h2>
          <ul>
            {cartItems.map((item) => (
              <li
                key={item._id}
                className="flex justify-between items-center mb-4"
              >
                <div>
                  <span className="font-semibold">{item.title}</span>
                  <span className="ml-2 text-gray-500">x{item.quantity}</span>
                </div>
                <span className="text-red-500 font-bold">
                  ₹{item.price * item.quantity}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3">
            <p className="text-xl font-bold">Total: ₹{cartTotal}</p>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-600">{success}</p>}
            <button
              onClick={() => navigate("/checkout")}
              className="bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold py-3 rounded-xl shadow hover:scale-105 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
