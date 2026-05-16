import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, Gamepad2, Terminal, Zap, Lock, Layers, Code, User, Globe } from 'lucide-react'

const specializations = [
  {
    icon: Terminal,
    title: 'Full-Stack Engineering',
    description: 'End-to-end web systems with modern frameworks, scalable architectures, and high-performance backends built with clean architecture principles.',
    skills: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'MongoDB'],
    color: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50 dark:bg-blue-500/10',
    iconColor: 'text-blue-500',
  },
  {
    icon: Gamepad2,
    title: 'Game Development',
    description: '2D/3D game development with physics engines, AI-driven NPCs, multiplayer systems, and WebGL-powered experiences.',
    skills: ['Unity', 'Unreal Engine', 'WebGL', 'C#', 'AI Logic'],
    color: 'from-purple-500 to-pink-600',
    bg: 'bg-purple-50 dark:bg-purple-500/10',
    iconColor: 'text-purple-500',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Ethical hacking, penetration testing, network security analysis, threat modeling, and secure system architecture design.',
    skills: ['Nmap', 'Burp Suite', 'Wireshark', 'Metasploit', 'OWASP'],
    color: 'from-green-500 to-emerald-600',
    bg: 'bg-green-50 dark:bg-green-500/10',
    iconColor: 'text-green-500',
  },
]

const philosophy = [
  { icon: Zap, title: 'Performance First', description: 'Systems must be fast and efficient from the ground up, not as an afterthought.', color: 'text-yellow-500' },
  { icon: Lock, title: 'Security by Design', description: 'Protection is built-in from day one, not bolted on after launch.', color: 'text-green-500' },
  { icon: Layers, title: 'Scalability Focused', description: 'Architecture that grows seamlessly with demand, designed for tomorrow.', color: 'text-blue-500' },
  { icon: Code, title: 'Clean Engineering', description: 'Readable, maintainable, well-structured code that any dev can build on.', color: 'text-red-500' },
]

const highlights = [
  { label: 'Started Coding', value: '2023', note: '1 year in' },
  { label: 'Projects Shipped', value: '50+', note: 'And counting' },
  { label: 'Satisfaction Rate', value: '100%', note: 'Every time' },
  { label: 'Graduating', value: '2027', note: 'Secondary school' },
]

function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-dark-100" ref={ref}>
      <div className="max-w-7xl mx-auto container-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-medium mb-4 border border-red-100 dark:border-red-500/20">
            <User className="w-3.5 h-3.5" />
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Architecting{' '}
            <span className="text-gradient">Intelligent Systems</span>
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            I operate at the intersection of software engineering, interactive entertainment, and security — 
            building solutions that are not only functional, but resilient, optimized, and future-ready.
          </p>
        </motion.div>

        {/* Bio + highlights */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 p-8 rounded-3xl bg-white dark:bg-dark-200 border border-gray-100 dark:border-gray-800 shadow-card"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-500/30">
                <Code className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Hey, I&apos;m Baraka! 👋</h3>
                <p className="text-red-500 font-medium text-sm">Full-Stack Dev · Game Dev · Security Engineer</p>
              </div>
            </div>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                I&apos;m a self-taught developer from Rwanda who started coding in 2023 and has since built over 50 projects. 
                I specialize in full-stack web development, game development, and cybersecurity — three fields that challenge 
                me to think at every layer of a system.
              </p>
              <p>
                What drives me? The belief that technology can solve real problems. Whether it&apos;s an AI-powered learning platform, 
                a multiplayer game with intelligent NPCs, or a security audit that hardens a business — I approach every project 
                with the same intensity and care.
              </p>
              <p>
                I&apos;m currently in secondary school (graduating 2027) but I work like a professional. I&apos;ve collaborated with 
                clients globally, shipped production apps, and I&apos;m always building something new.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Self-Taught', 'Remote-First', 'Open Source', 'Continuous Learner', 'Based in Rwanda 🇷🇼'].map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-dark-100 text-gray-700 dark:text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-1 gap-4"
          >
            {highlights.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                className="p-5 rounded-2xl bg-white dark:bg-dark-200 border border-gray-100 dark:border-gray-800 shadow-card text-center lg:text-left flex flex-col lg:flex-row lg:items-center lg:gap-4"
              >
                <div>
                  <div className="text-3xl font-bold text-gradient mb-0.5">{h.value}</div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{h.label}</div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">{h.note}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Specializations */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">Core Specializations</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {specializations.map((spec, i) => (
              <motion.div
                key={spec.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                whileHover={{ y: -6 }}
                className="p-7 rounded-2xl bg-white dark:bg-dark-200 border border-gray-100 dark:border-gray-800 shadow-card hover:shadow-card-hover transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-2xl ${spec.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <spec.icon className={`w-7 h-7 ${spec.iconColor}`} />
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-red-500 transition-colors">
                  {spec.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">{spec.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {spec.skills.map(skill => (
                    <span key={skill} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-dark-100 text-gray-600 dark:text-gray-400">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Philosophy */}
        <div>
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">Engineering Philosophy</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {philosophy.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                className="p-5 rounded-2xl bg-white dark:bg-dark-200 border border-gray-100 dark:border-gray-800 hover:border-red-100 dark:hover:border-red-500/20 transition-colors group"
              >
                <div className={`w-10 h-10 rounded-xl bg-gray-50 dark:bg-dark-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1.5 text-sm">{item.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-500 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
