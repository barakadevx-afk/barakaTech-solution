import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react'

const faqs = [
  {
    q: 'What technologies do you specialize in?',
    a: 'I specialize in the full JavaScript/TypeScript stack — React, Next.js, Node.js, and Express on the backend. I also work with Python for backend tasks, Unity for game development, and various security tools for cybersecurity work. I\'m always learning new technologies as projects demand.',
  },
  {
    q: 'Are you available for freelance projects?',
    a: 'Yes! I\'m currently available for freelance and contract work. I work with clients globally on a remote basis. My availability varies, so I recommend reaching out early to discuss your timeline. I typically respond to inquiries within 24 hours.',
  },
  {
    q: 'How do you approach a new project?',
    a: 'I start with a discovery call to understand your goals, users, and technical requirements. From there I create a technical spec, break it into milestones, and provide regular updates throughout development. I believe in transparency — you\'ll always know where things stand.',
  },
  {
    q: 'Do you build mobile apps as well?',
    a: 'Yes! I build cross-platform mobile apps using React Native, which allows me to ship to both iOS and Android from a single codebase. For web-first experiences that need mobile support, I also build Progressive Web Apps (PWAs).',
  },
  {
    q: 'What is your experience with cybersecurity?',
    a: 'I have hands-on experience with penetration testing, vulnerability assessments, secure code review, and threat modeling. I hold knowledge in tools like Burp Suite, Metasploit, Nmap, and Wireshark. I can also help audit your existing application for common OWASP vulnerabilities.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'It depends on scope and complexity. A simple landing page might take 1–2 weeks. A full-stack web app typically ranges from 4–12 weeks. I always provide a clear timeline estimate after the initial discovery call, and I communicate any changes well in advance.',
  },
  {
    q: 'Do you offer ongoing maintenance after launch?',
    a: 'Absolutely. I offer monthly retainer packages for ongoing maintenance, feature development, and bug fixes. I believe in long-term partnerships rather than one-off transactions, and many of my clients stay with me for continuous improvements.',
  },
  {
    q: 'What are your rates?',
    a: 'My rates are competitive and depend on the project scope, complexity, and timeline. I offer both hourly rates and fixed-price project quotes. Reach out via the contact form with your project details and I\'ll get back to you with a custom quote.',
  },
]

function FAQItem({ faq, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? 'border-red-200 dark:border-red-500/30 bg-red-50/50 dark:bg-red-500/5 shadow-md shadow-red-500/5'
          : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-dark-100 hover:border-red-100 dark:hover:border-red-500/20'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
      >
        <div className="flex items-start gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
            isOpen ? 'bg-red-500 text-white' : 'bg-gray-100 dark:bg-dark-200 text-gray-500 dark:text-gray-400'
          }`}>
            <span className="text-xs font-bold">{index + 1}</span>
          </div>
          <span className={`font-semibold text-sm sm:text-base transition-colors ${
            isOpen ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'
          }`}>
            {faq.q}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
            isOpen ? 'bg-red-500 text-white' : 'bg-gray-100 dark:bg-dark-200 text-gray-500'
          }`}
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-16 sm:pl-[3.75rem]">
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
                {faq.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="section-padding bg-gray-50 dark:bg-dark-100" ref={ref}>
      <div className="max-w-7xl mx-auto container-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-32"
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-medium mb-6 border border-red-100 dark:border-red-500/20">
              <HelpCircle className="w-3.5 h-3.5" />
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Frequently Asked{' '}
              <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
              Got questions about working with me? Here are the most common ones. 
              Don&apos;t see yours? Just reach out directly!
            </p>

            {/* Contact prompt */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-rose-500/10 dark:from-red-500/15 dark:to-rose-500/15 border border-red-200/50 dark:border-red-500/20">
              <MessageSquare className="w-8 h-8 text-red-500 mb-3" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Still have questions?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                I&apos;m happy to answer any questions you have. Reach out and I&apos;ll get back to you within 24 hours.
              </p>
              <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-semibold shadow-lg shadow-red-500/30 hover:shadow-xl transition-all">
                Ask Me Anything
              </button>
            </div>
          </motion.div>

          {/* Right — FAQ Items */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3"
          >
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
