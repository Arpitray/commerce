import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

function CategoryPage() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const categoryNames = {
    'all': 'All Products',
    'furniture': 'Furniture',
    'decor': 'Home Decor',
    'kitchen': 'Kitchen & Dining',
    'bedroom': 'Bedroom',
    'lamps': 'Lamps & Lighting',
    'sports': 'Sports & Fitness'
  }

  // Map our categories to DummyJSON categories
  const categoryMapping = {
    'all': 'all',
    'furniture': 'furniture',
    'decor': 'home-decoration',
    'kitchen': 'kitchen-accessories',
    'bedroom': 'furniture',
    'lamps': 'home-decoration',
    'sports': 'sports-accessories'
  }

  useEffect(() => {
    setLoading(true)
    
    const fetchProducts = async () => {
      try {
        let productsData = []
        
        if (categoryId === 'all') {
          // For "all" category, fetch multiple categories to get at least 20 products
          const categories = ['furniture', 'home-decoration', 'sports-accessories', 'kitchen-accessories', 'beauty', 'fragrances', 'motorcycle', 'laptops', 'smartphones', 'womens-bags', 'sunglasses']
          const allProducts = []
          
          for (const category of categories) {
            try {
              console.log(`Fetching category: ${category}`)
              const catResponse = await fetch(`https://dummyjson.com/products/category/${category}`)
              if (!catResponse.ok) {
                console.error(`Failed to fetch ${category}: ${catResponse.status}`)
                continue
              }
              const catData = await catResponse.json()
              console.log(`${category} products:`, catData.products?.length || 0)
              if (catData.products && catData.products.length > 0) {
                allProducts.push(...catData.products)
              }
            } catch (error) {
              console.error(`Error fetching ${category}:`, error)
            }
          }
          
          console.log(`Total products fetched: ${allProducts.length}`)
          // Shuffle and take first 20 products
          productsData = allProducts.sort(() => Math.random() - 0.5).slice(0, 20)
        } else {
          // For specific categories, use the API response
          const mappedCategory = categoryMapping[categoryId]
          let apiUrl = 'https://dummyjson.com/products'
          
          if (mappedCategory && mappedCategory !== 'all') {
            apiUrl = `https://dummyjson.com/products/category/${mappedCategory}`
          }
          
          console.log(`Fetching category: ${mappedCategory} from ${apiUrl}`)
          const response = await fetch(apiUrl)
          if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.status}`)
          }
          const data = await response.json()
          productsData = data.products || data || []
          console.log(`Products found for ${categoryId}:`, productsData.length)
        }

        // Transform the data to match our format
        const transformedProducts = productsData.map((product, index) => ({
          id: product.id || index + 1,
          name: product.title || product.name || `Product ${index + 1}`,
          price: product.price || Math.floor(Math.random() * 1000) + 50,
          image: product.images?.[0] || product.thumbnail || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
          description: product.description || ''
        }))

        console.log(`Final products count: ${transformedProducts.length}`)
        setProducts(transformedProducts)
      } catch (error) {
        console.error('Error fetching products:', error)
        // Fallback to mock data if API fails
        setProducts([
          { id: 1, name: 'Modern Sofa', price: 1299.99, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop' },
          { id: 2, name: 'Elegant Vase', price: 89.99, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop' },
          { id: 3, name: 'Kitchen Table', price: 599.99, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop' },
          { id: 4, name: 'Sports Equipment', price: 199.99, image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop' },
          { id: 5, name: 'Table Lamp', price: 149.99, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop' },
          { id: 6, name: 'Kitchen Appliances', price: 299.99, image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop' },
          { id: 7, name: 'Yoga Mat', price: 49.99, image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop' },
          { id: 8, name: 'Dining Chair', price: 299.99, image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop' },
          { id: 9, name: 'Wall Art', price: 199.99, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop' },
          { id: 10, name: 'Bed Frame', price: 799.99, image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop' }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [categoryId])

  if (loading) {
    return (
      <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#FEFCDA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '1.5rem', color: '#704F24' }}>Loading...</div>
      </div>
    )
  }

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#FEFCDA' }}>
      <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px', color: '#704F24' }}>
          {categoryNames[categoryId] || 'Category'}
        </h1>
        <p style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '50px', color: '#666' }}>
          Discover our amazing collection of {categoryNames[categoryId]?.toLowerCase() || 'products'} ({products.length} items)
        </p>
        
                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', padding: '20px 0' }}>
           {products.map((product) => (
             <div key={product.id} style={{
               backgroundColor: 'white',
               borderRadius: '15px',
               overflow: 'hidden',
               boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
               transition: 'transform 0.3s ease, box-shadow 0.3s ease',
               cursor: 'pointer'
             }}
             onClick={() => navigate(`/product/${product.id}`)}
             onMouseEnter={(e) => {
               e.target.style.transform = 'translateY(-10px)'
               e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)'
             }}
             onMouseLeave={(e) => {
               e.target.style.transform = 'translateY(0)'
               e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)'
             }}>
              <div style={{
                width: '100%',
                height: '250px',
                backgroundImage: `url(${product.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: '#f5f5f5'
              }}></div>
              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '10px', color: '#704F24' }}>
                  {product.name}
                </h3>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#C72A01', marginBottom: '15px' }}>
                  ${product.price}
                </div>
                                 <button 
                   onClick={(e) => {
                     e.stopPropagation()
                     addToCart(product, 1)
                   }}
                   style={{
                     width: '100%',
                     padding: '12px',
                     backgroundColor: '#704F24',
                     color: 'white',
                     border: 'none',
                     borderRadius: '25px',
                     fontSize: '1rem',
                     fontWeight: 'bold',
                     cursor: 'pointer',
                     transition: 'background-color 0.3s ease'
                   }}
                   onMouseEnter={(e) => {
                     e.target.style.backgroundColor = '#C72A01'
                   }}
                   onMouseLeave={(e) => {
                     e.target.style.backgroundColor = '#704F24'
                   }}>
                   Add to Cart
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryPage 