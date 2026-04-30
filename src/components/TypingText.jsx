import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const roles = [
  'Full-Stack Developer',
  'Game Engineer',
  'Cybersecurity Expert (Kali Linux & Tor Browser)',
  'System Architect',
]

function TypingText() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [speed, setSpeed] = useState(100)

  useEffect(() => {
    const role = roles[currentRoleIndex]
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < role.length) {
          setCurrentText(role.slice(0, currentText.length + 1))
          setSpeed(100)
        } else {
          // Finished typing, pause before deleting
          setSpeed(2000)
          setIsDeleting(true)
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1))
          setSpeed(50)
        } else {
          // Finished deleting, move to next role
          setIsDeleting(false)
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
          setSpeed(500)
        }
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [currentText, isDeleting, currentRoleIndex, speed])

  return (
    <span className="inline-flex items-center">
      <span className="text-gradient">{currentText}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="ml-1 w-0.5 h-8 bg-primary-500 inline-block"
      />
    </span>
  )
}

export default TypingText
