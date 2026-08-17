import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { registerUser, loginUser, upgradeUserToPremium } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isGuest, setIsGuest] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showPawaPayModal, setShowPawaPayModal] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem('portfolio_user')
    const savedGuest = localStorage.getItem('portfolio_guest')
    const hasVisited = localStorage.getItem('portfolio_visited')

    if (savedUser) {
      setUser(JSON.parse(savedUser))
    } else if (savedGuest === 'true') {
      setIsGuest(true)
    } else if (!hasVisited) {
      setTimeout(() => {
        setShowAuthModal(true)
        localStorage.setItem('portfolio_visited', 'true')
      }, 3000)
    }

    setIsLoading(false)
  }, [])

  const login = useCallback(async (email, password) => {
    try {
      const result = await loginUser(email, password)
      if (result.success && result.user) {
        setUser(result.user)
        localStorage.setItem('portfolio_user', JSON.stringify(result.user))
        setShowAuthModal(false)
        return { success: true }
      }
      return { success: false, error: result.error || 'Invalid email or password' }
    } catch {
      return { success: false, error: 'Connection error — please try again' }
    }
  }, [])

  const register = useCallback(async (name, email, password) => {
    try {
      const result = await registerUser(name, email, password)
      if (result.success && result.user) {
        setUser(result.user)
        localStorage.setItem('portfolio_user', JSON.stringify(result.user))
        setShowAuthModal(false)
        return { success: true }
      }
      return { success: false, error: result.error || 'Registration failed' }
    } catch {
      return { success: false, error: 'Connection error — please try again' }
    }
  }, [])

  const upgradeToPremium = useCallback(async () => {
    if (user?.email) {
      try {
        const result = await upgradeUserToPremium(user.email)
        if (result.success && result.user) {
          setUser(result.user)
          localStorage.setItem('portfolio_user', JSON.stringify(result.user))
        }
      } catch {
        // fallback: mark locally
        const upgraded = { ...user, isPremium: true, premiumSince: new Date().toISOString() }
        setUser(upgraded)
        localStorage.setItem('portfolio_user', JSON.stringify(upgraded))
      }
    }
  }, [user])

  const continueAsGuest = () => {
    setIsGuest(true)
    localStorage.setItem('portfolio_guest', 'true')
    setShowAuthModal(false)
  }

  const logout = () => {
    setUser(null)
    setIsGuest(false)
    localStorage.removeItem('portfolio_user')
    localStorage.removeItem('portfolio_guest')
  }

  const openAuthModal = () => setShowAuthModal(true)
  const closeAuthModal = () => setShowAuthModal(false)
  const openPawaPayModal = () => setShowPawaPayModal(true)
  const closePawaPayModal = () => setShowPawaPayModal(false)

  const value = {
    user,
    isGuest,
    isAuthenticated: !!user || isGuest,
    isRegistered: !!user,
    isPremium: !!user?.isPremium,
    isLoading,
    showAuthModal,
    showPawaPayModal,
    login,
    register,
    continueAsGuest,
    logout,
    upgradeToPremium,
    openAuthModal,
    closeAuthModal,
    openPawaPayModal,
    closePawaPayModal,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export default AuthContext
