import { ExternalLink, Github, Eye, Sparkles, Brain, Lightbulb, Heart } from 'lucide-react'

const projects = [
  {
    title: 'SkillsMatch',
    description: 'A passion project I built to help people figure out their career paths. Uses AI to analyze skills and suggest what to learn next. Basically a smart friend who knows the job market!',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop',
    tags: ['AI', 'React', 'Node.js', 'Career Tech'],
    demoUrl: '#',
    githubUrl: 'https://github.com/barakadevx-afk/skillsmatch',
    featured: true,
    year: '2024',
  },
  {
    title: 'EduNexusHub',
    description: 'My take on making education more personal. Built this because I hated boring online courses. Now it adapts to how YOU learn best.',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=500&fit=crop',
    tags: ['E-Learning', 'AI Tutor', 'EdTech', 'Personalization'],
    demoUrl: '#',
    githubUrl: 'https://github.com/barakadevx-afk/edunexushub',
    featured: true,
    year: '2024',
  },
  {
    title: 'ChatCraft',
    description: 'Got tired of boring chatbots, so I made one you can actually customize. Perfect for businesses who want their bot to sound human (like me!).',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
    tags: ['AI Chat', 'SaaS', 'NLP', 'Chatbot'],
    demoUrl: '#',
    githubUrl: 'https://github.com/barakadevx-afk/advanced-chat-maker',
    featured: true,
    year: '2023',
  },
  {
    title: 'Family Connect',
    description: 'Built this for my own family actually! Helps us stay organized with events, reminders, and shared lists. Family tech that actually works.',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=500&fit=crop',
    tags: ['Family', 'Communication', 'Productivity', 'React Native'],
    demoUrl: '#',
    githubUrl: 'https://github.com/barakadevx-afk/family-connect',
    featured: false,
    year: '2023',
  },
  {
    title: 'CodeVault',
    description: 'My collection of dev tools and experiments. Everything from AI helpers to automation scripts. Stuff I actually use daily.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop',
    tags: ['Dev Tools', 'AI', 'Open Source', 'Utilities'],
    demoUrl: '#',
    githubUrl: 'https://github.com/barakadevx-afk/barakacodex',
    featured: false,
    year: '2023',
  },
  {
    title: 'HangaHub',
    description: 'A platform for creators to build and share projects. Think of it as a maker space, but online. Built with friends over weekends!',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=500&fit=crop',
    tags: ['Collaboration', 'Product Builder', 'Community', 'Next.js'],
    demoUrl: '#',
    githubUrl: 'https://github.com/barakadevx-afk/hangahub-website',
    featured: false,
    year: '2024',
  },
]

function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32 bg-gradient-to-b from-transparent via-red-50/30 to-transparent dark:from-transparent dark:via-red-900/5 dark:to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium mb-4 font-hand text-lg">
            My Work
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            Things I've{' '}
            <span className="text-gradient">Built</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg">
            A mix of passion projects, side hustles, and experiments. Each one taught me something new!
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.title}>
              <div className="group relative rounded-2xl overflow-hidden bg-white/80 dark:bg-dark-200/80 backdrop-blur-sm border border-white/50 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Year badge */}
                    <span className="absolute bottom-4 left-4 px-2 py-1 rounded-lg bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                      {project.year}
                    </span>
                    
                    {/* Featured Badge */}
                    {project.featured && (
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-semibold flex items-center gap-1 shadow-lg">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                    
                    {/* AI Badge */}
                    {project.tags.some(tag => ['AI', 'AI Chat', 'AI Tutor'].includes(tag)) && (
                      <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold flex items-center gap-1 shadow-lg">
                        <Brain className="w-3 h-3" />
                        AI
                      </span>
                    )}
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-red-900/80 backdrop-blur-sm flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a
                        href={project.demoUrl}
                        className="p-3 rounded-full bg-white text-red-600 shadow-lg hover:scale-110 transition-transform"
                      >
                        <Eye className="w-5 h-5" />
                      </a>
                      <a
                        href={project.githubUrl}
                        className="p-3 rounded-full bg-white text-gray-800 shadow-lg hover:scale-110 transition-transform"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-red-500 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Tags with color */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={tag}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            i === 0 ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                            i === 1 ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400' :
                            'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
            </div>
          ))}
        </div>

        {/* Personal touch section */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-red-500/10 via-rose-500/10 to-orange-500/10 dark:from-red-900/20 dark:via-rose-900/20 dark:to-orange-900/20 border border-red-200/50 dark:border-red-500/20 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">
                Want to see more?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-hand text-xl">
                I've got plenty more experiments on GitHub! 🚀
              </p>
            </div>
            <a
              href="https://github.com/barakadevx-afk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold shadow-xl shadow-red-500/30 hover:shadow-2xl transition-all hover:scale-105"
            >
              <Github className="w-5 h-5" />
              Check My GitHub
            </a>
          </div>
        </div>

        {/* Footer with personality */}
        <div className="text-center mt-8 pt-8 border-t border-red-200/30 dark:border-red-500/20">
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> and lots of coffee
          </p>
        </div>
      </div>
    </section>
  )
}

export default Projects
