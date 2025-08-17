// src/Components/Card.jsx
import { ShoppingCart } from "lucide-react";
import { useCart } from "../Context/CartContext";

export default function Card({ id, title, image, price }) {
  const { addToCart } = useCart();

  return (
    <div
      className="bg-gradient-to-tr from-orange-100 via-amber-100 to-yellow-100 
                 shadow-xl rounded-2xl w-72 flex flex-col overflow-hidden 
                 transform transition-transform duration-300 
                 hover:scale-105 hover:shadow-2xl"
    >
      {/* Image with hover zoom */}
      <div className="h-44 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover rounded-xl 
                     transform transition-transform duration-500 
                     hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {title}
        </h2>
        <p className="text-red-600 font-bold text-xl mb-4">₹{price}</p>

        {/* Button aligned bottom */}
        <div className="mt-auto">
          <button
            onClick={() => addToCart({ id, title, image, price })}
            className="w-full bg-gradient-to-r from-red-500 to-orange-400 
                       hover:from-orange-500 hover:to-red-500 
                       text-white font-semibold py-2 px-4 rounded-xl 
                       shadow-md flex items-center justify-center gap-2 
                       transition-all duration-300"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
