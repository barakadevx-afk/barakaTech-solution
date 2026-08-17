import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Eye, Download, MessageSquare, TrendingUp,
  DollarSign, LogOut, BarChart3, Shield,
  CheckCircle, AlertTriangle, Home, X,
  Mail, Trash2, MailOpen, Clock, Tag, Wallet, RefreshCw, Inbox, Loader2,
  BookOpen, FolderOpen, Quote, Plus, Edit3, Save, Star, ChevronDown
} from 'lucide-react'
import { useAdmin } from '../contexts/AdminContext'
import AdminLogin from './AdminLogin'
import {
  fetchAllBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost,
  fetchProjects, createProject, updateProject, deleteProject,
  fetchTestimonials, approveTestimonial, deleteTestimonial
} from '../lib/api'

const TABS = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'messages', label: 'Messages', icon: Inbox },
  { id: 'blog', label: 'Blog', icon: BookOpen },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'testimonials', label: 'Reviews', icon: Quote },
]

const emptyBlog = { title: '', excerpt: '', content: '', image: '', category: 'Development', readTime: '5 min read', tags: '', trending: false, color: 'from-blue-500 to-indigo-600', published: true }
const emptyProject = { title: '', description: '', image: '', tags: '', category: 'Web', demoUrl: '', githubUrl: '', featured: false, year: new Date().getFullYear().toString(), status: 'Live', color: 'from-blue-500 to-indigo-600' }

