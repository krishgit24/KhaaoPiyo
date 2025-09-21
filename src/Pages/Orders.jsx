import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";

export default function Orders() {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setOrders(data))
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) {
    return <div className="text-center mt-10 text-red-500">Please login to view your orders.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white rounded-xl shadow p-8">
      <h2 className="text-3xl font-bold mb-4 text-red-600">My Orders</h2>
      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id} className="mb-6 border-b pb-4">
              <div className="font-semibold mb-2">Order #{order._id.slice(-6).toUpperCase()}</div>
              <div>
                {order.items.map((item) => (
                  <div key={item.food._id} className="flex justify-between text-sm mb-1">
                    <span>{item.food.title}</span>
                    <span>Qty: {item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="text-red-500 font-bold mt-2">Total: ₹{order.total}</div>
              <div className="text-xs text-gray-400">Placed: {new Date(order.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}