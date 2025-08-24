import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./Context/UserContext.jsx";
import { FoodProvider } from "./Context/FoodContext.jsx";
import { CartProvider } from "./Context/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <FoodProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FoodProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
