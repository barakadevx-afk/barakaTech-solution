import { createContext, useContext, useState, useCallback } from 'react'

const AdminContext = createContext(null)

// Hardcoded admin credentials (single admin)
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'baraka2024'

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    // Check localStorage on init
    return localStorage.getItem('isAdmin') === 'true'
  })
  const [error, setError] = useState(null)

  const login = useCallback((username, password) => {
    setError(null)
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAdmin(true)
      localStorage.setItem('isAdmin', 'true')
      return true
    } else {
      setError('Invalid username or password')
      return false
    }
  }, [])

  const logout = useCallback(() => {
    setIsAdmin(false)
    localStorage.removeItem('isAdmin')
    setError(null)
  }, [])

  const value = {
    isAdmin,
    login,
    logout,
    error,
  }

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider')
  }
  return context
}

export default AdminContext
