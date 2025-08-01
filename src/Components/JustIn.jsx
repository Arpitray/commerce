import React, { useState, useEffect } from 'react'

function JustIn() {
  const [upholsteryItems, setUpholsteryItems] = useState([
    {
      id: 1,
      name: 'Nina',
      items: 5,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop',
      description: 'Modern sofa with textured fabric'
    },
    {
      id: 2,
      name: 'Jelly Roll',
      items: 5,
      image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=300&h=200&fit=crop',
      description: 'Curved armchair with soft upholstery'
    },
    {
      id: 3,
      name: 'T-Bone',
      items: 10,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
      description: 'Minimalist sofa with clean lines'
    },
    {
      id: 4,
      name: 'Rollins',
      items: 6,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop',
      description: 'Contemporary sofa with unique design'
    },
    {
      id: 5,
      name: 'Vintage',
      items: 8,
      image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=300&h=200&fit=crop',
      description: 'Classic armchair with timeless appeal'
    },
    {
      id: 6,
      name: 'Modern',
      items: 12,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
      description: 'Sleek contemporary design'
    }
  ])

  // Function to fetch data from API (replace with your actual API endpoint)
  const fetchUpholsteryData = async () => {
    try {
      // Replace this with your actual API call
      // const response = await fetch('your-api-endpoint/upholstery')
      // const data = await response.json()
      // setUpholsteryItems(data)
      console.log('API call would be made here')
    } catch (error) {
      console.error('Error fetching upholstery data:', error)
    }
  }

  useEffect(() => {
    // Uncomment the line below when you have your API ready
    // fetchUpholsteryData()
  }, [])

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ 
        fontSize: '28px', 
        fontWeight: 'bold', 
        color: '#C72A01', 
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        Just In: Upholstery
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        padding: '0 10px'
      }}>
        {upholsteryItems.map((item) => (
          <div key={item.id} style={{
            backgroundColor: '#FFF8DC',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)'
          }}
          >
            <div style={{ height: '200px', overflow: 'hidden' }}>
              <img 
                src={item.image} 
                alt={item.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=Upholstery'
                }}
              />
            </div>
            <div style={{ padding: '15px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                margin: '0 0 5px 0',
                color: '#333'
              }}>
                {item.name}
              </h3>
              <p style={{ 
                fontSize: '14px', 
                color: '#666', 
                margin: '0',
                fontWeight: '500'
              }}>
                {item.items} Items
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default JustIn