import { createContext, useContext, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'

const SupabaseContext = createContext(null)

export function SupabaseProvider({ children }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Generic fetch function
  const fetchData = useCallback(async (table, options = {}) => {
    setLoading(true)
    setError(null)
    try {
      let query = supabase.from(table).select(options.select || '*')
      
      if (options.eq) {
        query = query.eq(options.eq.column, options.eq.value)
      }
      if (options.order) {
        query = query.order(options.order.column, { ascending: options.order.ascending })
      }
      if (options.limit) {
        query = query.limit(options.limit)
      }

      const { data, error: supabaseError } = await query
      
      if (supabaseError) throw supabaseError
      return data
    } catch (err) {
      setError(err.message)
      console.error('Supabase fetch error:', err)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  // Insert data
  const insertData = useCallback(async (table, data) => {
    setLoading(true)
    setError(null)
    try {
      console.log('Inserting into', table, ':', data)
      console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL)
      
      const { data: result, error: supabaseError } = await supabase
        .from(table)
        .insert(data)
        .select()
      
      if (supabaseError) {
        console.error('Supabase error details:', supabaseError)
        throw supabaseError
      }
      
      console.log('Insert successful:', result)
      return result
    } catch (err) {
      setError(err.message)
      console.error('Supabase insert error:', err)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  // Update data
  const updateData = useCallback(async (table, id, data) => {
    setLoading(true)
    setError(null)
    try {
      const { data: result, error: supabaseError } = await supabase
        .from(table)
        .update(data)
        .eq('id', id)
        .select()
      
      if (supabaseError) throw supabaseError
      return result
    } catch (err) {
      setError(err.message)
      console.error('Supabase update error:', err)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  // Delete data
  const deleteData = useCallback(async (table, id) => {
    setLoading(true)
    setError(null)
    try {
      const { error: supabaseError } = await supabase
        .from(table)
        .delete()
        .eq('id', id)
      
      if (supabaseError) throw supabaseError
      return true
    } catch (err) {
      setError(err.message)
      console.error('Supabase delete error:', err)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  // Real-time subscription
  const subscribeToChanges = useCallback((table, callback) => {
    const subscription = supabase
      .channel(`${table}_changes`)
      .on('postgres_changes', { event: '*', schema: 'public', table }, callback)
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [])

  const value = {
    supabase,
    fetchData,
    insertData,
    updateData,
    deleteData,
    subscribeToChanges,
    loading,
    error,
  }

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  )
}

export function useSupabase() {
  const context = useContext(SupabaseContext)
  if (!context) {
    throw new Error('useSupabase must be used within SupabaseProvider')
  }
  return context
}

export default SupabaseContext
