import { Code2, ArrowUp, Mail, Phone, MapPin, Coffee } from 'lucide-react'

const navLinks = [
  { name: 'Home', section: 'home' },
  { name: 'About', section: 'about' },
  { name: 'Video', section: 'video' },
  { name: 'Resume', section: 'resume' },
  { name: 'Skills', section: 'skills' },
  { name: 'Projects', section: 'projects' },
  { name: 'Contact', section: 'contact' },
]

function Footer({ onNavigate }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
          {/* Brand */}
          <div className="sm:col-span-2">
            <button
              onClick={() => onNavigate?.('home')}
              className="flex items-center gap-2 text-lg sm:text-xl font-bold mb-3 sm:mb-4"
            >
              <Code2 className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
              <span className="text-red-600 dark:text-red-400">
                Baraka Tech
              </span>
            </button>
            <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm sm:text-base max-w-sm leading-relaxed">
              Just a developer who loves building cool stuff. Thanks for stopping by! 👋
            </p>
            <p className="text-red-600 dark:text-red-400 text-sm sm:text-base">
              Let's build something awesome together!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 text-sm sm:text-base">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => onNavigate?.(link.section)}
                    className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors text-sm sm:text-base"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 text-sm sm:text-base">
              Say Hi!
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              <li className="flex items-center gap-2 hover:text-red-600 transition-colors">
                <Mail className="w-4 h-4 text-red-600" />
                barakadevx@gmail.com
              </li>
              <li className="flex items-center gap-2 hover:text-red-600 transition-colors">
                <Phone className="w-4 h-4 text-red-600" />
                0792828727
              </li>
              <li className="flex items-center gap-2 hover:text-red-600 transition-colors">
                <MapPin className="w-4 h-4 text-red-600" />
                Rwanda 🌍
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
            <Coffee className="w-4 h-4 text-orange-500" />
            <span>Fueled by passion & coffee</span>
          </div>
          
          <p className="text-gray-500 dark:text-gray-500 text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} Developed by Baraka
          </p>

          <button
            onClick={scrollToTop}
            className="p-2 sm:p-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
