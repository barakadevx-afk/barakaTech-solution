import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  excerpt: { type: String, required: true },
  content: { type: String, default: '' },
  image: { type: String, default: '' },
  category: { type: String, required: true },
  readTime: { type: String, default: '5 min read' },
  tags: [{ type: String }],
  trending: { type: Boolean, default: false },
  color: { type: String, default: 'from-blue-500 to-indigo-600' },
  published: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.model('Blog', blogSchema)
