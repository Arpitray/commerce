# Cart System Setup Guide

This guide will help you set up the complete cart system with Supabase integration.

## 1. Database Setup

### Step 1: Create Database Tables
1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/eypnrfshqyszmdjqozbu
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `database_setup.sql` and execute it
4. This will create:
   - `cart_items` table for storing user cart data
   - `products` table (if it doesn't exist)
   - Row Level Security policies
   - Indexes for performance

### Step 2: Add Sample Products (Optional)
1. In the SQL Editor, run the contents of `sample_products.sql`
2. This will add some sample products to test the cart functionality

## 2. Code Integration

### What's Already Done:
✅ **CartContext Updated**: Now includes Supabase integration and authentication
✅ **Database Operations**: All cart operations now sync with Supabase
✅ **Authentication Integration**: Cart automatically loads when user logs in
✅ **Error Handling**: Proper error handling for database operations

### Key Features:
- **Persistent Cart**: Cart items are saved to database and persist across sessions
- **User-Specific**: Each user has their own cart (secured with RLS)
- **Real-time Sync**: Local state and database stay in sync
- **Offline Support**: Local state works even if database operations fail

## 3. How It Works

### Adding Items to Cart:
```javascript
// The addToCart function now:
1. Checks if user is authenticated
2. Checks if item already exists in database
3. Either updates quantity or inserts new item
4. Updates local state
5. Shows success message
```

### Cart Persistence:
- Cart items are automatically loaded when user logs in
- Items persist across browser sessions
- Cart is cleared when user logs out

### Database Structure:
```sql
cart_items table:
- id (UUID, primary key)
- user_id (UUID, references auth.users)
- product_id (UUID, references products)
- quantity (integer)
- created_at, updated_at (timestamps)
```

## 4. Testing the Cart System

### Test Steps:
1. **Login**: Make sure you're logged in
2. **Add Items**: Click "Add to Cart" on any product
3. **Check Database**: Go to Supabase → Table Editor → cart_items to see the data
4. **Test Persistence**: Refresh the page - cart should still have items
5. **Test Updates**: Change quantities in cart - should update in database
6. **Test Removal**: Remove items from cart - should delete from database

### Debug Information:
- Check browser console for any errors
- All database operations log errors to console
- Cart loading happens automatically on authentication

## 5. Usage in Components

The cart system is now ready to use throughout your app:

```javascript
import { useCart } from '../context/CartContext'

function MyComponent() {
  const { 
    cartItems, 
    addToCart, 
    updateQuantity, 
    removeFromCart,
    user,
    loading 
  } = useCart()

  // All functions automatically handle database sync
}
```

## 6. Next Steps

After running the database setup:
1. Test adding items to cart
2. Verify items appear in Supabase database
3. Test cart persistence by refreshing page
4. Test with multiple users to ensure proper isolation

## 7. Troubleshooting

### Common Issues:
- **"Please login first!"**: User authentication is required
- **Database errors**: Check Supabase logs in dashboard
- **RLS errors**: Ensure user is properly authenticated
- **Cart not loading**: Check browser console for authentication errors

### Debugging Tips:
- Check Network tab in browser for failed requests
- Verify user session in Supabase auth logs
- Ensure products table has proper data structure