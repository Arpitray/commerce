import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function TextSplit({ text, className, style, stagger = 0.03, duration = 1, ease = 'power2.out' }) {
  const textRef = useRef(null)
  const charsRef = useRef([])

  useEffect(() => {
    if (!textRef.current) return

    // Check if mobile device
    const isMobile = window.innerWidth <= 768

    // Split text into individual characters
    const chars = text.split('').map((char, index) => {
      const span = document.createElement('span')
      span.textContent = char === ' ' ? '\u00A0' : char // Use non-breaking space for actual spaces
      span.style.display = 'inline-block'
      span.style.opacity = '0'
      span.style.transform = 'translateY(50px)'
      return span
    })

    // Clear existing content and add characters
    textRef.current.innerHTML = ''
    chars.forEach(char => textRef.current.appendChild(char))
    charsRef.current = chars

    // Only apply animations if not mobile
    if (!isMobile) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: false,
          toggleActions: 'play none none reverse'
        }
      })

      tl.to(chars, {
        opacity: 1,
        y: 0,
        duration: duration,
        stagger: stagger,
        ease: ease
      })
    } else {
      // Mobile: show all characters immediately
      gsap.set(chars, {
        opacity: 1,
        y: 0
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [text, stagger, duration, ease])

  return (
    <div ref={textRef} className={className} style={style}>
      {text}
    </div>
  )
}

export default TextSplit 