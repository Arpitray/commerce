import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

function ProductPage() {
  const { productId } = useParams()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://dummyjson.com/products/${productId}`)
        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.status}`)
        }
        const data = await response.json()
        
        setProduct({
          id: data.id,
          name: data.title,
          price: data.price,
          description: data.description,
          image: data.images?.[0] || data.thumbnail,
          brand: data.brand,
          category: data.category,
          rating: data.rating,
          stock: data.stock
        })
      } catch (error) {
        console.error('Error fetching product:', error)
        // Fallback product data
        setProduct({
          id: productId,
          name: 'Premium Product',
          price: 299.99,
          description: 'This is a high-quality product with excellent features and durability.',
          image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
          brand: 'Premium Brand',
          category: 'General',
          rating: 4.5,
          stock: 50
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  if (loading) {
    return (
      <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#FEFCDA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '1.5rem', color: '#704F24' }}>Loading...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#FEFCDA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '1.5rem', color: '#704F24' }}>Product not found</div>
      </div>
    )
  }

  const totalPrice = product.price * quantity

  return (
    <div className="product-page-container" style={{ paddingTop: '50px', minHeight: '100vh', backgroundColor: '#FEFCDA', width: '100%', overflowX: 'hidden' }}>
      <div className="product-page-content" style={{ margin: '0 auto', padding: '40px 20px' }}>
        <div className="product-layout justify-center" style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
          {/* Product Image */}
          <div className="product-image-section" style={{ width: '50%' }}>
            <div className="product-image" style={{
              width: '100%',
              height: '700px',
              backgroundImage: `url(${product.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#ecf39e',
              borderRadius: '15px'
            }}></div>
          </div>

          {/* Product Details */}
          <div className="product-details-section" style={{ width: '40%' }}>
            <h1 className='font-["restore"] product-title' style={{ fontSize: '3.2rem', marginBottom: '15px', color: '#C72A01' }}>
              {product.name}
            </h1>
            
            <div className="product-price" style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#000', marginRight: '15px' }}>
                ${product.price}
              </span>
            </div>

            <p className='font-["slabo"] font-semibold product-description' style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '30px', color: '#333' }}>
              {product.description}
            </p>

            {/* Product Info */}
            <div className='font-semibold text-[#c72a01] text-lg product-info' style={{ marginBottom: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: '#666' }}>Brand:</span>
                <span style={{ fontWeight: 'bold' }}>{product.brand}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: '#666' }}>Category:</span>
                <span style={{ fontWeight: 'bold' }}>{product.category}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: '#666' }}>Rating:</span>
                <span style={{ fontWeight: 'bold' }}>⭐ {product.rating}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: '#666' }}>Stock:</span>
                <span style={{ fontWeight: 'bold' }}>{product.stock} available</span>
              </div>
            </div>

            {/* Quantity */}
            <div className="quantity-section" style={{ marginBottom: '25px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px', color: '#704F24' }}>
                Quantity
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: '2px solid #704F24',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    color: '#704F24',
                    fontSize: '1.2rem',
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
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', minWidth: '30px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: '2px solid #704F24',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    color: '#704F24',
                    fontSize: '1.2rem',
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
              </div>
            </div>

            {/* Total Price */}
            <div className='rounded-2xl total-price' style={{ marginBottom: '25px', padding: '15px', backgroundColor: '#f8f8f8', borderRadius: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.1rem', color: '#666' }}>Total Price:</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#C72A01' }}>
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons flex flex-col md:flex-row gap-4 md:gap-4 mb-8">
              <button 
                onClick={() => addToCart(product, quantity)}
                className="w-full md:flex-1"
                style={{
                  padding: '15px 40px',
                  backgroundColor: '#C72A01',
                  color: 'white',
                  border: 'none',
                  borderRadius: '30px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
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
                Add to Cart
              </button>
              <button 
                className="w-full md:flex-1"
                style={{
                padding: '15px 40px',
                backgroundColor: 'white',
                color: '#704F24',
                border: '2px solid #704F24',
                borderRadius: '30px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
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
              }}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .product-page-container {
            width: 100% !important;
            padding-top: 60px !important;
            overflow-x: hidden !important;
          }
          
          .product-page-content {
            margin: 0 auto !important;
            padding: 20px 15px !important;
            max-width: 100% !important;
          }
          
          .product-layout {
            flex-direction: column !important;
            gap: 30px !important;
            align-items: center !important;
            justify-content: center !important;
          }
          
          .product-image-section {
            width: 100% !important;
            max-width: 400px !important;
          }
          
          .product-details-section {
            width: 100% !important;
            max-width: 400px !important;
          }
          
          .product-image {
            height: 350px !important;
          }
          
          .product-title {
            font-size: 2.5rem !important;
            line-height: 1.1 !important;
            margin-bottom: 15px !important;
            text-align: center !important;
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
          }
          
          .product-price span {
            font-size: 1.8rem !important;
            text-align: center !important;
          }
          
          .product-description {
            font-size: 1.1rem !important;
            line-height: 1.6 !important;
            margin-bottom: 25px !important;
            text-align: center !important;
          }
          
          .product-info {
            font-size: 1rem !important;
            margin-bottom: 10px !important;
          }
          
          .quantity-section h3 {
            font-size: 1.2rem !important;
            margin-bottom: 10px !important;
            text-align: center !important;
          }
          
          .quantity-section button {
            width: 40px !important;
            height: 40px !important;
            font-size: 1.2rem !important;
          }
          
          .quantity-section span {
            font-size: 1.2rem !important;
            min-width: 30px !important;
          }
          
          .total-price span:first-child {
            font-size: 1rem !important;
          }
          
          .total-price span:last-child {
            font-size: 1.4rem !important;
          }
          
          .action-buttons button {
            padding: 15px 20px !important;
            font-size: 1rem !important;
          }
          
          .product-details-section > div {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 15px !important;
          }
          
          .product-details-section > div > div {
            width: 100% !important;
            text-align: center !important;
          }
        }
      `}</style>
    </div>
  )
}

export default ProductPage
