import React from 'react'
import img from '../assets/homeImage2.png'

function Furniture() {
  return (
    <div>
      <div className='furniture h-screen w-full flex justify-center'>
        <div className="imagecontain h-full flex items-center w-1/2">
        <div className="image h-[70%] w-full  ">
        <img className='w-full h-full object-cover' src={img} alt="" /></div>
        </div>
 
        <div style={{padding: '140px 60px'}} className="content w-1/2 flex flex-col gap-20 items-end justify-start">
        <h1 className='text-7xl text-[#C72A01] font-bold tracking-tighter'>Furniture That Fits Your Life</h1>
        <p style={{color: '#666',paddingRight: '100px'}} className='text-3xl w-[95%] tracking-tight font-semibold'>Discover our curated collection of modern furniture built for everyday living. From sleek sofas to functional storage, every piece is designed to elevate your space with comfort and style.</p>
        <div className="btn w-full flex justify-center items-center h-32 ">
            <button 
              style={{
                padding: '15px 30px',
                backgroundColor: '#C72A01',
                borderRadius: '24px',
                color: 'white',
                fontWeight: '600',
                fontSize: '16px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                transform: 'translateY(0)',
                boxShadow: '0 4px 15px rgba(199, 42, 1, 0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                const button = e.currentTarget;
                button.style.transform = 'translateY(-3px)';
                button.style.boxShadow = '0 8px 25px rgba(199, 42, 1, 0.4)';
                button.style.backgroundColor = '#B02301';
              }}
              onMouseLeave={(e) => {
                const button = e.currentTarget;
                button.style.transform = 'translateY(0)';
                button.style.boxShadow = '0 4px 15px rgba(199, 42, 1, 0.3)';
                button.style.backgroundColor = '#C72A01';
              }}
              onClick={(e) => {
                const button = e.currentTarget;
                button.style.transform = 'translateY(1px) scale(0.98)';
                setTimeout(() => {
                  button.style.transform = 'translateY(-3px)';
                }, 150);
              }}
            >
              Shop Now
            </button>
        </div>
        </div>

      </div>
  
    </div>
  )
}

export default Furniture
