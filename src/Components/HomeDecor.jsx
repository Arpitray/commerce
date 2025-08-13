import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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
      <div className='homedecor border-t-2 border-[#c72a01] h-auto min-h-screen md:h-screen w-full flex flex-col md:flex-row justify-center overflow-hidden items-center md:overflow-visible'>
        <div className="content w-full md:w-1/2 flex flex-col gap-8 md:gap-16 lg:gap-20 items-start md:items-end justify-start order-1 md:order-none" style={{padding: '40px'}}>
        <div className="text-4xl md:text-6xl lg:text-8xl text-[#C72A01] tracking-tight font-['restore'] leading-tight break-words">
          Home Decor That Tells Your Story
        </div>
        <div 
          className="text-base md:text-2xl lg:text-3xl w-full text-start font-['slabo'] font-semibold break-words"
          style={{color: '#666', paddingLeft: '0px'}}
        >
          Transform your living space with our exquisite collection of home decor. From elegant wall art to cozy textiles, each piece is carefully selected to reflect your unique style and create a home that truly feels like you.
        </div>
        <div className="btn w-full flex justify-center items-center h-auto md:h-32" style={{paddingTop: '20px', paddingBottom: '0px'}}>
            <button 
              onClick={() => navigate('/category/decor')}
              className="rounded-lg border-0 bg-[rgb(255,56,86)] tracking-widest text-sm md:text-base transition-all duration-300 text-white cursor-pointer font-semibold"
              style={{
                padding: '16px 32px',
                boxShadow: 'rgb(201, 46, 70) 0px 10px 0px 0px',
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
        <div className="imagecontain h-[50vh] md:h-[60vh] lg:h-full flex items-center w-full md:w-1/2 order-2 md:order-none">
        <div className="image h-[70%] w-full">
        <img 
          ref={imageRef}
          className='w-full h-full object-cover' 
          src={decor} 
          alt="" 
        /></div>
        </div>
      </div>
    </div>
  )
}

export default HomeDecor 