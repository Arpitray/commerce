import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCart } from '../context/CartContext'

gsap.registerPlugin(ScrollTrigger)

function Navbar() {
  const { cartItems, isCartOpen, setIsCartOpen, getCartCount } = useCart()
  const navbarRef = useRef(null)
  const [hoveredLink, setHoveredLink] = useState(null)
  const [isVisible, setIsVisible] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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
    { id: 'home', text: 'Home', to: '/' },
    { id: 'product', text: 'Product Page', to: '/product/1' },
    { id: 'categories', text: 'Categories', to: '/categories' },
    { id: 'contact', text: 'Contact', to: '#' }
  ]

  return (
    <nav 
      ref={navbarRef}
      className={`fixed top-0 left-0 right-0 z-50 h-16 bg-white/0 backdrop-blur-0 transition-all duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.1)' }}
    >
      <div style={{padding:"30px"}} className="flex items-center justify-between h-full">
        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 gap-12 justify-center w-full text-[#FEFCDA] font-bold font-['slabo']">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link 
                to={link.to}
                className={`transition-all duration-300 ${
                  hoveredLink && hoveredLink !== link.id 
                    ? 'opacity-20' 
                    : 'opacity-100'
                } hover:opacity-100 hover:scale-105`}
                onMouseEnter={() => setHoveredLink(link.id)}
                onMouseLeave={() => setHoveredLink(null)}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden block"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: '#FEFCDA',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            transition: 'all 0.3s ease'
          }}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
        
        {/* Cart Icon */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              color: '#FEFCDA',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '50%',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent'
            }}
          >
            🛒
          </button>
          {getCartCount() > 0 && (
            <div style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              backgroundColor: '#C72A01',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              fontWeight: 'bold'
            }}>
              {getCartCount()}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden block"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'rgba(112, 79, 36, 0.95)',
            backdropFilter: 'blur(10px)',
            borderBottom: '2px solid rgba(199, 42, 1, 0.95)',
            padding: '20px',
            animation: 'slideDown 0.3s ease-out'
          }}
        >
          <ul style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            listStyle: 'none',
            margin: 0,
            padding: 0
          }}>
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link 
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    textDecoration: 'none',
                    color: '#FEFCDA',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    fontFamily: 'slabo, Arial, sans-serif',
                    display: 'block',
                    padding: '10px 0',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.opacity = '0.7'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.opacity = '1'
                  }}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 768px) {
          nav > div {
            padding: 15px !important;
          }
        }
      `}</style>
    </nav>
  )
}

export default Navbar