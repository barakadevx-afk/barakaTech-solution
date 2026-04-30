import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun, Code2 } from 'lucide-react'
import UserMenu from './UserMenu'

const navLinks = [
  { name: 'Home', section: 'home' },
  { name: 'About', section: 'about' },
  { name: 'Video', section: 'video' },
  { name: 'Resume', section: 'resume' },
  { name: 'Services', section: 'services' },
  { name: 'Skills', section: 'skills' },
  { name: 'Experience', section: 'experience' },
  { name: 'Projects', section: 'projects' },
  { name: 'Testimonials', section: 'testimonials' },
  { name: 'Contact', section: 'contact' },
]

function Navbar({ darkMode, toggleDarkMode, onNavigate, currentSection }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-4 left-4 right-4 z-40 transition-all duration-500 rounded-2xl ${
        isScrolled 
          ? 'bg-white/80 dark:bg-dark-100/80 backdrop-blur-xl shadow-xl border border-red-100/50 dark:border-red-500/20' 
          : 'bg-white/40 dark:bg-dark-100/40 backdrop-blur-lg border border-white/50 dark:border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-xl font-bold px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-200/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Code2 className="w-7 h-7 text-red-500" />
            <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">Baraka Tech</span>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <motion.button
                key={link.name}
                onClick={() => onNavigate(link.section)}
                className={`relative font-medium transition-all px-3 py-1.5 rounded-lg ${
                  currentSection === link.section
                    ? 'text-red-600 dark:text-red-400 bg-red-50/80 dark:bg-red-500/10'
                    : 'text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-500/5'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {link.name}
                {currentSection === link.section && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-500"
                  />
                )}
              </motion.button>
            ))}
            
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="p-2.5 rounded-xl bg-white/60 dark:bg-white/10 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 hover:border-red-200/50 transition-all shadow-sm"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>

            {/* User Menu */}
            <UserMenu onNavigate={onNavigate} />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <UserMenu onNavigate={onNavigate} />
            
            <motion.button
              onClick={toggleDarkMode}
              whileTap={{ scale: 0.9 }}
              className="p-2.5 rounded-xl bg-white/60 dark:bg-white/10 backdrop-blur-sm border border-gray-200/50 dark:border-white/10"
            >
              {darkMode ? <Sun className="w-5 h-5 text-orange-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </motion.button>
            
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              className="p-2.5 rounded-xl bg-white/60 dark:bg-white/10 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 text-gray-600 dark:text-gray-300"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-dark-100 border-t dark:border-gray-800"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  onClick={() => {
                    onNavigate(link.section)
                    setIsMobileMenuOpen(false)
                  }}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`block py-2 font-medium text-left w-full ${
                    currentSection === link.section
                      ? 'text-primary-500 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'
                  }`}
                >
                  {link.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
