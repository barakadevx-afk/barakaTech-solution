import { createContext, useContext, useState, useCallback } from 'react'

const AdminContext = createContext(null)

const ADMIN_EMAIL = 'baraka@admin.com'
const ADMIN_PASSWORD = 'Baraka@123'
const MESSAGES_KEY = 'contact_messages'

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true'
  })
  const [error, setError] = useState(null)

  const login = useCallback((email, password) => {
    setError(null)
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAdmin(true)
      localStorage.setItem('isAdmin', 'true')
      return true
    } else {
      setError('Invalid email or password')
      return false
    }
  }, [])

  const logout = useCallback(() => {
    setIsAdmin(false)
    localStorage.removeItem('isAdmin')
    setError(null)
  }, [])

  const getMessages = useCallback(() => {
    try {
      return JSON.parse(localStorage.getItem(MESSAGES_KEY) || '[]')
    } catch {
      return []
    }
  }, [])

  const markAsRead = useCallback((id) => {
    const msgs = JSON.parse(localStorage.getItem(MESSAGES_KEY) || '[]')
    const updated = msgs.map(m => m.id === id ? { ...m, read: true } : m)
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(updated))
  }, [])

  const deleteMessage = useCallback((id) => {
    const msgs = JSON.parse(localStorage.getItem(MESSAGES_KEY) || '[]')
    const updated = msgs.filter(m => m.id !== id)
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(updated))
  }, [])

  const value = {
    isAdmin,
    login,
    logout,
    error,
    getMessages,
    markAsRead,
    deleteMessage,
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

