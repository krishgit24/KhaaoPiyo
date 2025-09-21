// src/Components/Card.jsx
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export default function Card({ _id, title, image, price, discount = 20 }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const discountedPrice = discount ? Math.round(price * (1 - discount / 100)) : price;

  return (
    <div
      className="relative bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 
                 border border-gray-200 shadow-lg rounded-2xl w-72
                 flex flex-col overflow-hidden transform transition duration-300
                 hover:scale-[1.03] hover:shadow-2xl"
    >
      {/* Food Image */}
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white 
                           text-xs font-bold px-2 py-1 rounded-lg shadow-md">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-4">
        <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h2>

        {/* Price Section */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-black font-bold text-lg">₹{discountedPrice}</span>
          {discount > 0 && (
            <span className="text-sm text-gray-700 line-through">₹{price}</span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => addToCart({ _id, title, image, price: discountedPrice })}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500
                     hover:from-red-600 hover:to-orange-600
                     text-white font-semibold py-2 px-4 rounded-xl
                     shadow-md flex items-center justify-center gap-2
                     transition-all duration-300 active:scale-95 cursor-pointer"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>

        {/* View Details */}
        <button
          onClick={() => navigate(`/food/${_id}`)}
          className="w-full mt-2 bg-white/70 text-gray-800 font-semibold py-2 px-4 rounded-xl
                     border border-gray-300 shadow-sm
                     hover:bg-white hover:text-black
                     transition-all duration-300 cursor-pointer"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
