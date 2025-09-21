// src/Components/Card.jsx
import { ShoppingCart } from "lucide-react";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Card({ _id, title, image, price }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <div
      className="relative bg-white shadow-md rounded-2xl w-72 flex flex-col overflow-hidden 
                 transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
      onClick={() => navigate(`/food/${_id}`)}
    >
      {/* Food Image */}
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Content */}
      <div
        className="flex flex-col flex-grow p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2">
          {title}
        </h2>

        {/* Price */}
        <p className="text-gray-800 font-semibold text-lg mb-4">₹{price}</p>

        {/* Button */}
        <div className="mt-auto">
          <button
            onClick={() => addToCart({ _id, title, image, price })}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 
                       hover:from-red-600 hover:to-orange-600 
                       text-white font-semibold py-2 px-4 rounded-lg 
                       shadow-md flex items-center justify-center gap-2 
                       transition-all duration-300 cursor-pointer"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
