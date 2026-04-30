import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isGuest, setIsGuest] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showAuthModal, setShowAuthModal] = useState(false)

  useEffect(() => {
    // Check local storage for saved session
    const savedUser = localStorage.getItem('portfolio_user')
    const savedGuest = localStorage.getItem('portfolio_guest')
    const hasVisited = localStorage.getItem('portfolio_visited')
    
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    } else if (savedGuest === 'true') {
      setIsGuest(true)
    } else if (!hasVisited) {
      // First time visitor - show auth modal after delay
      setTimeout(() => {
        setShowAuthModal(true)
        localStorage.setItem('portfolio_visited', 'true')
      }, 3000)
    }
    
    setIsLoading(false)
  }, [])

  const login = (email, password) => {
    // Simulate API call
    const mockUser = {
      id: '1',
      email,
      name: email.split('@')[0],
      role: 'user',
      joinedAt: new Date().toISOString(),
    }
    setUser(mockUser)
    localStorage.setItem('portfolio_user', JSON.stringify(mockUser))
    setShowAuthModal(false)
    return { success: true }
  }

  const register = (name, email, password) => {
    // Simulate API call
    const mockUser = {
      id: '1',
      email,
      name,
      role: 'user',
      joinedAt: new Date().toISOString(),
    }
    setUser(mockUser)
    localStorage.setItem('portfolio_user', JSON.stringify(mockUser))
    setShowAuthModal(false)
    return { success: true }
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

  const value = {
    user,
    isGuest,
    isAuthenticated: !!user || isGuest,
    isRegistered: !!user,
    isLoading,
    showAuthModal,
    login,
    register,
    continueAsGuest,
    logout,
    openAuthModal,
    closeAuthModal,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export default AuthContext
