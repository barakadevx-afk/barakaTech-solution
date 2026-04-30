import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Lock, User, AlertCircle } from 'lucide-react'
import { useAdmin } from '../contexts/AdminContext'

function AdminLogin({ onClose }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login, error } = useAdmin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    const success = login(username, password)
    
    setIsLoading(false)
    
    if (success && onClose) {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white dark:bg-dark-200 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-red-500 to-rose-600">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-white/20">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white text-center">
            Admin Login
          </h2>
          <p className="text-white/80 text-center text-sm mt-1">
            Secure access only
          </p>
        </div>

        {/* Form */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-dark-300 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-red-500"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-dark-300 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-red-500"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold disabled:opacity-50 hover:shadow-lg transition-shadow"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <button
            onClick={onClose}
            className="w-full mt-4 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminLogin
