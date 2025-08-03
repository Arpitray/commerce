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
    <div className="w-full min-h-screen bg-[#d4a373]" style={{paddingTop: '60px'}}>
      <div className="mx-auto" style={{paddingLeft: '8px', paddingRight: '8px', paddingTop: '16px', paddingBottom: '16px'}}>
        <h1 className="font-['restore'] text-center font-bold text-[#C72A01] text-4xl md:text-6xl lg:text-8xl leading-tight md:leading-tight lg:leading-none break-words" style={{marginBottom: '8px'}}>
          {categoryNames[categoryId] || 'Category'}
        </h1>
        <p className="text-center text-[#666] text-base md:text-lg lg:text-xl" style={{marginBottom: '32px'}}>
          Discover our amazing collection of {categoryNames[categoryId]?.toLowerCase() || 'products'} ({products.length} items)
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 lg:gap-8" style={{paddingTop: '8px', paddingBottom: '8px'}}>
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer hover:shadow-2xl"
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
                className="w-full bg-cover bg-center bg-[#FFF8DC] h-64 md:h-80 lg:h-96"
                style={{
                  backgroundImage: `url(${product.image})`
                }}
              ></div>
              <div style={{padding: '16px'}}>
                <h3 className="font-bold text-[#704F24] text-lg md:text-xl lg:text-xl" style={{marginBottom: '8px'}}>
                  {product.name}
                </h3>
                <div className="font-bold text-[#C72A01] text-xl md:text-2xl lg:text-2xl" style={{marginBottom: '12px'}}>
                  ${product.price}
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    addToCart(product, 1)
                  }}
                  className="w-full bg-[#704F24] text-white border-none rounded-full font-bold cursor-pointer transition-colors duration-300 hover:bg-[#C72A01] text-sm md:text-base lg:text-base"
                  style={{ 
                    paddingTop: '8px',
                    paddingBottom: '8px',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    boxShadow: 'rgb(201, 46, 70) 0px 10px 0px 0px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    const button = e.currentTarget;
                    button.style.boxShadow = 'rgb(201, 46, 70) 0px 7px 0px 0px';
                  }}
                  onMouseLeave={(e) => {
                    const button = e.currentTarget;
                    button.style.boxShadow = 'rgb(201, 46, 70) 0px 10px 0px 0px';
                    button.style.transform = 'translateY(0)';
                  }}
                  onMouseDown={(e) => {
                    const button = e.currentTarget;
                    button.style.boxShadow = 'rgb(201, 46, 70) 0px 0px 0px 0px';
                    button.style.transform = 'translateY(5px)';
                    button.style.transition = '200ms';
                  }}
                  onMouseUp={(e) => {
                    const button = e.currentTarget;
                    button.style.boxShadow = 'rgb(201, 46, 70) 0px 7px 0px 0px';
                    button.style.transform = 'translateY(3px)';
                    button.style.transition = 'all 0.3s ease';
                  }}
                >
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