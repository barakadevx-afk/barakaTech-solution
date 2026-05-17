import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Eye, Download, MessageSquare, TrendingUp,
  DollarSign, LogOut, BarChart3, Shield,
  CheckCircle, AlertTriangle, Home, X,
  Mail, Trash2, MailOpen, Clock, Tag, Wallet, RefreshCw, Inbox, Loader2
} from 'lucide-react'
import { useAdmin } from '../contexts/AdminContext'
import AdminLogin from './AdminLogin'

const dashStats = [
  { label: 'Total Views', value: '45.2K', change: '+8%', icon: Eye, color: 'red' },
  { label: 'Projects', value: '50+', change: '+5', icon: BarChart3, color: 'rose' },
  { label: 'Downloads', value: '892', change: '+23%', icon: Download, color: 'orange' },
  { label: 'Revenue', value: '$2,450', change: '+15%', icon: DollarSign, color: 'red' },
]

const activities = [
  { action: 'Admin portal accessed', user: 'baraka@admin.com', time: 'Just now', type: 'success' },
  { action: 'New contact message saved', user: 'via contact form', time: '5 mins ago', type: 'success' },
  { action: 'Failed login attempt blocked', user: 'unknown', time: '10 mins ago', type: 'warning' },
  { action: 'Portfolio viewed', user: 'visitor', time: '15 mins ago', type: 'info' },
]

const TABS = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'messages', label: 'Messages', icon: Inbox },
]