function AdminDashboard({ onNavigate, onClose }) {
  const { logout, isAdmin, getMessages, markAsRead, deleteMessage, getAuthHeader } = useAdmin()
  const [activeTab, setActiveTab] = useState('overview')
  const [messages, setMessages] = useState([])
  const [selectedMsg, setSelectedMsg] = useState(null)
  const [loadingMessages, setLoadingMessages] = useState(false)
  const [msgError, setMsgError] = useState(null)

  // Blog state
  const [posts, setPosts] = useState([])
  const [loadingPosts, setLoadingPosts] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const [showPostForm, setShowPostForm] = useState(false)
  const [postForm, setPostForm] = useState(emptyBlog)
  const [savingPost, setSavingPost] = useState(false)

  // Projects state
  const [projects, setProjects] = useState([])
  const [loadingProjects, setLoadingProjects] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [projectForm, setProjectForm] = useState(emptyProject)
  const [savingProject, setSavingProject] = useState(false)

  // Testimonials state
  const [testimonials, setTestimonials] = useState([])
  const [loadingTestimonials, setLoadingTestimonials] = useState(false)

  const refreshMessages = useCallback(async () => {
    setLoadingMessages(true)
    setMsgError(null)
    try {
      const msgs = await getMessages()
      setMessages(msgs)
    } catch {
      setMsgError('Failed to load messages.')
    } finally {
      setLoadingMessages(false)
    }
  }, [getMessages])

  const refreshPosts = useCallback(async () => {
    setLoadingPosts(true)
    try {
      const res = await fetchAllBlogPosts(getAuthHeader())
      setPosts(res.posts || [])
    } catch { /* ignore */ }
    setLoadingPosts(false)
  }, [getAuthHeader])

  const refreshProjects = useCallback(async () => {
    setLoadingProjects(true)
    try {
      const res = await fetchProjects()
      setProjects(res.projects || [])
    } catch { /* ignore */ }
    setLoadingProjects(false)
  }, [])

  const refreshTestimonials = useCallback(async () => {
    setLoadingTestimonials(true)
    try {
      const res = await fetchTestimonials()
      setTestimonials(res.testimonials || [])
    } catch { /* ignore */ }
    setLoadingTestimonials(false)
  }, [])

  useEffect(() => {
    if (!isAdmin) return
    refreshMessages()
    refreshPosts()
    refreshProjects()
    refreshTestimonials()
  }, [isAdmin, refreshMessages, refreshPosts, refreshProjects, refreshTestimonials])

  if (!isAdmin) return <AdminLogin onClose={onClose} />

  const unreadCount = messages.filter(m => !m.isRead).length

  // ─── Messages handlers ───
  const handleRead = async (msg) => {
    setSelectedMsg(msg)
    if (!msg.isRead) {
      await markAsRead(msg._id || msg.id)
      setMessages(prev => prev.map(m => (m._id || m.id) === (msg._id || msg.id) ? { ...m, isRead: true } : m))
      setSelectedMsg(prev => prev ? { ...prev, isRead: true } : prev)
    }
  }

  const handleDeleteMsg = async (id, e) => {
    e?.stopPropagation()
    await deleteMessage(id)
    setMessages(prev => prev.filter(m => (m._id || m.id) !== id))
    if ((selectedMsg?._id || selectedMsg?.id) === id) setSelectedMsg(null)
  }

  // ─── Blog handlers ───
  const handleSavePost = async () => {
    setSavingPost(true)
    const data = { ...postForm, tags: postForm.tags.split(',').map(t => t.trim()).filter(Boolean) }
    if (editingPost) {
      await updateBlogPost(editingPost._id || editingPost.id, data, getAuthHeader())
    } else {
      await createBlogPost(data, getAuthHeader())
    }
    setSavingPost(false)
    setShowPostForm(false)
    setEditingPost(null)
    setPostForm(emptyBlog)
    refreshPosts()
  }

  const handleEditPost = (post) => {
    setEditingPost(post)
    setPostForm({ ...post, tags: (post.tags || []).join(', ') })
    setShowPostForm(true)
  }

  const handleDeletePost = async (id) => {
    if (!confirm('Delete this post?')) return
    await deleteBlogPost(id, getAuthHeader())
    refreshPosts()
  }

  // ─── Projects handlers ───
  const handleSaveProject = async () => {
    setSavingProject(true)
    const data = { ...projectForm, tags: projectForm.tags.split(',').map(t => t.trim()).filter(Boolean) }
    if (editingProject) {
      await updateProject(editingProject._id || editingProject.id, data, getAuthHeader())
    } else {
      await createProject(data, getAuthHeader())
    }
    setSavingProject(false)
    setShowProjectForm(false)
    setEditingProject(null)
    setProjectForm(emptyProject)
    refreshProjects()
  }

  const handleEditProject = (proj) => {
    setEditingProject(proj)
    setProjectForm({ ...proj, tags: (proj.tags || []).join(', ') })
    setShowProjectForm(true)
  }

  const handleDeleteProject = async (id) => {
    if (!confirm('Delete this project?')) return
    await deleteProject(id, getAuthHeader())
    refreshProjects()
  }

  // ─── Testimonial handlers ───
  const handleApproveTestimonial = async (id) => {
    await approveTestimonial(id, getAuthHeader())
    refreshTestimonials()
  }

  const handleDeleteTestimonial = async (id) => {
    if (!confirm('Delete this testimonial?')) return
    await deleteTestimonial(id, getAuthHeader())
    refreshTestimonials()
  }

  const TabButton = ({ tab }) => (
    <button
      onClick={() => setActiveTab(tab.id)}
      className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        activeTab === tab.id
          ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-md'
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
      }`}
    >
      <tab.icon className="w-4 h-4" />
      {tab.label}
    </button>
  )

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
              <button onClick={() => onNavigate?.('main')} className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-dark-300 text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition-colors text-sm">
                <Home className="w-4 h-4" /> Home
              </button>
              <button onClick={onClose} className="p-2 rounded-lg bg-gray-100 dark:bg-dark-300 text-gray-600 dark:text-gray-400 hover:bg-gray-200 transition-colors">
                <X className="w-4 h-4" />
              </button>
              <button onClick={() => { logout(); onClose() }} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 transition-colors text-sm">
                <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tabs */}
          <div className="flex items-center gap-1 mb-8 bg-white dark:bg-dark-200 p-1.5 rounded-xl border border-gray-200 dark:border-gray-800 w-fit overflow-x-auto">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {tab.id === 'messages' && unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">{unreadCount}</span>
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">

            {/* ── OVERVIEW TAB ── */}
            {activeTab === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: 'Messages', value: messages.length, icon: Inbox, sub: `${unreadCount} unread` },
                    { label: 'Blog Posts', value: posts.length, icon: BookOpen, sub: `${posts.filter(p => p.published).length} published` },
                    { label: 'Projects', value: projects.length, icon: FolderOpen, sub: `${projects.filter(p => p.featured).length} featured` },
                    { label: 'Reviews', value: testimonials.length, icon: Quote, sub: `${testimonials.filter(t => t.isApproved).length} approved` },
                  ].map((stat, i) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.07 }}
                      className="bg-white dark:bg-dark-200 p-6 rounded-xl border border-gray-200 dark:border-gray-800 cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => setActiveTab(stat.label.toLowerCase().split(' ')[0])}>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                          <span className="text-xs text-gray-400 mt-1 block">{stat.sub}</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-500/10">
                          <stat.icon className="w-5 h-5 text-red-500 dark:text-red-400" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="bg-gradient-to-r from-red-500 via-rose-500 to-orange-500 rounded-xl p-6 text-white">
                  <h3 className="font-bold mb-4">Quick Actions</h3>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => setActiveTab('messages')} className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-sm font-medium flex items-center gap-2"><Inbox className="w-4 h-4" /> Messages</button>
                    <button onClick={() => { setActiveTab('blog'); setShowPostForm(true) }} className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-sm font-medium flex items-center gap-2"><Plus className="w-4 h-4" /> New Post</button>
                    <button onClick={() => { setActiveTab('projects'); setShowProjectForm(true) }} className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-sm font-medium flex items-center gap-2"><Plus className="w-4 h-4" /> New Project</button>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* ── MESSAGES TAB ── */}
            {activeTab === 'messages' && (
              <motion.div key="messages" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Inbox className="w-5 h-5 text-red-500" /> Contact Messages
                    {unreadCount > 0 && <span className="px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-500/15 text-red-600 dark:text-red-400 text-sm font-bold">{unreadCount} unread</span>}
                  </h2>
                  <button onClick={refreshMessages} disabled={loadingMessages} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-dark-300 text-gray-600 dark:text-gray-400 hover:bg-gray-200 transition-colors text-sm disabled:opacity-50">
                    <RefreshCw className={`w-4 h-4 ${loadingMessages ? 'animate-spin' : ''}`} /> Refresh
                  </button>
                </div>

                {loadingMessages ? (
                  <div className="bg-white dark:bg-dark-200 rounded-2xl border border-gray-200 dark:border-gray-800 flex items-center justify-center py-24 text-gray-400">
                    <Loader2 className="w-10 h-10 animate-spin" />
                  </div>
                ) : messages.length === 0 ? (
                  <div className="bg-white dark:bg-dark-200 rounded-2xl border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center py-24 text-gray-400">
                    <Mail className="w-16 h-16 mb-4 opacity-20" />
                    <p className="font-semibold text-gray-500 dark:text-gray-400">No messages yet</p>
                  </div>
                ) : (
                  <div className="grid lg:grid-cols-5 gap-6">
                    <div className="lg:col-span-2 space-y-2 max-h-[60vh] overflow-y-auto">
                      {messages.map(msg => (
                        <button key={msg._id || msg.id} onClick={() => handleRead(msg)}
                          className={`w-full text-left p-4 rounded-xl border transition-all group ${
                            (selectedMsg?._id || selectedMsg?.id) === (msg._id || msg.id) ? 'border-red-400 dark:border-red-500 bg-red-50 dark:bg-red-500/10 shadow-md'
                            : msg.isRead ? 'border-gray-100 dark:border-gray-800 bg-white dark:bg-dark-200 hover:border-gray-200'
                            : 'border-red-200 dark:border-red-500/30 bg-red-50/60 dark:bg-red-500/5 hover:border-red-300'
                          }`}>
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${msg.isRead ? 'bg-gray-300' : 'bg-red-500 animate-pulse'}`} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1 mb-0.5">
                                <span className={`text-sm font-bold truncate ${msg.isRead ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'}`}>{msg.name}</span>
                                <button onClick={(e) => handleDeleteMsg(msg._id || msg.id, e)} className="opacity-0 group-hover:opacity-100 p-1 rounded text-gray-400 hover:text-red-500 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                              </div>
                              <p className="text-xs text-gray-500 truncate">{msg.email}</p>
                              <p className="text-xs text-gray-600 truncate mt-0.5">{msg.message}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="lg:col-span-3">
                      {selectedMsg ? (
                        <div className="bg-white dark:bg-dark-200 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{selectedMsg.name}</h3>
                              <a href={`mailto:${selectedMsg.email}`} className="text-sm text-red-500 flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{selectedMsg.email}</a>
                            </div>
                            <button onClick={(e) => handleDeleteMsg(selectedMsg._id || selectedMsg.id, e)} className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-sm mb-4">{selectedMsg.message}</p>
                          <a href={`mailto:${selectedMsg.email}?subject=Re: Your inquiry&body=Hi ${selectedMsg.name},%0D%0A%0D%0AThank you for reaching out!%0D%0A`}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-semibold shadow-md">
                            <MessageSquare className="w-4 h-4" /> Reply via Email
                          </a>
                        </div>
                      ) : (
                        <div className="bg-white dark:bg-dark-200 rounded-2xl border border-gray-200 dark:border-gray-800 flex items-center justify-center py-24 text-gray-400">
                          <p className="text-sm">Select a message to read</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* ── BLOG TAB ── */}
            {activeTab === 'blog' && (
              <motion.div key="blog" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-red-500" /> Blog Posts
                    <span className="text-sm font-normal text-gray-400">({posts.length} total)</span>
                  </h2>
                  <button onClick={() => { setEditingPost(null); setPostForm(emptyBlog); setShowPostForm(!showPostForm) }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-medium shadow-md">
                    <Plus className="w-4 h-4" /> New Post
                  </button>
                </div>

                {/* Blog Form */}
                <AnimatePresence>
                  {showPostForm && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-6">
                      <div className="bg-white dark:bg-dark-200 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">{editingPost ? 'Edit Post' : 'New Post'}</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <input placeholder="Title" value={postForm.title} onChange={e => setPostForm({ ...postForm, title: e.target.value })}
                            className="col-span-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-300 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none" />
                          <textarea placeholder="Excerpt" value={postForm.excerpt} onChange={e => setPostForm({ ...postForm, excerpt: e.target.value })} rows={2}
                            className="col-span-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-300 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none" />
                          <textarea placeholder="Full content (optional)" value={postForm.content} onChange={e => setPostForm({ ...postForm, content: e.target.value })} rows={3}
                            className="col-span-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-300 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none" />
                          <input placeholder="Image URL" value={postForm.image} onChange={e => setPostForm({ ...postForm, image: e.target.value })}
                            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-300 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none" />
                          <select value={postForm.category} onChange={e => setPostForm({ ...postForm, category: e.target.value })}
                            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-300 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none">
                            {['Development', 'Security', 'Backend', 'Game Dev', 'DevOps', 'Journey', 'Mobile', 'Web'].map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                          <input placeholder="Tags (comma separated)" value={postForm.tags} onChange={e => setPostForm({ ...postForm, tags: e.target.value })}
                            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-300 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none" />
                          <input placeholder="Read time" value={postForm.readTime} onChange={e => setPostForm({ ...postForm, readTime: e.target.value })}
                            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-300 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none" />
                          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <input type="checkbox" checked={postForm.trending} onChange={e => setPostForm({ ...postForm, trending: e.target.checked })}
                              className="w-4 h-4 rounded text-red-500 focus:ring-red-500" /> Trending
                          </label>
                          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <input type="checkbox" checked={postForm.published} onChange={e => setPostForm({ ...postForm, published: e.target.checked })}
                              className="w-4 h-4 rounded text-red-500 focus:ring-red-500" /> Published
                          </label>
                        </div>
                        <div className="flex items-center gap-3 mt-4">
                          <button onClick={handleSavePost} disabled={savingPost || !postForm.title}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-semibold shadow-md disabled:opacity-50">
                            {savingPost ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            {editingPost ? 'Update' : 'Create'}
                          </button>
                          <button onClick={() => { setShowPostForm(false); setEditingPost(null); setPostForm(emptyBlog) }}
                            className="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-300 text-gray-600 dark:text-gray-400 text-sm font-medium">Cancel</button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Posts list */}
                {loadingPosts ? (
                  <div className="flex items-center justify-center py-24 text-gray-400"><Loader2 className="w-10 h-10 animate-spin" /></div>
                ) : posts.length === 0 ? (
                  <div className="bg-white dark:bg-dark-200 rounded-2xl border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center py-24 text-gray-400">
                    <BookOpen className="w-16 h-16 mb-4 opacity-20" />
                    <p className="font-semibold text-gray-500">No posts yet</p>
                    <p className="text-sm mt-1">Create your first blog post above</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {posts.map(post => (
                      <div key={post._id || post.id} className="bg-white dark:bg-dark-200 rounded-xl border border-gray-200 dark:border-gray-800 p-4 flex items-center gap-4">
                        {post.image && <img src={post.image} alt="" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-gray-900 dark:text-white truncate">{post.title}</h4>
                            {!post.published && <span className="px-2 py-0.5 rounded bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 text-xs">Draft</span>}
                            {post.trending && <span className="px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 text-xs">Trending</span>}
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{post.excerpt}</p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                            <span>{post.category}</span>·<span>{post.readTime}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button onClick={() => handleEditPost(post)} className="p-2 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors"><Edit3 className="w-4 h-4" /></button>
                          <button onClick={() => handleDeletePost(post._id || post.id)} className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* ── PROJECTS TAB ── */}
            {activeTab === 'projects' && (
              <motion.div key="projects" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <FolderOpen className="w-5 h-5 text-red-500" /> Projects
                    <span className="text-sm font-normal text-gray-400">({projects.length} total)</span>
                  </h2>
                  <button onClick={() => { setEditingProject(null); setProjectForm(emptyProject); setShowProjectForm(!showProjectForm) }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-medium shadow-md">
                    <Plus className="w-4 h-4" /> New Project
                  </button>
                </div>

                {/* Project Form */}
                <AnimatePresence>
                  {showProjectForm && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-6">
                      <div className="bg-white dark:bg-dark-200 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">{editingProject ? 'Edit Project' : 'New Project'}</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <input placeholder="Title" value={projectForm.title} onChange={e => setProjectForm({ ...projectForm, title: e.target.value })}
                            className="col-span-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-300 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none" />
                          <textarea placeholder="Description" value={projectForm.description} onChange={e => setProjectForm({ ...projectForm, description: e.target.value })} rows={2}
                            className="col-span-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-300 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none" />
                          <input placeholder="Image URL" value={projectForm.image} onChange={e => setProjectForm({ ...projectForm, image: e.target.value })}
                            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-300 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none" />
                          <input placeholder="Demo URL" value={projectForm.demoUrl} onChange={e => setProjectForm({ ...projectForm, demoUrl: e.target.value })}
                            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-300 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none" />
                          <input placeholder="GitHub URL" value={projectForm.githubUrl} onChange={e => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-300 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none" />
                          <input placeholder="Tags (comma separated)" value={projectForm.tags} onChange={e => setProjectForm({ ...projectForm, tags: e.target.value })}
                            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-300 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none" />
                          <select value={projectForm.category} onChange={e => setProjectForm({ ...projectForm, category: e.target.value })}
                            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-300 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none">
                            {['Web', 'Mobile', 'Game Dev', 'DevOps', 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                          <select value={projectForm.status} onChange={e => setProjectForm({ ...projectForm, status: e.target.value })}
                            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-300 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none">
                            {['Live', 'Beta', 'In Dev', 'Archived'].map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                          <input placeholder="Year" value={projectForm.year} onChange={e => setProjectForm({ ...projectForm, year: e.target.value })}
                            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-300 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none" />
                          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <input type="checkbox" checked={projectForm.featured} onChange={e => setProjectForm({ ...projectForm, featured: e.target.checked })}
                              className="w-4 h-4 rounded text-red-500 focus:ring-red-500" /> Featured
                          </label>
                        </div>
                        <div className="flex items-center gap-3 mt-4">
                          <button onClick={handleSaveProject} disabled={savingProject || !projectForm.title}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-semibold shadow-md disabled:opacity-50">
                            {savingProject ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            {editingProject ? 'Update' : 'Create'}
                          </button>
                          <button onClick={() => { setShowProjectForm(false); setEditingProject(null); setProjectForm(emptyProject) }}
                            className="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-300 text-gray-600 dark:text-gray-400 text-sm font-medium">Cancel</button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Projects list */}
                {loadingProjects ? (
                  <div className="flex items-center justify-center py-24 text-gray-400"><Loader2 className="w-10 h-10 animate-spin" /></div>
                ) : projects.length === 0 ? (
                  <div className="bg-white dark:bg-dark-200 rounded-2xl border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center py-24 text-gray-400">
                    <FolderOpen className="w-16 h-16 mb-4 opacity-20" />
                    <p className="font-semibold text-gray-500">No projects yet</p>
                    <p className="text-sm mt-1">Create your first project above</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {projects.map(proj => (
                      <div key={proj._id || proj.id} className="bg-white dark:bg-dark-200 rounded-xl border border-gray-200 dark:border-gray-800 p-4 flex items-center gap-4">
                        {proj.image && <img src={proj.image} alt="" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-gray-900 dark:text-white truncate">{proj.title}</h4>
                            <span className={`px-2 py-0.5 rounded text-xs ${
                              proj.status === 'Live' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                              : proj.status === 'Beta' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400'
                              : 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400'
                            }`}>{proj.status}</span>
                            {proj.featured && <span className="px-2 py-0.5 rounded bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-xs">Featured</span>}
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{proj.description}</p>
                          <p className="text-xs text-gray-400 mt-1">{proj.category} · {proj.year}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button onClick={() => handleEditProject(proj)} className="p-2 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors"><Edit3 className="w-4 h-4" /></button>
                          <button onClick={() => handleDeleteProject(proj._id || proj.id)} className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* ── TESTIMONIALS TAB ── */}
            {activeTab === 'testimonials' && (
              <motion.div key="testimonials" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Quote className="w-5 h-5 text-red-500" /> Testimonials
                    <span className="text-sm font-normal text-gray-400">({testimonials.length} total)</span>
                  </h2>
                  <button onClick={refreshTestimonials} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-dark-300 text-gray-600 dark:text-gray-400 hover:bg-gray-200 transition-colors text-sm">
                    <RefreshCw className="w-4 h-4" /> Refresh
                  </button>
                </div>

                {loadingTestimonials ? (
                  <div className="flex items-center justify-center py-24 text-gray-400"><Loader2 className="w-10 h-10 animate-spin" /></div>
                ) : testimonials.length === 0 ? (
                  <div className="bg-white dark:bg-dark-200 rounded-2xl border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center py-24 text-gray-400">
                    <Quote className="w-16 h-16 mb-4 opacity-20" />
                    <p className="font-semibold text-gray-500">No testimonials yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {testimonials.map(t => (
                      <div key={t._id || t.id} className={`bg-white dark:bg-dark-200 rounded-xl border p-4 flex items-center gap-4 ${t.isApproved ? 'border-gray-200 dark:border-gray-800' : 'border-yellow-300 dark:border-yellow-500/30 bg-yellow-50/30 dark:bg-yellow-500/5'}`}>
                        {t.image && <img src={t.image} alt="" className="w-12 h-12 rounded-full object-cover flex-shrink-0" />}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-gray-900 dark:text-white">{t.name}</h4>
                            <span className="text-sm text-gray-400">· {t.role}</span>
                            {!t.isApproved && <span className="px-2 py-0.5 rounded bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 text-xs">Pending</span>}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{t.content}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {[...Array(t.rating || 5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                            {t.project && <span className="text-xs text-gray-400">· {t.project}</span>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {!t.isApproved && (
                            <button onClick={() => handleApproveTestimonial(t._id || t.id)} className="p-2 rounded-lg text-green-500 hover:bg-green-50 dark:hover:bg-green-500/10 transition-colors" title="Approve">
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button onClick={() => handleDeleteTestimonial(t._id || t.id)} className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))}
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
