// src/Pages/Menu.jsx
import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FoodContext } from "../Context/FoodContext";
import { useCart } from "../Context/CartContext";
import { ShoppingCart, Search } from "lucide-react";

export default function Menu() {
  const navigate = useNavigate();
  const { foods, loading, error } = useContext(FoodContext);
  const { addToCart } = useCart();

  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(18);
  const [category, setCategory] = useState("all");

  // ✅ Normalize categories from food title
  const normalizeCategory = (title) => {
    const t = title.toLowerCase();
    if (t.includes("burger")) return "burger";
    if (t.includes("pizza")) return "pizza";
    if (t.includes("sandwich")) return "sandwich";
    if (t.includes("pasta")) return "pasta";
    if (t.includes("fries")) return "fries";
    if (t.includes("chocolate")) return "chocolate";
    if (t.includes("bread")) return "bread";
    return "other";
  };

  // ✅ Create a corrected food list
  const foodsWithCategory = foods.map((f) => ({
    ...f,
    category: normalizeCategory(f.title),
  }));

  // ✅ Categories from normalized list
  const categories = ["all", ...new Set(foodsWithCategory.map((f) => f.category))];

  // ✅ Filtering works on normalized list
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = foodsWithCategory;

    if (category !== "all") {
      list = list.filter((f) => f.category === category);
    }

    if (q) {
      list = list.filter((f) => f.title.toLowerCase().includes(q));
    }

    return list.slice(0, limit);
  }, [foodsWithCategory, search, limit, category]);


  return (
    <div className="bg-amber-200 min-h-screen py-10 px-5">

      {/* 🔥 Unified Header Box */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-center text-white mb-10 shadow-xl">
        <h1 className="text-4xl font-extrabold tracking-wide">🍴 Menu</h1>
        <p className="mt-3 text-lg">Order your favorite food, hot & fresh!</p>
      </div>

      {error && <p className="text-center text-red-600 mb-4">{error}</p>}

      {/* 🔍 Search + Category Filter */}
      <div className="flex flex-col items-center gap-6 mb-10">

        {/* Modern Search Bar */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search delicious food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 shadow-md focus:ring-2 focus:ring-red-400 outline-none transition"
          />
        </div>

        {/* Category pills */}
        <div className="flex gap-3 overflow-x-auto px-4 pb-2 no-scrollbar">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition 
                ${category === cat ? "bg-red-500 text-white shadow-md" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Items */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-5">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-amber-300 h-64 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-5">
          {filtered.map((item) => (
            <div
              key={item._id}
              className="bg-gradient-to-tr from-orange-100 via-amber-100 to-yellow-100 
                         shadow-lg rounded-2xl flex flex-col overflow-hidden 
                         transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Image */}
              <div
                className="h-44 w-full overflow-hidden cursor-pointer"
                onClick={() => navigate(`/food/${item._id}`)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover rounded-xl transform transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow p-4">
                <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">
                  {item.title}
                </h2>

                <div className="flex items-center justify-between mb-3">
                  <p className="text-red-600 font-bold text-xl">₹{item.price}</p>
                  {item.category && (
                    <span className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-lg font-semibold">
                      {item.category}
                    </span>
                  )}
                </div>

                {/* Button */}
                <button
                  onClick={() =>
                    addToCart({
                      _id: item._id,
                      title: item.title,
                      image: item.image,
                      price: item.price,
                    })
                  }
                  className="w-full bg-gradient-to-r from-red-500 to-orange-400 
                             hover:from-orange-600 hover:to-red-500 text-white 
                             font-semibold py-2 px-4 rounded-xl shadow-md 
                             flex items-center justify-center gap-2 transition-all"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
