import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, Users, Star, Coffee, Award, Briefcase, Rocket, Globe } from 'lucide-react'

const stats = [
  {
    icon: Code2,
    number: 50,
    suffix: '+',
    label: 'Projects Built',
    sub: 'Web, Mobile & Games',
    color: 'from-red-500 to-rose-600',
    glow: 'shadow-red-500/25',
    bg: 'from-red-500/10 to-rose-600/5',
    border: 'border-red-500/20',
    iconBg: 'bg-red-500/10',
    iconColor: 'text-red-500',
  },
  {
    icon: Users,
    number: 30,
    suffix: '+',
    label: 'Happy Clients',
    sub: 'Worldwide & Remote',
    color: 'from-blue-500 to-indigo-600',
    glow: 'shadow-blue-500/25',
    bg: 'from-blue-500/10 to-indigo-600/5',
    border: 'border-blue-500/20',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
  },
  {
    icon: Star,
    number: 100,
    suffix: '%',
    label: 'Satisfaction',
    sub: 'Client Satisfaction Rate',
    color: 'from-yellow-500 to-orange-500',
    glow: 'shadow-yellow-500/25',
    bg: 'from-yellow-500/10 to-orange-500/5',
    border: 'border-yellow-500/20',
    iconBg: 'bg-yellow-500/10',
    iconColor: 'text-yellow-500',
  },
  {
    icon: Rocket,
    number: 5,
    suffix: '+',
    label: 'Years Experience',
    sub: 'Full-Stack & Systems',
    color: 'from-purple-500 to-violet-600',
    glow: 'shadow-purple-500/25',
    bg: 'from-purple-500/10 to-violet-600/5',
    border: 'border-purple-500/20',
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-500',
  },
  {
    icon: Globe,
    number: 10,
    suffix: '+',
    label: 'Countries Reached',
    sub: 'Global Client Base',
    color: 'from-emerald-500 to-teal-600',
    glow: 'shadow-emerald-500/25',
    bg: 'from-emerald-500/10 to-teal-600/5',
    border: 'border-emerald-500/20',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-500',
  },
  {
    icon: Coffee,
    number: 999,
    suffix: '+',
    label: 'Cups of Coffee',
    sub: 'Fuelling late nights',
    color: 'from-amber-600 to-orange-600',
    glow: 'shadow-amber-500/25',
    bg: 'from-amber-600/10 to-orange-600/5',
    border: 'border-amber-500/20',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-600',
  },
]

function CountUp({ target, suffix, isInView, duration = 2000 }) {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!isInView || started.current) return
    started.current = true
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [isInView, target, duration])

  return <span>{count.toLocaleString()}{suffix}</span>
}

function RingProgress({ value, max, color, size = 64, strokeWidth = 5 }) {
  const r = (size - strokeWidth * 2) / 2
  const circumference = 2 * Math.PI * r
  const progress = (value / max) * circumference
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth={strokeWidth} className="text-gray-100 dark:text-gray-800" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="url(#ring-gradient)" strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset: circumference - progress } : { strokeDashoffset: circumference }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
        />
        <defs>
          <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-dark-200 dark:via-dark-100 dark:to-dark-200" />
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(rgba(239,68,68,1) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      {/* Top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 dark:bg-red-500/10 border border-red-200/60 dark:border-red-500/20 text-red-600 dark:text-red-400 text-xs font-semibold uppercase tracking-wide mb-4">
            <Award className="w-3.5 h-3.5" />
            By the numbers
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">
            Proof in{' '}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Numbers</span>
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Real results from real projects — building quality software that scales.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`group relative overflow-hidden rounded-2xl p-6 border bg-gradient-to-br ${stat.bg} ${stat.border} shadow-lg hover:shadow-xl ${stat.glow} transition-all duration-300 bg-white dark:bg-dark-200`}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Corner glow */}
              <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity blur-xl`} />

              <div className="relative flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${stat.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <Briefcase className="w-3.5 h-3.5 text-gray-300 dark:text-gray-700" />
              </div>

              <div className={`text-3xl sm:text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1 tabular-nums`}>
                <CountUp target={stat.number} suffix={stat.suffix} isInView={isInView} />
              </div>

              <div className="font-bold text-gray-900 dark:text-white text-sm mb-0.5">{stat.label}</div>
              <div className="text-[11px] text-gray-400 dark:text-gray-500">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-14 relative overflow-hidden rounded-2xl p-8 bg-gradient-to-r from-red-600 via-rose-500 to-orange-500 text-white text-center shadow-2xl shadow-red-500/25"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-black/10 blur-2xl" />

          <div className="relative">
            <h3 className="text-2xl sm:text-3xl font-black mb-2">Ready to Build Something Great?</h3>
            <p className="text-white/80 mb-6 max-w-md mx-auto text-sm">
              Let&apos;s turn your idea into a live product. I&apos;m available for freelance projects starting now.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.95)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  document.dispatchEvent(new CustomEvent('navigate', { detail: 'contact' }))
                }}
                className="px-7 py-3 rounded-xl bg-white text-red-600 font-bold shadow-lg flex items-center gap-2 text-sm transition-all"
              >
                <Rocket className="w-4 h-4" />
                Start a Project
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  document.dispatchEvent(new CustomEvent('navigate', { detail: 'projects' }))
                }}
                className="px-7 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold border border-white/30 text-sm transition-all"
              >
                See My Work
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Stats
