import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Lock, Unlock, Download, MessageSquare, FileCode, Calendar, Star, Users } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const features = [
  {
    icon: FileCode,
    title: 'Source Code Access',
    description: 'Download complete source code for all featured projects with documentation.',
    requiresAuth: true,
  },
  {
    icon: MessageSquare,
    title: 'Priority Support',
    description: 'Get priority response on consultations and project inquiries within 24 hours.',
    requiresAuth: true,
  },
  {
    icon: Calendar,
    title: 'Early Access',
    description: 'Be the first to see new projects, tutorials, and exclusive content.',
    requiresAuth: false,
  },
  {
    icon: Users,
    title: 'Community Access',
    description: 'Join the private Discord community for developers and tech enthusiasts.',
    requiresAuth: true,
  },
  {
    icon: Download,
    title: 'Free Resources',
    description: 'Access to templates, code snippets, and learning materials.',
    requiresAuth: false,
  },
  {
    icon: Star,
    title: 'Personalized Content',
    description: 'Content recommendations based on your interests and skills.',
    requiresAuth: true,
  },
]

function MemberFeatures() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { isAuthenticated, isRegistered, openAuthModal } = useAuth()

  return (
    <section className="py-16 bg-gradient-to-br from-primary-500/5 to-purple-500/5 dark:from-primary-900/10 dark:to-purple-900/10" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            Member Benefits
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Exclusive{' '}
            <span className="text-gradient">Features</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            {isRegistered 
              ? 'As a registered member, you have access to all these exclusive features.'
              : isAuthenticated
                ? 'Sign in to unlock all premium features and exclusive content.'
                : 'Create an account to unlock premium features and exclusive content.'
            }
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative p-6 rounded-xl border transition-all ${
                feature.requiresAuth && !isRegistered
                  ? 'bg-gray-50 dark:bg-dark-300/30 border-gray-200 dark:border-gray-700'
                  : 'bg-white dark:bg-dark-200 border-primary-200 dark:border-primary-800 shadow-lg'
              }`}
            >
              {/* Lock Overlay for non-registered users */}
              {feature.requiresAuth && !isRegistered && (
                <div className="absolute inset-0 bg-white/60 dark:bg-dark-200/60 backdrop-blur-[1px] rounded-xl flex items-center justify-center z-10">
                  <div className="text-center">
                    <Lock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <button
                      onClick={openAuthModal}
                      className="text-sm text-primary-500 hover:text-primary-600 font-medium"
                    >
                      Sign in to unlock
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${
                  feature.requiresAuth && !isRegistered
                    ? 'bg-gray-200 dark:bg-gray-700'
                    : 'bg-gradient-to-br from-primary-500 to-purple-600'
                }`}>
                  <feature.icon className={`w-6 h-6 ${
                    feature.requiresAuth && !isRegistered
                      ? 'text-gray-500 dark:text-gray-400'
                      : 'text-white'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    {feature.requiresAuth && isRegistered && (
                      <Unlock className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {!isRegistered && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12"
          >
            <button
              onClick={openAuthModal}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary-500 to-purple-600 text-white font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl transition-shadow"
            >
              <Unlock className="w-5 h-5" />
              Unlock All Features
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default MemberFeatures
