import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Lock, Unlock, Download, MessageSquare, FileCode,
  Calendar, Star, Users, Check, X as XIcon,
  Crown, Zap, Coffee, Globe, Code2, Heart, Bell, Shield, Sparkles
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const tiers = {
  free: {
    name: 'Free',
    icon: Zap,
    color: 'from-gray-400 to-gray-500',
    bgLight: 'bg-gray-50 dark:bg-dark-300/40',
    border: 'border-gray-200 dark:border-gray-700',
    badge: 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300',
    perks: [
      { label: 'Browse portfolio & projects', available: true },
      { label: 'Read blog & tutorials', available: true },
      { label: 'View skills & experience', available: true },
      { label: 'Send contact messages', available: true },
      { label: 'Source code downloads', available: false },
      { label: 'Priority support', available: false },
      { label: 'Discord community', available: false },
      { label: 'Early access to projects', available: false },
      { label: 'Personalized content', available: false },
      { label: 'Premium profile badge', available: false },
    ],
  },
  premium: {
    name: 'Premium',
    icon: Crown,
    color: 'from-rose-500 to-orange-400',
    bgLight: 'bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-900/10 dark:to-orange-900/10',
    border: 'border-rose-300 dark:border-rose-700/50',
    badge: 'bg-gradient-to-r from-rose-500 to-orange-400 text-white',
    perks: [
      { label: 'Browse portfolio & projects', available: true },
      { label: 'Read blog & tutorials', available: true },
      { label: 'View skills & experience', available: true },
      { label: 'Send contact messages', available: true },
      { label: 'Source code downloads', available: true },
      { label: 'Priority support (24h)', available: true },
      { label: 'Discord community', available: true },
      { label: 'Early access to projects', available: true },
      { label: 'Personalized content', available: true },
      { label: 'Premium profile badge', available: true },
    ],
  },
}

const highlights = [
  {
    icon: FileCode,
    title: 'Source Code Access',
    description: 'Download complete source code for all 50+ featured projects with full documentation.',
    requiresAuth: true,
    color: 'from-blue-500 to-cyan-400',
  },
  {
    icon: MessageSquare,
    title: 'Priority Support',
    description: 'Get priority response on consultations and project inquiries within 24 hours.',
    requiresAuth: true,
    color: 'from-purple-500 to-pink-400',
  },
  {
    icon: Calendar,
    title: 'Early Access',
    description: 'Be the first to see new projects, tutorials, and exclusive content drops.',
    requiresAuth: false,
    color: 'from-green-500 to-emerald-400',
  },
  {
    icon: Users,
    title: 'Community Access',
    description: 'Join the private Discord for developers, networking, and code reviews.',
    requiresAuth: true,
    color: 'from-indigo-500 to-purple-400',
  },
  {
    icon: Download,
    title: 'Free Resources',
    description: 'Access to templates, code snippets, and learning materials — always free.',
    requiresAuth: false,
    color: 'from-teal-500 to-green-400',
  },
  {
    icon: Sparkles,
    title: 'Personalized Feed',
    description: 'Content recommendations curated based on your tech stack and interests.',
    requiresAuth: true,
    color: 'from-rose-500 to-orange-400',
  },
]

