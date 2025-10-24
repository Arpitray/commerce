import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './Components/Navbar'
import Home from './Components/Pages/Home'
import Categories from './Components/Pages/Categories'
import CategoryPage from './Components/Pages/CategoryPage'
import ProductPage from './Components/Pages/ProductPage'
import Contact from './Components/Contact'
import Cart from './Components/Cart'
import LoadingScreen from './Components/LoadingScreen'
import AuthPage from './auth/AuthPage'
import { CartProvider, useCart } from './context/CartContext'
import ProtectedRoute from './auth/ProtectedRoute'

function AppContent() {
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } = useCart()

  return (
    <>
      <Routes>
        {/* Auth route - accessible without protection */}
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Protected routes */}
        <Route path="/*" element={
          <ProtectedRoute>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/product/:productId" element={<ProductPage />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
            <Cart 
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              cartItems={cartItems}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
            />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  // Safety timeout to ensure loading screen doesn't hang forever
  useEffect(() => {
    const safetyTimeout = setTimeout(() => {
      if (isLoading) {
        console.warn('Loading screen timeout reached, forcing hide')
        setIsLoading(false)
      }
    }, 5000) // 5 second timeout

    return () => clearTimeout(safetyTimeout)
  }, [isLoading])

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
