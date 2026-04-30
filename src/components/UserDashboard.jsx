import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, Mail, Calendar, Download, Star, MessageSquare, 
  Settings, LogOut, FileCode, Bell, Home, X
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const downloads = [
  { name: 'E-Commerce Platform', type: 'React + Node.js', date: '2024-01-15', size: '2.4 MB' },
  { name: 'AI Image Generator', type: 'Python + FastAPI', date: '2024-01-10', size: '1.8 MB' },
]

const activity = [
  { action: 'Downloaded source code', project: 'E-Commerce Platform', time: '2 days ago' },
  { action: 'Joined community', project: 'Discord Server', time: '1 week ago' },
]

function UserDashboard({ onNavigate, onClose }) {
  const { user, logout } = useAuth()
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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm">
      <div className="min-h-screen bg-gray-50 dark:bg-dark-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start justify-between mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your account, downloads, and preferences.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate?.('main')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-dark-300 text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition-colors"
              >
                <Home className="w-4 h-4" />
                Home
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-gray-100 dark:bg-dark-300 text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-white dark:bg-dark-200 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                {/* Profile Card */}
                <div className="text-center mb-6 pb-6 border-b border-gray-200 dark:border-gray-800">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{user.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                  <span className="inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-medium">
                    <Star className="w-3 h-3" />
                    Premium Member
                  </span>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                  {[
                    { id: 'overview', icon: User, label: 'Overview' },
                    { id: 'downloads', icon: Download, label: 'Downloads' },
                    { id: 'activity', icon: Bell, label: 'Activity' },
                    { id: 'settings', icon: Settings, label: 'Settings' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === item.id
                          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-300'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  ))}

                  <div className="border-t border-gray-200 dark:border-gray-800 my-2" />

                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </nav>
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Stats */}
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { label: 'Downloads', value: '12', icon: Download },
                      { label: 'Projects Access', value: '6', icon: FileCode },
                      { label: 'Support Tickets', value: '3', icon: MessageSquare },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white dark:bg-dark-200 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                          </div>
                          <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                            <stat.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white dark:bg-dark-200 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      {activity.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-dark-300/50">
                          <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                            <Bell className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 dark:text-white">{item.action}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{item.project}</p>
                          </div>
                          <span className="text-sm text-gray-400">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Account Info */}
                  <div className="bg-white dark:bg-dark-200 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4">Account Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <User className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                          <p className="text-gray-900 dark:text-white">{user.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                          <p className="text-gray-900 dark:text-white">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                          <p className="text-gray-900 dark:text-white">{new Date(user.joinedAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'downloads' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-dark-200 rounded-xl p-6 border border-gray-200 dark:border-gray-800"
                >
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">Your Downloads</h3>
                  <div className="space-y-4">
                    {downloads.map((download, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-dark-300/50">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                            <FileCode className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{download.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{download.type} • {download.size}</p>
                          </div>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500 text-white text-sm hover:bg-primary-600 transition-colors">
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'activity' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-dark-200 rounded-xl p-6 border border-gray-200 dark:border-gray-800"
                >
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">Activity Log</h3>
                  <div className="space-y-4">
                    {activity.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-dark-300/50 border-l-4 border-primary-500">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">{item.action}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{item.project}</p>
                        </div>
                        <span className="text-sm text-gray-400">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-dark-200 rounded-xl p-6 border border-gray-200 dark:border-gray-800"
                >
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">Account Settings</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Display Name
                      </label>
                      <input
                        type="text"
                        defaultValue={user.name}
                        className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-dark-300 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Notifications
                      </label>
                      <div className="space-y-2">
                        {['New project releases', 'Security updates', 'Newsletter'].map((item) => (
                          <label key={item} className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-primary-500" />
                            <span className="text-gray-700 dark:text-gray-300">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <button className="px-6 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors">
                      Save Changes
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
