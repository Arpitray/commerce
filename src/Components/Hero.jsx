import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import homeImage2 from '../assets/homeImage2.png'

gsap.registerPlugin(ScrollTrigger)

function Hero() {
  const logoRef = useRef(null)

  useEffect(() => {
    const logo = logoRef.current

    if (!logo) return

    // Check if mobile device
    const isMobile = window.innerWidth <= 768

    // Only apply animations if not mobile
    if (!isMobile) {
      gsap.set(logo, {
        fontSize: '25rem',
        position: 'fixed',
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        zIndex: 100
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom 520%',
          scrub: true
        }
      })

      tl.to(logo, {
        fontSize: '2rem',
        top: '0.5rem',
        left: '2rem',
        xPercent: 0,
        yPercent: 0,
        duration: 1
      })
    } else {
      // Mobile: static positioning without animation
      gsap.set(logo, {
        fontSize: '2rem',
        position: 'fixed',
        top: '0.5rem',
        left: '2rem',
        xPercent: 0,
        yPercent: 0,
        zIndex: 100
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="relative">
      <div 
        className="w-full flex items-center justify-center"
        style={{
          backgroundImage: `url(${homeImage2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          marginTop: '-64px', // Compensate for navbar height
          paddingTop: '64px',  // Add padding to maintain content positioning
          height: 'calc(100vh + 64px)' // Full viewport height plus navbar height
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated SUMMOR text */}
        <div 
          ref={logoRef}
          className="text-[#C72A01] select-none font-['restore']"
        >
          SUMMOR<span className='text-[#FFF8DC]'>.</span>
        </div>
      </div>
    </div>
  )
}

export default Hero 