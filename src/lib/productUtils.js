// Helper functions for product data handling
export const fetchProductById = async (productId) => {
  try {
    // Add timeout to prevent hanging on API calls
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout
    
    const response = await fetch(`https://dummyjson.com/products/${productId}`, {
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product ${productId}: ${response.status}`)
    }
    
    const productData = await response.json()
    
    // Transform API data to our consistent format
    return {
      id: productData.id,
      name: productData.title, // DummyJSON uses 'title'
      price: productData.price,
      description: productData.description,
      image: productData.images?.[0] || productData.thumbnail,
      brand: productData.brand,
      category: productData.category,
      rating: productData.rating,
      stock: productData.stock
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error(`Product fetch timeout for product ${productId}`)
    } else {
      console.error(`Error fetching product ${productId}:`, error)
    }
    return null
  }
}

export const transformProductData = (apiProduct) => {
  return {
    id: apiProduct.id,
    name: apiProduct.title || apiProduct.name,
    price: apiProduct.price,
    description: apiProduct.description,
    image: apiProduct.images?.[0] || apiProduct.thumbnail || apiProduct.image,
    brand: apiProduct.brand,
    category: apiProduct.category,
    rating: apiProduct.rating,
    stock: apiProduct.stock
  }
}