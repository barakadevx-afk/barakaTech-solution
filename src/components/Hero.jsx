import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Twitter, Download, Sparkles, Terminal, Zap, Code2, User, ArrowRight, Play, Globe, Shield, Cpu, Layers } from 'lucide-react'
import { useNavigate } from '../contexts/useNavigate'

const roles = ['Full-Stack Developer', 'Game Developer', 'Security Engineer', 'AI Enthusiast', 'Problem Solver']

const techOrbit = [
  { label: 'React', color: '#61DAFB', icon: '⚛', r: 130, speed: 18, startAngle: 0 },
  { label: 'Node.js', color: '#68A063', icon: '🟢', r: 130, speed: 18, startAngle: 72 },
  { label: 'TypeScript', color: '#3178C6', icon: '🔷', r: 130, speed: 18, startAngle: 144 },
  { label: 'Python', color: '#FFD43B', icon: '🐍', r: 130, speed: 18, startAngle: 216 },
  { label: 'Docker', color: '#2496ED', icon: '🐳', r: 130, speed: 18, startAngle: 288 },
]

const techOrbit2 = [
  { label: 'Unity', color: '#FFFFFF', icon: '🎮', r: 185, speed: -28, startAngle: 30 },
  { label: 'PostgreSQL', color: '#336791', icon: '🐘', r: 185, speed: -28, startAngle: 150 },
  { label: 'AWS', color: '#FF9900', icon: '☁', r: 185, speed: -28, startAngle: 270 },
]

const codeLines = [
  { text: "const baraka = new Developer({", color: "text-purple-400" },
  { text: "  name: 'Baraka',", color: "text-red-400", indent: true },
  { text: "  location: '🇷🇼 Rwanda',", color: "text-green-400", indent: true },
  { text: "  stack: ['React','Node','AI'],", color: "text-blue-400", indent: true },
  { text: "  passion: 'Building the future',", color: "text-yellow-400", indent: true },
  { text: "  available: true ✓", color: "text-emerald-400", indent: true },
  { text: "});", color: "text-purple-400" },
  { text: "baraka.ship('amazing things') 🚀", color: "text-gray-300" },
]

function TypeWriter({ words, speed = 75, deleteSpeed = 35, pauseTime = 2200 }) {
  const [currentWord, setCurrentWord] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [blink, setBlink] = useState(true)

  useEffect(() => {
    const t = setInterval(() => setBlink(p => !p), 530)
    return () => clearInterval(t)
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
      timeout = setTimeout(() => {
        setCurrentText(isDeleting
          ? word.substring(0, currentText.length - 1)
          : word.substring(0, currentText.length + 1)
        )
      }, isDeleting ? deleteSpeed : speed)
    }
    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentWord, words, speed, deleteSpeed, pauseTime])

  return (
    <span className="relative">
      <span className="bg-gradient-to-r from-red-500 via-rose-500 to-orange-500 bg-clip-text text-transparent font-bold">
        {currentText}
      </span>
      <span className={`ml-0.5 inline-block w-0.5 h-7 bg-gradient-to-b from-red-500 to-rose-500 rounded-full transition-opacity duration-100 ${blink ? 'opacity-100' : 'opacity-0'}`}
        style={{ verticalAlign: 'middle' }} />
    </span>
  )
}

