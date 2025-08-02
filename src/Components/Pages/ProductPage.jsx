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
    <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#FEFCDA' }}>
      <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px' }}>
          {/* Product Image */}
          <div>
            <div style={{
              width: '100%',
              height: '400px',
              backgroundImage: `url(${product.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#f5f5f5',
              borderRadius: '15px'
            }}></div>
          </div>

          {/* Product Details */}
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '15px', color: '#704F24' }}>
              {product.name}
            </h1>
            
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#C72A01', marginRight: '15px' }}>
                ${product.price}
              </span>
            </div>

            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '30px', color: '#333' }}>
              {product.description}
            </p>

            {/* Product Info */}
            <div style={{ marginBottom: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: '#666' }}>Brand:</span>
                <span style={{ fontWeight: 'bold', color: '#704F24' }}>{product.brand}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: '#666' }}>Category:</span>
                <span style={{ fontWeight: 'bold', color: '#704F24' }}>{product.category}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: '#666' }}>Rating:</span>
                <span style={{ fontWeight: 'bold', color: '#704F24' }}>⭐ {product.rating}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: '#666' }}>Stock:</span>
                <span style={{ fontWeight: 'bold', color: '#704F24' }}>{product.stock} available</span>
              </div>
            </div>

            {/* Quantity */}
            <div style={{ marginBottom: '25px' }}>
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
                    fontWeight: 'bold'
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
                    fontWeight: 'bold'
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Total Price */}
            <div style={{ marginBottom: '25px', padding: '15px', backgroundColor: '#f8f8f8', borderRadius: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.1rem', color: '#666' }}>Total Price:</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#C72A01' }}>
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
              <button 
                onClick={() => addToCart(product, quantity)}
                style={{
                  padding: '15px 40px',
                  backgroundColor: '#C72A01',
                  color: 'white',
                  border: 'none',
                  borderRadius: '30px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  flex: '1'
                }}
              >
                Add to Cart
              </button>
              <button style={{
                padding: '15px 40px',
                backgroundColor: 'white',
                color: '#704F24',
                border: '2px solid #704F24',
                borderRadius: '30px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                flex: '1'
              }}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
