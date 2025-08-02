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
                padding: '5px'
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
                        fontWeight: 'bold'
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
                        fontWeight: 'bold'
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
                        fontSize: '0.9rem'
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
              transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#704F24'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#C72A01'
            }}>
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default Cart 