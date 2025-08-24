// src/Context/FoodContext.jsx
import { createContext, useState, useEffect, useMemo } from "react";

export const FoodContext = createContext();

export function FoodProvider({ children }) {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");

    fetch(`${import.meta.env.VITE_API_URL}/api/foods`, {
      credentials: "include", // allow cookies if needed
    })
      .then((res) => res.json())
      .then((data) => {
        if (mounted) setFoods(data.items || []);
      })
      .catch((e) => {
        console.error(e);
        if (mounted) setError("Failed to load menu from backend.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const getById = (id) => foods.find((f) => f._id === String(id));

  const value = useMemo(() => ({ foods, loading, error, getById }), [foods, loading, error]);

  return <FoodContext.Provider value={value}>{children}</FoodContext.Provider>;
}
