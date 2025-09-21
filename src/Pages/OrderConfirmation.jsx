import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function OrderConfirmation() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrder();
    // Simulate status updates: 1s, 2s, 3s
    const timer1 = setTimeout(() => updateStatus("Out for delivery"), 10000); // 1 second
    const timer2 = setTimeout(() => updateStatus("Delivered"), 20000); // 2 seconds
    const timer3 = setTimeout(() => updateStatus("Completed"), 30000); // 3 seconds (optional)
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [id]);

  const fetchOrder = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/orders/${id}`, {
      credentials: "include",
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => setOrder(data));
  };

  const updateStatus = async (newStatus) => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/orders/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status: newStatus }),
    });
    fetchOrder();
  };

  if (!order) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-xl shadow p-8 text-center">
      <h2 className="text-3xl font-bold mb-4 text-green-600">Order Placed!</h2>
      <p className="mb-2">Thank you for your order, <b>{order.name}</b>!</p>
      <p className="mb-2">Your food is being prepared and will be delivered to:</p>
      <p className="mb-4 font-semibold">{order.address}</p>
      <p className="mb-4">Estimated delivery: <b>30 minutes</b></p>
      <div className="mb-4">
        <span className={`px-3 py-1 rounded-full font-bold ${
          order.status === "Preparing" ? "bg-yellow-400 text-white"
          : order.status === "Out for delivery" ? "bg-blue-400 text-white"
          : order.status === "Delivered" ? "bg-green-500 text-white"
          : "bg-gray-500 text-white"
        }`}>
          Status: {order.status}
        </span>
      </div>
      <p className="mb-2">Order Total: <b>₹{order.total}</b></p>
      <p className="mt-6 text-gray-500">Track your order in <b>My Orders</b>!</p>
    </div>
  );
}