function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-rose-50/40 dark:from-[#0a0a0f] dark:via-[#0f0f18] dark:to-[#120a0a]" />
      {/* Aurora blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full opacity-[0.07] dark:opacity-[0.12]"
        style={{ background: 'radial-gradient(circle, #ef4444, #f97316, transparent 70%)', filter: 'blur(80px)', animation: 'blob 12s ease-in-out infinite' }} />
      <div className="absolute top-[10%] right-[-15%] w-[60vw] h-[60vw] rounded-full opacity-[0.05] dark:opacity-[0.10]"
        style={{ background: 'radial-gradient(circle, #8b5cf6, #3b82f6, transparent 70%)', filter: 'blur(80px)', animation: 'blob 16s ease-in-out infinite 4s' }} />
      <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full opacity-[0.06] dark:opacity-[0.09]"
        style={{ background: 'radial-gradient(circle, #f43f5e, #fb923c, transparent 70%)', filter: 'blur(60px)', animation: 'blob 14s ease-in-out infinite 8s' }} />

      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.06]"
        style={{ backgroundImage: 'radial-gradient(rgba(239,68,68,0.8) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.04]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundSize: '128px' }} />
    </div>
  )
}

function InteractiveParticles() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    window.addEventListener('mousemove', onMouseMove)

    const N = 55
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const isDark = document.documentElement.classList.contains('dark')
      const baseColor = isDark ? '239, 68, 68' : '220, 38, 38'
      const lineColor = isDark ? '239, 68, 68' : '200, 30, 30'

      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        // Mouse repulsion
        const dx = p.x - mouseRef.current.x
        const dy = p.y - mouseRef.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 100) {
          p.x += dx / dist * 1.5
          p.y += dy / dist * 1.5
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${baseColor}, ${p.opacity})`
        ctx.fill()
      })

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${lineColor}, ${0.12 * (1 - d / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

function OrbitRing({ items, radius, duration, reverse = false }) {
  return (
    <div className="absolute inset-0" style={{ animation: `spin ${duration}s linear infinite ${reverse ? 'reverse' : ''}` }}>
      {items.map((item, i) => {
        const angle = (item.startAngle * Math.PI) / 180
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        return (
          <div
            key={item.label}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
            }}
          >
            <motion.div
              whileHover={{ scale: 1.3 }}
              style={{ animation: `spin ${duration}s linear infinite ${reverse ? '' : 'reverse'}` }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-md shadow-lg cursor-default select-none whitespace-nowrap"
              title={item.label}
            >
              <span style={{ color: item.color }} className="text-sm">{item.icon}</span>
              <span className="text-gray-700 dark:text-gray-300 hidden sm:inline">{item.label}</span>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}

function AnimatedTerminal() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setVisibleLines(prev => {
          if (prev >= codeLines.length) {
            clearInterval(intervalRef.current)
            return prev
          }
          return prev + 1
        })
      }, 400)
    }, 500)
    return () => { clearTimeout(timer); clearInterval(intervalRef.current) }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.1, duration: 0.7, ease: 'easeOut' }}
      className="w-full max-w-sm relative"
    >
      {/* Glow effect */}
      <div className="absolute -inset-1 rounded-2xl opacity-30 blur-lg bg-gradient-to-r from-red-500 via-rose-500 to-orange-400" />

      <div className="relative bg-gray-950 dark:bg-black/70 rounded-2xl overflow-hidden border border-gray-800/80 shadow-2xl backdrop-blur-xl">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-900/80 border-b border-gray-800/60">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm shadow-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm shadow-green-500/50" />
          </div>
          <div className="flex items-center gap-1.5 flex-1 justify-center">
            <Terminal className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-xs text-gray-400 font-mono">baraka.js</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        </div>

        {/* Code body */}
        <div className="p-4 font-mono text-[11px] sm:text-xs leading-6 min-h-[180px]">
          {codeLines.slice(0, visibleLines).map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={line.color}
            >
              {line.indent && <span className="text-gray-600 select-none">{'  '}</span>}
              {line.text}
              {i === visibleLines - 1 && visibleLines < codeLines.length && (
                <span className="inline-block w-2 h-4 bg-red-400 ml-0.5 animate-pulse rounded-sm" style={{ verticalAlign: 'middle' }} />
              )}
            </motion.p>
          ))}
          {visibleLines >= codeLines.length && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-500 mt-1"
            >
              <span className="text-gray-600">$</span> <span className="text-green-400">✓ Ready to build with you!</span>
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function ProfileOrbit() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 })

  const containerRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    rotateX.set(((e.clientY - cy) / (rect.height / 2)) * -8)
    rotateY.set(((e.clientX - cx) / (rect.width / 2)) * 8)
  }, [rotateX, rotateY])

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
  }, [rotateX, rotateY])

  const orbitSize = 260
  const outerOrbitSize = 370

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center"
      style={{ width: outerOrbitSize + 40, height: outerOrbitSize + 40 }}
    >
      {/* Orbit rings (CSS drawn) */}
      <div className="absolute rounded-full border border-dashed border-red-300/20 dark:border-red-500/15"
        style={{ width: orbitSize, height: orbitSize }} />
      <div className="absolute rounded-full border border-dashed border-purple-300/15 dark:border-purple-500/10"
        style={{ width: outerOrbitSize, height: outerOrbitSize }} />

      {/* Orbit items */}
      <div className="absolute" style={{ width: orbitSize, height: orbitSize }}>
        <OrbitRing items={techOrbit} radius={orbitSize / 2} duration={20} />
      </div>
      <div className="absolute" style={{ width: outerOrbitSize, height: outerOrbitSize }}>
        <OrbitRing items={techOrbit2} radius={outerOrbitSize / 2} duration={30} reverse />
      </div>

      {/* Profile card with 3D tilt */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 800 }}
        className="relative z-10"
      >
        {/* Glow ring */}
        <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-red-500/30 via-rose-500/20 to-orange-500/30 blur-xl" />

        {/* Image container */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-[1.75rem] overflow-hidden border-[3px] border-white/80 dark:border-dark-100/80 shadow-2xl ring-1 ring-red-500/20">
          <img
            src="/profile.jpg"
            alt="Baraka"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          <div className="hidden absolute inset-0 items-center justify-center bg-gradient-to-br from-red-500 to-rose-600">
            <User className="w-20 h-20 text-white" />
          </div>

          {/* Shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Status badge */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-3 -right-3 flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-dark-100 rounded-full shadow-xl border border-gray-100 dark:border-gray-700"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-sm shadow-green-400/50" />
          <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Available</span>
        </motion.div>

        {/* XP badge */}
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -top-3 -left-3 flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-red-500 to-rose-600 rounded-full shadow-lg"
        >
          <Sparkles className="w-3 h-3 text-white" />
          <span className="text-xs font-bold text-white">5+ yrs exp</span>
        </motion.div>
      </motion.div>
    </div>
  )
}

