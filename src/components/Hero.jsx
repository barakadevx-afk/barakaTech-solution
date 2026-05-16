import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Twitter, Download, Sparkles, Terminal, Zap, Code2, User } from 'lucide-react'
import { useNavigate } from '../contexts/useNavigate'

const roles = ['Full-Stack Developer', 'Game Developer', 'Security Engineer', 'AI Enthusiast', 'Problem Solver']

const floatingBadges = [
  { label: 'React', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20', delay: 0 },
  { label: 'Node.js', color: 'bg-green-500/10 text-green-400 border-green-500/20', delay: 0.5 },
  { label: 'TypeScript', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', delay: 1 },
  { label: 'Python', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', delay: 1.5 },
  { label: 'Unity', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20', delay: 0.8 },
  { label: 'Docker', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20', delay: 1.3 },
]

function TypeWriter({ words, speed = 80, deleteSpeed = 40, pauseTime = 2000 }) {
  const [currentWord, setCurrentWord] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const cursorInterval = setInterval(() => setShowCursor(p => !p), 500)
    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    const word = words[currentWord]
    let timeout

    if (!isDeleting && currentText === word) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime)
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false)
      setCurrentWord(p => (p + 1) % words.length)
    } else {
      const delta = isDeleting ? deleteSpeed : speed
      timeout = setTimeout(() => {
        setCurrentText(isDeleting
          ? word.substring(0, currentText.length - 1)
          : word.substring(0, currentText.length + 1)
        )
      }, delta)
    }
    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentWord, words, speed, deleteSpeed, pauseTime])

  return (
    <span>
      <span className="text-gradient">{currentText}</span>
      <span className={`ml-0.5 inline-block w-0.5 h-8 bg-red-500 ${showCursor ? 'opacity-100' : 'opacity-0'}`} style={{ verticalAlign: 'middle' }} />
    </span>
  )
}