function MemberFeatures() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { isRegistered, isPremium, openAuthModal, openPawaPayModal } = useAuth()

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-rose-50/30 dark:from-dark-100 dark:via-dark-200 dark:to-dark-100" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-sm font-semibold mb-4">
            <Star className="w-4 h-4 fill-rose-500" />
            Member Benefits
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Free to Browse,{' '}
            <span className="bg-gradient-to-r from-rose-500 to-orange-400 bg-clip-text text-transparent">
              Better with Premium
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-gray-500 dark:text-gray-400">
            {isPremium
              ? 'You have premium access — all features are unlocked for you. Thank you for supporting!'
              : isRegistered
                ? 'You have a free account. Support Baraka with a coffee to unlock everything.'
                : 'Create a free account to join. Buy Baraka a coffee to unlock all premium features.'}
          </p>
        </motion.div>

        {/* Tier comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16"
        >
          {Object.entries(tiers).map(([key, tier], ti) => (
            <div
              key={key}
              className={`relative p-6 rounded-3xl border-2 ${tier.bgLight} ${tier.border} ${key === 'premium' ? 'shadow-xl shadow-rose-500/10' : ''}`}
            >
              {key === 'premium' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-rose-500 to-orange-400 text-white text-xs font-bold shadow-lg shadow-rose-500/30 whitespace-nowrap">
                  ✦ Recommended
                </div>
              )}

              <div className="flex items-center gap-3 mb-5">
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${tier.color} shadow-sm`}>
                  <tier.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900 dark:text-white">{tier.name}</h3>
                    {isPremium && key === 'premium' && (
                      <span className="px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-semibold">
                        Active
                      </span>
                    )}
                    {!isPremium && key === 'free' && isRegistered && (
                      <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {key === 'free' ? 'Always free' : 'Via coffee donation'}
                  </p>
                </div>
              </div>

              <ul className="space-y-2.5 mb-5">
                {tier.perks.map((perk) => (
                  <li key={perk.label} className="flex items-center gap-2.5 text-sm">
                    {perk.available ? (
                      <Check className={`w-4 h-4 flex-shrink-0 ${key === 'premium' ? 'text-rose-500' : 'text-green-500'}`} />
                    ) : (
                      <XIcon className="w-4 h-4 flex-shrink-0 text-gray-300 dark:text-gray-600" />
                    )}
                    <span className={perk.available ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-600'}>
                      {perk.label}
                    </span>
                  </li>
                ))}
              </ul>

              {key === 'free' ? (
                !isRegistered ? (
                  <button
                    onClick={openAuthModal}
                    className="w-full py-2.5 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:border-gray-500 transition-colors"
                  >
                    Sign Up Free
                  </button>
                ) : (
                  <div className="w-full py-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold text-sm text-center">
                    ✓ You're on this plan
                  </div>
                )
              ) : (
                isPremium ? (
                  <div className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-orange-400 text-white font-semibold text-sm text-center flex items-center justify-center gap-1.5">
                    <Crown className="w-4 h-4" />
                    Premium Active
                  </div>
                ) : (
                  <button
                    onClick={openPawaPayModal}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-orange-400 text-white font-semibold text-sm shadow-lg shadow-rose-500/30 hover:shadow-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <Coffee className="w-4 h-4" />
                    Buy Me Coffee
                  </button>
                )
              )}
            </div>
          ))}
        </motion.div>

        {/* Feature highlights grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Feature Highlights</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">What you get with each membership tier</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {highlights.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 + index * 0.08 }}
              className={`relative p-6 rounded-2xl border transition-all group ${
                feature.requiresAuth && !isPremium
                  ? 'bg-white dark:bg-dark-200 border-gray-100 dark:border-gray-800'
                  : 'bg-white dark:bg-dark-200 border-gray-100 dark:border-gray-800 shadow-md hover:shadow-lg hover:-translate-y-0.5'
              }`}
            >
              {/* Lock overlay for premium features when not premium */}
              {feature.requiresAuth && !isPremium && (
                <div className="absolute inset-0 bg-white/70 dark:bg-dark-200/70 backdrop-blur-[1.5px] rounded-2xl flex flex-col items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Lock className="w-7 h-7 text-gray-400 mb-1.5" />
                  <p className="text-xs text-gray-500 font-medium mb-2">Premium feature</p>
                  <button
                    onClick={openPawaPayModal}
                    className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-rose-500 to-orange-400 text-white text-xs font-bold shadow hover:shadow-md transition-shadow"
                  >
                    Unlock with coffee
                  </button>
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} shadow-sm group-hover:shadow-md transition-shadow`}>
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">{feature.title}</h3>
                    {feature.requiresAuth ? (
                      isPremium ? (
                        <Unlock className="w-3.5 h-3.5 text-green-500" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-gray-400" />
                      )
                    ) : (
                      <Check className="w-3.5 h-3.5 text-green-500" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                  {!feature.requiresAuth && (
                    <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[10px] font-semibold uppercase tracking-wide">
                      Free
                    </span>
                  )}
                  {feature.requiresAuth && isPremium && (
                    <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-rose-500/20 to-orange-400/20 text-rose-600 dark:text-rose-400 text-[10px] font-semibold uppercase tracking-wide">
                      Unlocked
                    </span>
                  )}
                  {feature.requiresAuth && !isPremium && (
                    <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 text-[10px] font-semibold uppercase tracking-wide">
                      Premium
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        {!isPremium && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-14"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-4">
              {!isRegistered && (
                <button
                  onClick={openAuthModal}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:border-gray-500 transition-colors"
                >
                  <Zap className="w-5 h-5" />
                  Sign Up Free
                </button>
              )}
              <button
                onClick={openPawaPayModal}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-orange-400 text-white font-bold shadow-xl shadow-rose-500/30 hover:shadow-2xl hover:-translate-y-0.5 transition-all"
              >
                <Coffee className="w-5 h-5" />
                Buy Me Coffee — Go Premium
              </button>
            </div>
            <p className="mt-4 text-xs text-gray-400">
              Rwanda mobile money (MTN & Airtel) · Any amount unlocks premium
            </p>
          </motion.div>
        )}

      </div>
    </section>
  )
}

export default MemberFeatures
