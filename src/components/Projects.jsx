import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ExternalLink, Github, Eye, Sparkles, Brain, X, Globe, Calendar, Tag, ArrowRight, Filter, Heart, FolderOpen } from 'lucide-react'

const projects = [
  {
    title: 'SkillsMatch',
    description: 'AI-powered career path analyzer that maps your skills to real job opportunities. Uses machine learning to suggest personalized learning roadmaps and identify skill gaps in your target career.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop',
    tags: ['AI', 'React', 'Node.js', 'Career Tech'],
    category: 'AI',
    demoUrl: '#',
    githubUrl: 'https://github.com/barakadevx-afk/skillsmatch',
    featured: true,
    year: '2024',
    status: 'Live',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'EduNexusHub',
    description: 'Adaptive e-learning platform that personalizes content delivery based on your learning style and pace. Built with AI tutoring capabilities and real-time progress tracking.',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=500&fit=crop',
    tags: ['E-Learning', 'AI Tutor', 'EdTech', 'React'],
    category: 'AI',
    demoUrl: '#',
    githubUrl: 'https://github.com/barakadevx-afk/edunexushub',
    featured: true,
    year: '2024',
    status: 'Live',
    color: 'from-green-500 to-teal-600',
  },
  {
    title: 'ChatCraft',
    description: 'A customizable AI chatbot SaaS platform for businesses. Allows non-technical teams to build, train, and deploy intelligent conversational bots with a drag-and-drop flow builder.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
    tags: ['AI Chat', 'SaaS', 'NLP', 'Node.js'],
    category: 'AI',
    demoUrl: '#',
    githubUrl: 'https://github.com/barakadevx-afk/advanced-chat-maker',
    featured: true,
    year: '2023',
    status: 'Beta',
    color: 'from-purple-500 to-pink-600',
  },
  {
    title: 'Family Connect',
    description: 'A family coordination app with shared calendars, event reminders, grocery lists, and a private social feed. Built with real-time sync so everyone stays on the same page.',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=500&fit=crop',
    tags: ['React Native', 'Family', 'Realtime', 'Mobile'],
    category: 'Mobile',
    demoUrl: '#',
    githubUrl: 'https://github.com/barakadevx-afk/family-connect',
    featured: false,
    year: '2023',
    status: 'Live',
    color: 'from-orange-500 to-red-600',
  },
  {
    title: 'CodeVault',
    description: 'An open-source collection of developer tools, code snippets, and AI-powered automation scripts. Everything from REST testing utilities to database migration helpers.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop',
    tags: ['Dev Tools', 'Open Source', 'Node.js', 'CLI'],
    category: 'Web',
    demoUrl: '#',
    githubUrl: 'https://github.com/barakadevx-afk/barakacodex',
    featured: false,
    year: '2023',
    status: 'Live',
    color: 'from-gray-600 to-gray-800',
  },
  {
    title: 'HangaHub',
    description: 'A collaborative maker platform where creators build and share projects together. Features real-time collaboration, project templates, and a community discovery feed.',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=500&fit=crop',
    tags: ['Next.js', 'Collaboration', 'Community', 'PostgreSQL'],
    category: 'Web',
    demoUrl: '#',
    githubUrl: 'https://github.com/barakadevx-afk/hangahub-website',
    featured: false,
    year: '2024',
    status: 'In Dev',
    color: 'from-cyan-500 to-blue-600',
  },
]

const filters = ['All', 'Featured', 'AI', 'Web', 'Mobile']

const statusColors = {
  Live: 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400',
  Beta: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400',
  'In Dev': 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
}

function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white dark:bg-dark-100 rounded-3xl overflow-hidden shadow-2xl"
      >
        <div className="relative h-56 sm:h-64">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-3 mb-2">
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[project.status]}`}>{project.status}</span>
              {project.featured && <span className="text-xs px-2.5 py-1 rounded-full bg-red-500 text-white font-medium flex items-center gap-1"><Sparkles className="w-3 h-3" />Featured</span>}
            </div>
            <h2 className="text-2xl font-bold text-white">{project.title}</h2>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-dark-200 text-gray-600 dark:text-gray-400">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              {project.year}
            </div>
            <div className="flex gap-3">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 transition-colors text-sm font-medium">
                <Github className="w-4 h-4" /> Source
              </a>
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-red-500/30 transition-all">
                <Globe className="w-4 h-4" /> Live Demo
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [activeFilter, setActiveFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = projects.filter(p => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'Featured') return p.featured
    return p.category === activeFilter
  })

  return (
    <section id="projects" className="section-padding bg-white dark:bg-dark-200" ref={ref}>
      <div className="max-w-7xl mx-auto container-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-medium mb-4 border border-red-100 dark:border-red-500/20">
            <FolderOpen className="w-3.5 h-3.5" />
            My Work
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Things I&apos;ve{' '}
            <span className="text-gradient">Built</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg">
            A mix of passion projects, SaaS apps, and experiments. Each one taught me something new!
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/30'
                  : 'bg-gray-100 dark:bg-dark-100 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-50'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              {filter}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeFilter === filter ? 'bg-white/20' : 'bg-gray-200 dark:bg-dark-200'}`}>
                {filter === 'All' ? projects.length : filter === 'Featured' ? projects.filter(p => p.featured).length : projects.filter(p => p.category === filter).length}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="group relative rounded-2xl overflow-hidden bg-white dark:bg-dark-100 border border-gray-100 dark:border-gray-800 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => setSelected(project)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {project.featured && (
                      <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-semibold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Featured
                      </span>
                    )}
                    {project.category === 'AI' && (
                      <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-semibold flex items-center gap-1">
                        <Brain className="w-3 h-3" /> AI
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 right-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[project.status]}`}>{project.status}</span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-900/80 to-rose-900/80 backdrop-blur-sm flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={(e) => { e.stopPropagation(); setSelected(project) }}
                      className="p-3 rounded-full bg-white text-red-600 shadow-lg"
                    >
                      <Eye className="w-5 h-5" />
                    </motion.button>
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-3 rounded-full bg-white text-gray-800 shadow-lg"
                    >
                      <Github className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-3 rounded-full bg-white text-gray-800 shadow-lg"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </motion.a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-red-500 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />{project.year}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span key={tag} className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        idx === 0 ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400' :
                        idx === 1 ? 'bg-gray-100 dark:bg-dark-200 text-gray-600 dark:text-gray-400' :
                        'bg-gray-100 dark:bg-dark-200 text-gray-600 dark:text-gray-400'
                      }`}>{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-red-500/5 via-rose-500/5 to-orange-500/5 dark:from-red-500/10 dark:via-rose-500/10 dark:to-orange-500/10 border border-red-100 dark:border-red-500/20 text-center"
        >
          <p className="font-hand text-2xl text-gray-600 dark:text-gray-400 mb-4">
            Want to see more? I&apos;ve got plenty of experiments on GitHub! 🚀
          </p>
          <a
            href="https://github.com/barakadevx-afk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold shadow-lg shadow-red-500/30 hover:shadow-xl hover:scale-105 transition-all"
          >
            <Github className="w-5 h-5" />
            View All on GitHub
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}

export default Projects
