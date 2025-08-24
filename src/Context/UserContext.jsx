import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check login status on mount
  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
      credentials: "include",
      headers: {
        "Authorization": token ? `Bearer ${token}` : undefined,
      },
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.token) setToken(data.token);
        setUser(data?.user || null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = ({ user, token }) => {
    setUser(user);
    setToken(token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
