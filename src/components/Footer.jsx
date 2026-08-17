import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code2, ArrowUp, Mail, Phone, MapPin, Github, Linkedin, Twitter, Heart, Send, Coffee } from 'lucide-react'

const navSections = [
  { label: 'Navigation', links: [
    { name: 'Home', section: 'home' },
    { name: 'About', section: 'about' },
    { name: 'Services', section: 'services' },
    { name: 'Skills', section: 'skills' },
    { name: 'Projects', section: 'projects' },
  ]},
  { label: 'More', links: [
    { name: 'Experience', section: 'experience' },
    { name: 'Blog', section: 'blog' },
    { name: 'Testimonials', section: 'testimonials' },
    { name: 'FAQ', section: 'faq' },
    { name: 'Contact', section: 'contact' },
  ]},
]

const socials = [
  { icon: Github, href: 'https://github.com/barakadevx-afk', label: 'GitHub', color: 'hover:bg-gray-800 hover:text-white' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:bg-blue-600 hover:text-white' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter', color: 'hover:bg-sky-500 hover:text-white' },
  { icon: Mail, href: 'mailto:barakadevx@gmail.com', label: 'Email', color: 'hover:bg-red-500 hover:text-white' },
]

function Footer({ onNavigate }) {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 5000)
  }

  return (
    <footer className="bg-gray-950 dark:bg-black text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <button
              onClick={() => onNavigate?.('home')}
              className="flex items-center gap-2.5 mb-5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/30 group-hover:shadow-red-500/50 transition-all">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Baraka<span className="text-red-500">Tech</span></span>
            </button>
            <p className="text-sm leading-relaxed mb-5 text-gray-400">
              A developer who loves building cool stuff — full-stack apps, games, and secure systems. 
              Based in Rwanda, working with the world. 
            </p>

            {/* Socials */}
            <div className="flex gap-2.5">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className={`p-2.5 rounded-xl border border-gray-700 text-gray-400 transition-all ${s.color}`}
                  aria-label={s.label}
                >
                  <s.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {navSections.map((section) => (
            <div key={section.label}>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{section.label}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => onNavigate?.(link.section)}
                      className="text-gray-400 hover:text-red-400 transition-colors text-sm hover:translate-x-1 transform inline-block"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Stay Updated</h4>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Get notified about new projects, articles, and updates. No spam, ever.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/30 transition-all"
                />
              </div>
              {subscribed ? (
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <span className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">✓</span>
                  You&apos;re subscribed!
                </div>
              ) : (
                <button type="submit" className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-red-500/30 transition-all">
                  <Send className="w-3.5 h-3.5" /> Subscribe
                </button>
              )}
            </form>

            {/* Contact quick info */}
            <div className="mt-6 space-y-2">
              <a href="mailto:barakadevx@gmail.com" className="flex items-center gap-2 text-xs text-gray-500 hover:text-red-400 transition-colors">
                <Mail className="w-3.5 h-3.5" /> barakadevx@gmail.com
              </a>
              <span className="flex items-center gap-2 text-xs text-gray-600">
                <MapPin className="w-3.5 h-3.5" /> Kigali, Rwanda
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Coffee className="w-3.5 h-3.5 text-orange-500" />
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Baraka Tech Solutions. All rights reserved.
          </p>

          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
