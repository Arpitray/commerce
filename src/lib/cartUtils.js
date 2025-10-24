import { supabase } from './supabaseClient'

export const cartOperations = {
  // Add item to cart with Supabase integration
  async addToCart(product, user, quantity = 1) {
    if (!user) {
      throw new Error('Please login first!')
    }

    try {
      const { data, error } = await supabase
        .from('cart_items')
        .upsert(
          {
            user_id: user.id,
            product_id: product.id,
            quantity: quantity,
          },
          { 
            onConflict: ['user_id', 'product_id'],
            ignoreDuplicates: false 
          }
        )
        .select()

      if (error) {
        console.error('Error adding to cart:', error)
        throw error
      }

      return { success: true, data }
    } catch (error) {
      console.error('Error adding to cart:', error)
      throw error
    }
  },

  // Get user's cart items
  async getCartItems(userId) {
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          products:product_id (*)
        `)
        .eq('user_id', userId)

      if (error) {
        console.error('Error fetching cart items:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error fetching cart items:', error)
      throw error
    }
  },

  // Update cart item quantity
  async updateCartItemQuantity(userId, productId, newQuantity) {
    try {
      if (newQuantity <= 0) {
        return await this.removeFromCart(userId, productId)
      }

      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('user_id', userId)
        .eq('product_id', productId)
        .select()

      if (error) {
        console.error('Error updating cart item:', error)
        throw error
      }

      return { success: true, data }
    } catch (error) {
      console.error('Error updating cart item:', error)
      throw error
    }
  },

  // Remove item from cart
  async removeFromCart(userId, productId) {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId)

      if (error) {
        console.error('Error removing from cart:', error)
        throw error
      }

      return { success: true }
    } catch (error) {
      console.error('Error removing from cart:', error)
      throw error
    }
  },

  // Clear entire cart
  async clearCart(userId) {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId)

      if (error) {
        console.error('Error clearing cart:', error)
        throw error
      }

      return { success: true }
    } catch (error) {
      console.error('Error clearing cart:', error)
      throw error
    }
  },

  // Get cart summary (total items, total price)
  async getCartSummary(userId) {
    try {
      const cartItems = await this.getCartItems(userId)
      
      const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = cartItems.reduce((sum, item) => {
        return sum + (item.products.price * item.quantity)
      }, 0)

      return {
        totalItems,
        totalPrice,
        itemCount: cartItems.length
      }
    } catch (error) {
      console.error('Error getting cart summary:', error)
      throw error
    }
  }
}

// Legacy function for backward compatibility
export async function addToCart(product, user) {
  return cartOperations.addToCart(product, user, 1)
}