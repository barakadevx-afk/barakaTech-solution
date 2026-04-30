import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  Code2, 
  Gamepad2, 
  Shield, 
  Server, 
  Smartphone, 
  Database,
  ArrowRight
} from 'lucide-react'

const services = [
  {
    icon: Code2,
    title: 'Full-Stack Development',
    description: 'End-to-end web application development with modern frameworks and scalable architecture.',
    features: ['React/Next.js', 'Node.js/Express', 'REST & GraphQL APIs', 'Cloud Deployment'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Gamepad2,
    title: 'Game Development',
    description: 'Immersive 2D/3D games with physics engines, AI systems, and multiplayer capabilities.',
    features: ['Unity & Unreal Engine', 'WebGL Games', 'AI NPC Behavior', 'Multiplayer Sync'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Security audits, penetration testing, and secure system architecture design.',
    features: ['Penetration Testing', 'Vulnerability Analysis', 'Security Auditing', 'Threat Modeling'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Server,
    title: 'Backend Systems',
    description: 'High-performance backend systems with microservices and distributed architecture.',
    features: ['Microservices', 'Message Queues', 'Caching Layers', 'Load Balancing'],
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'Cross-platform mobile applications with native performance and modern UX.',
    features: ['React Native', 'Progressive Web Apps', 'Native Modules', 'App Store Deployment'],
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Database,
    title: 'Database Design',
    description: 'Optimized database architecture with focus on performance, security, and scalability.',
    features: ['Schema Design', 'Query Optimization', 'Data Migration', 'NoSQL/SQL'],
    color: 'from-teal-500 to-cyan-500',
  },
]

function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="services" className="py-20 md:py-32 bg-white dark:bg-dark-200" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
            What I Do
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Services &{' '}
            <span className="text-gradient">Expertise</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg">
            Comprehensive digital solutions spanning software engineering, game development, 
            and cybersecurity for modern businesses.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative p-8 rounded-2xl bg-gray-50 dark:bg-dark-100 border border-gray-200 dark:border-gray-800 hover:border-primary-500/50 transition-all overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Learn More Link */}
              <motion.button
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-primary-500 font-medium text-sm group/link"
              >
                Learn More
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Have a project in mind? Let&apos;s discuss how I can help.
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary-500 to-purple-600 text-white font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl transition-shadow"
          >
            Start a Project
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
