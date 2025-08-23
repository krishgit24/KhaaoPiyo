import { useContext, useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { useCart } from "../Context/CartContext";

export default function Navbar() {
  const { user, logout } = useContext(UserContext);
  const { cartCount } = useCart();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Dropdown state
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    logout();
    setShowDropdown(false);
    navigate("/");
  };

  const linkBase = "text-white text-xl hover:text-yellow-200 transition";
  const active = (path) => (pathname === path ? "underline underline-offset-8" : "");

  // Get initials for profile icon
  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase();
  };

  return (
    <nav className="bg-gradient-to-r from-amber-400 to-red-500 shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <i className="fa-solid fa-utensils text-3xl text-red-700 bg-amber-200 py-4 h-16 w-12 flex items-center justify-center rounded-full shadow-md"></i>
            <span className="text-2xl font-bold text-white tracking-wide">KhaaoPiyo</span>
          </Link>

          {/* Menu Links */}
          <div className="hidden sm:flex space-x-12">
            <Link to="/" className={`${linkBase} ${active("/")}`}>Home</Link>
            <Link to="/menu" className={`${linkBase} ${active("/menu")}`}>Menu</Link>
            <Link to="/about" className={`${linkBase} ${active("/about")}`}>About</Link>
            <Link to="/contact" className={`${linkBase} ${active("/contact")}`}>Contact</Link>
            <Link to="/cart" className="text-white relative">
              <span className="text-xl">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-black text-white text-xs rounded-full px-2 py-0.5">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Auth/Profile Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  className="bg-white text-red-500 font-bold rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-red-500 hover:text-white transition text-lg"
                  onClick={() => setShowDropdown((v) => !v)}
                  aria-label="Profile"
                >
                  {getInitials(user.name)}
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50">
                    <div className="px-4 py-2 text-gray-700 border-b">
                      <span className="font-semibold">{user.name}</span>
                      <br />
                      <span className="text-xs text-gray-500">{user.email}</span>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-amber-100 transition"
                      onClick={() => setShowDropdown(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-gray-700 hover:bg-amber-100 transition"
                      onClick={() => setShowDropdown(false)}
                    >
                      My Orders
                    </Link>
                    <div className="px-4 py-2 text-gray-700 border-t flex items-center justify-between">
                      <span>Points</span>
                      <span className="bg-yellow-400 text-white rounded-full px-2 py-0.5 text-xs font-bold">
                        {user.points || 0}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-100 font-semibold transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-white text-red-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-red-600 transition"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
