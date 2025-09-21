import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Menu from "./Pages/Menu";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import FoodDetails from "./Pages/FoodDetails";
import { CartProvider } from "./Context/CartContext";
import { FoodProvider } from "./Context/FoodContext";
import Cart from "./Pages/Cart";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import { UserProvider } from "./Context/UserContext";
import Profile from "./Pages/Profile";
import Orders from "./Pages/Orders";
import Checkout from "./Pages/Checkout";
import Orderconfirmation from "./Pages/OrderConfirmation";
import Points from "./Pages/Points.jsx";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-amber-200">
      <UserProvider>
        <FoodProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/food/:id" element={<FoodDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmation/:id" element={<Orderconfirmation />} />
                <Route path="/points" element={<Points />} />
              </Routes>
            </main>
            <Footer />
          </CartProvider>
        </FoodProvider>
      </UserProvider>
    </div>
  );
}

export default App;
