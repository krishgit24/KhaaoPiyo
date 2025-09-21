// src/Pages/FoodDetails.jsx
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FoodContext } from "../Context/FoodContext";
import { useCart } from "../Context/CartContext";

export default function FoodDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getById, foods } = useContext(FoodContext);
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [rating] = useState(4.5);
  const food = getById(id);

  useEffect(() => {
    window.scrollTo(0, 0);
    setQuantity(1);
  }, [id]);

  if (!food) {
    // When API still loading or ID not found
    if (!foods.length) {
      return <p className="text-center mt-10">Loading...</p>;
    }
    return <h2 className="text-center text-red-500 mt-10">Food not found!</h2>;
  }

  return (
    <div className="bg-amber-100 min-h-screen py-10 px-5">
      <button
        className="mb-6 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
        onClick={() => navigate(-1)}
      >
        ⬅ Back
      </button>

      {/* Main Section */}
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 grid md:grid-cols-2 gap-8">
        <img src={food.image} alt={food.title} className="w-full h-80 object-contain rounded-lg" />

        <div>
          <h1 className="text-4xl font-bold mb-2">{food.title}</h1>
          <p className="text-yellow-500 font-semibold mb-2">⭐ {rating} / 5</p>
          <p className="text-2xl text-red-500 font-bold mb-4">₹{food.price}</p>
          <p className="text-gray-700 leading-relaxed mb-6">{food.desc}</p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              -
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              +
            </button>
          </div>

          <button
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition cursor-pointer"
            onClick={() => addToCart(food, quantity)}
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>

      {/* Related Items */}
      <div className="max-w-5xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">🍽 You may also like</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {foods
            .filter((item) => item._id !== id)
            .slice(0, 8)
            .map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/food/${item._id}`)}
                className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition hover:scale-105"
              >
                <img src={item.image} alt={item.title} className="h-40 mx-auto mb-3 object-contain" />
                <h3 className="font-semibold text-lg text-center">{item.title}</h3>
                <p className="text-red-500 text-center font-bold">₹{item.price}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
