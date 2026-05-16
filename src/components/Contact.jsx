import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, MapPin, Phone, Send, Linkedin, Github, Twitter, CheckCircle, AlertCircle, Clock, MessageSquare, Zap } from 'lucide-react'

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'barakadevx@gmail.com', href: 'mailto:barakadevx@gmail.com', color: 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400', hover: 'hover:bg-red-500' },
  { icon: Phone, label: 'Phone / WhatsApp', value: '+250 792 828 727', href: 'tel:+250792828727', color: 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400', hover: 'hover:bg-green-500' },
  { icon: MapPin, label: 'Location', value: 'Rwanda 🌍 (Remote OK)', href: '#', color: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400', hover: 'hover:bg-blue-500' },
  { icon: Clock, label: 'Response Time', value: 'Within 24 hours', href: '#', color: 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400', hover: 'hover:bg-orange-500' },
]

const socialLinks = [
  { icon: Github, href: 'https://github.com/barakadevx-afk', label: 'GitHub', color: 'hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:bg-blue-600 hover:text-white' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter / X', color: 'hover:bg-sky-500 hover:text-white' },
]

const projectTypes = ['Web Application', 'Mobile App', 'Game Development', 'Security Audit', 'API / Backend', 'UI/UX Design', 'Consultation', 'Other']

function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [formData, setFormData] = useState({ name: '', email: '', projectType: '', budget: '', message: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const e = {}
    if (!formData.name.trim() || formData.name.length < 2) e.name = 'Name must be at least 2 characters'
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Enter a valid email address'
    if (!formData.message.trim() || formData.message.length < 10) e.message = 'Message must be at least 10 characters'
    return e
  }

  const saveMessageLocally = (data) => {
    try {
      const existing = JSON.parse(localStorage.getItem('contact_messages') || '[]')
      const newMsg = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        projectType: data.projectType,
        budget: data.budget,
        message: data.message,
        date: new Date().toISOString(),
        read: false,
      }
      localStorage.setItem('contact_messages', JSON.stringify([newMsg, ...existing]))
    } catch {
      // silently fail if localStorage is unavailable
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length) { setErrors(v); return }
    setErrors({})
    setIsSubmitting(true)
    await new Promise(r => setTimeout(r, 800))
    saveMessageLocally(formData)
    const subject = encodeURIComponent(`[Portfolio] ${formData.projectType || 'Inquiry'} from ${formData.name}`)
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType || 'N/A'}\nBudget: ${formData.budget || 'N/A'}\n\nMessage:\n${formData.message}`)
    window.open(`mailto:barakadevx@gmail.com?subject=${subject}&body=${body}`, '_blank')
    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ name: '', email: '', projectType: '', budget: '', message: '' })
    setTimeout(() => setSubmitted(false), 8000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(p => ({ ...p, [name]: value }))
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }))
  }

  const inputClass = (field) => `w-full px-4 py-3 rounded-xl border text-gray-900 dark:text-white bg-gray-50 dark:bg-dark-200 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 transition-all ${
    errors[field]
      ? 'border-red-400 dark:border-red-500 focus:ring-red-500/20 focus:border-red-500'
      : 'border-gray-200 dark:border-gray-700 focus:ring-red-500/20 focus:border-red-400 dark:focus:border-red-500'
  }`

  return (
    <section id="contact" className="section-padding bg-white dark:bg-dark-200" ref={ref}>
      <div className="max-w-7xl mx-auto container-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-medium mb-4 border border-red-100 dark:border-red-500/20">
            <MessageSquare className="w-3.5 h-3.5" />
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Let&apos;s{' '}
            <span className="text-gradient">Work Together</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg">
            Have a project in mind? I&apos;d love to hear about it. Send me a message and I&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Contact Information</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Feel free to reach out for project collaborations, freelance work, or just to say hi. I&apos;m always open to discussing new ideas.
              </p>
            </div>

            <div className="space-y-3">
              {contactInfo.map((info, i) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, x: -15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-dark-100 border border-gray-100 dark:border-gray-800 hover:border-red-200 dark:hover:border-red-500/30 hover:shadow-md transition-all group"
                >
                  <div className={`w-11 h-11 rounded-xl ${info.color} flex items-center justify-center group-hover:text-white transition-colors flex-shrink-0 ${info.hover}`}>
                    <info.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wide">{info.label}</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social */}
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Find me on</p>
              <div className="flex gap-3">
                {socialLinks.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className={`p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 transition-all ${s.color}`}
                    aria-label={s.label}
                  >
                    <s.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-red-500/10 to-rose-500/10 dark:from-red-500/15 dark:to-rose-500/15 border border-red-200/50 dark:border-red-500/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-bold text-gray-900 dark:text-white">Currently Available</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                I&apos;m open to new projects and collaborations. Let&apos;s build something amazing together!
              </p>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-gray-50 dark:bg-dark-100 border border-gray-100 dark:border-gray-800 shadow-card">
              {/* Success */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-800 dark:text-green-400 text-sm">Message ready to send!</p>
                    <p className="text-green-700 dark:text-green-500 text-xs mt-0.5">Your email client should have opened. I&apos;ll get back to you within 24 hours.</p>
                  </div>
                </motion.div>
              )}

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Your Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className={inputClass('name')} />
                  {errors.name && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className={inputClass('email')} />
                  {errors.email && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Project Type</label>
                  <select name="projectType" value={formData.projectType} onChange={handleChange} className={inputClass('projectType')}>
                    <option value="">Select type...</option>
                    {projectTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Budget Range</label>
                  <select name="budget" value={formData.budget} onChange={handleChange} className={inputClass('budget')}>
                    <option value="">Select range...</option>
                    <option value="&lt; $500">&lt; $500</option>
                    <option value="$500 - $2,000">$500 - $2,000</option>
                    <option value="$2,000 - $5,000">$2,000 - $5,000</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                    <option value="$10,000+">$10,000+</option>
                    <option value="Let's discuss">Let&apos;s discuss</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Your Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell me about your project, goals, and how I can help..."
                  className={`${inputClass('message')} resize-none`}
                />
                <div className="flex items-center justify-between mt-1">
                  {errors.message
                    ? <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>
                    : <span />
                  }
                  <span className={`text-xs ${formData.message.length > 10 ? 'text-green-500' : 'text-gray-400'}`}>{formData.message.length} chars</span>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed text-base"
              >
                {isSubmitting ? (
                  <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</>
                ) : (
                  <><Zap className="w-5 h-5" />Send Message</>
                )}
              </motion.button>

              <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-4">
                Your message is saved and your email client will open with a pre-filled reply.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
