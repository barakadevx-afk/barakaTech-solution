import { useEffect, useRef } from 'react'

function ParticlesBackground() {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const frameCount = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Enhanced Particle class with multiple shapes
    class Particle {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 1.5
        this.vy = (Math.random() - 0.5) * 1.5
        this.size = Math.random() * 4 + 2
        this.baseSize = this.size
        this.opacity = Math.random() * 0.6 + 0.3
        this.pulsePhase = Math.random() * Math.PI * 2
        this.pulseSpeed = 0.02 + Math.random() * 0.03
        this.shape = Math.random() > 0.5 ? 'circle' : 'ring'
        this.colorIndex = Math.floor(Math.random() * 4) // 0: red, 1: rose, 2: orange, 3: pink
      }

      update() {
        frameCount.current++
        
        // Pulse effect
        this.pulsePhase += this.pulseSpeed
        this.size = this.baseSize + Math.sin(this.pulsePhase) * 2

        // Mouse interaction - stronger attraction
        const dx = mouseRef.current.x - this.x
        const dy = mouseRef.current.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 200 && distance > 0) {
          const force = (200 - distance) / 200
          this.vx += (dx / distance) * force * 0.03
          this.vy += (dy / distance) * force * 0.03
        }

        this.x += this.vx
        this.y += this.vy

        // Gentle boundary wrap
        if (this.x < -50) this.x = canvas.width + 50
        if (this.x > canvas.width + 50) this.x = -50
        if (this.y < -50) this.y = canvas.height + 50
        if (this.y > canvas.height + 50) this.y = -50

        // Speed limit with decay
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
        if (speed > 3) {
          this.vx *= 0.98
          this.vy *= 0.98
        }

        // Random drift
        this.vx += (Math.random() - 0.5) * 0.02
        this.vy += (Math.random() - 0.5) * 0.02
      }

      draw(ctx, colors) {
        const color = colors[this.colorIndex]
        const pulseOpacity = this.opacity * (0.7 + 0.3 * Math.sin(this.pulsePhase))

        ctx.beginPath()
        
        if (this.shape === 'circle') {
          ctx.arc(this.x, this.y, Math.max(0.5, this.size), 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${color}, ${pulseOpacity})`
          ctx.fill()
          
          // Glow effect
          ctx.shadowBlur = 15
          ctx.shadowColor = `rgba(${color}, 0.5)`
          ctx.fill()
          ctx.shadowBlur = 0
        } else {
          // Ring shape
          ctx.arc(this.x, this.y, Math.max(1, this.size), 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(${color}, ${pulseOpacity})`
          ctx.lineWidth = 2
          ctx.stroke()
        }
      }
    }

    // Initialize particles - more particles for richer effect
    const particleCount = Math.min(120, Math.floor((canvas.width * canvas.height) / 12000))
    particlesRef.current = Array.from({ length: particleCount }, () => new Particle())

    // Mouse tracking with smoothing
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop with gradient background and enhanced effects
    const animate = () => {
      const isDark = document.documentElement.classList.contains('dark')
      
      // Red-themed colors for light and dark modes
      const colors = isDark 
        ? ['239, 68, 68', '244, 63, 94', '251, 146, 60', '236, 72, 153']  // Dark: red, rose, orange, pink
        : ['220, 38, 38', '225, 29, 72', '234, 88, 12', '219, 39, 119']   // Light: darker shades

      // Clear with semi-transparent for trail effect
      ctx.fillStyle = isDark ? 'rgba(15, 23, 42, 0.15)' : 'rgba(254, 242, 242, 0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        particle.update()
        particle.draw(ctx, colors)
      })

      // Draw enhanced connections with gradients
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const opacity = 0.25 * (1 - distance / 150)
            
            // Create gradient for connection line
            const gradient = ctx.createLinearGradient(particle.x, particle.y, other.x, other.y)
            gradient.addColorStop(0, `rgba(${colors[particle.colorIndex]}, ${opacity})`)
            gradient.addColorStop(1, `rgba(${colors[other.colorIndex]}, ${opacity})`)
            
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = gradient
            ctx.lineWidth = 1.5
            ctx.stroke()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        opacity: 0.9,
        background: 'linear-gradient(135deg, rgba(254,242,242,0.3) 0%, rgba(255,255,255,0) 50%, rgba(254,242,242,0.2) 100%)'
      }}
    />
  )
}

export default ParticlesBackground
