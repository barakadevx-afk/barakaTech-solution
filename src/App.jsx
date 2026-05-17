import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AuthProvider } from './contexts/AuthContext'
import { AdminProvider } from './contexts/AdminContext'
import { NavigationContext } from './contexts/NavigationContext'
import Navbar from './components/Navbar'

import Hero from './components/Hero'
import Stats from './components/Stats'
import About from './components/About'
import VideoPresentation from './components/VideoPresentation'
import Services from './components/Services'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Blog from './components/Blog'
import FAQ from './components/FAQ'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Resume from './components/Resume'
import AuthModal from './components/AuthModal'
import WelcomeBanner from './components/WelcomeBanner'
import UserDashboard from './components/UserDashboard'
import AdminDashboard from './components/AdminDashboard'
import PawaPayDonation from './components/PawaPayDonation'

const sectionTransition = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.35, ease: 'easeOut' },
}

function LoadingScreen() {
  return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-dark-200"
    >
      <div className="relative mb-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-red-100 dark:border-red-500/20 border-t-red-500 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-2 w-12 h-12 border-4 border-transparent border-b-rose-400 rounded-full"
        />
      </div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-sm text-gray-500 dark:text-gray-400 font-medium"
      >
        Loading portfolio...
      </motion.p>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 120 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="mt-4 h-0.5 bg-gradient-to-r from-red-500 to-rose-500 rounded-full"
      />
    </motion.div>
  )
}

function SectionWrapper({ id, children }) {
  return (
    <motion.div key={id} {...sectionTransition}>
      {children}
    </motion.div>
  )
}

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showUserDashboard, setShowUserDashboard] = useState(false)
  const [showAdminDashboard, setShowAdminDashboard] = useState(false)
  const [currentSection, setCurrentSection] = useState('home')

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
      setCurrentSection(view)
      setShowUserDashboard(false)
      setShowAdminDashboard(false)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true)
    }
    const timer = setTimeout(() => setIsLoading(false), 1000)
    const onNav = (e) => navigateTo(e.detail)
    window.addEventListener('navigate', onNav)
    document.addEventListener('navigate', onNav)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('navigate', onNav)
      document.removeEventListener('navigate', onNav)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(p => !p)

  return (
    <AuthProvider>
      <AdminProvider>
        <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
          <AnimatePresence>
            {isLoading ? (
              <LoadingScreen />
            ) : (
              <div className="text-gray-900 dark:text-white relative min-h-screen bg-white dark:bg-dark-200">
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

                  <main className="relative z-10 min-h-screen">
                    <AnimatePresence mode="wait">
                      {currentSection === 'home' && (
                        <SectionWrapper id="home">
                          <Hero />
                          <Stats />
                        </SectionWrapper>
                      )}

                      {currentSection === 'about' && (
                        <SectionWrapper id="about">
                          <div className="pt-24">
                            <About />
                          </div>
                        </SectionWrapper>
                      )}

                      {currentSection === 'video' && (
                        <SectionWrapper id="video">
                          <div className="pt-24">
                            <VideoPresentation />
                          </div>
                        </SectionWrapper>
                      )}

                      {currentSection === 'resume' && (
                        <SectionWrapper id="resume">
                          <div className="pt-24">
                            <Resume />
                          </div>
                        </SectionWrapper>
                      )}

                      {currentSection === 'services' && (
                        <SectionWrapper id="services">
                          <div className="pt-24">
                            <Services />
                          </div>
                        </SectionWrapper>
                      )}

                      {currentSection === 'skills' && (
                        <SectionWrapper id="skills">
                          <div className="pt-24">
                            <Skills />
                          </div>
                        </SectionWrapper>
                      )}

                      {currentSection === 'experience' && (
                        <SectionWrapper id="experience">
                          <div className="pt-24">
                            <Experience />
                          </div>
                        </SectionWrapper>
                      )}

                      {currentSection === 'projects' && (
                        <SectionWrapper id="projects">
                          <div className="pt-24">
                            <Projects />
                          </div>
                        </SectionWrapper>
                      )}

                      {currentSection === 'blog' && (
                        <SectionWrapper id="blog">
                          <div className="pt-24">
                            <Blog />
                            <FAQ />
                          </div>
                        </SectionWrapper>
                      )}

                      {currentSection === 'faq' && (
                        <SectionWrapper id="faq">
                          <div className="pt-24">
                            <FAQ />
                          </div>
                        </SectionWrapper>
                      )}

                      {currentSection === 'testimonials' && (
                        <SectionWrapper id="testimonials">
                          <div className="pt-24">
                            <Testimonials />
                          </div>
                        </SectionWrapper>
                      )}

                      {currentSection === 'contact' && (
                        <SectionWrapper id="contact">
                          <div className="pt-24">
                            <Contact />
                          </div>
                        </SectionWrapper>
                      )}
                    </AnimatePresence>
                  </main>

                  <Footer onNavigate={navigateTo} />
                </NavigationContext.Provider>

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
