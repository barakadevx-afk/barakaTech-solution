import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, LogOut, Settings, Crown, Sparkles, LayoutDashboard, Shield } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

function UserMenu({ onNavigate }) {
  const { user, isGuest, logout, openAuthModal } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  if (!user && !isGuest) {
    return (
      <motion.button
        onClick={openAuthModal}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500 to-purple-600 text-white font-medium text-sm shadow-lg shadow-primary-500/30"
      >
        <User className="w-4 h-4" />
        Sign In
      </motion.button>
    )
  }

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-2 px-3 py-2 rounded-full border-2 transition-colors ${
          isGuest 
            ? 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400' 
            : 'border-primary-500 text-primary-600 dark:text-primary-400'
        }`}
      >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
          isGuest 
            ? 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            : 'bg-gradient-to-br from-primary-500 to-purple-600 text-white'
        }`}>
          {isGuest ? 'G' : user.name.charAt(0).toUpperCase()}
        </div>
        <span className="hidden sm:block text-sm font-medium">
          {isGuest ? 'Guest' : user.name}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-dark-200 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                    isGuest 
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      : 'bg-gradient-to-br from-primary-500 to-purple-600 text-white'
                  }`}>
                    {isGuest ? 'G' : user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {isGuest ? 'Guest User' : user.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {isGuest ? 'Limited access' : user.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                {isGuest ? (
                  <>
                    <div className="px-3 py-2 mb-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-dark-300/50 rounded-lg">
                      <Sparkles className="w-3 h-3 inline mr-1" />
                      Sign in to unlock all features
                    </div>
                    <button
                      onClick={() => {
                        setIsOpen(false)
                        openAuthModal()
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                    >
                      <Crown className="w-4 h-4" />
                      <span className="text-sm font-medium">Upgrade to Member</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setIsOpen(false)
                        onNavigate?.('user-dashboard')
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-300/50 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span className="text-sm">Dashboard</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsOpen(false)
                        onNavigate?.('admin-dashboard')
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-300/50 transition-colors"
                    >
                      <Shield className="w-4 h-4" />
                      <span className="text-sm">Admin Panel</span>
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-300/50 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      <span className="text-sm">Settings</span>
                    </button>
                    <div className="px-3 py-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs">
                        <Crown className="w-3 h-3" />
                        Member
                      </span>
                    </div>
                  </>
                )}

                <div className="border-t border-gray-100 dark:border-gray-800 my-2" />

                <button
                  onClick={() => {
                    setIsOpen(false)
                    logout()
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">{isGuest ? 'Exit Guest Mode' : 'Sign Out'}</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UserMenu
