import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

// Custom lazy load component with optimized settings
export const OptimizedLazyImage = ({ 
  src, 
  alt, 
  width = "100%", 
  height = "100%", 
  style = {}, 
  className = "",
  onError = null,
  effect = "blur",
  threshold = 200,
  ...props 
}) => {
  const defaultStyle = {
    width,
    height,
    objectFit: 'cover',
    ...style
  }

  const defaultPlaceholder = (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#f3f4f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#9ca3af',
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px'
      }}>
        <div style={{
          width: '20px',
          height: '20px',
          border: '2px solid #9ca3af',
          borderTop: '2px solid transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <span>Loading...</span>
      </div>
    </div>
  )

  const handleError = (e) => {
    if (onError) {
      onError(e)
    } else {
      // Default fallback image
      e.target.src = 'https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=Image+Not+Found'
    }
  }

  return (
    <>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <LazyLoadImage
        src={src}
        alt={alt}
        effect={effect}
        width={width}
        height={height}
        style={defaultStyle}
        className={className}
        onError={handleError}
        threshold={threshold}
        placeholder={defaultPlaceholder}
        {...props}
      />
    </>
  )
}

export default OptimizedLazyImage
