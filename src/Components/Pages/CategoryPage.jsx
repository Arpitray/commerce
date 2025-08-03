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
      <div className="flex items-center justify-center min-h-screen bg-[#FEFCDA]" style={{ paddingTop: '80px' }}>
        <div className="text-2xl text-[#704F24]">Loading...</div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-[#d4a373]" style={{ paddingTop: '80px' }}>
      <div className="mx-auto" style={{ padding: '40px 20px' }}>
        <h1 className="font-['restore'] text-center font-bold text-[#C72A01]" style={{ fontSize: '5rem', marginBottom: '20px' }}>
          {categoryNames[categoryId] || 'Category'}
        </h1>
        <p className="text-center text-[#666]" style={{ fontSize: '1.2rem', marginBottom: '50px' }}>
          Discover our amazing collection of {categoryNames[categoryId]?.toLowerCase() || 'products'} ({products.length} items)
        </p>
        
        <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', padding: '20px 0' }}>
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer hover:shadow-2xl"
              onClick={() => navigate(`/product/${product.id}`)}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-10px)'
                e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)'
              }}
            >
              <div 
                className="w-full bg-cover bg-center bg-[#FFF8DC]"
                style={{
                  height: '400px',
                  backgroundImage: `url(${product.image})`
                }}
              ></div>
              <div style={{ padding: '20px' }}>
                <h3 className="font-bold text-[#704F24]" style={{ fontSize: '1.3rem', marginBottom: '10px' }}>
                  {product.name}
                </h3>
                <div className="font-bold text-[#C72A01]" style={{ fontSize: '1.5rem', marginBottom: '15px' }}>
                  ${product.price}
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    addToCart(product, 1)
                  }}
                  className="w-full bg-[#704F24] text-white border-none rounded-full font-bold cursor-pointer transition-colors duration-300 hover:bg-[#C72A01]"
                  style={{ padding: '12px', fontSize: '1rem' }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .w-full {
            padding-top: 60px !important;
          }
          
          .w-full > div {
            padding: 15px 10px !important;
          }
          
          .font-["restore"] {
            font-size: 2rem !important;
            line-height: 1.2 !important;
            margin-bottom: 10px !important;
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
          }
          
          .w-full > div > p {
            font-size: 1rem !important;
            margin-bottom: 30px !important;
          }
          
          .grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
            padding: 10px 0 !important;
          }
          
          .grid > div {
            border-radius: 10px !important;
          }
          
          .grid > div > div:first-child {
            height: 250px !important;
          }
          
          .grid > div > div:last-child {
            padding: 15px !important;
          }
          
          .grid h3 {
            font-size: 1.1rem !important;
          }
          
          .grid > div > div:last-child > div {
            font-size: 1.3rem !important;
            margin-bottom: 12px !important;
          }
          
          .grid button {
            padding: 10px !important;
            font-size: 0.9rem !important;
          }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          .w-full {
            padding-top: 70px !important;
          }
          
          .w-full > div {
            padding: 30px 15px !important;
          }
          
          .font-["restore"] {
            font-size: 4rem !important;
            line-height: 1.1 !important;
            margin-bottom: 18px !important;
          }
          
          .grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 25px !important;
            padding: 15px 0 !important;
          }
          
          .grid > div > div:first-child {
            height: 350px !important;
          }
        }
        
        @media (min-width: 1025px) {
          .w-full {
            padding-top: 80px !important;
          }
          
          .w-full > div {
            padding: 40px 20px !important;
          }
          
          .font-["restore"] {
            font-size: 5rem !important;
            line-height: 1 !important;
            margin-bottom: 20px !important;
          }
          
          .grid {
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)) !important;
            gap: 30px !important;
            padding: 20px 0 !important;
          }
          
          .grid > div > div:first-child {
            height: 400px !important;
          }
        }
      `}</style>
    </div>
  )
}

export default CategoryPage 