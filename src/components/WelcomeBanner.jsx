import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, X, Crown, Zap } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useState, useEffect } from 'react'

function WelcomeBanner() {
  const { user, isGuest, isLoading, openAuthModal } = useAuth()
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!isLoading && (user || isGuest) && !hasAnimated) {
      const timer = setTimeout(() => {
        setIsVisible(true)
        setHasAnimated(true)
        // Auto hide after 6 seconds
        setTimeout(() => setIsVisible(false), 6000)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [user, isGuest, isLoading, hasAnimated])

  if (isLoading || (!user && !isGuest)) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100, x: '-50%' }}
          animate={{ opacity: 1, y: 20, x: '-50%' }}
          exit={{ opacity: 0, y: -100, x: '-50%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed top-0 left-1/2 z-50 w-full max-w-md"
        >
          <div className={`mx-4 p-4 rounded-2xl shadow-2xl border backdrop-blur-lg ${
            isGuest 
              ? 'bg-gray-900/90 border-gray-700 text-white'
              : 'bg-gradient-to-r from-primary-500 to-purple-600 border-transparent text-white'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${
                isGuest ? 'bg-gray-700' : 'bg-white/20'
              }`}>
                {isGuest ? (
                  <Zap className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Crown className="w-5 h-5 text-white" />
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="font-bold text-sm">
                  {isGuest ? 'Welcome, Guest!' : `Welcome back, ${user.name}!`}
                </h3>
                <p className="text-xs opacity-90 mt-1">
                  {isGuest 
                    ? 'You have limited access. Sign in to unlock all features.'
                    : 'You have full access to all exclusive content and features.'
                  }
                </p>
                
                {isGuest && (
                  <button
                    onClick={() => {
                      setIsVisible(false)
                      openAuthModal()
                    }}
                    className="mt-2 text-xs font-semibold underline hover:no-underline"
                  >
                    Sign in for full access →
                  </button>
                )}
              </div>
              
              <button
                onClick={() => setIsVisible(false)}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WelcomeBanner
