import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, Mail, Calendar, Download, Star, MessageSquare,
  Settings, LogOut, FileCode, Bell, Home, X, Crown,
  Lock, Zap, Coffee, Check, Shield, Users, Sparkles,
  ChevronRight, Globe, Code2, Heart
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const premiumPerks = [
  { icon: FileCode, title: 'Source Code Downloads', desc: 'Full source for all 50+ projects', color: 'from-blue-500 to-cyan-400' },
  { icon: MessageSquare, title: 'Priority Support', desc: '24-hour response guarantee', color: 'from-purple-500 to-pink-400' },
  { icon: Users, title: 'Discord Community', desc: 'Private dev community access', color: 'from-indigo-500 to-purple-400' },
  { icon: Bell, title: 'Early Access', desc: 'New projects before anyone else', color: 'from-green-500 to-emerald-400' },
  { icon: Sparkles, title: 'Personalized Feed', desc: 'Content curated for your stack', color: 'from-orange-500 to-amber-400' },
  { icon: Shield, title: 'Premium Badge', desc: 'Verified supporter status', color: 'from-rose-500 to-pink-400' },
]

const freePerks = [
  { icon: Globe, title: 'Browse Portfolio', desc: 'All projects & case studies' },
  { icon: Code2, title: 'Blog & Tutorials', desc: 'Free tech articles & guides' },
  { icon: Mail, title: 'Contact Baraka', desc: 'Send messages directly' },
  { icon: Heart, title: 'Show Support', desc: 'Like and share projects' },
]

const downloads = [
  { name: 'E-Commerce Platform', type: 'React + Node.js', date: '2024-01-15', size: '2.4 MB', locked: false },
  { name: 'AI Image Generator', type: 'Python + FastAPI', date: '2024-01-10', size: '1.8 MB', locked: false },
  { name: 'Real-Time Chat App', type: 'Socket.io + React', date: '2024-02-01', size: '3.1 MB', locked: true },
  { name: 'GameFi NFT Marketplace', type: 'Solidity + Next.js', date: '2024-02-10', size: '4.2 MB', locked: true },
]

const activity = [
  { action: 'Downloaded source code', project: 'E-Commerce Platform', time: '2 days ago', icon: Download },
  { action: 'Joined community', project: 'Discord Server', time: '1 week ago', icon: Users },
  { action: 'Sent a message', project: 'Contact Form', time: '2 weeks ago', icon: MessageSquare },
]

