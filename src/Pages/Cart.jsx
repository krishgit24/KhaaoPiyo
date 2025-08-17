// src/Pages/Cart.jsx
import { useCart } from "../Context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cartItems, removeFromCart, increase, decrease, cartTotal, clearCart } = useCart();

  return (
    <div className="bg-amber-100 min-h-screen py-10 px-6">
      <h1 className="text-4xl font-bold text-center text-red-600 mb-10">🛒 Your Cart</h1>

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
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Left side - Items */}
          <div className="md:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-2xl shadow-lg flex gap-6 p-5 hover:shadow-xl transition"
              >
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="h-28 w-28 object-cover rounded-lg border"
                  />
                </div>

                {/* Product Info + Controls */}
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">{item.title}</h2>
                    <p className="text-red-500 font-semibold mt-1">₹{item.price}</p>
                  </div>

                  <div className="flex items-center gap-4 mt-3">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                      <button 
                        className="w-7 h-7 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                        onClick={() => decrease(item.id)}
                      >
                        -
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button 
                        className="w-7 h-7 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                        onClick={() => increase(item.id)}
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button 
                      onClick={() => removeFromCart(item.id)} 
                      className="text-sm px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Price Total */}
                <div className="flex flex-col justify-between items-end">
                  <span className="text-lg font-bold text-gray-900">
                    ₹{item.quantity * item.price}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Summary */}
          <div className="bg-white rounded-xl shadow-md p-6 h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Items</span>
              <span className="font-semibold">{cartItems.length}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-700">Total</span>
              <span className="font-bold text-red-600">₹{cartTotal}</span>
            </div>

            <button 
              className="w-full bg-gradient-to-r from-red-500 to-orange-400 text-white py-3 rounded-xl font-semibold shadow hover:scale-105 transition mb-3"
            >
              Proceed to Checkout →
            </button>

            <button 
              onClick={clearCart} 
              className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg font-medium hover:bg-gray-300 transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
