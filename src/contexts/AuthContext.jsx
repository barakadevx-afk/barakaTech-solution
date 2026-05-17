import { createContext, useContext, useState, useEffect } from 'react'

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

  const login = (email, password) => {
    const premiumEmails = JSON.parse(localStorage.getItem('portfolio_premium_emails') || '[]')
    const mockUser = {
      id: Date.now().toString(),
      email,
      name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').trim() || email.split('@')[0],
      role: 'user',
      isPremium: premiumEmails.includes(email),
      joinedAt: new Date().toISOString(),
    }
    setUser(mockUser)
    localStorage.setItem('portfolio_user', JSON.stringify(mockUser))
    setShowAuthModal(false)
    return { success: true }
  }

  const register = (name, email, password) => {
    const premiumEmails = JSON.parse(localStorage.getItem('portfolio_premium_emails') || '[]')
    const mockUser = {
      id: Date.now().toString(),
      email,
      name,
      role: 'user',
      isPremium: premiumEmails.includes(email),
      joinedAt: new Date().toISOString(),
    }
    setUser(mockUser)
    localStorage.setItem('portfolio_user', JSON.stringify(mockUser))
    setShowAuthModal(false)
    return { success: true }
  }

  const upgradeToPremium = () => {
    if (user) {
      const upgraded = { ...user, isPremium: true, premiumSince: new Date().toISOString() }
      setUser(upgraded)
      localStorage.setItem('portfolio_user', JSON.stringify(upgraded))
      const premiumEmails = JSON.parse(localStorage.getItem('portfolio_premium_emails') || '[]')
      if (!premiumEmails.includes(user.email)) {
        premiumEmails.push(user.email)
        localStorage.setItem('portfolio_premium_emails', JSON.stringify(premiumEmails))
      }
    }
  }

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
