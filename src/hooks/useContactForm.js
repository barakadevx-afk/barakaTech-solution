import { useState } from 'react'
import { useSupabase } from '../contexts/SupabaseContext'

export function useContactForm() {
  const { insertData, loading, error } = useSupabase()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const result = await insertData('contacts', {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      created_at: new Date().toISOString(),
    })

    if (result) {
      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    }
  }

  return {
    formData,
    handleChange,
    handleSubmit,
    submitted,
    loading,
    error,
  }
}

export default useContactForm
