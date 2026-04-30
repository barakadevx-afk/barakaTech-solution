import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: 'Ishimwe Kevin',
    role: 'Full stack Developer',
    image: 'public/kevin.jpg',
    content: 'Baraka delivered an exceptional full-stack solution that transformed our operations. His attention to security and performance is unmatched.',
    rating: 5,
    project: 'Enterprise SaaS Platform',
  },
  {
    name: 'ishimwe jeanclaude',
    role: 'Full stack Developer',
    image: 'public/ish.jpg',
    content: 'The AI behavior system Baraka implemented for our RPG was groundbreaking. He truly understands game mechanics and player psychology.',
    rating: 5,
    project: 'Fantasy RPG Game',
  },
  {
    name: 'izere elias',
    role: 'Advanced Information Security Engineer',
    image: 'public/elias.png',
    content: 'His penetration testing revealed vulnerabilities we never knew existed. Baraka\'s security audit saved us from potential disasters.',
    rating: 5,
    project: 'Security Audit',
  },
  {
    name: 'Baraka DevX',
    role: 'Game And Web Developer & Security Specialist',
    image: 'public/profile.jpg',
    content: 'Fast, efficient, and incredibly skilled. The learning platform he built handles 10,000+ concurrent users without breaking a sweat.',
    rating: 5,
    project: 'E-Learning Platform',
  },
]

function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-white dark:bg-dark-200" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Client{' '}
            <span className="text-gradient">Success Stories</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg">
            Feedback from clients and collaborators across software, gaming, and security projects.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Main Card */}
          <div className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-100 dark:to-dark-300 border border-gray-200 dark:border-gray-800">
            <Quote className="absolute top-6 left-6 w-10 h-10 text-primary-500/20" />
            
            <div className="relative z-10">
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                &ldquo;{testimonials[currentIndex].content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary-500"
                />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonials[currentIndex].role}
                  </p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs">
                    {testimonials[currentIndex].project}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="p-3 rounded-full bg-gray-100 dark:bg-dark-300 text-gray-600 dark:text-gray-400 hover:bg-primary-500 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === currentIndex
                      ? 'bg-primary-500'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="p-3 rounded-full bg-gray-100 dark:bg-dark-300 text-gray-600 dark:text-gray-400 hover:bg-primary-500 hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { value: '50+', label: 'Projects Delivered' },
            { value: '30+', label: 'Happy Clients' },
            { value: '100%', label: 'Client Satisfaction' },
            { value: '24/7', label: 'Support Available' },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center p-4 rounded-xl bg-gray-50 dark:bg-dark-100">
              <p className="text-2xl md:text-3xl font-bold text-gradient mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
