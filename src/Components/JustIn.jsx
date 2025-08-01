import React, { useState, useEffect } from 'react'

function JustIn() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // Simple function to fetch furniture products
  const fetchProducts = async () => {
    try {
      setLoading(true)
      
      // Fetch all products from DummyJSON API
      const response = await fetch('https://dummyjson.com/products?limit=100')
      const data = await response.json()
      
      // Simple filter for furniture items
      const furnitureProducts = data.products.filter(product => {
        const category = product.category.toLowerCase()
        const title = product.title.toLowerCase()
        
        // Check if it's furniture or home decoration
        return category.includes('furniture') || 
        category.includes('home-decoration')
      })
      
      // Take first 6 furniture products
      setProducts(furnitureProducts.slice(0, 6))
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div style={{ padding: '30px', maxWidth: '100%' }}>
        <h2 className='text-8xl font-bold' style={{ 
          fontWeight: 'bold', 
          color: '#C72A01', 
          marginBottom: '30px',
        }}>
          Just In
        </h2>
        <div className='w-full' style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '20px',
          padding: '0 10px'
        }}>
          {[...Array(6)].map((_, index) => (
            <div key={index} style={{
              backgroundColor: '#FFF8DC',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              height: '500px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666'
            }}>
              Loading...
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className='just-in border-[1px] border-[#C72A01]' style={{ padding: '30px', maxWidth: '100%' }}>
      <h2 className='text-8xl font-bold' style={{ 
        fontWeight: 'bold', 
        color: '#C72A01', 
        marginBottom: '30px',
      }}>
        Just In
      </h2>
      <div className='w-full' style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
        gap: '20px',
        padding: '0 10px'
      }}>
        {products.map((product) => (
          <div key={product.id} style={{
            backgroundColor: '#FFF8DC',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            cursor: 'pointer',
            transform: 'translateY(0)',
            willChange: 'transform'
          }}
          onMouseEnter={(e) => {
            const card = e.currentTarget
            card.style.transform = 'translateY(-8px)'
            card.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)'
          }}
          onMouseLeave={(e) => {
            const card = e.currentTarget
            card.style.transform = 'translateY(0)'
            card.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
          }}
          >
            <div style={{ height: '400px', overflow: 'hidden' }}>
              <img 
                src={product.images[0]} 
                alt={product.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=Furniture'
                }}
              />
            </div>
            <div style={{ padding: '15px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                margin: '0 0 5px 0',
                color: '#333',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {product.title}
              </h3>
              <p style={{ 
                fontSize: '16px', 
                color: '#C72A01', 
                margin: '0',
                fontWeight: 'bold'
              }}>
                ${product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default JustIn