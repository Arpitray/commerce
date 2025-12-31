import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Cart from '../assets/cart.png'
import { useCart } from '../context/CartContext'
import { supabase } from '../lib/supabaseClient'

gsap.registerPlugin(ScrollTrigger)

function Navbar() {
  const { cartItems, isCartOpen, setIsCartOpen, getCartCount } = useCart()
  const navbarRef = useRef(null)
  const [hoveredLink, setHoveredLink] = useState(null)
  const [isVisible, setIsVisible] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileViewport, setIsMobileViewport] = useState(false)
  const [user, setUser] = useState(null)
  const lastScrollY = useRef(0)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.reload()
  }

  useEffect(() => {
    // Get user session
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
    }
    getUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    const navbar = navbarRef.current
    if (!navbar) return

    // Navbar visibility logic
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false)
      } else {
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
      authListener.subscription.unsubscribe()
    }
  }, [])

  // Track viewport size
  useEffect(() => {
    const updateViewport = () => {
      const isMobile = window.innerWidth < 768
      setIsMobileViewport(isMobile)
      if (!isMobile && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }
    updateViewport()
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [isMobileMenuOpen])

  const navLinks = [
    { id: 'home', text: 'Home', to: '/' },
    { id: 'categories', text: 'Categories', to: '/categories' },
    { id: 'contact', text: 'Contact', to: '/contact' }
  ]

  return (
    <nav 
      ref={navbarRef}
      className={`fixed top-0 left-0 right-0 z-[999] bg-[#64351f] backdrop-blur-xl transition-all duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      style={{ 
        height: '64px',
        boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div 
        style={{
          paddingLeft: "16px", 
          paddingRight: "16px",
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Mobile Menu Button - Moved to Left */}
        {isMobileViewport && (
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: '#FEFCDA',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '50%',
              transition: 'all 0.3s ease',
              zIndex: 60
            }}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        )}

        {/* Desktop Navigation */}
        <ul 
          className="hidden md:flex text-[#FEFCDA] font-bold font-['slabo']"
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3rem',
            flex: 1
          }}
        >
          {navLinks.map((link) => (
            <li key={link.id} style={{ margin: 0, padding: 0 }}>
              <Link
                to={link.to}
                className={`transition-all duration-300 ${
                  hoveredLink && hoveredLink !== link.id 
                    ? 'opacity-20' 
                    : 'opacity-100'
                } hover:opacity-100 hover:scale-105`}
                onMouseEnter={() => setHoveredLink(link.id)}
                onMouseLeave={() => setHoveredLink(null)}
                style={{ 
                  textDecoration: 'none', 
                  color: 'inherit',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  display: 'block',
                  padding: '0.5rem 1rem'
                }}
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
        
        {/* Right Side Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            
            {/* Desktop User Info & Logout */}
            {!isMobileViewport && user && (
                <div className="hidden md:flex items-center gap-4">
                    <span className="text-[#FEFCDA] text-sm opacity-80">{user.email?.split('@')[0]}</span>
                    <button
                        onClick={handleLogout}
                        className="text-[#FEFCDA] hover:text-red-400 transition-colors text-sm font-bold"
                    >
                        Logout
                    </button>
                </div>
            )}

            {/* Cart Icon */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
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
            >
                <img src={Cart} alt="Menu" style={{ width: '24px', height: '24px' }} />
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
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && isMobileViewport && (
        <div 
          className="mobile-menu-dropdown"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'rgba(112, 79, 36, 0.98)',
            backdropFilter: 'blur(15px)',
            borderBottom: '2px solid rgba(199, 42, 1, 0.95)',
            padding: '20px',
            animation: 'slideDown 0.3s ease-out',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          {/* User Profile Section for Mobile */}
          {user && (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                paddingBottom: '15px',
                borderBottom: '1px solid rgba(254, 252, 218, 0.2)'
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#C72A01',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FEFCDA',
                    fontWeight: 'bold',
                    fontSize: '1.2rem'
                }}>
                    {user.email?.charAt(0).toUpperCase()}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ color: '#FEFCDA', fontWeight: 'bold', fontSize: '1rem' }}>
                        {user.user_metadata?.full_name || 'User'}
                    </span>
                    <span style={{ color: '#FEFCDA', opacity: 0.7, fontSize: '0.85rem' }}>
                        {user.email}
                    </span>
                </div>
            </div>
          )}

          <ul style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
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
                    e.target.style.paddingLeft = '10px'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.opacity = '1'
                    e.target.style.paddingLeft = '0'
                  }}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Logout Button */}
          <button
            onClick={handleLogout}
            style={{
                marginTop: '10px',
                width: '100%',
                padding: '12px',
                backgroundColor: 'rgba(199, 42, 1, 0.2)',
                border: '1px solid #C72A01',
                borderRadius: '8px',
                color: '#FEFCDA',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#C72A01'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(199, 42, 1, 0.2)'}
          >
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar