import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import homeImage from '../assets/homeImage.png'
import homeImage2 from '../assets/homeImage2.png'

gsap.registerPlugin(ScrollTrigger)

function Navbar() {
  const logoRef = useRef(null)
  const navbarRef = useRef(null)
  const [hoveredLink, setHoveredLink] = useState(null)

  useEffect(() => {
    const logo = logoRef.current
    const navbar = navbarRef.current

    if (!logo || !navbar) return

    gsap.set(logo, {
      fontSize: '12rem',
      position: 'fixed',
      top: '15vh',
      left: '50%',
      xPercent: -50,
      zIndex: 100
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: '+=300',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress
          gsap.set(navbar, {
            backgroundColor: `rgba(112, 79, 36, ${progress * 0.95})`,
            backdropFilter: `blur(${progress * 5}px)`,
            borderBottom: `2px solid rgba(199, 42, 1, ${progress * 0.95})`
          })
        }
      }
    })

    tl.to(logo, {
      fontSize: '2rem',
      top: '0.5rem',
      left: '2rem',
      xPercent: 0,
      duration: 1
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const navLinks = [
    { id: 'home', text: 'Home', href: '#' },
    { id: 'about', text: 'Product Page', href: '#' },
    { id: 'categories', text: 'Categories', href: '#' },
    { id: 'contact', text: 'Contact', href: '#' }
  ]

  return (
    <>
      <nav 
        ref={navbarRef}
        className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/0 backdrop-blur-0 transition-all duration-300"
        style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.1)' }}
      >
        <div style={{padding:"30px"}} className="flex items-center justify-center h-full">
          <ul className="flex space-x-8 gap-12 text-[#FEFCDA] font-bold">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a 
                  href={link.href} 
                  className={`transition-all duration-300 ${
                    hoveredLink && hoveredLink !== link.id 
                      ? 'opacity-20' 
                      : 'opacity-100'
                  } hover:opacity-100 hover:scale-105`}
                  onMouseEnter={() => setHoveredLink(link.id)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div 
        ref={logoRef}
        className="text-[#C72A01] font-bold select-none"
      >
        SUMMOR.
      </div>
        
      <div className="pt-16">
        <div 
          className="h-screen flex items-center justify-center relative"
          style={{
            backgroundImage: `url(${homeImage2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          
        </div>
        <div style={{marginTop:"50px"}} className="redLine h-[2px] w-full bg-[#C72A01]"></div>
        
      </div>
    </>
  )
}

export default Navbar