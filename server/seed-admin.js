import 'dotenv/config'
import connectDB from './mongodb.js'
import User from './models/User.js'
import Blog from './models/Blog.js'
import Project from './models/Project.js'
import Testimonial from './models/Testimonial.js'

await connectDB()

// ── Admin user ──
const adminEmail = 'Baraka@admin.com'
const adminPassword = 'Admin@123'

try {
  const existing = await User.findOne({ email: adminEmail })
  if (existing) {
    console.log(`Admin user already exists: ${adminEmail}`)
  } else {
    await User.create({ name: 'Baraka Admin', email: adminEmail, password: adminPassword, role: 'admin' })
    console.log(`Admin user created: ${adminEmail}`)
  }
} catch (err) {
  console.error('Admin seed error:', err.message)
}

// ── Blog posts ──
const blogPosts = [
  { title: 'Building Scalable React Apps with TypeScript and Clean Architecture', excerpt: 'How I structure large React codebases for maximum maintainability, with real patterns from production apps. Covering folder structure, dependency injection, and state management strategies.', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop', category: 'Development', readTime: '8 min read', tags: ['React', 'TypeScript', 'Architecture'], trending: true, color: 'from-blue-500 to-indigo-600', published: true },
  { title: 'Penetration Testing 101: A Developer\'s Guide to Ethical Hacking', excerpt: 'Understanding how attackers think helps you build more secure systems. Walk through common vulnerabilities, tools, and methodologies every developer should know about.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop', category: 'Security', readTime: '12 min read', tags: ['Cybersecurity', 'Ethical Hacking', 'DevSec'], trending: false, color: 'from-green-500 to-emerald-600', published: true },
  { title: 'Why I Switched from REST to GraphQL (and When NOT To)', excerpt: 'After running both architectures in production, here\'s an honest breakdown of tradeoffs, performance benchmarks, and the scenarios where each approach truly shines.', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop', category: 'Backend', readTime: '6 min read', tags: ['GraphQL', 'REST', 'API Design'], trending: true, color: 'from-pink-500 to-rose-600', published: true },
  { title: 'Game Dev Chronicles: Building NPCs That Actually Feel Alive', excerpt: 'Deep dive into behavior trees, finite state machines, and the Unity tools I used to create NPCs that react dynamically to player actions — without being annoying.', image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=400&fit=crop', category: 'Game Dev', readTime: '10 min read', tags: ['Unity', 'Behavior Trees', 'Game Dev'], trending: false, color: 'from-purple-500 to-pink-600', published: true },
  { title: 'Docker & Kubernetes: From Zero to Production-Ready in a Weekend', excerpt: 'The practical guide nobody wrote — containerizing a Node.js app, setting up CI/CD pipelines, and deploying to a Kubernetes cluster without losing your mind.', image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=400&fit=crop', category: 'DevOps', readTime: '15 min read', tags: ['Docker', 'Kubernetes', 'DevOps'], trending: false, color: 'from-blue-600 to-cyan-600', published: true },
  { title: 'My Journey: From High School Student to Full-Stack Dev in 1 Year', excerpt: 'The unfiltered story of how I taught myself to code, built 50+ projects, and landed my first clients while still in secondary school.', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop', category: 'Journey', readTime: '7 min read', tags: ['Career', 'Learning', 'Story'], trending: true, color: 'from-orange-500 to-red-600', published: true },
]

try {
  const existing = await Blog.countDocuments()
  if (existing === 0) {
    await Blog.insertMany(blogPosts)
    console.log(`Seeded ${blogPosts.length} blog posts`)
  } else {
    console.log(`Blog posts already exist (${existing}), skipping`)
  }
} catch (err) {
  console.error('Blog seed error:', err.message)
}

// ── Projects ──
const projects = [
  { title: 'SkillsMatch', description: 'Career path analyzer that maps your skills to real job opportunities. Suggests personalized learning roadmaps and identifies skill gaps in your target career.', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop', tags: ['React', 'Node.js', 'Career Tech'], category: 'Web', demoUrl: '#', githubUrl: 'https://github.com/barakadevx-afk/skillsmatch', featured: true, year: '2024', status: 'Live', color: 'from-blue-500 to-indigo-600' },
  { title: 'EduNexusHub', description: 'Adaptive e-learning platform that personalizes content delivery based on your learning style and pace. Built with real-time progress tracking and interactive lessons.', image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=500&fit=crop', tags: ['E-Learning', 'EdTech', 'React'], category: 'Web', demoUrl: '#', githubUrl: 'https://github.com/barakadevx-afk/edunexushub', featured: true, year: '2024', status: 'Live', color: 'from-green-500 to-teal-600' },
  { title: 'ChatCraft', description: 'A customizable chatbot platform for businesses. Allows non-technical teams to build and deploy conversational bots with a drag-and-drop flow builder.', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop', tags: ['Chat', 'SaaS', 'Node.js'], category: 'Web', demoUrl: '#', githubUrl: 'https://github.com/barakadevx-afk/advanced-chat-maker', featured: true, year: '2023', status: 'Beta', color: 'from-purple-500 to-pink-600' },
  { title: 'Family Connect', description: 'A family coordination app with shared calendars, event reminders, grocery lists, and a private social feed. Built with real-time sync.', image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=500&fit=crop', tags: ['React Native', 'Family', 'Realtime', 'Mobile'], category: 'Mobile', demoUrl: '#', githubUrl: 'https://github.com/barakadevx-afk/family-connect', featured: false, year: '2023', status: 'Live', color: 'from-orange-500 to-red-600' },
  { title: 'CodeVault', description: 'An open-source collection of developer tools, code snippets, and automation scripts.', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop', tags: ['Dev Tools', 'Open Source', 'Node.js', 'CLI'], category: 'Web', demoUrl: '#', githubUrl: 'https://github.com/barakadevx-afk/barakacodex', featured: false, year: '2023', status: 'Live', color: 'from-gray-600 to-gray-800' },
  { title: 'HangaHub', description: 'A collaborative maker platform where creators build and share projects together.', image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=500&fit=crop', tags: ['Next.js', 'Collaboration', 'Community', 'PostgreSQL'], category: 'Web', demoUrl: '#', githubUrl: 'https://github.com/barakadevx-afk/hangahub-website', featured: false, year: '2024', status: 'In Dev', color: 'from-cyan-500 to-blue-600' },
]

try {
  const existing = await Project.countDocuments()
  if (existing === 0) {
    await Project.insertMany(projects)
    console.log(`Seeded ${projects.length} projects`)
  } else {
    console.log(`Projects already exist (${existing}), skipping`)
  }
} catch (err) {
  console.error('Project seed error:', err.message)
}

// ── Testimonials ──
const testimonials = [
  { name: 'Ishimwe Kevin', role: 'Full stack Developer', image: '/kevin.jpg', content: 'Baraka delivered an exceptional full-stack solution that transformed our operations. His attention to security and performance is unmatched.', rating: 5, project: 'Enterprise SaaS Platform', isApproved: true },
  { name: 'ishimwe jeanclaude', role: 'Full stack Developer', image: '/ish.jpg', content: 'The behavior system Baraka implemented for our RPG was groundbreaking. He truly understands game mechanics and player psychology.', rating: 5, project: 'Fantasy RPG Game', isApproved: true },
  { name: 'izere elias', role: 'Advanced Information Security Engineer', image: '/elias.png', content: 'His penetration testing revealed vulnerabilities we never knew existed. Baraka\'s security audit saved us from potential disasters.', rating: 5, project: 'Security Audit', isApproved: true },
  { name: 'Baraka DevX', role: 'Game And Web Developer & Security Specialist', image: '/profile.jpg', content: 'Fast, efficient, and incredibly skilled. The learning platform he built handles 10,000+ concurrent users without breaking a sweat.', rating: 5, project: 'E-Learning Platform', isApproved: true },
]

try {
  const existing = await Testimonial.countDocuments()
  if (existing === 0) {
    await Testimonial.insertMany(testimonials)
    console.log(`Seeded ${testimonials.length} testimonials`)
  } else {
    console.log(`Testimonials already exist (${existing}), skipping`)
  }
} catch (err) {
  console.error('Testimonial seed error:', err.message)
}

process.exit(0)