function UserDashboard({ onNavigate, onClose }) {
  const { user, logout, isPremium, openPawaPayModal } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  if (!user) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="text-center text-white">
          <p>Please sign in to access your dashboard.</p>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-primary-500 rounded-lg">Close</button>
        </div>
      </div>
    )
  }

  const handleUpgrade = () => {
    onClose?.()
    setTimeout(() => openPawaPayModal(), 150)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm">
      <div className="min-h-screen bg-gray-50 dark:bg-dark-100 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start justify-between mb-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Hey, {user.name}!
                </h1>
                {isPremium ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-rose-500 to-orange-400 text-white text-xs font-bold shadow-lg shadow-rose-500/30">
                    <Crown className="w-3.5 h-3.5" />
                    Premium
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium">
                    <Zap className="w-3.5 h-3.5" />
                    Free
                  </span>
                )}
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {isPremium
                  ? 'Welcome back, premium supporter. All features unlocked.'
                  : 'Upgrade to premium to unlock source code, priority support & more.'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate?.('main')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-dark-300 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary-400 transition-colors text-sm font-medium"
              >
                <Home className="w-4 h-4" />
                Home
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white dark:bg-dark-300 text-gray-500 border border-gray-200 dark:border-gray-700 hover:border-red-400 hover:text-red-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Upgrade Banner (free users only) */}
          {!isPremium && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 p-5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 text-white shadow-xl shadow-rose-500/20 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white/20">
                  <Coffee className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-lg">Upgrade to Premium</p>
                  <p className="text-white/85 text-sm">Buy me a coffee to unlock source code, Discord & priority support</p>
                </div>
              </div>
              <button
                onClick={handleUpgrade}
                className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-rose-600 font-bold text-sm hover:bg-rose-50 transition-colors shadow-lg"
              >
                <Crown className="w-4 h-4" />
                Upgrade Now
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* Premium welcome card */}
          {isPremium && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 p-5 rounded-2xl border border-rose-200 dark:border-rose-800/40 bg-gradient-to-r from-rose-50 to-orange-50 dark:from-rose-900/10 dark:to-orange-900/10 flex items-center gap-4"
            >
              <div className="p-3 rounded-xl bg-gradient-to-br from-rose-500 to-orange-400 shadow-lg shadow-rose-500/30">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">Premium Member since {new Date(user.premiumSince || user.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Thank you for supporting Baraka's work. All features are unlocked for you.</p>
              </div>
              <div className="ml-auto flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </motion.div>
          )}

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-white dark:bg-dark-200 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 sticky top-6">
                {/* Profile Card */}
                <div className="text-center mb-5 pb-5 border-b border-gray-100 dark:border-gray-800">
                  <div className="relative inline-block mb-3">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white ${
                      isPremium
                        ? 'bg-gradient-to-br from-rose-500 to-orange-400'
                        : 'bg-gradient-to-br from-primary-500 to-purple-600'
                    }`}>
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    {isPremium && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-rose-500 to-orange-400 border-2 border-white dark:border-dark-200 flex items-center justify-center">
                        <Crown className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">{user.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{user.email}</p>
                  <span className={`inline-flex items-center gap-1 mt-2 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    isPremium
                      ? 'bg-gradient-to-r from-rose-500 to-orange-400 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}>
                    {isPremium ? <Crown className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
                    {isPremium ? 'Premium' : 'Free Plan'}
                  </span>
                </div>

                {/* Nav */}
                <nav className="space-y-1">
                  {[
                    { id: 'overview', icon: User, label: 'Overview' },
                    { id: 'downloads', icon: Download, label: 'Downloads' },
                    { id: 'perks', icon: Crown, label: isPremium ? 'My Perks' : 'Unlock Perks' },
                    { id: 'activity', icon: Bell, label: 'Activity' },
                    { id: 'settings', icon: Settings, label: 'Settings' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all text-sm ${
                        activeTab === item.id
                          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-semibold'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-300'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <item.icon className="w-4 h-4" />
                        {item.label}
                      </span>
                      {item.id === 'perks' && !isPremium && (
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                      )}
                    </button>
                  ))}

                  <div className="border-t border-gray-100 dark:border-gray-800 my-2 pt-2">
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </nav>
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">

                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                  <motion.div key="overview" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
                    <div className="grid sm:grid-cols-3 gap-4">
                      {[
                        { label: 'Downloads', value: isPremium ? '12' : '2', icon: Download, color: 'from-blue-500 to-cyan-400', locked: !isPremium },
                        { label: 'Projects Access', value: isPremium ? '50+' : '6', icon: FileCode, color: 'from-purple-500 to-pink-400', locked: !isPremium },
                        { label: 'Support Tickets', value: isPremium ? 'Priority' : 'Standard', icon: MessageSquare, color: 'from-rose-500 to-orange-400', locked: !isPremium },
                      ].map((stat) => (
                        <div key={stat.label} className="bg-white dark:bg-dark-200 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 relative overflow-hidden">
                          <div className={`absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-10 bg-gradient-to-br ${stat.color}`} />
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                          <div className={`mt-2 inline-flex p-1.5 rounded-lg bg-gradient-to-br ${stat.color}`}>
                            <stat.icon className="w-4 h-4 text-white" />
                          </div>
                          {stat.locked && !isPremium && (
                            <div className="absolute top-3 right-3">
                              <Lock className="w-3.5 h-3.5 text-gray-400" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Account info */}
                    <div className="bg-white dark:bg-dark-200 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wide">Account Information</h3>
                      <div className="space-y-3">
                        {[
                          { icon: User, label: 'Full Name', value: user.name },
                          { icon: Mail, label: 'Email', value: user.email },
                          { icon: Calendar, label: 'Member Since', value: new Date(user.joinedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) },
                        ].map((item) => (
                          <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-dark-300/50">
                            <div className="p-2 rounded-lg bg-white dark:bg-dark-200 border border-gray-200 dark:border-gray-700">
                              <item.icon className="w-4 h-4 text-gray-500" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{item.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white dark:bg-dark-200 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wide">Recent Activity</h3>
                      <div className="space-y-3">
                        {activity.map((item, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-dark-300/50">
                            <div className="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                              <item.icon className="w-4 h-4 text-primary-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.action}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{item.project}</p>
                            </div>
                            <span className="text-xs text-gray-400 flex-shrink-0">{item.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* DOWNLOADS TAB */}
                {activeTab === 'downloads' && (
                  <motion.div key="downloads" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <div className="bg-white dark:bg-dark-200 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                      <div className="flex items-center justify-between mb-5">
                        <h3 className="font-bold text-gray-900 dark:text-white">Available Downloads</h3>
                        {!isPremium && (
                          <span className="text-xs text-gray-500">2 of 50+ unlocked</span>
                        )}
                      </div>
                      <div className="space-y-3">
                        {downloads.map((dl, i) => (
                          <div key={i} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                            dl.locked && !isPremium
                              ? 'bg-gray-50 dark:bg-dark-300/30 border-gray-100 dark:border-gray-800 opacity-70'
                              : 'bg-gray-50 dark:bg-dark-300/50 border-gray-200 dark:border-gray-700'
                          }`}>
                            <div className="flex items-center gap-3">
                              <div className={`p-2.5 rounded-xl ${dl.locked && !isPremium ? 'bg-gray-200 dark:bg-gray-700' : 'bg-primary-100 dark:bg-primary-900/30'}`}>
                                <FileCode className={`w-5 h-5 ${dl.locked && !isPremium ? 'text-gray-400' : 'text-primary-500'}`} />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white text-sm">{dl.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{dl.type} • {dl.size}</p>
                              </div>
                            </div>
                            {dl.locked && !isPremium ? (
                              <button
                                onClick={handleUpgrade}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-rose-500 to-orange-400 text-white text-xs font-semibold shadow hover:shadow-md transition-shadow"
                              >
                                <Crown className="w-3.5 h-3.5" />
                                Unlock
                              </button>
                            ) : (
                              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-500 text-white text-xs font-semibold hover:bg-primary-600 transition-colors">
                                <Download className="w-3.5 h-3.5" />
                                Download
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      {!isPremium && (
                        <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-rose-50 to-orange-50 dark:from-rose-900/10 dark:to-orange-900/10 border border-rose-100 dark:border-rose-800/30 flex items-center justify-between gap-3">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-semibold text-rose-600">48 more</span> source code packs with premium
                          </p>
                          <button onClick={handleUpgrade} className="flex-shrink-0 px-4 py-2 rounded-lg bg-gradient-to-r from-rose-500 to-orange-400 text-white text-xs font-bold">
                            Upgrade
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* PERKS TAB */}
                {activeTab === 'perks' && (
                  <motion.div key="perks" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
                    {!isPremium && (
                      <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-400 text-white">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2.5 rounded-xl bg-white/20">
                            <Coffee className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">Go Premium</h3>
                            <p className="text-white/80 text-sm">Buy me a coffee to unlock everything</p>
                          </div>
                        </div>
                        <button
                          onClick={handleUpgrade}
                          className="w-full py-3 rounded-xl bg-white text-rose-600 font-bold text-sm hover:bg-rose-50 transition-colors shadow-lg"
                        >
                          Buy Me Coffee — Upgrade Now
                        </button>
                      </div>
                    )}

                    <div className={`grid sm:grid-cols-2 gap-4`}>
                      {premiumPerks.map((perk, i) => (
                        <motion.div
                          key={perk.title}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.06 }}
                          className={`relative p-5 rounded-2xl border transition-all ${
                            isPremium
                              ? 'bg-white dark:bg-dark-200 border-gray-100 dark:border-gray-800 shadow-sm'
                              : 'bg-gray-50 dark:bg-dark-300/30 border-gray-100 dark:border-gray-800'
                          }`}
                        >
                          {!isPremium && (
                            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/60 dark:bg-dark-200/60 backdrop-blur-[2px]">
                              <div className="text-center">
                                <Lock className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                                <p className="text-xs text-gray-500 font-medium">Premium only</p>
                              </div>
                            </div>
                          )}
                          <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${perk.color} mb-3`}>
                            <perk.icon className="w-5 h-5 text-white" />
                          </div>
                          <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1 flex items-center gap-2">
                            {perk.title}
                            {isPremium && <Check className="w-4 h-4 text-green-500" />}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{perk.desc}</p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="bg-white dark:bg-dark-200 rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-3">Always Free</h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {freePerks.map((perk) => (
                          <div key={perk.title} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-dark-300/50">
                            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                              <perk.icon className="w-4 h-4 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{perk.title}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{perk.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ACTIVITY TAB */}
                {activeTab === 'activity' && (
                  <motion.div key="activity" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <div className="bg-white dark:bg-dark-200 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-4">Activity Log</h3>
                      <div className="space-y-3">
                        {activity.map((item, i) => (
                          <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-dark-300/50 border-l-4 border-primary-400">
                            <div className="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                              <item.icon className="w-4 h-4 text-primary-500" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 dark:text-white text-sm">{item.action}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{item.project}</p>
                            </div>
                            <span className="text-xs text-gray-400">{item.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* SETTINGS TAB */}
                {activeTab === 'settings' && (
                  <motion.div key="settings" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <div className="bg-white dark:bg-dark-200 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-5">Account Settings</h3>
                      <div className="space-y-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Display Name</label>
                          <input
                            type="text"
                            defaultValue={user.name}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-300 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-primary-500 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                          <input
                            type="email"
                            defaultValue={user.email}
                            disabled
                            className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-dark-400 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Email Notifications</label>
                          <div className="space-y-3">
                            {['New project releases', 'Security updates', 'Newsletter'].map((item) => (
                              <label key={item} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-dark-300/50 cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors">
                                <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-primary-500" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-3 pt-2">
                          <button className="px-6 py-2.5 rounded-xl bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-colors">
                            Save Changes
                          </button>
                          <button
                            onClick={logout}
                            className="px-6 py-2.5 rounded-xl border border-red-200 dark:border-red-800/40 text-red-500 text-sm font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          >
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
