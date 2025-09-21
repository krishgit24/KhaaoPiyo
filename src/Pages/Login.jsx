import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // to include cookies
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Store token + user data in context
      login({ user: data.user, token: data.token });

      navigate("/"); // redirect after login
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-amber-200 via-amber-100 to-red-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-96 border-t-4 border-red-500"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-red-600">Welcome Back</h2>
        {error && <p className="text-center text-red-500 mb-4">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-red-500 to-orange-400 text-white py-3 rounded-xl font-semibold shadow hover:scale-105 transition"
        >
          Login
        </button>

        <p className="text-center mt-6 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-red-500 font-semibold hover:underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;