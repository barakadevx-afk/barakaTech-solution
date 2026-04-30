import { useState, useEffect, createContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AuthProvider } from './contexts/AuthContext'
import { AdminProvider } from './contexts/AdminContext'
import Navbar from './components/Navbar'

// Navigation Context
export const NavigationContext = createContext(null)
import Hero from './components/Hero'
import About from './components/About'
import VideoPresentation from './components/VideoPresentation'
import Services from './components/Services'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Resume from './components/Resume'
import AuthModal from './components/AuthModal'
import WelcomeBanner from './components/WelcomeBanner'
import UserDashboard from './components/UserDashboard'
import AdminDashboard from './components/AdminDashboard'
import PawaPayDonation from './components/PawaPayDonation'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showUserDashboard, setShowUserDashboard] = useState(false)
  const [showAdminDashboard, setShowAdminDashboard] = useState(false)
  const [currentSection, setCurrentSection] = useState('home')

  // Handle navigation
  const navigateTo = (view) => {
    if (view === 'user-dashboard') {
      setShowUserDashboard(true)
      setShowAdminDashboard(false)
    } else if (view === 'admin-dashboard') {
      setShowAdminDashboard(true)
      setShowUserDashboard(false)
    } else if (view === 'main') {
      setShowUserDashboard(false)
      setShowAdminDashboard(false)
      setCurrentSection('home')
    } else {
      // Section navigation
      setCurrentSection(view)
      setShowUserDashboard(false)
      setShowAdminDashboard(false)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true)
    }
    
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(!darkMode)

  return (
    <AuthProvider>
      <AdminProvider>
        <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <AnimatePresence>
          {isLoading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-dark-200"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 360, 360]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full"
              />
            </motion.div>
          ) : (
            <div className="text-gray-900 dark:text-white relative min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
              <AuthModal />
              <WelcomeBanner />
              <PawaPayDonation />
              
              <NavigationContext.Provider value={{ navigateTo, currentSection }}>
                <Navbar 
                  darkMode={darkMode} 
                  toggleDarkMode={toggleDarkMode} 
                  onNavigate={navigateTo}
                  currentSection={currentSection}
                />
              <main className="relative z-10 min-h-screen pt-16 sm:pt-20">
                <AnimatePresence mode="wait">
                  {currentSection === 'home' && (
                    <motion.div
                      key="home"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Hero />
                    </motion.div>
                  )}
                  {currentSection === 'about' && (
                    <motion.div
                      key="about"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <About />
                    </motion.div>
                  )}
                  {currentSection === 'video' && (
                    <motion.div
                      key="video"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <VideoPresentation />
                    </motion.div>
                  )}
                  {currentSection === 'resume' && (
                    <motion.div
                      key="resume"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Resume />
                    </motion.div>
                  )}
                  {currentSection === 'services' && (
                    <motion.div
                      key="services"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Services />
                    </motion.div>
                  )}
                  {currentSection === 'skills' && (
                    <motion.div
                      key="skills"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Skills />
                    </motion.div>
                  )}
                  {currentSection === 'experience' && (
                    <motion.div
                      key="experience"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Experience />
                    </motion.div>
                  )}
                  {currentSection === 'projects' && (
                    <motion.div
                      key="projects"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Projects />
                    </motion.div>
                  )}
                  {currentSection === 'testimonials' && (
                    <motion.div
                      key="testimonials"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Testimonials />
                    </motion.div>
                  )}
                  {currentSection === 'contact' && (
                    <motion.div
                      key="contact"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Contact />
                    </motion.div>
                  )}
                </AnimatePresence>
              </main>
              <Footer onNavigate={navigateTo} />
              </NavigationContext.Provider>
              
              {/* Dashboard Overlays */}
              {showUserDashboard && (
                <UserDashboard 
                  onNavigate={navigateTo}
                  onClose={() => setShowUserDashboard(false)}
                />
              )}
              
              {showAdminDashboard && (
                <AdminDashboard 
                  onNavigate={navigateTo}
                  onClose={() => setShowAdminDashboard(false)}
                />
              )}
            </div>
          )}
        </AnimatePresence>
        </div>
      </AdminProvider>
    </AuthProvider>
  )
}

export default App
