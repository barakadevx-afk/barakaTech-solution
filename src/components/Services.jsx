import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, Gamepad2, Shield, Server, Smartphone, Database, ArrowRight, Check, Briefcase, Star, Zap } from 'lucide-react'

const services = [
  {
    icon: Code2,
    title: 'Full-Stack Development',
    description: 'End-to-end web application development with modern frameworks and scalable cloud architecture.',
    features: ['React / Next.js frontends', 'Node.js / Python backends', 'REST & GraphQL APIs', 'Cloud deployment (AWS/Vercel)', 'Database design & optimization'],
    color: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50 dark:bg-blue-500/10',
    popular: false,
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Security audits, penetration testing, and hardened system architecture to protect your business.',
    features: ['Penetration testing', 'Vulnerability assessments', 'OWASP security audits', 'Threat modeling', 'Secure code review'],
    color: 'from-green-500 to-emerald-600',
    bg: 'bg-green-50 dark:bg-green-500/10',
    popular: false,
  },
  {
    icon: Gamepad2,
    title: 'Game Development',
    description: 'Immersive 2D/3D games with physics engines, AI systems, and polished multiplayer experiences.',
    features: ['Unity & Unreal Engine', 'WebGL browser games', 'AI NPC behavior systems', 'Multiplayer networking', 'Mobile game deployment'],
    color: 'from-purple-500 to-pink-600',
    bg: 'bg-purple-50 dark:bg-purple-500/10',
    popular: true,
  },
  {
    icon: Server,
    title: 'Backend Systems',
    description: 'High-performance backend systems with microservices, queues, and distributed architecture.',
    features: ['Microservices design', 'Message queues (Redis/RabbitMQ)', 'Caching strategies', 'Load balancing', 'Real-time websockets'],
    color: 'from-orange-500 to-red-600',
    bg: 'bg-orange-50 dark:bg-orange-500/10',
    popular: false,
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'Cross-platform mobile apps with native performance, smooth animations, and modern UX.',
    features: ['React Native (iOS & Android)', 'Progressive Web Apps', 'Offline-first architecture', 'Push notifications', 'App Store deployment'],
    color: 'from-indigo-500 to-purple-600',
    bg: 'bg-indigo-50 dark:bg-indigo-500/10',
    popular: false,
  },
  {
    icon: Database,
    title: 'Database & Architecture',
    description: 'Optimized data architectures with focus on performance, security, and long-term scalability.',
    features: ['Schema design & modeling', 'Query optimization', 'Data migration strategies', 'SQL & NoSQL databases', 'Backup & recovery plans'],
    color: 'from-teal-500 to-cyan-600',
    bg: 'bg-teal-50 dark:bg-teal-500/10',
    popular: false,
  },
]

const pricingPlans = [
  {
    name: 'Starter',
    price: '$299',
    period: 'project',
    description: 'Perfect for small projects and MVPs',
    icon: Zap,
    color: 'from-gray-500 to-gray-600',
    features: ['1 core feature set', 'Basic responsive design', 'REST API integration', '2 revision rounds', '2-week delivery', 'Email support'],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Professional',
    price: '$899',
    period: 'project',
    description: 'Full-featured production-ready apps',
    icon: Star,
    color: 'from-red-500 to-rose-600',
    features: ['Full-stack development', 'Advanced UI/UX', 'Auth & database', 'API & integrations', '5 revision rounds', '4-week delivery', 'Priority support', 'Source code included'],
    cta: 'Most Popular',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'quote',
    description: 'Complex systems and long-term partnerships',
    icon: Briefcase,
    color: 'from-purple-500 to-indigo-600',
    features: ['Everything in Professional', 'Security hardening', 'Scalable architecture', 'CI/CD pipeline setup', 'Unlimited revisions', 'Monthly retainer option', 'Direct phone access', 'NDA available'],
    cta: 'Contact Me',
    highlight: false,
  },
]

function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" className="section-padding bg-gray-50 dark:bg-dark-100" ref={ref}>
      <div className="max-w-7xl mx-auto container-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-medium mb-4 border border-red-100 dark:border-red-500/20">
            <Briefcase className="w-3.5 h-3.5" />
            What I Do
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Services &{' '}
            <span className="text-gradient">Expertise</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg">
            Comprehensive digital solutions spanning software engineering, game development, and cybersecurity.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative p-6 rounded-2xl bg-white dark:bg-dark-200 border border-gray-100 dark:border-gray-800 shadow-card hover:shadow-card-hover hover:border-red-100 dark:hover:border-red-500/20 transition-all duration-300 overflow-hidden"
            >
              {service.popular && (
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-red-500 to-rose-500 text-white">
                  Popular ⚡
                </div>
              )}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`} />

              <div className={`w-12 h-12 rounded-xl ${service.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <service.icon className={`w-6 h-6 bg-gradient-to-br ${service.color} bg-clip-text`} style={{ color: 'transparent', WebkitBackgroundClip: 'text', backgroundImage: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))` }} />
              </div>

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-red-500 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 leading-relaxed">{service.description}</p>

              <ul className="space-y-1.5 mb-5">
                {service.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <button className="flex items-center gap-1.5 text-red-500 font-medium text-sm group-hover:gap-3 transition-all">
                Learn More <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-3">Simple, Transparent Pricing</h3>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-10">No hidden fees. Custom quotes available for complex projects.</p>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 + i * 0.1 }}
                className={`relative p-7 rounded-3xl border transition-all ${
                  plan.highlight
                    ? 'bg-gradient-to-br from-red-500 to-rose-600 border-transparent text-white shadow-2xl shadow-red-500/30 scale-105'
                    : 'bg-white dark:bg-dark-200 border-gray-100 dark:border-gray-800 shadow-card hover:shadow-card-hover'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-white text-red-600 text-xs font-bold shadow-md">
                    ⭐ Most Popular
                  </div>
                )}

                <div className={`w-12 h-12 rounded-xl ${plan.highlight ? 'bg-white/20' : `bg-gradient-to-br ${plan.color} bg-opacity-10`} flex items-center justify-center mb-5`}>
                  <plan.icon className={`w-6 h-6 ${plan.highlight ? 'text-white' : 'text-red-500'}`} />
                </div>

                <h4 className={`text-xl font-bold mb-1 ${plan.highlight ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{plan.name}</h4>
                <p className={`text-sm mb-4 ${plan.highlight ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'}`}>{plan.description}</p>

                <div className="mb-6">
                  <span className={`text-4xl font-bold ${plan.highlight ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{plan.price}</span>
                  <span className={`text-sm ml-1 ${plan.highlight ? 'text-white/60' : 'text-gray-400'}`}>/ {plan.period}</span>
                </div>

                <ul className="space-y-2.5 mb-7">
                  {plan.features.map(f => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${plan.highlight ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'}`}>
                      <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-white' : 'text-green-500'}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                  plan.highlight
                    ? 'bg-white text-red-600 hover:bg-gray-100 shadow-lg'
                    : 'bg-gradient-to-r from-red-500 to-rose-600 text-white hover:shadow-lg hover:shadow-red-500/30'
                }`}>
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
            All prices are starting estimates. <button className="text-red-500 hover:underline font-medium">Contact me</button> for a custom quote tailored to your project.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
