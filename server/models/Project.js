import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  image: { type: String, default: '' },
  tags: [{ type: String }],
  category: { type: String, default: 'Web' },
  demoUrl: { type: String, default: '#' },
  githubUrl: { type: String, default: '#' },
  featured: { type: Boolean, default: false },
  year: { type: String, default: '' },
  status: { type: String, default: 'Live' },
  color: { type: String, default: 'from-blue-500 to-indigo-600' },
}, { timestamps: true })

export default mongoose.model('Project', projectSchema)
