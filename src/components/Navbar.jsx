import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun, Code2, Home, User, Video, FileText, Briefcase, Cpu, Clock, FolderOpen, MessageSquare, Mail } from 'lucide-react'
import UserMenu from './UserMenu'

const navLinks = [
  { name: 'Home', section: 'home', icon: Home },
  { name: 'About', section: 'about', icon: User },
  { name: 'Services', section: 'services', icon: Briefcase },
  { name: 'Skills', section: 'skills', icon: Cpu },
  { name: 'Projects', section: 'projects', icon: FolderOpen },
  { name: 'Experience', section: 'experience', icon: Clock },
  { name: 'Blog', section: 'blog', icon: FileText },
  { name: 'Contact', section: 'contact', icon: Mail },
]

function Navbar({ darkMode, toggleDarkMode, onNavigate, currentSection }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 20)
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? (scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on section change
  useEffect(() => { setIsMobileMenuOpen(false) }, [currentSection])

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-gray-200/50 dark:bg-gray-800/50">
        <motion.div
          className="h-full bg-gradient-to-r from-red-500 via-rose-500 to-orange-500"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-3 left-3 right-3 z-40 transition-all duration-500 rounded-2xl ${
          isScrolled
            ? 'bg-white/85 dark:bg-dark-100/85 backdrop-blur-2xl shadow-2xl border border-gray-100/80 dark:border-gray-700/50'
            : 'bg-white/40 dark:bg-dark-100/30 backdrop-blur-lg border border-white/40 dark:border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <motion.button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 font-bold"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/30">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent hidden sm:block">
                Baraka<span className="font-normal text-gray-500 dark:text-gray-400"> Tech</span>
              </span>
            </motion.button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.button
                  key={link.name}
                  onClick={() => onNavigate(link.section)}
                  className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentSection === link.section
                      ? 'text-red-600 dark:text-red-400 bg-red-50/80 dark:bg-red-500/10'
                      : 'text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-500/5'
                  }`}
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 0 }}
                >
                  {link.name}
                  {currentSection === link.section && (
                    <motion.div
                      layoutId="navDot"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-500"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              {/* Desktop theme + user */}
              <div className="hidden md:flex items-center gap-2">
                <motion.button
                  onClick={toggleDarkMode}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-500/30 transition-all bg-white/50 dark:bg-dark-100/50"
                >
                  {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
                </motion.button>
                <UserMenu onNavigate={onNavigate} />
              </div>

              {/* Mobile controls */}
              <div className="flex md:hidden items-center gap-1.5">
                <motion.button
                  onClick={toggleDarkMode}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"
                >
                  {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </motion.button>
                <UserMenu onNavigate={onNavigate} />
                <motion.button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-dark-100/50"
                >
                  <AnimatePresence mode="wait">
                    {isMobileMenuOpen
                      ? <motion.div key="x" initial={{ rotate: -90 }} animate={{ rotate: 0 }}><X className="w-5 h-5" /></motion.div>
                      : <motion.div key="menu" initial={{ rotate: 90 }} animate={{ rotate: 0 }}><Menu className="w-5 h-5" /></motion.div>
                    }
                  </AnimatePresence>
                </motion.button>
              </div>
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
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden border-t border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-dark-100/95 backdrop-blur-xl rounded-b-2xl"
            >
              <div className="p-4 grid grid-cols-2 gap-1">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.name}
                    onClick={() => onNavigate(link.section)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all ${
                      currentSection === link.section
                        ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-50 hover:text-red-500'
                    }`}
                  >
                    <link.icon className="w-4 h-4 flex-shrink-0" />
                    {link.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}

export default Navbar