function Particles() {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    
    let particles = []
    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.5 + 0.1,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(239, 68, 68, ${p.opacity})`
        ctx.fill()
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1
      })
      animationRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

function Hero() {
  const navigateTo = useNavigate()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-red-50/30 dark:from-dark-300 dark:via-dark-200 dark:to-dark-100" />
      <Particles />

      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-red-400/10 rounded-full filter blur-3xl animate-blob" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-rose-400/10 rounded-full filter blur-3xl animate-blob" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-orange-400/8 rounded-full filter blur-3xl animate-blob" style={{ animationDelay: '6s' }} />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
        style={{ backgroundImage: 'linear-gradient(rgba(239,68,68,1) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Available for hire
              <Sparkles className="w-3.5 h-3.5" />
            </motion.div>

            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-hand text-2xl sm:text-3xl text-gray-500 dark:text-gray-400 mb-2"
            >
              Hey there! 👋 I&apos;m Baraka
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 text-gray-900 dark:text-white"
            >
              Developer,{' '}
              <span className="font-hand text-red-500">Creator</span>
              <br />
              &amp; Dreamer
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl sm:text-2xl font-semibold mb-6 h-9 text-gray-700 dark:text-gray-300"
            >
              {mounted && <TypeWriter words={roles} />}
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
            >
              I build full-stack web apps, immersive games, and secure systems. 
              Turning ideas into reality — one line of code at a time.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8"
            >
              <motion.button
                onClick={() => navigateTo('projects')}
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(239,68,68,0.4)' }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold shadow-lg shadow-red-500/30 flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                View My Work
              </motion.button>
              <motion.button
                onClick={() => navigateTo('contact')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3.5 rounded-xl border-2 border-red-500/50 text-red-600 dark:text-red-400 font-semibold hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
              >
                Get In Touch
              </motion.button>
              <motion.a
                href="/resume.html"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3.5 rounded-xl bg-gray-100 dark:bg-dark-100 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-dark-50 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Resume
              </motion.a>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
              className="flex items-center justify-center lg:justify-start gap-3"
            >
              {[
                { icon: Github, href: 'https://github.com/barakadevx-afk', label: 'GitHub', bg: 'hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900' },
                { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', bg: 'hover:bg-blue-600 hover:text-white' },
                { icon: Twitter, href: 'https://twitter.com', label: 'Twitter', bg: 'hover:bg-sky-500 hover:text-white' },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className={`p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 transition-all ${s.bg}`}
                  aria-label={s.label}
                >
                  <s.icon className="w-5 h-5" />
                </motion.a>
              ))}
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-500">Follow me</span>
            </motion.div>
          </motion.div>

          {/* Right — Profile & Code */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="order-1 lg:order-2 flex flex-col items-center gap-6"
          >
            {/* Profile image */}
            <div className="relative">
              <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-3xl overflow-hidden border-4 border-white dark:border-dark-100 shadow-2xl ring-4 ring-red-500/20">
                <img
                  src="/profile.jpg"
                  alt="Baraka"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
                />
                <div className="hidden absolute inset-0 items-center justify-center bg-gradient-to-br from-red-500 to-rose-600">
                  <User className="w-20 h-20 text-white" />
                </div>
              </div>

              {/* Status badge */}
              <div className="absolute -bottom-3 -right-3 flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-dark-100 rounded-full shadow-lg border border-gray-100 dark:border-gray-700">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Available</span>
              </div>

              {/* Floating tech badges */}
              {floatingBadges.map((badge, i) => {
                const positions = [
                  'top-0 -left-16', 'top-1/4 -right-16', 'bottom-1/4 -left-16',
                  'bottom-0 -right-12', '-top-4 right-8', 'top-1/2 -left-20',
                ]
                return (
                  <motion.div
                    key={badge.label}
                    className={`absolute hidden sm:block ${positions[i]}`}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: badge.delay, ease: 'easeInOut' }}
                  >
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${badge.color} backdrop-blur-sm whitespace-nowrap`}>
                      {badge.label}
                    </span>
                  </motion.div>
                )
              })}
            </div>

            {/* Code snippet card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="w-full max-w-sm"
            >
              <div className="bg-gray-950 dark:bg-black/50 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-900 border-b border-gray-800">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex items-center gap-1.5 ml-2">
                    <Terminal className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-xs text-gray-400 font-mono">baraka.config.js</span>
                  </div>
                </div>
                <div className="p-4 font-mono text-xs leading-6 overflow-x-auto">
                  <p><span className="text-purple-400">const</span> <span className="text-blue-300">dev</span> <span className="text-gray-500">=</span> <span className="text-yellow-300">{'{'}</span></p>
                  <p className="pl-4"><span className="text-red-400">name</span><span className="text-gray-500">:</span> <span className="text-green-400">&apos;Baraka&apos;</span><span className="text-gray-500">,</span></p>
                  <p className="pl-4"><span className="text-red-400">stack</span><span className="text-gray-500">:</span> <span className="text-yellow-300">[</span><span className="text-green-400">&apos;React&apos;</span><span className="text-gray-500">,</span> <span className="text-green-400">&apos;Node&apos;</span><span className="text-yellow-300">]</span><span className="text-gray-500">,</span></p>
                  <p className="pl-4"><span className="text-red-400">passion</span><span className="text-gray-500">:</span> <span className="text-green-400">&apos;Building cool things&apos;</span><span className="text-gray-500">,</span></p>
                  <p className="pl-4"><span className="text-red-400">available</span><span className="text-gray-500">:</span> <span className="text-orange-400">true</span><span className="text-gray-500">,</span></p>
                  <p className="pl-4"><span className="text-red-400">coffee</span><span className="text-gray-500">:</span> <span className="text-orange-400">Infinity</span></p>
                  <p><span className="text-yellow-300">{'}'}</span></p>
                  <p className="mt-1">
                    <span className="text-blue-300">dev</span>
                    <span className="text-gray-500">.</span>
                    <span className="text-yellow-200">build</span>
                    <span className="text-gray-500">(</span>
                    <span className="text-green-400">&apos;amazing things&apos;</span>
                    <span className="text-gray-500">)</span>
                    <span className="text-gray-700 ml-2">// ✓</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1 cursor-pointer group"
          onClick={() => navigateTo('about')}
        >
          <span className="text-xs text-gray-500 dark:text-gray-500 group-hover:text-red-500 transition-colors">Scroll down</span>
          <div className="w-6 h-10 rounded-full border-2 border-gray-300 dark:border-gray-700 flex items-start justify-center p-1.5 group-hover:border-red-400 transition-colors">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 group-hover:bg-red-500 transition-colors"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
