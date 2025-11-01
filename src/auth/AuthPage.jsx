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

    // Also check hash fragments (Supabase might use these)
    const hash = window.location.hash
    
    let hashParams = {}
    if (hash) {
      const hashString = hash.substring(1) // remove #
      const params = new URLSearchParams(hashString)
      hashParams = {
        access_token: params.get('access_token'),
        refresh_token: params.get('refresh_token'),
        type: params.get('type')
      }
    }

    // Check both search params and hash params
    const finalParams = {
      access_token: access_token || hashParams.access_token,
      refresh_token: refresh_token || hashParams.refresh_token,
      type: type || hashParams.type
    }

    if (finalParams.access_token && finalParams.refresh_token && finalParams.type === 'recovery') {
      // User clicked the reset link, show password reset form
      setIsResettingPassword(true)
      setForgotPassword(false)
      setIsSignUp(false)
      setError('')
      setMessage('')
      
      // Set the session
      supabase.auth.setSession({
        access_token: finalParams.access_token,
        refresh_token: finalParams.refresh_token
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
      // Always use production URL for password reset emails to ensure mobile compatibility
      const productionUrl = import.meta.env.VITE_PRODUCTION_URL;
      
      if (!productionUrl) {
        setError('Production URL not configured. Please contact support.')
        setLoading(false)
        return
      }
        
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${productionUrl}/auth`,
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
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: 'url(https://res.cloudinary.com/dsjjdnife/image/upload/v1761470322/Gemini_Generated_Image_w6h92xw6h92xw6h9_mmhlbb.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better form visibility */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Auth Form Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen" style={{ padding: '16px' }}>
        <div className="bg-white/20 backdrop-blur-md rounded-3xl w-full max-w-md shadow-2xl border border-white/30" style={{ padding: '32px' }}>
          {/* Welcome Header */}
          <div className="text-center" style={{ marginBottom: '32px' }}>
            <h1 className="text-2xl font-bold flex items-center justify-center gap-2" style={{ marginBlock: '6px', color: '#f4f1de' }}>
              Welcome 
              <span style={{ color: '#fefae0' }}></span>
            </h1>
            <p className="text-lg font-bold" style={{ color: '#fefae0' }}>
              {isResettingPassword
                ? 'Enter your new password below'
                : forgotPassword 
                ? 'Enter your email to reset password'
                : isSignUp 
                ? 'Create your account to get started'
                : 'Login'
              }
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-6">
            {/* Email Field */}
            {!isResettingPassword && (
              <div>
                <label className="block text-sm font-bold" style={{ marginBottom: '8px', color: '#f4f1de' }}>
                  Email
                </label>
                <input
                  type="email"
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/80 border border-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ padding: '12px 16px', color: '#d4a373', focusRingColor: '#d4a373' }}
                />
              </div>
            )}

            {/* Password Field */}
            {(!forgotPassword || isResettingPassword) && (
              <div>
                <label className="block text-sm font-bold" style={{ marginBottom: '8px', color: '#f4f1de' }}>
                  {isResettingPassword ? 'New Password' : 'Password'}
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-white/80 border border-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ padding: '12px 16px', color: '#d4a373', focusRingColor: '#d4a373' }}
                />
              </div>
            )}

            {/* Confirm Password Field */}
            {isResettingPassword && (
              <div>
                <label className="block text-sm font-medium" style={{ marginBottom: '8px', color: '#d4a373' }}>
                  Confirm New Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full bg-white/80 border border-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ padding: '12px 16px', color: '#d4a373', focusRingColor: '#d4a373' }}
                />
              </div>
            )}

            {/* Remember Me & Forgot Password */}
            {!isSignUp && !forgotPassword && !isResettingPassword && (
              <div style={{marginTop:'12px'}} className="flex items-center justify-between text-sm">
            
              </div>
            )}

            {/* Error/Success Messages */}
            {error && (
              <div className="text-red-600 text-sm bg-red-50 rounded-xl border border-red-200" style={{ padding: '12px' }}>
                {error}
              </div>
            )}
            {message && (
              <div className="text-green-600 text-sm bg-green-50 rounded-xl border border-green-200" style={{ padding: '12px' }}>
                {message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full font-bold rounded-2xl text-[#99582a] transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              style={{ 
                padding: '12px 16px', 
                marginTop: '16px',
                backgroundColor: loading ? '#fefae0' : '#fefae0',
                color: '#99582a',
                opacity: loading ? 0.6 : 1
              }}
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

            {/* Back to Login Button */}
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
                className="w-full font-medium transition-colors duration-200"
                style={{ padding: '8px', color: '#ffe6a7' }}
              >
                ← Back to Login
              </button>
            )}
          </form>

          {/* Divider */}
          {!forgotPassword && !isResettingPassword && (
            <div className="flex items-center" style={{ margin: '24px 0' }}>
              <div className="flex-1 border-t" style={{ borderColor: '#f4f1de' }}></div>
              <span className="text-sm" style={{ padding: '0 12px', color: '#f4f1de' }}>or Sign In with Google</span>
              <div className="flex-1 border-t" style={{ borderColor: '#f4f1de' }}></div>
            </div>
          )}

          {/* Google Sign In Button */}
          {!forgotPassword && !isResettingPassword && (
            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full flex items-center justify-center gap-3 bg-white/90 hover:bg-white border border-white/50 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              style={{ padding: '12px 16px' }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="font-medium" style={{ color: '#d4a373' }}>Continue with Google</span>
            </button>
          )}

          {/* Footer */}
          {!forgotPassword && !isResettingPassword && (
            <div className="text-center" style={{ marginTop: '24px' }}>
              <span className="text-sm" style={{ color: '#f4f1de' }}>
                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setError('')
                  setMessage('')
                }}
                className="text-sm font-semibold hover:underline"
                style={{ color: '#ffe6a7' }}
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