import React from 'react'
import { Link } from 'react-router-dom'

function Categories() {
  const categories = [
    {
      id: 'all',
      title: 'All Products',
      description: 'Browse our complete collection of premium furniture and decor',
      image: '/src/assets/furnitures.png',
      items: ['Furniture', 'Decor', 'Kitchen', 'Bedroom', 'Lighting', 'Sports']
    },
    {
      id: 'furniture',
      title: 'Furniture',
      description: 'Explore our collection of premium furniture pieces',
      image: '/src/assets/furnitures.png',
      items: ['Sofas', 'Chairs', 'Tables', 'Beds', 'Storage', 'Office']
    },
    {
      id: 'decor',
      title: 'Home Decor',
      description: 'Transform your space with beautiful decor items',
      image: '/src/assets/decor.png',
      items: ['Wall Art', 'Vases', 'Cushions', 'Rugs', 'Lighting', 'Mirrors']
    },
    {
      id: 'kitchen',
      title: 'Kitchen & Dining',
      description: 'Everything you need for your kitchen and dining area',
      image: '/src/assets/homeImage.png',
      items: ['Dining Sets', 'Kitchen Appliances', 'Storage', 'Utensils', 'Glassware', 'Cutlery']
    },
    {
      id: 'bedroom',
      title: 'Bedroom',
      description: 'Create your perfect bedroom sanctuary',
      image: '/src/assets/homeImage2.png',
      items: ['Bed Frames', 'Mattresses', 'Bedding', 'Nightstands', 'Wardrobes', 'Dressers']
    },
    {
      id: 'sports',
      title: 'Sports & Fitness',
      description: 'Stay active with our fitness and sports equipment',
      image: '/src/assets/homeImage.png',
      items: ['Exercise Equipment', 'Yoga Mats', 'Weights', 'Treadmills', 'Bikes', 'Accessories']
    }
  ]

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#FEFCDA' }}>
      <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: 'bold', 
          textAlign: 'center', 
          marginBottom: '20px',
          color: '#704F24'
        }}>
          Shop by Category
        </h1>
        <p style={{ 
          textAlign: 'center', 
          fontSize: '1.2rem', 
          marginBottom: '50px',
          color: '#666'
        }}>
          Discover our curated collections for every room in your home
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/category/${category.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{
                backgroundColor: 'white',
                borderRadius: '15px',
                padding: '30px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer'
              }}
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
                  height: '200px', 
                  backgroundColor: '#f5f5f5',
                  borderRadius: '10px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  color: '#704F24'
                }}>
                  {category.title}
                </div>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold', 
                  marginBottom: '10px',
                  color: '#704F24'
                }}>
                  {category.title}
                </h3>
                <p style={{ 
                  color: '#666', 
                  marginBottom: '20px',
                  lineHeight: '1.6'
                }}>
                  {category.description}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  {category.items.map((item, index) => (
                    <div key={index} style={{
                      padding: '8px 12px',
                      backgroundColor: '#FEFCDA',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      textAlign: 'center',
                      color: '#704F24',
                      fontWeight: '500'
                    }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Categories
