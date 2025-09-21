// src/Pages/Checkout.jsx
import { useCart } from "../Context/CartContext";
import { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    address: "",
    paymentMode: "COD",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  if (loading) return <div className="text-center mt-10">Loading user info...</div>;
  if (!user) return <div className="text-center mt-10 text-red-500">Please login to checkout.</div>;
  if (!cartItems.length) return <div className="text-center mt-10 text-gray-500">Your cart is empty.</div>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.address.trim() || !form.paymentMode) {
      setError("Please fill all fields.");
      return;
    }

    setShowPayment(true);
    setTimeout(async () => {
      setShowPayment(false);
      setIsSubmitting(true);

      try {
        const items = cartItems.map((item) => ({
          food: item._id,
          quantity: item.quantity,
        }));

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            items,
            total: cartTotal,
            name: form.name,
            address: form.address,
            paymentMode: form.paymentMode,
          }),
        });

        if (!res.ok) {
          const data = await res.json();
          setError(data.message || "Order failed");
          setIsSubmitting(false);
          return;
        }

        const order = await res.json();
        clearCart();
        navigate(`/order-confirmation/${order._id}`);
      } catch {
        setError("Network error");
        setIsSubmitting(false);
      }
    }, 2000);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-xl shadow p-8">
      <h2 className="text-3xl font-bold mb-4 text-red-600">Checkout</h2>

      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <h3 className="text-xl font-bold mb-4 text-green-600">Processing Payment...</h3>
            <div className="animate-spin h-8 w-8 border-4 border-orange-400 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Please wait while we confirm your payment.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="border rounded px-4 py-2"
          required
        />
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Delivery Address"
          className="border rounded px-4 py-2"
          required
        />
        <select
          name="paymentMode"
          value={form.paymentMode}
          onChange={handleChange}
          className="border rounded px-4 py-2"
        >
          <option value="COD">Cash on Delivery</option>
          <option value="UPI">UPI</option>
          <option value="Card">Credit/Debit Card</option>
        </select>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold py-3 rounded-xl shadow hover:scale-105 transition"
        >
          {isSubmitting ? "Processing..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}
