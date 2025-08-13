import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Contact() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const formRef = useRef(null)
  const infoRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    // Check if mobile device
    const isMobile = window.innerWidth <= 768

    if (!isMobile && sectionRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      })

      // Animate title
      tl.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      )

      // Animate form and info cards
      tl.fromTo([formRef.current, infoRef.current],
        { opacity: 0, y: 50, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.6, 
          stagger: 0.2,
          ease: 'back.out(1.7)' 
        },
        '-=0.4'
      )
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <div ref={sectionRef} className="contact-section w-full relative bg-gradient-to-br from-gray-50 via-orange-50 to-red-50 border-t-2 border-[#c72a01] min-h-screen" style={{ paddingTop: '100px', paddingBottom: '80px', paddingLeft: '20px', paddingRight: '20px' }}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#c72a01] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#ff3856] rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-[#c72a01] rounded-full blur-xl"></div>
      </div>

  <div className="relative w-full" style={{marginLeft:'auto', marginRight:'auto'}}>
        {/* Section Header */}
        <div ref={titleRef} className="" style={{ marginBottom: '80px' }}>
          <div className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#c72a01] font-semibold" style={{ marginBottom: '20px' }}>
            Get In Touch
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-[#C72A01] font-['restore'] leading-[0.9]" style={{ marginBottom: '30px' }}>
           Contact <span className='text-blue-950'> Our Team</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-['slabo'] leading-relaxed" style={{maxWidth:'48rem', marginLeft:'auto', marginRight:'auto'}}>
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: '60px' }}>
          {/* Contact Form */}
          <div ref={formRef} className="relative">
            <div className="bg-white rounded-3xl shadow-2xl relative overflow-hidden" style={{ padding: '50px' }}>
              {/* Form background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c72a01]/10 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
              
              <h3 className="text-2xl md:text-3xl font-['restore'] text-[#c72a01]" style={{ marginBottom: '40px' }}>
                Send us a Message
              </h3>

              {isSubmitted ? (
                <div className="text-center" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto" style={{ marginBottom: '20px' }}>
                    <span className="text-white text-2xl">✓</span>
                  </div>
                  <h4 className="text-xl font-['slabo'] text-gray-800" style={{ marginBottom: '10px' }}>Message Sent!</h4>
                  <p className="text-gray-600">Thank you for contacting us. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '30px' }}>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 font-['slabo']" style={{ marginBottom: '10px' }}>
                        Name *
                      </label>
                      <input
                        style={{ paddingInline: '16px', paddingBlock: '12px' }}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full border-2 border-gray-200 rounded-xl focus:border-[#c72a01] focus:outline-none transition-colors duration-300 font-['slabo']"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 font-['slabo']" style={{ marginBottom: '10px' }}>
                        Email *
                      </label>
                      <input
                        style={{paddingInline:'16px', paddingBlock:'12px'}}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full border-2 border-gray-200 rounded-xl focus:border-[#c72a01] focus:outline-none transition-colors duration-300 font-['slabo']"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 font-['slabo']" style={{ marginBottom: '10px' }}>
                      Subject *
                    </label>
                    <input
                      style={{paddingInline:'16px', paddingBlock:'12px'}}
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full border-2 border-gray-200 rounded-xl focus:border-[#c72a01] focus:outline-none transition-colors duration-300 font-['slabo']"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 font-['slabo']" style={{ marginBottom: '10px' }}>
                      Message *
                    </label>
                    <textarea
                      style={{paddingInline:'16px', paddingBlock:'12px'}}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full border-2 border-gray-200 rounded-xl focus:border-[#c72a01] focus:outline-none transition-colors duration-300 resize-none font-['slabo']"
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="group relative w-full bg-gradient-to-r from-[#c72a01] to-[#ff3856] hover:from-[#a61f00] hover:to-[#c72a01] text-white font-bold rounded-2xl transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl font-['slabo']"
                    style={{padding:'16px 32px'}}
                  >
                    <span className="relative" style={{display:'inline-block'}}>Send Message</span>
                    <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className='justify-center' ref={infoRef} style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {/* Contact Cards */}
            <div className="bg-white rounded-3xl shadow-2xl relative overflow-hidden items-center" style={{ padding: '40px' }}>
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-[#ff3856]/10 to-transparent rounded-full transform -translate-x-12 -translate-y-12"></div>
              
              <h3 className="text-2xl md:text-3xl font-['restore'] text-[#c72a01]" style={{ marginBottom: '40px' }}>
                Get in Touch
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#c72a01] to-[#ff3856] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg">📍</span>
                  </div>
                  <div>
                    <h4 className="font-['slabo'] font-semibold text-gray-800" style={{ marginBottom: '5px' }}>Our Location</h4>
                    <p className="text-gray-600 font-['slabo']">
                      123 Furniture Street<br />
                      Design District, NY 
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#c72a01] to-[#ff3856] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg">📞</span>
                  </div>
                  <div>
                    <h4 className="font-['slabo'] font-semibold text-gray-800" style={{ marginBottom: '5px' }}>Phone Number</h4>
                    <p className="text-gray-600 font-['slabo']">+1 555 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#c72a01] to-[#ff3856] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg">✉️</span>
                  </div>
                  <div>
                    <h4 className="font-['slabo'] font-semibold text-gray-800" style={{ marginBottom: '5px' }}>Email Address</h4>
                    <p className="text-gray-600 font-['slabo']">hello@summor.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
    

            {/* Social Links */}
     
          </div>
        </div>
      </div>
  <div className="box1 w-full flex justify-center items-center" style={{marginTop:'40px'}}>
            <div className="bg-white rounded-3xl shadow-2xl relative overflow-hidden w-1/2 text-center" style={{ padding: '40px',marginTop: '100px' }}>
              <div className="absolute bottom-0 right-0 h-20 bg-gradient-to-tl from-[#c72a01]/10 to-transparent rounded-full transform translate-x-10 translate-y-10"></div>
              
              <h3 className="text-2xl font-['restore'] text-[#c72a01]" style={{ marginBottom: '30px' }}>
                Business Hours
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div className="flex justify-between items-center border-b border-gray-100" style={{paddingTop:'8px', paddingBottom:'8px'}}>
                  <span className="font-['slabo'] font-semibold text-gray-800">Monday - Friday</span>
                  <span className="text-gray-600 font-['slabo']">9:00 AM - 6:00 PM</span>
                </div>
        <div className="flex justify-between items-center border-b border-gray-100" style={{paddingTop:'8px', paddingBottom:'8px'}}>
                  <span className="font-['slabo'] font-semibold text-gray-800">Saturday</span>
                  <span className="text-gray-600 font-['slabo']">10:00 AM - 4:00 PM</span>
                </div>
        <div className="flex justify-between items-center" style={{paddingTop:'8px', paddingBottom:'8px'}}>
                  <span className="font-['slabo'] font-semibold text-gray-800">Sunday</span>
                  <span className="text-gray-600 font-['slabo']">Closed</span>
                </div>
              </div>
            </div>
      </div>
                  
    </div>
  )
}

export default Contact
