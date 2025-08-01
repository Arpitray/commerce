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
    <div className="just-in-container">
      <h2 className="just-in-title">Just In: Upholstery</h2>
      <div className="upholstery-grid">
        {upholsteryItems.map((item) => (
          <div key={item.id} className="upholstery-card">
            <div className="image-container">
              <img 
                src={item.image} 
                alt={item.name}
                className="upholstery-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=Upholstery'
                }}
              />
            </div>
            <div className="item-info">
              <h3 className="item-name">{item.name}</h3>
              <p className="item-count">{item.items} Items</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default JustIn