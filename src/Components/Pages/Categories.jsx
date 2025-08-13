import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import LoadingScreen from '../LoadingScreen'

function Categories() {
  const [isLoading, setIsLoading] = useState(true)
  const cardsRef = useRef([])

  useEffect(() => {
    // Simulate loading time for categories page
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // 2 seconds loading time

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Check if mobile device
    const isMobile = window.innerWidth <= 768

    if (!isLoading && cardsRef.current.length > 0) {
      // Only apply animations if not mobile
      if (!isMobile) {
        // Initial animation: cards scale up from 0.8 to 1
        gsap.fromTo(cardsRef.current, 
          { 
            scale: 0.8, 
            opacity: 0,
            y: 50
          },
          { 
            scale: 1, 
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.7)'
          }
        )
      } else {
        // Mobile: set cards to visible without animation
        gsap.set(cardsRef.current, {
          scale: 1,
          opacity: 1,
          y: 0
        })
      }
    }
  }, [isLoading])

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

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <div className='w-full min-h-screen' style={{ paddingTop: '64px', backgroundColor: '#FEFCDA' }}>
        <div style={{ padding: '40px 20px', margin: '0 auto' }}>
          <h1 className='font-["restore"]' style={{ 
            fontSize: '5rem', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            marginBottom: '20px',
            color: '#C72A01'
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
          
          <div className='w-full' style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            padding: '0 10px'
          }}>
            {categories.map((category, index) => (
              <Link 
                key={category.id} 
                to={`/category/${category.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div 
                  ref={el => cardsRef.current[index] = el}
                  style={{
                    backgroundColor: '#FFF8DC',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    const card = e.currentTarget;
                    const imageDiv = card.querySelector('.card-image');
                    if (imageDiv) {
                      imageDiv.style.transform = 'translateY(-8px)';
                    }
                    card.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    const card = e.currentTarget;
                    const imageDiv = card.querySelector('.card-image');
                    if (imageDiv) {
                      imageDiv.style.transform = 'translateY(20px)';
                    }
                    card.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }}>
                  <div 
                    className="card-image"
                    style={{
                      height: '500px',
                      backgroundColor: '#FFF1DC',
                      overflow: 'hidden',
                      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      transform: 'translateY(-12px)',
                      willChange: 'transform',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      color: '#704F24'
                    }}
                  >
                    {category.title}
                  </div>
                  <div 
                    className="card-content"
                    style={{ 
                      padding: '15px',
                      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      transform: 'translateY(0)',
                      willChange: 'transform'
                    }}
                  >
                    <h3 className='font-["slabo"]' style={{ 
                      fontSize: '18px', 
                      fontWeight: '600', 
                      margin: '0 0 5px 0',
                      color: '#333',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {category.title}
                    </h3>
                    <p style={{ 
                      color: '#666', 
                      marginBottom: '10px',
                      lineHeight: '1.4',
                      fontSize: '14px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {category.description}
                    </p>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '4px'
                    }}>
                      
                      
                      
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
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
          
          .w-full > div > div {
            grid-template-columns: 1fr !important;
            gap: 15px !important;
            padding: 0 5px !important;
          }
          
          .card-image {
            height: 250px !important;
            font-size: 1.2rem !important;
          }
          
          .card-content {
            padding: 12px !important;
          }
          
          .card-content h3 {
            font-size: 14px !important;
          }
          
          .card-content p {
            font-size: 11px !important;
            margin-bottom: 8px !important;
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
          
          .w-full > div > div {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
            padding: 0 10px !important;
          }
          
          .card-image {
            height: 400px !important;
            font-size: 1.8rem !important;
          }
          
          .card-content h3 {
            font-size: 17px !important;
          }
          
          .card-content p {
            font-size: 13px !important;
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
          
          .w-full > div > div {
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)) !important;
            gap: 20px !important;
            padding: 0 10px !important;
          }
          
          .card-image {
            height: 500px !important;
            font-size: 2rem !important;
          }
          
          .card-content h3 {
            font-size: 18px !important;
          }
          
          .card-content p {
            font-size: 14px !important;
          }
        }
      `}</style>
    </>
  )
}

export default Categories
