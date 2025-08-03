import React from 'react'

function Cart({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) {
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
            cursor: 'pointer'
          }}
          onClick={onClose}
        />
      )}
      
      {/* Cart Panel */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: isOpen ? 0 : '-400px',
        width: '400px',
        height: '100vh',
        backgroundColor: '#FEFCDA',
        boxShadow: '-5px 0 15px rgba(0, 0, 0, 0.2)',
        zIndex: 1001,
        transition: 'right 0.3s ease',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Cart Header */}
        <div style={{
          padding: '20px',
          borderBottom: '2px solid #C72A01',
          backgroundColor: '#704F24',
          color: 'white'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
              Shopping Cart ({cartItems.length})
            </h2>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                color: 'white',
                cursor: 'pointer',
                padding: '5px',
                boxShadow: 'rgb(201, 46, 70) 0px 10px 0px 0px',
                transition: 'all 0.3s ease'
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
              ×
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px'
        }}>
          {cartItems.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: '#666'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🛒</div>
              <p style={{ fontSize: '1.1rem', margin: 0 }}>Your cart is empty</p>
              <p style={{ fontSize: '0.9rem', margin: '10px 0 0 0' }}>Add some products to get started!</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} style={{
                display: 'flex',
                gap: '15px',
                padding: '15px 0',
                borderBottom: '1px solid #eee'
              }}>
                {/* Product Image */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  flexShrink: 0
                }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>

                {/* Product Details */}
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    margin: '0 0 5px 0',
                    color: '#704F24'
                  }}>
                    {item.name}
                  </h3>
                  <p style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: '#C72A01',
                    margin: '0 0 10px 0'
                  }}>
                    ${item.price}
                  </p>

                  {/* Quantity Controls */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <button
                      onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      style={{
                        width: '30px',
                        height: '30px',
                        border: '2px solid #704F24',
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        color: '#704F24',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        boxShadow: 'rgb(201, 46, 70) 0px 10px 0px 0px',
                        transition: 'all 0.3s ease'
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
                      -
                    </button>
                    <span style={{
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      minWidth: '20px',
                      textAlign: 'center'
                    }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      style={{
                        width: '30px',
                        height: '30px',
                        border: '2px solid #704F24',
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        color: '#704F24',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        boxShadow: 'rgb(201, 46, 70) 0px 10px 0px 0px',
                        transition: 'all 0.3s ease'
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
                      +
                    </button>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      style={{
                        marginLeft: 'auto',
                        background: 'none',
                        border: 'none',
                        color: '#C72A01',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        boxShadow: 'rgb(201, 46, 70) 0px 10px 0px 0px',
                        transition: 'all 0.3s ease',
                        padding: '5px 10px'
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
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {cartItems.length > 0 && (
          <div style={{
            padding: '20px',
            borderTop: '2px solid #C72A01',
            backgroundColor: 'white'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#704F24' }}>
                Total:
              </span>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#C72A01' }}>
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <button style={{
              width: '100%',
              padding: '15px',
              backgroundColor: '#C72A01',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: 'rgb(201, 46, 70) 0px 10px 0px 0px'
            }}
            onMouseEnter={(e) => {
              const button = e.currentTarget;
              button.style.backgroundColor = '#704F24';
              button.style.boxShadow = 'rgb(201, 46, 70) 0px 7px 0px 0px';
            }}
            onMouseLeave={(e) => {
              const button = e.currentTarget;
              button.style.backgroundColor = '#C72A01';
              button.style.boxShadow = 'rgb(201, 46, 70) 0px 10px 0px 0px';
              button.style.transform = 'translateY(0)';
            }}
            onMouseDown={(e) => {
              const button = e.currentTarget;
              button.style.boxShadow = 'rgb(201, 46, 70) 0px 0px 0px 0px';
              button.style.transform = 'translateY(5px)';
              button.style.transition = '200ms';
            }}
            onMouseUp={(e) => {
              const button = e.currentTarget;
              button.style.boxShadow = 'rgb(201, 46, 70) 0px 7px 0px 0px';
              button.style.transform = 'translateY(3px)';
              button.style.transition = 'all 0.3s ease';
            }}>
              Checkout
            </button>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="position: fixed"][style*="right: 0"] {
            width: 100vw !important;
            right: 0 !important;
          }
          
          div[style*="position: fixed"][style*="right: -400px"] {
            width: 100vw !important;
            right: -100vw !important;
          }
          
          div[style*="padding: 20px"][style*="borderBottom"] {
            padding: 15px !important;
          }
          
          h2[style*="fontSize: 1.5rem"] {
            font-size: 1.3rem !important;
          }
          
          div[style*="flex: 1"][style*="overflowY: auto"] {
            padding: 15px !important;
          }
          
          div[style*="display: flex"][style*="gap: 15px"] {
            gap: 10px !important;
            padding: 10px 0 !important;
          }
          
          div[style*="width: 80px"][style*="height: 80px"] {
            width: 60px !important;
            height: 60px !important;
          }
          
          h3[style*="fontSize: 1rem"] {
            font-size: 0.9rem !important;
          }
          
          p[style*="fontSize: 1.1rem"][style*="color: #C72A01"] {
            font-size: 1rem !important;
          }
          
          div[style*="padding: 20px"][style*="borderTop"] {
            padding: 15px !important;
          }
          
          span[style*="fontSize: 1.2rem"] {
            font-size: 1.1rem !important;
          }
          
          span[style*="fontSize: 1.5rem"][style*="color: #C72A01"] {
            font-size: 1.3rem !important;
          }
          
          button[style*="padding: 15px"][style*="fontSize: 1.1rem"] {
            padding: 12px !important;
            font-size: 1rem !important;
          }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          div[style*="position: fixed"][style*="right: 0"] {
            width: 450px !important;
          }
          
          div[style*="position: fixed"][style*="right: -400px"] {
            width: 450px !important;
            right: -450px !important;
          }
          
          div[style*="padding: 20px"][style*="borderBottom"] {
            padding: 25px !important;
          }
          
          h2[style*="fontSize: 1.5rem"] {
            font-size: 1.6rem !important;
          }
          
          div[style*="flex: 1"][style*="overflowY: auto"] {
            padding: 25px !important;
          }
          
          div[style*="display: flex"][style*="gap: 15px"] {
            gap: 20px !important;
            padding: 20px 0 !important;
          }
          
          div[style*="width: 80px"][style*="height: 80px"] {
            width: 90px !important;
            height: 90px !important;
          }
          
          h3[style*="fontSize: 1rem"] {
            font-size: 1.1rem !important;
          }
          
          p[style*="fontSize: 1.1rem"][style*="color: #C72A01"] {
            font-size: 1.2rem !important;
          }
          
          div[style*="padding: 20px"][style*="borderTop"] {
            padding: 25px !important;
          }
          
          span[style*="fontSize: 1.2rem"] {
            font-size: 1.3rem !important;
          }
          
          span[style*="fontSize: 1.5rem"][style*="color: #C72A01"] {
            font-size: 1.6rem !important;
          }
          
          button[style*="padding: 15px"][style*="fontSize: 1.1rem"] {
            padding: 18px !important;
            font-size: 1.2rem !important;
          }
        }
        
        @media (min-width: 1025px) {
          div[style*="position: fixed"][style*="right: 0"] {
            width: 400px !important;
          }
          
          div[style*="position: fixed"][style*="right: -400px"] {
            width: 400px !important;
            right: -400px !important;
          }
          
          div[style*="padding: 20px"][style*="borderBottom"] {
            padding: 20px !important;
          }
          
          h2[style*="fontSize: 1.5rem"] {
            font-size: 1.5rem !important;
          }
          
          div[style*="flex: 1"][style*="overflowY: auto"] {
            padding: 20px !important;
          }
          
          div[style*="display: flex"][style*="gap: 15px"] {
            gap: 15px !important;
            padding: 15px 0 !important;
          }
          
          div[style*="width: 80px"][style*="height: 80px"] {
            width: 80px !important;
            height: 80px !important;
          }
          
          h3[style*="fontSize: 1rem"] {
            font-size: 1rem !important;
          }
          
          p[style*="fontSize: 1.1rem"][style*="color: #C72A01"] {
            font-size: 1.1rem !important;
          }
          
          div[style*="padding: 20px"][style*="borderTop"] {
            padding: 20px !important;
          }
          
          span[style*="fontSize: 1.2rem"] {
            font-size: 1.2rem !important;
          }
          
          span[style*="fontSize: 1.5rem"][style*="color: #C72A01"] {
            font-size: 1.5rem !important;
          }
          
          button[style*="padding: 15px"][style*="fontSize: 1.1rem"] {
            padding: 15px !important;
            font-size: 1.1rem !important;
          }
        }
      `}</style>
    </>
  )
}

export default Cart 