import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Briefcase, GraduationCap, Award, Calendar } from 'lucide-react'

const experiences = [
  {
    type: 'work',
    title: 'Senior Full-Stack Developer',
    company: 'Tech Innovators Ltd',
    period: '2022 - Present',
    description: 'Leading development of enterprise web applications, mentoring junior developers, and architecting scalable systems.',
    achievements: ['Reduced load times by 60%', 'Led team of 5 developers', 'Migrated legacy systems'],
  },
  {
    type: 'work',
    title: 'Game Developer',
    company: 'Indie Studio Games',
    period: '2020 - 2022',
    description: 'Developed 2D/3D games using Unity and Unreal Engine, implemented AI systems and multiplayer functionality.',
    achievements: ['Shipped 3 titles', 'Implemented AI behavior trees', 'Optimized rendering pipeline'],
  },
  {
    type: 'work',
    title: 'Cybersecurity Analyst',
    company: 'SecureNet Solutions',
    period: '2019 - 2020',
    description: 'Conducted penetration testing, vulnerability assessments, and implemented security protocols.',
    achievements: ['Identified 50+ vulnerabilities', 'Developed security framework', 'CISSP Certified'],
  },
  {
    type: 'education',
    title: 'BSc Computer Science',
    company: 'University of Technology',
    period: '2015 - 2019',
    description: 'Focus on Software Engineering, Cybersecurity, and Game Development. Graduated with First Class Honors.',
    achievements: ['Dean\'s List all semesters', 'Research in AI/ML', 'Game Dev Club President'],
  },
]

const certifications = [
  { name: 'CISSP', issuer: 'ISC²', year: '2020' },
  { name: 'AWS Solutions Architect', issuer: 'Amazon', year: '2021' },
  { name: 'Unity Certified Developer', issuer: 'Unity', year: '2021' },
  { name: 'CEH', issuer: 'EC-Council', year: '2019' },
]

function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="experience" className="py-20 md:py-32 bg-gray-50 dark:bg-dark-100" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
            Journey
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Experience &{' '}
            <span className="text-gradient">Education</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg">
            My professional journey across software engineering, game development, and cybersecurity.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Timeline */}
          <div className="lg:col-span-2">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-purple-500" />

              {/* Experience Items */}
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.title}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative flex gap-6"
                  >
                    {/* Icon */}
                    <div className="relative z-10 w-16 h-16 rounded-full bg-white dark:bg-dark-200 border-2 border-primary-500 flex items-center justify-center shadow-lg">
                      {exp.type === 'work' ? (
                        <Briefcase className="w-6 h-6 text-primary-500" />
                      ) : (
                        <GraduationCap className="w-6 h-6 text-purple-500" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {exp.title}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-medium">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-primary-500 font-medium mb-2">{exp.company}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.achievements.map((achievement) => (
                          <span
                            key={achievement}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 dark:bg-dark-300 text-gray-600 dark:text-gray-400 text-xs"
                          >
                            <Award className="w-3 h-3" />
                            {achievement}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-6 rounded-2xl bg-white dark:bg-dark-200 border border-gray-200 dark:border-gray-800"
            >
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-primary-500" />
                Certifications
              </h3>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-dark-300/50"
                  >
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">
                        {cert.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{cert.issuer}</p>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar className="w-3 h-3" />
                      {cert.year}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
