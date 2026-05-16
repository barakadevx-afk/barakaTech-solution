import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, Users, Star, Coffee } from 'lucide-react'

const stats = [
  { icon: Code2, number: 50, suffix: '+', label: 'Projects Built', color: 'from-red-500 to-rose-600', bg: 'bg-red-50 dark:bg-red-500/10' },
  { icon: Users, number: 30, suffix: '+', label: 'Happy Clients', color: 'from-blue-500 to-indigo-600', bg: 'bg-blue-50 dark:bg-blue-500/10' },
  { icon: Star, number: 100, suffix: '%', label: 'Satisfaction Rate', color: 'from-yellow-500 to-orange-500', bg: 'bg-yellow-50 dark:bg-yellow-500/10' },
  { icon: Coffee, number: 999, suffix: '+', label: 'Cups of Coffee', color: 'from-amber-600 to-orange-600', bg: 'bg-amber-50 dark:bg-amber-500/10' },
]

function CountUp({ target, suffix, isInView }) {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!isInView || started.current) return
    started.current = true
    const duration = 2000
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
  }, [isInView, target])

  return <span>{count}{suffix}</span>
}

function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-16 bg-gray-50 dark:bg-dark-100 border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center p-6 rounded-2xl bg-white dark:bg-dark-200 shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100 dark:border-gray-800 group"
            >
              <div className={`w-14 h-14 rounded-xl ${stat.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`w-7 h-7 bg-gradient-to-br ${stat.color} bg-clip-text`} style={{ color: 'transparent', WebkitBackgroundClip: 'text', backgroundImage: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))` }} />
              </div>
              <div className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                <CountUp target={stat.number} suffix={stat.suffix} isInView={isInView} />
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-medium text-center">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
