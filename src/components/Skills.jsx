import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Cpu, Globe, Server, Wrench } from 'lucide-react'

const skillCategories = [
  {
    title: 'Frontend',
    icon: Globe,
    color: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50 dark:bg-blue-500/10',
    skills: [
      { name: 'React / Next.js', level: 95, color: 'from-blue-500 to-indigo-500' },
      { name: 'TypeScript', level: 90, color: 'from-blue-600 to-blue-800' },
      { name: 'Tailwind CSS', level: 92, color: 'from-cyan-500 to-teal-600' },
      { name: 'Vue.js', level: 78, color: 'from-green-500 to-emerald-600' },
      { name: 'Framer Motion', level: 85, color: 'from-purple-500 to-pink-600' },
    ],
  },
  {
    title: 'Backend',
    icon: Server,
    color: 'from-green-500 to-emerald-600',
    bg: 'bg-green-50 dark:bg-green-500/10',
    skills: [
      { name: 'Node.js / Express', level: 90, color: 'from-green-500 to-emerald-600' },
      { name: 'Python / Django', level: 85, color: 'from-yellow-500 to-orange-600' },
      { name: 'PostgreSQL', level: 82, color: 'from-blue-600 to-indigo-700' },
      { name: 'MongoDB', level: 78, color: 'from-green-600 to-teal-700' },
      { name: 'GraphQL', level: 75, color: 'from-pink-500 to-rose-600' },
    ],
  },
  {
    title: 'DevOps & Tools',
    icon: Wrench,
    color: 'from-orange-500 to-red-600',
    bg: 'bg-orange-50 dark:bg-orange-500/10',
    skills: [
      { name: 'Git / GitHub', level: 93, color: 'from-gray-600 to-gray-800' },
      { name: 'Docker', level: 80, color: 'from-blue-500 to-blue-700' },
      { name: 'AWS / Cloud', level: 75, color: 'from-orange-500 to-amber-600' },
      { name: 'Linux / Bash', level: 85, color: 'from-gray-500 to-gray-700' },
      { name: 'CI/CD', level: 78, color: 'from-teal-500 to-cyan-600' },
    ],
  },
]

const techStack = [
  { name: 'React', icon: '⚛️', level: 'Expert' },
  { name: 'Node.js', icon: '🟢', level: 'Expert' },
  { name: 'TypeScript', icon: '🔷', level: 'Advanced' },
  { name: 'Python', icon: '🐍', level: 'Advanced' },
  { name: 'Next.js', icon: '▲', level: 'Advanced' },
  { name: 'MongoDB', icon: '🍃', level: 'Intermediate' },
  { name: 'PostgreSQL', icon: '🐘', level: 'Intermediate' },
  { name: 'Docker', icon: '🐳', level: 'Intermediate' },
  { name: 'AWS', icon: '☁️', level: 'Intermediate' },
  { name: 'Unity', icon: '🎮', level: 'Advanced' },
  { name: 'Figma', icon: '🎨', level: 'Intermediate' },
  { name: 'Git', icon: '📝', level: 'Expert' },
  { name: 'GraphQL', icon: '◈', level: 'Intermediate' },
  { name: 'Redis', icon: '🔴', level: 'Beginner' },
  { name: 'Tailwind', icon: '🌊', level: 'Expert' },
  { name: 'Vercel', icon: '▲', level: 'Advanced' },
  { name: 'Linux', icon: '🐧', level: 'Advanced' },
  { name: 'Vue.js', icon: '💚', level: 'Intermediate' },
]

const levelColors = {
  Expert: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
  Advanced: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
  Intermediate: 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400',
  Beginner: 'bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400',
}

function SkillBar({ skill, isInView, delay }) {
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
          {skill.name}
        </span>
        <span className="text-xs font-bold text-gray-500 dark:text-gray-400">{skill.level}%</span>
      </div>
      <div className="h-2 bg-gray-100 dark:bg-dark-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.2, delay, ease: 'easeOut' }}
          className={`h-full rounded-full bg-gradient-to-r ${skill.color} relative`}
        >
          <div className="absolute inset-0 rounded-full bg-white/20" style={{ backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)' }} />
        </motion.div>
      </div>
    </div>
  )
}

function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="section-padding bg-gray-50 dark:bg-dark-100" ref={ref}>
      <div className="max-w-7xl mx-auto container-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-medium mb-4 border border-red-100 dark:border-red-500/20">
            <Cpu className="w-3.5 h-3.5" />
            Technical Skills
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Technologies I{' '}
            <span className="text-gradient">Work With</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg">
            Constantly learning and adapting to deliver the best solutions across every layer of the stack.
          </p>
        </motion.div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: ci * 0.15 }}
              className="p-6 rounded-2xl bg-white dark:bg-dark-200 border border-gray-100 dark:border-gray-800 shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-11 h-11 rounded-xl ${cat.bg} flex items-center justify-center`}>
                  <cat.icon className={`w-5 h-5 bg-gradient-to-br ${cat.color} bg-clip-text`} style={{ color: 'transparent', WebkitBackgroundClip: 'text', backgroundImage: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))` }} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">{cat.title}</h3>
              </div>
              <div className="space-y-4">
                {cat.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    isInView={isInView}
                    delay={0.3 + ci * 0.15 + si * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Full Tech Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.8 + i * 0.04 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-dark-200 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-red-200 dark:hover:border-red-500/30 transition-all cursor-default"
              >
                <span className="text-lg">{tech.icon}</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{tech.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColors[tech.level]}`}>{tech.level}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
