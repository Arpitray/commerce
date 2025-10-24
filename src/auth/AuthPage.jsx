import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [forgotPassword, setForgotPassword] = useState(false)
  const [isResettingPassword, setIsResettingPassword] = useState(false)
  
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    // Check if this is a password reset callback
    const access_token = searchParams.get('access_token')
    const refresh_token = searchParams.get('refresh_token')
    const type = searchParams.get('type')

    if (access_token && refresh_token && type === 'recovery') {
      // User clicked the reset link, show password reset form
      setIsResettingPassword(true)
      setForgotPassword(false)
      setIsSignUp(false)
      
      // Set the session
      supabase.auth.setSession({
        access_token,
        refresh_token
      })
    }
  }, [searchParams])

const handleAuth = async (e) => {
  e.preventDefault()
  setLoading(true)
  setError('')
  setMessage('')

  try {
    if (isResettingPassword) {
      if (password !== confirmPassword) {
        setError('Passwords do not match')
        setLoading(false)
        return
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long')
        setLoading(false)
        return
      }

      const { error } = await supabase.auth.updateUser({ password })
      if (error) setError(error.message)
      else {
        setMessage('Password updated successfully! Redirecting to login...')
        setPassword('')
        setConfirmPassword('')
        setTimeout(() => navigate('/auth'), 2000)
      }
      setLoading(false)
      return
    }

    if (forgotPassword) {
      // Get the proper redirect URL - use production URL if in production, or current origin for local dev
      const getRedirectUrl = () => {
        // If you have a production URL, use it
        const productionUrl = import.meta.env.VITE_PRODUCTION_URL;
        
        if (productionUrl) {
          return productionUrl;
        }
        
        // For local development, try to get a mobile-accessible URL
        const currentOrigin = window.location.origin;
        
        // If using localhost, try to use the local network IP instead
        if (currentOrigin.includes('localhost')) {
          // Replace localhost with your actual local IP for mobile access
          const localIP = '192.168.29.132'; // Your actual local IP
          return currentOrigin.replace('localhost', localIP);
        }
        
        return currentOrigin;
      };
        
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${getRedirectUrl()}/auth`,
      })
      if (error) setError(error.message)
      else setMessage('Check your email for the password reset link!')
      setLoading(false)
      return
    }

    // Login / Signup
    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })

    if (error) setError(error.message)
    else {
      setMessage(
        isSignUp
          ? 'Check your email for confirmation!'
          : 'Logged in successfully! Redirecting...'
      )
      if (!isSignUp) setTimeout(() => navigate('/'), 1500)
    }
  } catch (err) {
    setError(err.message)
  }

  setLoading(false)
}

  

  const handleGoogleAuth = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
    if (error) setError(error.message)
  }


  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div 
          className="w-full h-full flex items-center justify-center relative"
          style={{
            background: 'linear-gradient(135deg, #8B4513 0%, #D2691E  50%, #F4A460 100%)',
            position: 'relative'
          }}
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0" style={{ opacity: 0.1 }}>
            {/* Stars */}
            <div className="absolute top-20 left-20 text-yellow-300 text-4xl">⭐</div>
            <div className="absolute top-32 right-32 text-yellow-300 text-2xl">⭐</div>
            <div className="absolute bottom-40 left-16 text-yellow-300 text-3xl">⭐</div>
            
            {/* Moon */}
            <div className="absolute top-16 right-20 text-yellow-200 text-5xl">🌙</div>
            
            {/* Balloons */}
            <div className="absolute top-24 left-1/3 text-teal-300 text-3xl">🎈</div>
            <div className="absolute top-40 left-1/4 text-green-300 text-2xl">🎈</div>
            <div className="absolute bottom-32 right-1/4 text-blue-300 text-3xl">🎈</div>
          </div>
          
          {/* Main illustration placeholder - you can replace with actual image */}
          <div className="relative z-10 text-center">
            <div className="text-8xl" style={{ marginBottom: '20px' }}>📚</div>
            <div className="text-6xl" style={{ marginBottom: '30px' }}>
              <span className="inline-block" style={{ margin: '0 10px' }}>👧</span>
              <span className="inline-block" style={{ margin: '0 10px' }}>👦</span>
            </div>
            <div className="text-5xl">
              <span className="inline-block" style={{ margin: '0 10px' }}>👧</span>
              <span className="inline-block" style={{ margin: '0 10px' }}>👦</span>
            </div>
          </div>
          
          {/* Bottom section */}
          <div className="absolute bottom-8 left-8 right-8">
            <div className="flex items-center justify-between text-white">
              <div>
                <p className="text-sm font-medium">Chosen by Parents, Loved by Kids</p>
                <p className="text-xs opacity-80">Safe, meaningful stories that grow with your child.</p>
              </div>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-orange-400 rounded-full border-2 border-white flex items-center justify-center text-xs">👨</div>
                <div className="w-8 h-8 bg-purple-400 rounded-full border-2 border-white flex items-center justify-center text-xs">👩</div>
                <div className="w-8 h-8 bg-green-400 rounded-full border-2 border-white flex items-center justify-center text-xs">👦</div>
                <div className="w-8 h-8 bg-amber-600 rounded-full border-2 border-white flex items-center justify-center text-xs text-white font-bold">10K+</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center" style={{ padding: '40px 20px' }}>
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center" style={{ marginBottom: '40px' }}>
            <h1 className="text-3xl font-bold text-gray-900" style={{ marginBottom: '8px' }}>
              {isResettingPassword
                ? 'Set New Password'
                : forgotPassword 
                ? 'Reset Your Password' 
                : isSignUp 
                ? 'Create Your Account' 
                : 'Dive Into the World of Stories'
              }
            </h1>
            <p className="text-gray-600 text-sm">
              {isResettingPassword
                ? 'Enter your new password below. Make sure it\'s strong and secure.'
                : forgotPassword 
                ? 'Enter your email address and we\'ll send you a link to reset your password.'
                : isSignUp 
                ? 'Join our community and start your journey' 
                : 'Discover fun, interactive stories that spark your child\'s imagination.'
              }
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-4">
            {/* Email Field - only show for signup, login, and forgot password */}
            {!isResettingPassword && (
              <div>
                <label className="block text-sm font-medium text-gray-700" style={{ marginBottom: '6px' }}>
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="amelia@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                  style={{ padding: '12px 16px' }}
                />
              </div>
            )}

            {/* Password Field - for login, signup, and password reset */}
            {(!forgotPassword || isResettingPassword) && (
              <div>
                <div className="flex justify-between items-center" style={{ marginBottom: '6px' }}>
                  <label className="block text-sm font-medium text-gray-700">
                    {isResettingPassword ? 'New Password' : 'Password'}
                  </label>
                  {!isSignUp && !isResettingPassword && (
                    <button
                      type="button"
                      className="text-sm text-gray-500 hover:text-gray-700"
                      onClick={() => setForgotPassword(true)}
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={isResettingPassword ? "Enter new password" : "Amita@4218"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all pr-10"
                    style={{ padding: '12px 16px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>
            )}

            {/* Confirm Password Field - only for password reset */}
            {isResettingPassword && (
              <div>
                <label className="block text-sm font-medium text-gray-700" style={{ marginBottom: '6px' }}>
                  Confirm New Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                  style={{ padding: '12px 16px' }}
                />
              </div>
            )}

            {/* Remember Me */}
            {!isSignUp && !forgotPassword && (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                  Remember me
                </label>
              </div>
            )}

            {/* Error/Success Messages */}
            {error && (
              <div className="text-red-600 text-sm bg-red-50 rounded-lg" style={{ padding: '8px 12px' }}>
                {error}
              </div>
            )}
            {message && (
              <div className="text-green-600 text-sm bg-green-50 rounded-lg" style={{ padding: '8px 12px' }}>
                {message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-medium rounded-lg transition-all duration-200"
              style={{ padding: '12px 16px' }}
            >
              {loading 
                ? 'Please wait...' 
                : isResettingPassword
                ? 'Update Password'
                : forgotPassword 
                ? 'Send Reset Link'
                : isSignUp 
                ? 'Create Account' 
                : 'Login'
              }
            </button>

            {/* Back to Login Button for Forgot Password */}
            {(forgotPassword || isResettingPassword) && (
              <button
                type="button"
                onClick={() => {
                  setForgotPassword(false)
                  setIsResettingPassword(false)
                  setError('')
                  setMessage('')
                  setPassword('')
                  setConfirmPassword('')
                }}
                className="w-full text-amber-600 hover:text-amber-700 font-medium transition-all duration-200"
                style={{ padding: '8px 16px' }}
              >
                Back to Login
              </button>
            )}
          </form>

          {/* Divider */}
          {!forgotPassword && !isResettingPassword && (
            <div className="flex items-center" style={{ margin: '24px 0' }}>
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-3 text-sm text-gray-500">Or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>
          )}

          {/* Social Login Buttons */}
          {!forgotPassword && !isResettingPassword && (
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleGoogleAuth}
                className="w-full flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                style={{ padding: '12px 16px' }}
              >
                <svg className="w-5 h-5" style={{ marginRight: '8px' }} viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Login with Google
              </button>
            </div>
          )}

          {/* Footer */}
          {!forgotPassword && !isResettingPassword && (
            <div className="text-center" style={{ marginTop: '24px' }}>
              <span className="text-sm text-gray-600">
                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setError('')
                  setMessage('')
                }}
                className="text-sm text-amber-600 hover:text-amber-700 font-medium hover:underline"
              >
                {isSignUp ? 'Login' : 'Create one'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
