import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";

function getDisplayStatus(order) {
  if (order.status === "Preparing") {
    const placedTime = new Date(order.createdAt).getTime();
    const now = Date.now();
    // If order is older than 1 hour, mark as Completed
    if (now - placedTime > 60 * 60 * 1000) {
      return "Completed";
    }
  }
  return order.status;
}

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
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-8 text-red-600 text-center">My Orders</h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders yet.</p>
      ) : (
        <div className="flex flex-col gap-8">
          {orders.map((order) => {
            const displayStatus = getDisplayStatus(order);
            return (
              <div key={order._id} className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-semibold text-lg">
                    Order #{order._id.slice(-6).toUpperCase()}
                  </div>
                  <span className={`px-3 py-1 rounded-full font-bold text-xs
                    ${
                      displayStatus === "Preparing"
                        ? "bg-yellow-400 text-white"
                        : displayStatus === "Out for delivery"
                        ? "bg-blue-400 text-white"
                        : displayStatus === "Delivered"
                        ? "bg-green-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}>
                    {displayStatus}
                  </span>
                </div>
                <div className="mb-4">
                  <div className="font-medium text-gray-700 mb-2">Items:</div>
                  <ul className="flex flex-col gap-2">
                    {order.items.map((item) => (
                      <li key={item.food._id} className="flex items-center gap-3">
                        <img
                          src={item.food.image}
                          alt={item.food.title}
                          className="w-10 h-10 object-cover rounded border"
                        />
                        <span className="flex-1">{item.food.title}</span>
                        <span className="text-gray-500">Qty: {item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-red-500 font-bold text-lg">
                    Total: ₹{order.total}
                  </div>
                  <div className="text-xs text-gray-400">
                    Placed: {new Date(order.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}