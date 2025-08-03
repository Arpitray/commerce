import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

function JustIn() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const headingRef = useRef(null)
  const scrollTriggerRef = useRef(null)

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

  useEffect(() => {
    // Check if mobile device
    const isMobile = window.innerWidth <= 768

    if (headingRef.current) {
      const heading = headingRef.current
      
      // Use GSAP SplitText to split the text into characters
      const splitText = new SplitText(heading, {
        type: "chars",
        charsClass: "char"
      })
      
      // Set initial state for all characters - make them visible initially
      gsap.set(splitText.chars, {
        opacity: 1,
        y: 0
      })

      // Only create scroll trigger if not mobile
      if (!isMobile) {
        // Create scroll trigger for the animation with scrub
        scrollTriggerRef.current = ScrollTrigger.create({
          trigger: heading,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
          id: 'justin-heading-animation',
          onUpdate: (self) => {
            const progress = self.progress
            if (progress > 0) {
              // Animate characters based on scroll progress
              splitText.chars.forEach((char, index) => {
                const charProgress = Math.max(0, Math.min(1, (progress - index * 0.1) * 5))
                gsap.set(char, {
                  opacity: charProgress,
                  y: 50 * (1 - charProgress)
                })
              })
            } else {
              // Reset when not in view
              gsap.set(splitText.chars, {
                opacity: 0,
                y: 50
              })
            }
          }
        })
      }

      // Fallback: if ScrollTrigger doesn't work, ensure text is visible after 1 second
      setTimeout(() => {
        if (splitText.chars) {
          gsap.set(splitText.chars, {
            opacity: 1,
            y: 0
          })
        }
      }, 1000)
    }

    return () => {
      // Only kill this specific ScrollTrigger instance
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill()
      }
    }
  }, [loading])

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
    <div className="conatiner">
      <div className='just-in border-t-2 border-[#c72a01] ' style={{ padding: '30px',marginTop:"100px", maxWidth: '100%' }}>
      <h2 
        ref={headingRef}
        className='text-8xl font-["restore"]' 
        style={{ 
          fontWeight: 'bold', 
          color: '#C72A01', 
          marginBottom: '30px',
          overflow: 'hidden'
        }}
      >
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
            cursor: 'pointer',
            position: 'relative'
          }}
          onClick={() => navigate(`/product/${product.id}`)}
          onMouseEnter={(e) => {
            const card = e.currentTarget
            const contentDiv = card.querySelector('.card-content')
            const imageDiv = card.querySelector('.card-image')
         
            if (imageDiv) {
              imageDiv.style.transform = 'translateY(-15px)'
            }
            card.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)'
          }}
          onMouseLeave={(e) => {
            const card = e.currentTarget
            const contentDiv = card.querySelector('.card-content')
            const imageDiv = card.querySelector('.card-image')
            if (contentDiv) {
              contentDiv.style.transform = 'translateY(0)'
            }
            if (imageDiv) {
              imageDiv.style.transform = 'translateY(0)'
            }
            card.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
          }}
          >
            <div 
              className="card-image"
              style={{ 
                height: '500px', 
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                transform: 'translateY(0)',
                willChange: 'transform'
              }}
            >
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

    <style>{`
      @media (max-width: 768px) {
        .just-in {
          padding: 20px !important;
          margin-top: 60px !important;
        }
        
        .text-8xl {
          font-size: 3rem !important;
          line-height: 1.2 !important;
          margin-bottom: 20px !important;
        }
        
        .w-full {
          grid-template-columns: 1fr !important;
          gap: 15px !important;
          padding: 0 5px !important;
        }
        
        .card-image {
          height: 300px !important;
        }
        
        .card-content h3 {
          font-size: 16px !important;
        }
        
        .card-content p {
          font-size: 14px !important;
        }
      }
      
      @media (min-width: 769px) and (max-width: 1024px) {
        .just-in {
          padding: 25px !important;
          margin-top: 80px !important;
        }
        
        .text-8xl {
          font-size: 5rem !important;
          line-height: 1.1 !important;
          margin-bottom: 25px !important;
        }
        
        .w-full {
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 20px !important;
          padding: 0 10px !important;
        }
        
        .card-image {
          height: 400px !important;
        }
        
        .card-content h3 {
          font-size: 17px !important;
        }
        
        .card-content p {
          font-size: 15px !important;
        }
      }
      
      @media (min-width: 1025px) {
        .just-in {
          padding: 30px !important;
          margin-top: 100px !important;
        }
        
        .text-8xl {
          font-size: 8rem !important;
          line-height: 1 !important;
          margin-bottom: 30px !important;
        }
        
        .w-full {
          grid-template-columns: repeat(auto-fit, minmax(500px, 1fr)) !important;
          gap: 20px !important;
          padding: 0 10px !important;
        }
        
        .card-image {
          height: 500px !important;
        }
        
        .card-content h3 {
          font-size: 18px !important;
        }
        
        .card-content p {
          font-size: 16px !important;
        }
      }
    `}</style>
    </div>
  )
}

export default JustIn