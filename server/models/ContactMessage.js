import mongoose from 'mongoose'

const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  projectType: { type: String, default: null },
  budget: { type: String, default: null },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
}, { timestamps: { createdAt: 'createdAt', updatedAt: false } })

export default mongoose.model('ContactMessage', contactMessageSchema)
