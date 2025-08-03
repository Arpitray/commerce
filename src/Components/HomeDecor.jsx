import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollFloat from './ScrollFloat'
import ScrollReveal from './ScrollReveal'
import decor from '../assets/decor.png'

gsap.registerPlugin(ScrollTrigger)

function HomeDecor() {
  const navigate = useNavigate()
  const imageRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    // Check if mobile device
    const isMobile = window.innerWidth <= 768

    // Only apply animations if not mobile
    if (!isMobile && sectionRef.current && imageRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom 20%',
          scrub: true
        }
      })

      // Image animation: start at opacity 0 and scale 0, animate to opacity 1 and scale 1
      tl.fromTo(imageRef.current, 
        { 
          opacity: 0, 
          scale: 0,
          transformOrigin: 'center center'
        },
        { 
          opacity: 1, 
          scale: 1,
          duration: 1,
          ease: 'power2.out'
        },
        0
      )
    } else if (isMobile && imageRef.current) {
      // Mobile: set image to visible without animation
      gsap.set(imageRef.current, {
        opacity: 1,
        scale: 1
      })
    }
  }, [])

  return (
    <div ref={sectionRef}>
      <div className='homedecor border-t-2 border-[#c72a01] h-screen w-full flex'>
        <div style={{padding: '110px 60px'}} className="content w-1/2 flex flex-col gap-20 items-start justify-start">
        <ScrollFloat
          animationDuration={1}
          ease='back.inOut(2)'
          scrollStart='top bottom'
          scrollEnd='bottom top'
          stagger={0.03}
          containerClassName="text-[80px] text-[#C72A01] tracking-tight font-['restore']"
        >
          Home Decor That Tells Your Story
        </ScrollFloat>
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
          containerClassName=""
          textClassName="text-3xl w-full text-start font-['slabo'] font-semibold"
          style={{color: '#666'}}
        >
          Transform your living space with our exquisite collection of home decor. From elegant wall art to cozy textiles, each piece is carefully selected to reflect your unique style and create a home that truly feels like you.
        </ScrollReveal>
        <div className="btn w-full flex justify-center items-center h-32 ">
            <button 
              onClick={() => navigate('/category/decor')}
              style={{
                padding: '17px 40px',
                borderRadius: '10px',
                border: '0',
                backgroundColor: 'rgb(255, 56, 86)',
                letterSpacing: '1.5px',
                fontSize: '15px',
                transition: 'all 0.3s ease',
                boxShadow: 'rgb(201, 46, 70) 0px 10px 0px 0px',
                color: 'hsl(0, 0%, 100%)',
                cursor: 'pointer',
                fontWeight: '600'
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
                button.style.backgroundColor = 'rgb(255, 56, 86)';
                button.style.boxShadow = 'rgb(201, 46, 70) 0px 0px 0px 0px';
                button.style.transform = 'translateY(5px)';
                button.style.transition = '200ms';
              }}
              onMouseUp={(e) => {
                const button = e.currentTarget;
                button.style.backgroundColor = 'rgb(255, 56, 86)';
                button.style.boxShadow = 'rgb(201, 46, 70) 0px 7px 0px 0px';
                button.style.transform = 'translateY(3px)';
                button.style.transition = 'all 0.3s ease';
              }}
            >
              Shop Now
            </button>
        </div>
        </div>

        <div className="imagecontain h-full flex items-center w-1/2">
        <div className="image h-[70%] w-full">
        <img 
          ref={imageRef}
          className='w-full h-full object-cover' 
          src={decor} 
          alt="" 
        /></div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .homedecor {
            flex-direction: column !important;
            height: auto !important;
            min-height: 100vh !important;
          }
          
          .content {
            width: 100% !important;
            padding: 40px 20px !important;
            gap: 30px !important;
            order: 1;
          }
          
          .imagecontain {
            width: 100% !important;
            height: 50vh !important;
            order: 2;
          }
          
          .text-[80px] {
            font-size: 2.5rem !important;
            line-height: 1.2 !important;
          }
          
          .text-3xl {
            font-size: 1rem !important;
            line-height: 1.5 !important;
          }
          
          .btn {
            height: auto !important;
            padding: 20px 0 !important;
          }
          
          .btn button {
            padding: 15px 30px !important;
            font-size: 14px !important;
          }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          .homedecor {
            flex-direction: column !important;
            height: auto !important;
            min-height: 100vh !important;
          }
          
          .content {
            width: 100% !important;
            padding: 60px 40px !important;
            gap: 40px !important;
            order: 1;
          }
          
          .imagecontain {
            width: 100% !important;
            height: 60vh !important;
            order: 2;
          }
          
          .text-[80px] {
            font-size: 5rem !important;
            line-height: 1.1 !important;
          }
          
          .text-3xl {
            font-size: 1.8rem !important;
            line-height: 1.4 !important;
          }
          
          .btn {
            height: auto !important;
            padding: 30px 0 !important;
          }
          
          .btn button {
            padding: 17px 40px !important;
            font-size: 15px !important;
          }
        }
        
        @media (min-width: 1025px) {
          .homedecor {
            flex-direction: row !important;
            height: 100vh !important;
          }
          
          .content {
            width: 50% !important;
            padding: 110px 60px !important;
            gap: 80px !important;
            order: 1;
          }
          
          .imagecontain {
            width: 50% !important;
            height: 100% !important;
            order: 2;
          }
          
          .text-[80px] {
            font-size: 80px !important;
            line-height: 1 !important;
          }
          
          .text-3xl {
            font-size: 1.875rem !important;
            line-height: 1.3 !important;
          }
          
          .btn {
            height: 8rem !important;
            padding: 0 !important;
          }
          
          .btn button {
            padding: 17px 40px !important;
            font-size: 15px !important;
          }
        }
      `}</style>
    </div>
  )
}

export default HomeDecor 