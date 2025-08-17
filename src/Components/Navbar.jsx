import { Link, useLocation } from "react-router-dom";
import { useCart } from "../Context/CartContext";

export default function Navbar() {
  const { cartCount } = useCart();
  const { pathname } = useLocation();

  const linkBase = "text-white text-xl hover:text-yellow-200 transition";
  const active = (path) => (pathname === path ? "underline underline-offset-8" : "");

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

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
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
          </div>
        </div>
      </div>
    </nav>
  );
}
