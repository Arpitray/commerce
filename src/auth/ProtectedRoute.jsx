import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import AuthPage from './AuthPage'

export default function ProtectedRoute({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!session) {
    return <AuthPage />
  }

  return children
}
