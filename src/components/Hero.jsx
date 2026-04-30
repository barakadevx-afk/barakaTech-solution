import { ArrowDown, Github, Linkedin, Twitter, User, Sparkles, Download } from 'lucide-react'
import { useNavigate } from '../contexts/useNavigate'

function Hero() {
  const navigateTo = useNavigate()

  return (
    <section id="home" className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-8 sm:py-12 lg:py-20">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Profile Image */}
          <div className="flex flex-col items-center lg:items-start order-1">
            {/* Handwritten style greeting */}
            <div className="mb-4 lg:self-start">
              <span className="font-hand text-3xl text-red-500 transform -rotate-6 inline-block">
                Hey there! 👋
              </span>
            </div>

            <div className="relative inline-block">
              {/* Profile image container */}
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72 rounded-3xl overflow-hidden border-4 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 shadow-xl">
                  <img
                    src="public/profile.jpg"
                    alt="Baraka - Full-Stack Developer"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  {/* Fallback avatar */}
                  <div
                    className="absolute inset-0 hidden items-center justify-center bg-red-600"
                    style={{ display: 'none' }}
                  >
                    <User className="w-24 h-24 sm:w-32 sm:h-32 text-white" />
                  </div>
              </div>
              
              {/* Status indicator */}
              <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-200 dark:border-gray-700">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Available</span>
              </div>
              </div>

            {/* Personal touch */}
            <div className="mt-6 sm:mt-8 flex flex-col items-center lg:items-start gap-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                Baraka Tech Solution
              </div>
              <span className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400">
                Building cool stuff since 2023 ✨
              </span>
            </div>
          </div>

          {/* Right Column - Content with human feel */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2">
            {/* Casual greeting */}
            <p className="font-hand text-2xl text-red-400 mb-2">I'm a</p>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
              Developer, Creator,{' '}
              <span className="text-red-600 dark:text-red-400">Dreamer</span>
            </h1>

            {/* Unified Code Form */}
            <div className="w-full max-w-lg mb-6 sm:mb-8">
              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                {/* Header */}
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 border-b border-gray-700">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  </div>
                  <span className="ml-3 text-xs text-gray-400 font-mono">Baraka.js</span>
                </div>
                {/* Code Content */}
                <div className="p-4 font-mono text-sm leading-relaxed">
                  <code className="text-gray-300">
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-blue-400">developer</span>{' '}
                    <span className="text-gray-500">=</span>{' '}
                    <span className="text-yellow-400">{'{'}</span>{'\n'}
                    {'  '}<span className="text-red-400">name</span>
                    <span className="text-gray-500">:</span>{' '}
                    <span className="text-green-400">'Baraka'</span>
                    <span className="text-gray-500">,</span>{'\n'}
                    {'  '}<span className="text-red-400">title</span>
                    <span className="text-gray-500">:</span>{' '}
                    <span className="text-green-400">'Full Stack Dev'</span>
                    <span className="text-gray-500">,</span>{'\n'}
                    {'  '}<span className="text-red-400">skills</span>
                    <span className="text-gray-500">: [</span>
                    <span className="text-green-400">'React'</span>
                    <span className="text-gray-500">,</span>{'\n'}
                    {'          '}<span className="text-green-400">'Node.js'</span>
                    <span className="text-gray-500">,</span>{'\n'}
                    {'          '}<span className="text-green-400">'TypeScript'</span>
                    <span className="text-gray-500">],</span>{'\n'}
                    {'  '}<span className="text-red-400">passion</span>
                    <span className="text-gray-500">:</span>{' '}
                    <span className="text-green-400">'Building things'</span>
                    <span className="text-gray-500">,</span>{'\n'}
                    {'  '}<span className="text-red-400">mission</span>
                    <span className="text-gray-500">:</span>{' '}
                    <span className="text-green-400">'build awesome things'</span>
                    <span className="text-gray-500">,</span>{'\n'}
                    {'  '}<span className="text-red-400">loves</span>
                    <span className="text-gray-500">:</span>{' '}
                    <span className="text-green-400">'turning ideas → reality'</span>
                    <span className="text-gray-500">,</span>{'\n'}
                    {'  '}<span className="text-red-400">motto</span>
                    <span className="text-gray-500">:</span>{' '}
                    <span className="text-green-400">'Currently learning'</span>
                    <span className="text-gray-500">,</span>{'\n'}
                    {'  '}<span className="text-red-400">available</span>
                    <span className="text-gray-500">:</span>{' '}
                    <span className="text-orange-400">true</span>{'\n'}
                    <span className="text-yellow-400">{'}'}</span>
                    <span className="text-gray-500">;</span>{'\n'}
                    {'\n'}
                    <span className="text-blue-400">developer</span>
                    <span className="text-gray-500">.</span>
                    <span className="text-yellow-300">sayHi</span>
                    <span className="text-gray-500">();</span>{' '}
                    <span className="text-gray-600"></span>
                  </code>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-6 sm:mb-8">
              <button
                onClick={() => navigateTo('projects')}
                className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors text-sm sm:text-base"
              >
                View My Work
              </button>
              <button
                onClick={() => navigateTo('contact')}
                className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-lg border-2 border-red-600 text-red-600 dark:text-red-400 font-semibold hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors text-sm sm:text-base"
              >
                Get In Touch
              </button>
              <a
                href="/resume.html"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 text-sm sm:text-base"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                My Resume
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3">
              {[
                { icon: Github, href: 'https://github.com/barakadevx-afk', label: 'GitHub', bg: 'bg-gray-800 hover:bg-gray-900' },
                { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', bg: 'bg-blue-600 hover:bg-blue-700' },
                { icon: Twitter, href: 'https://twitter.com', label: 'Twitter', bg: 'bg-sky-500 hover:bg-sky-600' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 sm:p-3 rounded-lg text-white ${social.bg} transition-colors`}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <div className="hidden sm:block absolute bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 z-20">
        <a
          href="#about"
          className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors text-xs"
        >
          <span className="font-medium">Scroll Down</span>
          <ArrowDown className="w-4 h-4" />
        </a>
      </div>
    </section>
  )
}

export default Hero