function AdminDashboard({ onNavigate, onClose }) {
  const { logout, isAdmin, getMessages, markAsRead, deleteMessage } = useAdmin()
  const [activeTab, setActiveTab] = useState('overview')
  const [messages, setMessages] = useState([])
  const [selectedMsg, setSelectedMsg] = useState(null)
  const [loadingMessages, setLoadingMessages] = useState(false)
  const [msgError, setMsgError] = useState(null)

  const refreshMessages = useCallback(async () => {
    setLoadingMessages(true)
    setMsgError(null)
    try {
      const msgs = await getMessages()
      setMessages(msgs)
    } catch {
      setMsgError('Failed to load messages. Check connection.')
    } finally {
      setLoadingMessages(false)
    }
  }, [getMessages])

  useEffect(() => {
    if (isAdmin) refreshMessages()
  }, [isAdmin, refreshMessages])

  if (!isAdmin) {
    return <AdminLogin onClose={onClose} />
  }

  const unreadCount = messages.filter(m => !m.isRead).length

  const handleRead = async (msg) => {
    setSelectedMsg(msg)
    if (!msg.isRead) {
      await markAsRead(msg.id)
      setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, isRead: true } : m))
      setSelectedMsg(prev => prev ? { ...prev, isRead: true } : prev)
    }
  }

  const handleDelete = async (id, e) => {
    e?.stopPropagation()
    await deleteMessage(id)
    setMessages(prev => prev.filter(m => m.id !== id))
    if (selectedMsg?.id === id) setSelectedMsg(null)
  }

  const getActivityIcon = (type) => {
    if (type === 'success') return <CheckCircle className="w-4 h-4 text-green-500" />
    if (type === 'warning') return <AlertTriangle className="w-4 h-4 text-yellow-500" />
    return <BarChart3 className="w-4 h-4 text-red-500" />
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm">
      <div className="min-h-screen bg-gray-50 dark:bg-dark-100">

        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white dark:bg-dark-200 border-b border-gray-200 dark:border-gray-800 px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-red-500 to-rose-600">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">Admin Dashboard</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">baraka@admin.com · Cloud-connected</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate?.('main')}
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-dark-300 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-400 transition-colors text-sm"
              >
                <Home className="w-4 h-4" />
                Home
              </button>
              <button onClick={onClose} className="p-2 rounded-lg bg-gray-100 dark:bg-dark-300 text-gray-600 dark:text-gray-400 hover:bg-gray-200 transition-colors">
                <X className="w-4 h-4" />
              </button>
              <button
                onClick={() => { logout(); onClose() }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 transition-colors text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Tab nav */}
          <div className="flex items-center gap-1 mb-8 bg-white dark:bg-dark-200 p-1.5 rounded-xl border border-gray-200 dark:border-gray-800 w-fit">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); if (tab.id === 'messages') refreshMessages() }}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {tab.id === 'messages' && unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">

            {/* ── OVERVIEW TAB ── */}
            {activeTab === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {dashStats.map((stat, i) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.07 }}
                      className="bg-white dark:bg-dark-200 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                          <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400 mt-1">
                            <TrendingUp className="w-3 h-3" />{stat.change}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-500/10">
                          <stat.icon className="w-5 h-5 text-red-500 dark:text-red-400" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Messages preview */}
                  <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
                    className="lg:col-span-2 bg-white dark:bg-dark-200 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Inbox className="w-5 h-5 text-red-500" />
                        Recent Messages
                        {unreadCount > 0 && (
                          <span className="px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-500/15 text-red-600 dark:text-red-400 text-xs font-bold">
                            {unreadCount} new
                          </span>
                        )}
                      </h3>
                      <button onClick={() => setActiveTab('messages')} className="text-sm text-red-500 hover:text-red-600 font-medium">
                        View all →
                      </button>
                    </div>

                    {loadingMessages ? (
                      <div className="flex items-center justify-center py-12 text-gray-400">
                        <Loader2 className="w-6 h-6 animate-spin mr-2" />
                        <span className="text-sm">Loading from cloud…</span>
                      </div>
                    ) : messages.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                        <Mail className="w-10 h-10 mb-3 opacity-20" />
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No messages yet</p>
                        <p className="text-xs mt-1 opacity-70">Contact form submissions will appear here</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {messages.slice(0, 4).map(msg => (
                          <button key={msg.id} onClick={() => { setActiveTab('messages'); handleRead(msg) }}
                            className={`w-full text-left p-4 rounded-xl border transition-all hover:border-red-300 dark:hover:border-red-500/40 ${
                              msg.isRead ? 'bg-gray-50 dark:bg-dark-100 border-gray-100 dark:border-gray-800' : 'bg-red-50 dark:bg-red-500/5 border-red-200 dark:border-red-500/20'
                            }`}>
                            <div className="flex items-start gap-3">
                              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${msg.isRead ? 'bg-gray-300' : 'bg-red-500'}`} />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                  <p className={`text-sm font-semibold truncate ${msg.isRead ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'}`}>{msg.name}</p>
                                  <span className="text-xs text-gray-400 flex-shrink-0">{new Date(msg.createdAt).toLocaleDateString()}</span>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{msg.email}</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400 truncate mt-0.5">{msg.message}</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>

                  {/* Activity */}
                  <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-dark-200 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-5">Recent Activity</h3>
                    <div className="space-y-3">
                      {activities.map((a, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-dark-300/50">
                          {getActivityIcon(a.type)}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{a.action}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{a.user}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Quick actions */}
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="mt-6 bg-gradient-to-r from-red-500 via-rose-500 to-orange-500 rounded-xl p-6 text-white">
                  <h3 className="font-bold mb-4">Quick Actions</h3>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => setActiveTab('messages')} className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-sm font-medium flex items-center gap-2">
                      <Inbox className="w-4 h-4" /> View Messages
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-sm font-medium flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" /> View Reports
                    </button>
                    <button onClick={() => onNavigate?.('projects')} className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-sm font-medium flex items-center gap-2">
                      <Download className="w-4 h-4" /> Manage Projects
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* ── MESSAGES TAB ── */}
            {activeTab === 'messages' && (
              <motion.div key="messages" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Inbox className="w-5 h-5 text-red-500" />
                      Contact Messages
                      {unreadCount > 0 && (
                        <span className="px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-500/15 text-red-600 dark:text-red-400 text-sm font-bold">
                          {unreadCount} unread
                        </span>
                      )}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Stored in cloud — visible from any device</p>
                  </div>
                  <button onClick={refreshMessages} disabled={loadingMessages}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-dark-300 text-gray-600 dark:text-gray-400 hover:bg-gray-200 transition-colors text-sm disabled:opacity-50">
                    <RefreshCw className={`w-4 h-4 ${loadingMessages ? 'animate-spin' : ''}`} />
                    Refresh
                  </button>
                </div>

                {msgError && (
                  <div className="mb-4 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 text-sm">
                    {msgError}
                  </div>
                )}

                {loadingMessages ? (
                  <div className="bg-white dark:bg-dark-200 rounded-2xl border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center py-24 text-gray-400">
                    <Loader2 className="w-10 h-10 mb-3 animate-spin opacity-40" />
                    <p className="text-sm">Loading messages from cloud…</p>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="bg-white dark:bg-dark-200 rounded-2xl border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center py-24 text-gray-400">
                    <Mail className="w-16 h-16 mb-4 opacity-20" />
                    <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400 mb-1">No messages yet</h3>
                    <p className="text-sm opacity-70 text-center max-w-xs">When visitors submit the contact form, messages are saved to the cloud database and will appear here.</p>
                  </div>
                ) : (
                  <div className="grid lg:grid-cols-5 gap-6">
                    {/* List */}
                    <div className="lg:col-span-2 space-y-2">
                      {messages.map(msg => (
                        <motion.button key={msg.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                          onClick={() => handleRead(msg)}
                          className={`w-full text-left p-4 rounded-xl border transition-all group ${
                            selectedMsg?.id === msg.id
                              ? 'border-red-400 dark:border-red-500 bg-red-50 dark:bg-red-500/10 shadow-md'
                              : msg.isRead
                              ? 'border-gray-100 dark:border-gray-800 bg-white dark:bg-dark-200 hover:border-gray-200 dark:hover:border-gray-700'
                              : 'border-red-200 dark:border-red-500/30 bg-red-50/60 dark:bg-red-500/5 hover:border-red-300'
                          }`}>
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${msg.isRead ? 'bg-gray-300 dark:bg-gray-600' : 'bg-red-500 animate-pulse'}`} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1 mb-0.5">
                                <span className={`text-sm font-bold truncate ${msg.isRead ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'}`}>{msg.name}</span>
                                <button onClick={(e) => handleDelete(msg.id, e)}
                                  className="opacity-0 group-hover:opacity-100 p-1 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all flex-shrink-0">
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{msg.email}</p>
                              {msg.projectType && (
                                <span className="inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-dark-300 text-gray-500 dark:text-gray-400 text-xs">
                                  <Tag className="w-2.5 h-2.5" />{msg.projectType}
                                </span>
                              )}
                              <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(msg.createdAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    {/* Detail */}
                    <div className="lg:col-span-3">
                      <AnimatePresence mode="wait">
                        {selectedMsg ? (
                          <motion.div key={selectedMsg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                            className="bg-white dark:bg-dark-200 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-white dark:from-dark-300/40 dark:to-dark-200">
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{selectedMsg.name}</h3>
                                  <a href={`mailto:${selectedMsg.email}`} className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 mt-0.5">
                                    <Mail className="w-3.5 h-3.5" />{selectedMsg.email}
                                  </a>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="flex items-center gap-1 text-xs text-gray-400"><MailOpen className="w-3.5 h-3.5" />Read</span>
                                  <button onClick={(e) => handleDelete(selectedMsg.id, e)} className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-4">
                                {selectedMsg.projectType && (
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-medium border border-red-100 dark:border-red-500/20">
                                    <Tag className="w-3 h-3" />{selectedMsg.projectType}
                                  </span>
                                )}
                                {selectedMsg.budget && (
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium border border-green-100 dark:border-green-500/20">
                                    <Wallet className="w-3 h-3" />{selectedMsg.budget}
                                  </span>
                                )}
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-dark-300 text-gray-500 dark:text-gray-400 text-xs">
                                  <Clock className="w-3 h-3" />{new Date(selectedMsg.createdAt).toLocaleString()}
                                </span>
                              </div>
                            </div>
                            <div className="p-6">
                              <h4 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Message</h4>
                              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-sm">{selectedMsg.message}</p>
                            </div>
                            <div className="px-6 pb-6">
                              <a href={`mailto:${selectedMsg.email}?subject=Re: Your inquiry — Baraka DevX Portfolio&body=Hi ${selectedMsg.name},%0D%0A%0D%0AThank you for reaching out!%0D%0A%0D%0A`}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-semibold shadow-md shadow-red-500/25 hover:shadow-lg hover:shadow-red-500/35 transition-all">
                                <MessageSquare className="w-4 h-4" />Reply via Email
                              </a>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="bg-white dark:bg-dark-200 rounded-2xl border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center py-24 text-gray-400">
                            <MailOpen className="w-12 h-12 mb-3 opacity-20" />
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Select a message to read</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
