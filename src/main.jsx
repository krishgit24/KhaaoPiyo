import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FoodProvider } from "./Context/FoodContext";
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
   <StrictMode>
    <FoodProvider>
      <BrowserRouter basename="/KhaaoPiyo">
        <App />
      </BrowserRouter>
    </FoodProvider>
  </StrictMode>
)
