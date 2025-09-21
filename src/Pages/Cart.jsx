// src/Pages/CartPage.jsx
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, increase, decrease, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (!cart.length) {
    return (
      <div style={{ textAlign: "center", marginTop: "3rem", color: "#888" }}>
        Your cart is empty.
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px #eee", padding: 24 }}>
      <h2 style={{ fontWeight: "bold", fontSize: 28, marginBottom: 24, color: "#d32f2f" }}>Your Cart</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {cart.map(item => (
          <li key={item._id} style={{ display: "flex", alignItems: "center", marginBottom: 16, borderBottom: "1px solid #eee", paddingBottom: 12 }}>
            <img src={item.image} alt={item.title} style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover", marginRight: 16 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "bold" }}>{item.title}</div>
              <div style={{ color: "#d32f2f" }}>₹{item.price}</div>
            </div>
            <button onClick={() => decrease(item._id)} style={{ padding: "2px 8px", marginRight: 4, cursor: "pointer" }}>-</button>
            <span style={{ minWidth: 24, textAlign: "center" }}>{item.quantity}</span>
            <button onClick={() => increase(item._id)} style={{ padding: "2px 8px", marginLeft: 4, cursor: "pointer" }}>+</button>
            <button onClick={() => removeFromCart(item._id)} style={{ marginLeft: 12, color: "#d32f2f", background: "none", border: "none", cursor: "pointer" }}>Remove</button>
          </li>
        ))}
      </ul>
      <div style={{ fontWeight: "bold", fontSize: 18, marginTop: 24 }}>
        Total: ₹{cartTotal}
      </div>
      <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
        <button onClick={() => navigate("/checkout")} style={{ flex: 1, background: "#d32f2f", color: "#fff", padding: "10px 0", borderRadius: 8, border: "none", fontWeight: "bold", cursor: "pointer" }}>
          Proceed to Checkout
        </button>
        <button onClick={clearCart} style={{ flex: 1, background: "#eee", color: "#333", padding: "10px 0", borderRadius: 8, border: "none", fontWeight: "bold", cursor: "pointer" }}>
          Clear Cart
        </button>
      </div>
    </div>
  );
}
