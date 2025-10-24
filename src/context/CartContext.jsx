import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { fetchProductById } from '../lib/productUtils'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Get current user and set up auth listener
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user || null)
        
        // Load cart items for authenticated user (but don't block if it fails)
        if (session?.user) {
          // Load cart in background - don't await to avoid blocking
          loadCartFromDatabase(session.user.id).catch(error => {
            console.error('Failed to load cart on initialization:', error)
            setCartItems([])
          })
        }
      } catch (error) {
        console.error('Failed to get user session:', error)
        setUser(null)
      } finally {
        // Always set loading to false to unblock the app
        setLoading(false)
      }
    }
    
    getUser()

    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null)
      
      if (session?.user) {
        // Load cart in background
        loadCartFromDatabase(session.user.id).catch(error => {
          console.error('Failed to load cart on auth change:', error)
          setCartItems([])
        })
      } else {
        setCartItems([])
      }
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  // Load cart items from database
  const loadCartFromDatabase = async (userId) => {
    // Add timeout to prevent hanging
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Cart loading timeout')), 10000) // 10 second timeout
    })

    try {
      // Race between actual loading and timeout
      await Promise.race([
        (async () => {
          // Get cart items from database
          const { data: cartData, error: cartError } = await supabase
            .from('cart_items')
            .select('*')
            .eq('user_id', userId)

          if (cartError) {
            console.error('Error loading cart:', cartError)
            setCartItems([])
            return
          }

          if (!cartData || cartData.length === 0) {
            setCartItems([])
            return
          }

          // Fetch actual product details for each cart item
          const cartItemsWithProducts = []
          
          for (const cartItem of cartData) {
            const productData = await fetchProductById(cartItem.product_id)
            
            if (productData) {
              // Add the quantity from cart to the product data
              cartItemsWithProducts.push({
                ...productData,
                quantity: cartItem.quantity,
                cartItemId: cartItem.id
              })
            } else {
              // If product fetch fails, create a placeholder
              console.warn(`Product ${cartItem.product_id} not found, using placeholder`)
              cartItemsWithProducts.push({
                id: cartItem.product_id,
                name: `Product ${cartItem.product_id}`,
                price: 0,
                image: '/placeholder.jpg',
                quantity: cartItem.quantity,
                cartItemId: cartItem.id
              })
            }
          }

          setCartItems(cartItemsWithProducts)
          console.log('Cart loaded successfully with product details:', cartItemsWithProducts)
        })(),
        timeoutPromise
      ])
    } catch (error) {
      if (error.message === 'Cart loading timeout') {
        console.warn('Cart loading timed out, proceeding with empty cart')
      } else {
        console.error('Error loading cart:', error)
      }
      setCartItems([])
    }
  }

  // Add item to cart (with database sync)
  const addToCart = async (product, quantity = 1) => {
    if (!user) {
      alert('Please login first!')
      return
    }

    try {
      // Ensure product_id type matches DB (products table may use integer ids)
      const productId = typeof product.id === 'string' && !product.id.includes('-')
        ? Number(product.id)
        : product.id

      // Use string onConflict as expected by supabase-js
      const { data, error } = await supabase
        .from('cart_items')
        .upsert({
          user_id: user.id,
          product_id: productId,
          quantity: quantity
        }, {
          onConflict: 'user_id,product_id'
        })

      console.log('Supabase upsert response:', { data, error })

      if (error) {
        console.error('Database cart update failed:', error)
        // Fall back to local storage only
        updateLocalCart(product, quantity)
        alert(`${product.name} added to cart! (Local storage only)`)
        return
      }

      // Database update successful
      updateLocalCart(product, quantity)
      setIsCartOpen(true)
      alert(`${product.name} added to cart!`)
      
    } catch (error) {
      console.error('Error adding to cart:', error)
      // Fall back to local storage
      updateLocalCart(product, quantity)
      alert(`${product.name} added to cart! (Local storage only)`)
    }
  }

  // Helper function to update local cart state
  const updateLocalCart = (product, quantity) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      
      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        // Add new item with proper product structure
        const cartItem = {
          id: product.id,
          name: product.name || product.title, // Handle both 'title' and 'name'
          price: product.price,
          description: product.description,
          image: product.image || product.images?.[0] || product.thumbnail,
          brand: product.brand,
          category: product.category,
          rating: product.rating,
          stock: product.stock,
          quantity: quantity
        }
        return [...prevItems, cartItem]
      }
    })
  }

  // Update quantity (with database sync)
  const updateQuantity = async (productId, newQuantity) => {
    if (!user) return

    try {
      if (newQuantity <= 0) {
        await removeFromCart(productId)
        return
      }

      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('user_id', user.id)
        .eq('product_id', productId)

      if (error) {
        console.error('Error updating quantity:', error)
        return
      }

      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      )
    } catch (error) {
      console.error('Error updating quantity:', error)
    }
  }

  // Remove item from cart (with database sync)
  const removeFromCart = async (productId) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId)

      if (error) {
        console.error('Error removing from cart:', error)
        return
      }

      setCartItems(prevItems =>
        prevItems.filter(item => item.id !== productId)
      )
    } catch (error) {
      console.error('Error removing from cart:', error)
    }
  }

  // Clear entire cart (with database sync)
  const clearCart = async () => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)

      if (error) {
        console.error('Error clearing cart:', error)
        return
      }

      setCartItems([])
    } catch (error) {
      console.error('Error clearing cart:', error)
    }
  }

  const getCartTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  const getCartCount = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0)
  }

  const value = {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
    user,
    loading
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
} 