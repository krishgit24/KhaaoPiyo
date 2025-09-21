import { useCart } from "../Context/CartContext";
import { Trash2, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart = [], removeFromCart, increaseQty, decreaseQty } = useCart();
  const navigate = useNavigate();

  // Defensive reduce
  const subtotal = (cart || []).reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (Number(item.qty) || 1),
    0
  );
  const deliveryFee = subtotal > 0 ? 40 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="max-w-6xl mx-auto mt-6 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Cart Items */}
      <div className="md:col-span-2 bg-white rounded-2xl shadow-md p-5">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item._id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <h2 className="font-semibold text-gray-800">{item.title}</h2>
                    <p className="text-sm text-gray-600">₹{Number(item.price) || 0}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => decreaseQty(item._id)} className="px-2 py-1 bg-gray-200 rounded cursor-pointer"> <Minus size={14} /> </button>
                  <span className="font-semibold">{Number(item.qty) || 1}</span>
                  <button onClick={() => increaseQty(item._id)} className="px-2 py-1 bg-gray-200 rounded cursor-pointer"> <Plus size={14} /> </button>
                  <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:text-red-700 cursor-pointer"> <Trash2 size={18} /> </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-2xl shadow-md p-5 h-fit sticky top-20">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="flex justify-between text-gray-700 mb-2">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-gray-700 mb-2">
          <span>Delivery Fee</span>
          <span>₹{deliveryFee}</span>
        </div>
        <hr className="my-3" />
        <div className="flex justify-between text-lg font-semibold text-gray-900 mb-4">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
        <button
          onClick={() => navigate("/checkout")}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold py-3 rounded-xl shadow-lg transition-all cursor-pointer"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}