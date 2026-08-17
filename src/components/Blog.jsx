import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { BookOpen, Clock, ArrowRight, Tag, Calendar, TrendingUp } from 'lucide-react'
import { fetchBlogPosts } from '../lib/api'

const catColors = {
  Development: 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
  Security: 'bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400',
  Backend: 'bg-pink-50 text-pink-700 dark:bg-pink-500/10 dark:text-pink-400',
  'Game Dev': 'bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400',
  DevOps: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400',
  Journey: 'bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400',
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function Blog() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogPosts()
      .then((res) => {
        const posts = (res.posts || []).map((p) => ({
          ...p,
          date: formatDate(p.createdAt),
        }))
        setArticles(posts)
      })
      .catch(() => setArticles([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section id="blog" className="section-padding bg-white dark:bg-dark-200">
        <div className="max-w-7xl mx-auto container-padding text-center py-20">
          <p className="text-gray-500 dark:text-gray-400 text-lg">Loading...</p>
        </div>
      </section>
    )
  }

  if (articles.length === 0) {
    return (
      <section id="blog" className="section-padding bg-white dark:bg-dark-200">
        <div className="max-w-7xl mx-auto container-padding text-center py-20">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-medium mb-4 border border-red-100 dark:border-red-500/20">
            <BookOpen className="w-3.5 h-3.5" />
            Blog & Articles
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Thoughts &{' '}
            <span className="text-gradient">Insights</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg">
            No articles yet.
          </p>
        </div>
      </section>
    )
  }

  const featured = articles[0]
  const rest = articles.slice(1)

  return (
    <section id="blog" className="section-padding bg-white dark:bg-dark-200" ref={ref}>
      <div className="max-w-7xl mx-auto container-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-medium mb-4 border border-red-100 dark:border-red-500/20">
            <BookOpen className="w-3.5 h-3.5" />
            Blog & Articles
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Thoughts &{' '}
            <span className="text-gradient">Insights</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg">
            Deep dives on development, security, game dev, and my journey as a young developer.
          </p>
        </motion.div>

        {/* Featured Article */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 group cursor-pointer"
        >
          <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-card hover:shadow-card-hover transition-all duration-300">
            <div className="relative h-64 lg:h-auto overflow-hidden">
              <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent lg:bg-gradient-to-t" />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-semibold">✨ Featured</span>
                {featured.trending && <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-semibold flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Trending</span>}
              </div>
            </div>
            <div className="p-8 bg-white dark:bg-dark-100 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${catColors[featured.category]}`}>{featured.category}</span>
                <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readTime}</span>
                <span className="text-xs text-gray-400 flex items-center gap-1"><Calendar className="w-3 h-3" />{featured.date}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-red-500 transition-colors">
                {featured.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {featured.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-dark-200 text-gray-600 dark:text-gray-400">
                    <Tag className="w-3 h-3" />{tag}
                  </span>
                ))}
              </div>
              <button className="inline-flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold text-sm hover:gap-3 transition-all">
                Read Full Article <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((article, i) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-dark-100 border border-gray-100 dark:border-gray-800 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative h-44 overflow-hidden">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${catColors[article.category]}`}>{article.category}</span>
                  {article.trending && <span className="text-xs px-2 py-1 rounded-full bg-orange-500/90 text-white font-medium flex items-center gap-0.5"><TrendingUp className="w-2.5 h-2.5" /></span>}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{article.date}</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-red-500 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed mb-4">
                  {article.excerpt}
                </p>
                <button className="inline-flex items-center gap-1.5 text-red-600 dark:text-red-400 font-medium text-sm hover:gap-2.5 transition-all">
                  Read more <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* All Articles CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-12"
        >
          <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-red-500/30 text-red-600 dark:text-red-400 font-semibold hover:bg-red-50 dark:hover:bg-red-500/10 transition-all hover:border-red-500">
            <BookOpen className="w-5 h-5" />
            View All Articles
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Blog
