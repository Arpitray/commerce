import React from 'react'
import decor from '../assets/decor.png'

function HomeDecor() {
  return (
    <div>
      <div className='homedecor border-t-2 border-[#c72a01] h-screen w-full flex'>
        <div style={{padding: '140px 60px'}} className="content w-1/2 flex flex-col gap-20 items-start justify-start">
        <h1 className='text-7xl text-[#C72A01] font-["restore"]'>Home Decor That Tells Your Story</h1>
        <p style={{color: '#666'}} className='text-3xl w-[95%] text-start tracking-tight font-semibold'>Transform your living space with our exquisite collection of home decor. From elegant wall art to cozy textiles, each piece is carefully selected to reflect your unique style and create a home that truly feels like you.</p>
        <div className="btn w-full flex justify-center items-center h-32 ">
            <button 
              style={{
                padding: '17px 40px',
                borderRadius: '10px',
                border: '0',
                backgroundColor: 'rgb(255, 56, 86)',
                letterSpacing: '1.5px',
                fontSize: '15px',
                transition: 'all 0.3s ease',
                boxShadow: 'rgb(201, 46, 70) 0px 10px 0px 0px',
                color: 'hsl(0, 0%, 100%)',
                cursor: 'pointer',
                fontWeight: '600'
              }}
              onMouseEnter={(e) => {
                const button = e.currentTarget;
                button.style.boxShadow = 'rgb(201, 46, 70) 0px 7px 0px 0px';
              }}
              onMouseLeave={(e) => {
                const button = e.currentTarget;
                button.style.boxShadow = 'rgb(201, 46, 70) 0px 10px 0px 0px';
                button.style.transform = 'translateY(0)';
              }}
              onMouseDown={(e) => {
                const button = e.currentTarget;
                button.style.backgroundColor = 'rgb(255, 56, 86)';
                button.style.boxShadow = 'rgb(201, 46, 70) 0px 0px 0px 0px';
                button.style.transform = 'translateY(5px)';
                button.style.transition = '200ms';
              }}
              onMouseUp={(e) => {
                const button = e.currentTarget;
                button.style.boxShadow = 'rgb(201, 46, 70) 0px 7px 0px 0px';
                button.style.transform = 'translateY(3px)';
                button.style.transition = 'all 0.3s ease';
              }}
            >
              Shop Now
            </button>
        </div>
        </div>

        <div className="imagecontain h-full flex items-center w-1/2">
        <div className="image h-[70%] w-full  ">
        <img className='w-full h-full object-cover' src={decor} alt="" /></div>
        </div>
      </div>
  
    </div>
  )
}

export default HomeDecor 