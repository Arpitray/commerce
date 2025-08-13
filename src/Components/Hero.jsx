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

    const setupAnimation = () => {
      // Check if mobile device
      const isMobile = window.innerWidth <= 768

      // Clear any existing ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())

      if (!isMobile) {
        // Desktop: Original animation - starts centered, moves to top-left
        gsap.set(logo, {
          fontSize: '25rem', // Reduced from 25rem to prevent cutoff
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
        // Mobile: Static centered positioning within hero - no animation
        gsap.set(logo, {
          fontSize: '4rem', // Larger for mobile readability
          position: 'static',
          transform: 'none',
          zIndex: 100,
          lineHeight: 1,
          textAlign: 'center'
        })
      }
    }

    setupAnimation()

    // Handle window resize
    const handleResize = () => {
      setupAnimation()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="relative">
      <div 
        className="w-full flex items-center justify-center relative"
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
        
        {/* Animated SUMMOR text - centered on mobile, animated on desktop */}
        <div 
          ref={logoRef}
          className="text-[#C72A01] select-none font-['restore'] md:fixed md:block relative z-[100]"
          onClick={() => window.location.reload()}
          style={{ cursor: 'pointer' }}
          title="Refresh"
        >
          SUMMOR<span className='text-[#FFF8DC]'>.</span>
        </div>
      </div>
    </div>
  )
}

export default Hero 