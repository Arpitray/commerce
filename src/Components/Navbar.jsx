import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Navbar() {
  const navbarRef = useRef(null)
  const [hoveredLink, setHoveredLink] = useState(null)
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const navbar = navbarRef.current

    if (!navbar) return

    // Navbar visibility logic
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down and past 100px
        setIsVisible(false)
      } else {
        // Scrolling up
        setIsVisible(true)
      }
      
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Navbar background animation
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

    return () => {
      window.removeEventListener('scroll', handleScroll)
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
    <nav 
      ref={navbarRef}
      className={`fixed top-0 left-0 right-0 z-50 h-16 bg-white/0 backdrop-blur-0 transition-all duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
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
  )
}

export default Navbar