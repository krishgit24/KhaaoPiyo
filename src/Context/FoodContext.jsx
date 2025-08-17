// src/Context/FoodContext.jsx
import { createContext, useState, useEffect, useMemo } from "react";

export const FoodContext = createContext();

export function FoodProvider({ children }) {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Normalize MealDB response to your structure
  const normalize = (meal) => ({
    id: meal.idMeal,
    title: meal.strMeal,
    price: Math.floor(Math.random() * 200) + 100, // since API doesn’t provide price
    image: meal.strMealThumb,
    desc: meal.strInstructions?.slice(0, 80) + "...", // short description
    category: meal.strCategory || "Fast Food",
  });

  useEffect(() => {
    let mounted = true;

    (async () => {
      setLoading(true);
      setError("");
      try {
        // keywords for search (burger, pizza, sandwich, fries, pasta, shake, etc.)
        const keywords = [
          "burger",
          "pizza",
          "sandwich",
          "fries",
          "bread",
          "pasta",
          "chocolate",
          "shake",
        ];

        // fetch from TheMealDB using fetch instead of axios
        const allData = await Promise.all(
          keywords.map((kw) =>
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${kw}`)
              .then((res) => res.json())
              .then((data) => (data.meals ? data.meals.map(normalize) : []))
              .catch(() => [])
          )
        );

        const flat = allData.flat();
        if (mounted) setFoods(flat);
      } catch (e) {
        console.error(e);
        setError("Failed to load menu; using sample items.");
        const fallback = [
          { id: 1, title: "Margherita Pizza", price: 200, image: "/pizza.png", desc: "Cheesy pizza" },
          { id: 2, title: "Cheese Burger", price: 150, image: "/burger.png", desc: "Juicy burger" },
          { id: 3, title: "French Fries", price: 120, image: "/fries.png", desc: "Crispy fries" },
          { id: 4, title: "Garlic Bread", price: 100, image: "/garlicbread.png", desc: "Garlic-loaded bread" },
          { id: 5, title: "Chocolate Shake", price: 130, image: "/shake.png", desc: "Sweet shake" },
        ];
        if (mounted) setFoods(fallback);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => (mounted = false);
  }, []);

  const getById = (id) => foods.find((f) => f.id === String(id));

  const value = useMemo(() => ({ foods, loading, error, getById }), [foods, loading, error]);

  return <FoodContext.Provider value={value}>{children}</FoodContext.Provider>;
}
