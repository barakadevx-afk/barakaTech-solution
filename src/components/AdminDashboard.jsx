import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, Eye, Download, MessageSquare, TrendingUp, 
  DollarSign, LogOut, BarChart3, Shield,
  CheckCircle, XCircle, AlertTriangle, Home, X
} from 'lucide-react'
import { useAdmin } from '../contexts/AdminContext'
import AdminLogin from './AdminLogin'

const stats = [
  { label: 'Total Users', value: '1,234', change: '+12%', icon: Users, color: 'red' },
  { label: 'Page Views', value: '45.2K', change: '+8%', icon: Eye, color: 'rose' },
  { label: 'Downloads', value: '892', change: '+23%', icon: Download, color: 'pink' },
  { label: 'Revenue', value: '$2,450', change: '+15%', icon: DollarSign, color: 'orange' },
]

const recentUsers = [
  { name: 'John Doe', email: 'john@example.com', joined: '2 mins ago', status: 'active' },
  { name: 'Jane Smith', email: 'jane@example.com', joined: '1 hour ago', status: 'active' },
  { name: 'Mike Johnson', email: 'mike@example.com', joined: '3 hours ago', status: 'guest' },
  { name: 'Sarah Williams', email: 'sarah@example.com', joined: '1 day ago', status: 'active' },
]

const activities = [
  { action: 'New user registered', user: 'john@example.com', time: '2 mins ago', type: 'success' },
  { action: 'Source code downloaded', user: 'jane@example.com', time: '5 mins ago', type: 'info' },
  { action: 'Failed login attempt', user: 'unknown', time: '10 mins ago', type: 'warning' },
  { action: 'Payment received', user: 'mike@example.com', time: '15 mins ago', type: 'success' },
]

function AdminDashboard({ onNavigate, onClose }) {
  const { logout, isAdmin } = useAdmin()
  const [activeTab, setActiveTab] = useState('overview')

  // Show login if not admin
  if (!isAdmin) {
    return <AdminLogin onClose={onClose} />
  }

  const getStatusIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      default: return <BarChart3 className="w-4 h-4 text-red-500" />
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm">
      <div className="min-h-screen bg-gray-50 dark:bg-dark-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-8 h-8 text-primary-500" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Admin Dashboard
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Manage users, monitor activity, and view analytics.
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
              <button
                onClick={() => {
                  logout()
                  onClose()
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-dark-200 p-6 rounded-xl border border-gray-200 dark:border-gray-800"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                    <span className="inline-flex items-center gap-1 text-sm text-green-600">
                      <TrendingUp className="w-3 h-3" />
                      {stat.change}
                    </span>
                  </div>
                  <div className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/30`}>
                    <stat.icon className={`w-5 h-5 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Users */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 bg-white dark:bg-dark-200 rounded-xl p-6 border border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900 dark:text-white">Recent Users</h3>
                <button className="text-sm text-primary-500 hover:text-primary-600">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
                      <th className="pb-3 font-medium">User</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Joined</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {recentUsers.map((user, index) => (
                      <tr key={index} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                        <td className="py-4">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                            <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            user.status === 'active'
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                          }`}>
                            {user.status === 'active' ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : (
                              <XCircle className="w-3 h-3" />
                            )}
                            {user.status}
                          </span>
                        </td>
                        <td className="py-4 text-gray-500 dark:text-gray-400">{user.joined}</td>
                        <td className="py-4">
                          <div className="flex gap-2">
                            <button className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 transition-colors">
                              <MessageSquare className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 transition-colors">
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Activity Feed */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-dark-200 rounded-xl p-6 border border-gray-200 dark:border-gray-800"
            >
              <h3 className="font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-dark-300/50">
                    {getStatusIcon(activity.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{activity.user}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl p-6 text-white"
          >
            <h3 className="font-bold mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-4">
              <button className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-sm font-medium">
                Send Newsletter
              </button>
              <button className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-sm font-medium">
                Manage Projects
              </button>
              <button className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-sm font-medium">
                View Reports
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
