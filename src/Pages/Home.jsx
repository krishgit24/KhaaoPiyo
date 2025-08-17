// src/Pages/Home.jsx
import { useContext } from "react";
import Card from "../Components/Card.jsx";
import { FoodContext } from "../Context/FoodContext";

export default function Home() {
  const { foods, loading, error } = useContext(FoodContext);

  const featured = foods.slice(0, 8);

  return (
    <div className="bg-amber-200 min-h-screen py-10 px-6">
      <h1 className="text-4xl font-extrabold text-center text-red-600 drop-shadow-md mb-12">
        🍔 Fast Food 
      </h1>

      {error && <p className="text-center text-red-700 font-medium mb-6">{error}</p>}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 place-items-center">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-orange-200 h-80 w-72 rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 place-items-center">
          {featured.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      )}
    </div>
  );
}
