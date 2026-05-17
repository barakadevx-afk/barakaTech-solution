import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, User, Eye, EyeOff, UserCircle, Crown, Zap, Check, Coffee } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const freeBenefits = [
  'Browse all projects & case studies',
  'Read blog posts & tutorials',
  'View skills & experience',
  'Send contact messages',
]

const premiumBenefits = [
  'Download full source code',
  'Priority 24h support',
  'Exclusive Discord community',
  'Early access to new projects',
  'Personalized content feed',
  'Premium badge on your profile',
]

function AuthModal() {
  const { showAuthModal, closeAuthModal, login, register, continueAsGuest, openPawaPayModal } = useAuth()
  const [mode, setMode] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [showTiers, setShowTiers] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      let result
      if (mode === 'login') {
        result = await login(formData.email, formData.password)
      } else {
        result = await register(formData.name, formData.email, formData.password)
      }
      if (!result.success) setError(result.message || 'Authentication failed')
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGuest = () => continueAsGuest()

  if (!showAuthModal) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={closeAuthModal}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 24 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-xl bg-white dark:bg-dark-200 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Gradient top bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-red-500 via-rose-500 to-orange-400" />

          {/* Close */}
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Tier selector toggle */}
          <div className="px-8 pt-7 pb-0">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {showTiers ? 'Join the Community' : mode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              {!showTiers && (
                <button
                  onClick={() => setShowTiers(true)}
                  className="text-xs text-primary-500 hover:underline font-medium"
                >
                  View plans
                </button>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
              {showTiers
                ? 'Free to join — upgrade anytime for premium perks'
                : mode === 'login'
                  ? 'Sign in to access your account'
                  : 'Create a free account in seconds'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {showTiers ? (
              <motion.div
                key="tiers"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="px-8 pb-8"
              >
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Free tier */}
                  <div className="p-5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-300/40">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700">
                        <Zap className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white text-sm">Free</p>
                        <p className="text-xs text-gray-500">Always free</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {freeBenefits.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                          <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Premium tier */}
                  <div className="relative p-5 rounded-2xl border-2 border-rose-400 bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-900/20 dark:to-orange-900/20">
                    <div className="absolute -top-2.5 right-3 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-rose-500 to-orange-400 text-white text-[10px] font-bold uppercase tracking-wide">
                      Popular
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-rose-500 to-orange-400">
                        <Crown className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white text-sm">Premium</p>
                        <p className="text-xs text-rose-500">Support via coffee</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {premiumBenefits.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
                          <Check className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => { setShowTiers(false); setMode('register') }}
                    className="py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:border-primary-500 hover:text-primary-500 transition-colors"
                  >
                    Sign Up Free
                  </button>
                  <button
                    onClick={() => {
                      closeAuthModal()
                      setTimeout(() => openPawaPayModal(), 200)
                    }}
                    className="py-3 rounded-xl bg-gradient-to-r from-rose-500 to-orange-400 text-white font-semibold text-sm shadow-lg shadow-rose-500/30 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Coffee className="w-4 h-4" />
                    Go Premium
                  </button>
                </div>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-3 bg-white dark:bg-dark-200 text-gray-400 text-xs">
                      already have an account?
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => { setShowTiers(false); setMode('login') }}
                    className="py-2.5 rounded-xl bg-gray-100 dark:bg-dark-300 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-200 dark:hover:bg-dark-400 transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={handleGuest}
                    className="py-2.5 rounded-xl text-gray-500 dark:text-gray-400 text-sm hover:text-gray-700 dark:hover:text-gray-200 border border-dashed border-gray-300 dark:border-gray-600 transition-colors"
                  >
                    Browse as Guest
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <form onSubmit={handleSubmit} className="px-8 pb-6 space-y-4">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm"
                    >
                      {error}
                    </motion.div>
                  )}

                  {mode === 'register' && (
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-300 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                        required
                      />
                    </div>
                  )}

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-300 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-10 pr-12 py-3 rounded-xl bg-gray-50 dark:bg-dark-300 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-500 to-rose-500 text-white font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Processing...
                      </span>
                    ) : (
                      mode === 'login' ? 'Sign In' : 'Create Free Account'
                    )}
                  </motion.button>

                  <div className="relative py-1">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-3 bg-white dark:bg-dark-200 text-gray-400 text-xs">or</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleGuest}
                    className="w-full py-2.5 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                  >
                    Continue as Guest (limited access)
                  </button>
                </form>

                <div className="px-8 pb-6 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {mode === 'login' ? (
                      <>
                        No account?{' '}
                        <button onClick={() => setMode('register')} className="text-primary-500 hover:text-primary-600 font-semibold">
                          Sign up free
                        </button>
                      </>
                    ) : (
                      <>
                        Already registered?{' '}
                        <button onClick={() => setMode('login')} className="text-primary-500 hover:text-primary-600 font-semibold">
                          Sign in
                        </button>
                      </>
                    )}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default AuthModal
