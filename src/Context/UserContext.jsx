// src/Context/UserContext.jsx
import { createContext, useState, useEffect, useMemo } from "react";

export const UserContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user info on mount (cookie-based session)
  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/auth/me`, {
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data?.user || null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  // Update user data
  const updateUser = (userData) => setUser(userData);

  // Logout: clear user and session cookie
  const logout = async () => {
    await fetch(`${API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, loading, updateUser, logout }),
    [user, loading]
  );

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