function StatPill({ icon: Icon, value, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 200 }}
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/80 dark:bg-dark-200/80 border border-gray-100 dark:border-gray-800 shadow-md backdrop-blur-sm"
    >
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div>
        <div className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{value}</div>
        <div className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">{label}</div>
      </div>
    </motion.div>
  )
}

function Hero() {
  const navigateTo = useNavigate()
  const [mounted, setMounted] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <AuroraBackground />
      <InteractiveParticles />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 pb-16">

        {/* ── Main content grid ── */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* ── LEFT COLUMN ── */}
          <div className="order-2 lg:order-1 text-center lg:text-left space-y-6">

            {/* Top badges row */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-3 flex-wrap"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-500/10 dark:to-rose-500/10 border border-red-200/60 dark:border-red-500/25 text-red-600 dark:text-red-400 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Open to work
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-dark-300 text-gray-600 dark:text-gray-400 text-xs font-medium border border-gray-200 dark:border-gray-700">
                <Globe className="w-3 h-3" />
                Rwanda · Remote OK
              </span>
            </motion.div>

            {/* Headline */}
            <div>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="text-base sm:text-lg font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center justify-center lg:justify-start gap-2"
              >
                <span className="text-2xl">👋</span>
                <span>Hey, I&apos;m</span>
                <span className="font-bold text-gray-900 dark:text-white">Baraka</span>
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-4xl sm:text-5xl xl:text-[3.5rem] font-black leading-[1.1] tracking-tight text-gray-900 dark:text-white mb-4"
              >
                I Build Digital{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-red-500 via-rose-500 to-orange-500 bg-clip-text text-transparent">
                    Experiences
                  </span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.9, duration: 0.6, ease: 'easeOut' }}
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-red-500 to-orange-500 rounded-full origin-left"
                  />
                </span>
                <br />
                That Matter
              </motion.h1>

              {/* Typewriter */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg sm:text-xl font-semibold text-gray-600 dark:text-gray-400 h-8 flex items-center justify-center lg:justify-start gap-2"
              >
                <Code2 className="w-5 h-5 text-red-400 flex-shrink-0" />
                {mounted && <TypeWriter words={roles} />}
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-md mx-auto lg:mx-0"
            >
              Crafting full-stack web apps, immersive games, and secure systems from{' '}
              <span className="font-semibold text-gray-800 dark:text-gray-200">Kigali, Rwanda 🌍</span>.
              Turning ideas into production-ready reality.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              <motion.button
                onClick={() => navigateTo('projects')}
                whileHover={{ scale: 1.04, boxShadow: '0 20px 40px rgba(239,68,68,0.35)' }}
                whileTap={{ scale: 0.97 }}
                className="group relative px-7 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-500 to-orange-500 text-white font-bold shadow-xl shadow-red-500/30 flex items-center gap-2 overflow-hidden text-sm"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                <Zap className="w-4 h-4" />
                View My Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                onClick={() => navigateTo('contact')}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group px-7 py-3.5 rounded-2xl border-2 border-red-400/50 dark:border-red-500/40 text-red-600 dark:text-red-400 font-bold hover:bg-red-50 dark:hover:bg-red-500/10 transition-all flex items-center gap-2 text-sm"
              >
                Hire Me
              </motion.button>

              <motion.a
                href="/resume.html"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-3.5 rounded-2xl bg-gray-100 dark:bg-dark-200 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-dark-100 transition-colors flex items-center gap-2 text-sm"
              >
                <Download className="w-4 h-4" />
                Resume
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.88 }}
              className="flex items-center justify-center lg:justify-start gap-3"
            >
              {[
                { icon: Github, href: 'https://github.com/barakadevx-afk', label: 'GitHub', bg: 'hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 hover:border-gray-900' },
                { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', bg: 'hover:bg-blue-600 hover:text-white hover:border-blue-600' },
                { icon: Twitter, href: 'https://twitter.com', label: 'Twitter', bg: 'hover:bg-sky-500 hover:text-white hover:border-sky-500' },
              ].map((s) => (
                <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }} whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 transition-all duration-200 ${s.bg}`}
                  aria-label={s.label}>
                  <s.icon className="w-5 h-5" />
                </motion.a>
              ))}

              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />
              <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">Follow me</span>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
            className="order-1 lg:order-2 flex flex-col items-center gap-6"
          >
            <ProfileOrbit />
            <AnimatedTerminal />
          </motion.div>
        </div>

        {/* ── MINI STATS ROW ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.7 }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          <StatPill icon={Code2} value="50+" label="Projects Built" delay={1.1} />
          <StatPill icon={Layers} value="30+" label="Happy Clients" delay={1.2} />
          <StatPill icon={Shield} value="100%" label="Satisfaction" delay={1.3} />
          <StatPill icon={Cpu} value="5+" label="Years Coding" delay={1.4} />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.button
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          onClick={() => navigateTo('about')}
          className="flex flex-col items-center gap-2 group cursor-pointer"
        >
          <span className="text-[10px] font-medium uppercase tracking-widest text-gray-400 group-hover:text-red-500 transition-colors">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-gray-300 dark:border-gray-700 group-hover:border-red-400 dark:group-hover:border-red-500 flex items-start justify-center p-1.5 transition-colors">
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-gray-400 group-hover:bg-red-500 transition-colors"
            />
          </div>
        </motion.button>
      </motion.div>
    </section>
  )
}

export default Hero
