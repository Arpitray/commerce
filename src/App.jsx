import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './Components/Navbar'
import Home from './Components/Pages/Home'
import Categories from './Components/Pages/Categories'
import CategoryPage from './Components/Pages/CategoryPage'
import ProductPage from './Components/Pages/ProductPage'
import Cart from './Components/Cart'
import LoadingScreen from './Components/LoadingScreen'
import { CartProvider, useCart } from './context/CartContext'

function AppContent() {
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } = useCart()

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
      </Routes>
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />
    </>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  return (
    <CartProvider>
      <Router>
        <AppContent />
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </Router>
    </CartProvider>
  )
}

export default App
