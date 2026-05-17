import { createContext, useContext, useState, useCallback } from 'react'
import { adminLogin as apiLogin, fetchAdminMessages, markMessageRead, deleteAdminMessage } from '../lib/api'

const AdminContext = createContext(null)

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true'
  })
  const [error, setError] = useState(null)

  const login = useCallback(async (email, password) => {
    setError(null)
    try {
      const result = await apiLogin(email, password)
      if (result.success) {
        setIsAdmin(true)
        localStorage.setItem('isAdmin', 'true')
        return true
      } else {
        setError(result.error || 'Invalid email or password')
        return false
      }
    } catch {
      setError('Connection error — please try again')
      return false
    }
  }, [])

  const logout = useCallback(() => {
    setIsAdmin(false)
    localStorage.removeItem('isAdmin')
    setError(null)
  }, [])

  const getMessages = useCallback(async () => {
    const result = await fetchAdminMessages()
    return result.messages || []
  }, [])

  const markAsRead = useCallback(async (id) => {
    await markMessageRead(id)
  }, [])

  const deleteMessage = useCallback(async (id) => {
    await deleteAdminMessage(id)
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
