import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  Download, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Award, 
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin
} from 'lucide-react'

function Resume() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const experiences = [
    {
      title: 'Full-Stack Developer',
      company: 'Baraka Tech Solution',
      period: '2023 - Present',
      description: 'Building AI-powered applications, web platforms, and mobile solutions. Managing end-to-end development from concept to deployment.',
      achievements: [
        'Developed 50+ projects using React, Node.js, and Python',
        'Implemented AI/ML solutions for automation',
        'Built secure payment integration systems',
        'Created custom game engines and RPG systems'
      ]
    },
  ]

  const education = [
    {
      degree: 'Secondary Education',
      school: 'Rwanda Secondary School',
      period: '2023 - 2027',
      description: 'Currently pursuing secondary education with focus on technology and computer science.',
      achievements: [
        'Self-taught full-stack development',
        'Completed 50+ coding projects',
        'Built AI-powered applications',
        'Developed cybersecurity expertise'
      ]
    },
  ]

  const skills = {
    'Frontend': ['React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Framer Motion'],
    'Backend': ['Node.js', 'Python', 'Express', 'FastAPI', 'REST APIs'],
    'Database': ['PostgreSQL', 'Supabase', 'MongoDB', 'Redis'],
    'AI/ML': ['TensorFlow', 'OpenAI API', 'LangChain', 'Computer Vision'],
    'DevOps': ['Git', 'Docker', 'Linux', 'CI/CD', 'Cloud Deployment'],
    'Security': ['Kali Linux', 'Tor Browser', 'Penetration Testing', 'Ethical Hacking'],
    'Game Dev': ['Unity', 'Unreal Engine', 'C#', 'C++', 'Game AI'],
  }

  const certifications = [
    { name: 'AI & Machine Learning', issuer: 'Self-Taught', year: '2024' },
    { name: 'Cybersecurity Fundamentals', issuer: 'Self-Taught', year: '2024' },
    { name: 'Full-Stack Development', issuer: 'Portfolio Projects', year: '2023-2024' },
    { name: 'Game Development', issuer: 'Unity/Unreal Projects', year: '2024' },
  ]

  const contactInfo = {
    email: 'barakadevx@gmail.com',
    phone: '0792828727',
    location: 'Rwanda',
    website: 'barakadevx.com',
    github: 'github.com/barakadevx-afk',
    linkedin: 'linkedin.com/in/barakadevx',
  }

  return (
    <section id="resume" className="py-20 md:py-32" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Resume</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Full-Stack Developer | AI Engineer | Cybersecurity Expert
          </p>
          <motion.a
            href="/resume.html"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary-500 to-purple-600 text-white font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl transition-shadow"
          >
            <Download className="w-5 h-5" />
            View / Print Resume
          </motion.a>
        </motion.div>

        {/* Resume Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white dark:bg-dark-100 rounded-2xl shadow-xl dark:shadow-none overflow-hidden"
        >
          {/* Resume Header */}
          <div className="bg-gradient-to-r from-primary-500 to-purple-600 p-8 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Baraka</h1>
            <p className="text-white/90 text-lg mb-4">
              Full-Stack Developer | AI Engineer | Game Developer | Cybersecurity Expert
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-white/80">
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-1 hover:text-white">
                <Mail className="w-4 h-4" />
                {contactInfo.email}
              </a>
              <span className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {contactInfo.phone}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {contactInfo.location}
              </span>
              <a href={`https://${contactInfo.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white">
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a href={`https://${contactInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>
          </div>

          <div className="p-8">
            {/* Summary */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary-500" />
                Professional Summary
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Passionate full-stack developer and AI engineer with expertise in building intelligent systems, 
                web applications, and games. Self-taught developer with a strong foundation in cybersecurity 
                and a portfolio of 50+ projects. Currently completing secondary education (2023-2027) while 
                working on innovative tech solutions.
              </p>
            </div>

            {/* Experience */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary-500" />
                Experience
              </h3>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={index} className="border-l-2 border-primary-500 pl-4">
                    <h4 className="font-bold text-gray-900 dark:text-white">{exp.title}</h4>
                    <p className="text-primary-500 font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{exp.period}</p>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">{exp.description}</p>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary-500" />
                Education
              </h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-purple-500 pl-4">
                    <h4 className="font-bold text-gray-900 dark:text-white">{edu.degree}</h4>
                    <p className="text-purple-500 font-medium">{edu.school}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{edu.period}</p>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">{edu.description}</p>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-primary-500" />
                Technical Skills
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(skills).map(([category, skillList]) => (
                  <div key={category}>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((skill) => (
                        <span 
                          key={skill}
                          className="px-3 py-1 rounded-full bg-gray-100 dark:bg-dark-200 text-sm text-gray-700 dark:text-gray-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary-500" />
                Certifications & Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-xl bg-gray-50 dark:bg-dark-200"
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white">{cert.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {cert.issuer} • {cert.year}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Resume
