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

    gsap.set(logo, {
      fontSize: '23rem',
      position: 'fixed',
      top: '60%',
      left: '60%',
      xPercent: -50,
      yPercent: -50,
      zIndex: 100
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: '+=300',
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
          className="text-[#C72A01] font-bold select-none"
        >
          SUMMOR.
        </div>
      </div>
      <div style={{marginTop:"50px"}} className="redLine h-[2px] w-full bg-[#C72A01]"></div>
    </div>
  )
}

export default Hero 