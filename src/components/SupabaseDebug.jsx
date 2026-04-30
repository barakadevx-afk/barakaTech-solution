import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle, Database } from 'lucide-react'

function SupabaseDebug() {
  const [status, setStatus] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    setStatus(null)
    setError(null)

    try {
      // Check environment variables
      const url = import.meta.env.VITE_SUPABASE_URL
      const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

      console.log('Supabase URL:', url)
      console.log('Key exists:', !!key)
      console.log('Key starts with:', key?.substring(0, 20))

      if (!url || !key) {
        throw new Error('Missing environment variables. Check your .env file.')
      }

      // Test connection by trying to get table info
      const { data, error: supabaseError } = await supabase
        .from('contacts')
        .select('count', { count: 'exact', head: true })

      if (supabaseError) {
        console.error('Supabase error:', supabaseError)
        
        if (supabaseError.code === '42P01') {
          throw new Error('Table "contacts" does not exist. Please create it in Supabase.')
        } else if (supabaseError.code === '42501' || supabaseError.message?.includes('row-level security')) {
          throw new Error('Row Level Security policy error. Please check RLS settings.')
        } else if (supabaseError.message?.includes('Invalid API key')) {
          throw new Error('Invalid Supabase API key. Please check your VITE_SUPABASE_PUBLISHABLE_KEY.')
        } else {
          throw new Error(supabaseError.message || 'Unknown Supabase error')
        }
      }

      setStatus({
        connected: true,
        tableExists: true,
        message: 'Supabase connection successful! Table "contacts" exists.'
      })
    } catch (err) {
      console.error('Test failed:', err)
      setError(err.message)
      setStatus({
        connected: false,
        error: err.message
      })
    } finally {
      setLoading(false)
    }
  }

  const insertTestData = async () => {
    setLoading(true)
    setError(null)

    try {
      const testData = {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'This is a test message from the debug panel.',
        created_at: new Date().toISOString(),
      }

      console.log('Inserting test data:', testData)

      const { data, error: insertError } = await supabase
        .from('contacts')
        .insert(testData)
        .select()

      if (insertError) {
        console.error('Insert error:', insertError)
        throw new Error(insertError.message)
      }

      console.log('Insert successful:', data)
      setStatus({
        connected: true,
        tableExists: true,
        insertSuccess: true,
        message: 'Test data inserted successfully! Check your Supabase dashboard.'
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-dark-100 shadow-lg">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <Database className="w-5 h-5 text-primary-500" />
        Supabase Debug Panel
      </h3>

      <div className="space-y-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p className="mb-2"><strong>URL:</strong> {import.meta.env.VITE_SUPABASE_URL || 'Not set'}</p>
          <p><strong>Key:</strong> {import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ? '✓ Set' : '✗ Not set'}</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={testConnection}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Connection'}
          </button>
          
          <button
            onClick={insertTestData}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-purple-500 text-white font-medium hover:bg-purple-600 disabled:opacity-50"
          >
            Insert Test Data
          </button>
        </div>

        {status && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl flex items-start gap-2 ${
              status.connected 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
            }`}
          >
            {status.connected ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <div>
              <p className="font-medium">{status.connected ? 'Success' : 'Error'}</p>
              <p className="text-sm">{status.message || status.error}</p>
            </div>
          </motion.div>
        )}

        {error && !status && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
          >
            <p className="font-medium">Error: {error}</p>
          </motion.div>
        )}

        <div className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          <p className="font-medium mb-1">Setup Checklist:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Create &quot;contacts&quot; table in Supabase</li>
            <li>Enable Row Level Security (RLS)</li>
            <li>Add INSERT policy for anonymous users</li>
            <li>Verify API key format (should start with &quot;eyJ...&quot;)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SupabaseDebug
