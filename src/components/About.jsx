import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Shield, Gamepad2, Terminal, Zap, Lock, Layers, Code } from 'lucide-react'

const specializations = [
  {
    icon: Terminal,
    title: 'Advanced Software Engineering',
    description: 'Full-stack web systems, distributed architectures, and high-performance backends built with clean architecture principles.',
    skills: ['React', 'Node.js', 'Next.js', 'Laravel', 'PostgreSQL', 'MongoDB'],
  },
  {
    icon: Gamepad2,
    title: 'Game Development Engineering',
    description: '2D/3D game development with physics-based mechanics, AI-driven NPCs, multiplayer systems, and performance optimization.',
    skills: ['Unity', 'Unreal Engine', 'WebGL', 'Real-time Sync', 'AI Logic'],
  },
  {
    icon: Shield,
    title: 'Cybersecurity & System Security',
    description: 'Ethical hacking, penetration testing, network security, threat modeling, and secure system architecture design.',
    skills: ['Nmap', 'Burp Suite', 'Wireshark', 'Metasploit', 'Security Auditing'],
  },
]

const philosophy = [
  {
    icon: Zap,
    title: 'Performance First',
    description: 'Systems must be fast and efficient from the ground up.',
  },
  {
    icon: Lock,
    title: 'Security by Design',
    description: 'Protection is built-in, not added as an afterthought.',
  },
  {
    icon: Layers,
    title: 'Scalability Focused',
    description: 'Architecture that grows seamlessly with demand.',
  },
  {
    icon: Code,
    title: 'Clean Engineering',
    description: 'Readable, maintainable, and structured code always.',
  },
]

const stats = [
  { number: '2023-', label: 'Started Coding' },
  { number: '2027', label: 'Secondary Graduation' },
  { number: '50+', label: 'Projects Completed' },
  { number: '100%', label: 'Satisfaction Rate' },
]

function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-20 md:py-32 bg-gray-50 dark:bg-dark-100" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
            About Me
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Architecting{' '}
            <span className="text-gradient">Intelligent Systems</span>
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-400 text-lg">
            I operate at the intersection of software engineering, interactive entertainment, 
            and security engineering—building solutions that are not only functional, but resilient, 
            optimized, and future-ready.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-white dark:bg-dark-200 shadow-lg dark:shadow-none"
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Specializations */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-10 text-gray-900 dark:text-white">
            Core Specializations
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {specializations.map((spec, index) => (
              <motion.div
                key={spec.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-8 rounded-2xl bg-white dark:bg-dark-200 shadow-lg dark:shadow-none border border-gray-100 dark:border-gray-800 hover:border-primary-500/50 transition-all group"
              >
                <div className="w-16 h-16 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-6 group-hover:bg-primary-500 transition-colors">
                  <spec.icon className="w-8 h-8 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {spec.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {spec.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {spec.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-dark-300 text-gray-700 dark:text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Engineering Philosophy */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-10 text-gray-900 dark:text-white">
            Engineering Philosophy
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {philosophy.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="p-6 rounded-xl bg-gray-50 dark:bg-dark-300/50 border border-gray-200 dark:border-gray-700"
              >
                <item.icon className="w-6 h-6 text-primary-500 mb-3" />
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
