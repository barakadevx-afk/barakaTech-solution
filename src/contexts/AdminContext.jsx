import { createContext, useContext, useState, useCallback } from 'react'
import { adminLogin as apiLogin, fetchAdminMessages, markMessageRead, deleteAdminMessage } from '../lib/api'

const AdminContext = createContext(null)

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true'
  })
  const [adminEmail, setAdminEmail] = useState(() => {
    return localStorage.getItem('admin_email') || ''
  })
  const [error, setError] = useState(null)

  const login = useCallback(async (email, password) => {
    setError(null)
    try {
      const result = await apiLogin(email, password)
      if (result.success) {
        setIsAdmin(true)
        setAdminEmail(email)
        localStorage.setItem('isAdmin', 'true')
        localStorage.setItem('admin_email', email)
        localStorage.setItem('admin_auth', `${email}:${password}`)
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
    setAdminEmail('')
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('admin_email')
    localStorage.removeItem('admin_auth')
    setError(null)
  }, [])

  const getAuthHeader = useCallback(() => {
    return localStorage.getItem('admin_auth') || ''
  }, [])

  const getMessages = useCallback(async () => {
    const result = await fetchAdminMessages(getAuthHeader())
    return result.messages || []
  }, [getAuthHeader])

  const markAsRead = useCallback(async (id) => {
    await markMessageRead(id, getAuthHeader())
  }, [getAuthHeader])

  const deleteMessage = useCallback(async (id) => {
    await deleteAdminMessage(id, getAuthHeader())
  }, [getAuthHeader])

  const value = {
    isAdmin,
    adminEmail,
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
