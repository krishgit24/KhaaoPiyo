import { createContext, useState, useEffect, useMemo, useContext } from "react";
import { UserContext } from "./UserContext"; // import UserContext

export const FoodContext = createContext();

export function FoodProvider({ children }) {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { token } = useContext(UserContext); // get token from UserContext

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch all foods
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");

    fetch(`${API_URL}/api/foods`, {
      headers: token ? { "Authorization": `Bearer ${token}` } : undefined,
      credentials: "include",
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
  }, [token]); // re-fetch if token changes (useful for admin login)

  // Get food by ID
  const getById = (id) => foods.find((f) => f._id === String(id));

  // Example protected actions for admin
  const createFood = async (foodData) => {
    const res = await fetch(`${API_URL}/api/foods`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // require token
      },
      credentials: "include",
      body: JSON.stringify(foodData),
    });
    if (!res.ok) throw new Error("Failed to create food");
    const data = await res.json();
    setFoods((prev) => [...prev, data]);
    return data;
  };

  const updateFood = async (id, updateData) => {
    const res = await fetch(`${API_URL}/api/foods/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(updateData),
    });
    if (!res.ok) throw new Error("Failed to update food");
    const updated = await res.json();
    setFoods((prev) => prev.map((f) => (f._id === id ? updated : f)));
    return updated;
  };

  const deleteFood = async (id) => {
    const res = await fetch(`${API_URL}/api/foods/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` },
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to delete food");
    setFoods((prev) => prev.filter((f) => f._id !== id));
  };

  const value = useMemo(
    () => ({ foods, loading, error, getById, createFood, updateFood, deleteFood }),
    [foods, loading, error]
  );

  return <FoodContext.Provider value={value}>{children}</FoodContext.Provider>;
}