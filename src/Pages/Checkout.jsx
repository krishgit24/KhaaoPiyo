// src/Pages/Checkout.jsx
import { useCart } from "../Context/CartContext";
import { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    address: "",
    paymentMode: "COD",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (loading) return <div style={{ textAlign: "center", marginTop: "3rem" }}>Loading user info...</div>;
  if (!user) return <div style={{ textAlign: "center", marginTop: "3rem", color: "#d32f2f" }}>Please login to checkout.</div>;
  if (!cart.length) return <div style={{ textAlign: "center", marginTop: "3rem", color: "#888" }}>Your cart is empty.</div>;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!form.name.trim() || !form.address.trim()) {
      setError("Please fill all fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      const items = cart.map((item) => ({
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
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px #eee", padding: 24 }}>
      <h2 style={{ fontWeight: "bold", fontSize: 28, marginBottom: 24, color: "#d32f2f" }}>Checkout</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          style={{ padding: 8, borderRadius: 8, border: "1px solid #eee" }}
          required
        />
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Delivery Address"
          style={{ padding: 8, borderRadius: 8, border: "1px solid #eee" }}
          required
        />
        <select
          name="paymentMode"
          value={form.paymentMode}
          onChange={handleChange}
          style={{ padding: 8, borderRadius: 8, border: "1px solid #eee" }}
        >
          <option value="COD">Cash on Delivery</option>
          <option value="UPI">UPI</option>
          <option value="Card">Credit/Debit Card</option>
        </select>
        {error && <div style={{ color: "#d32f2f", marginBottom: 8 }}>{error}</div>}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{ background: "#d32f2f", color: "#fff", padding: "10px 0", borderRadius: 8, border: "none", fontWeight: "bold", cursor: "pointer" }}
        >
          {isSubmitting ? "Processing..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}
