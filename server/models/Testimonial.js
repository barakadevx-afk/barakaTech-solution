import mongoose from 'mongoose'

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, default: '' },
  content: { type: String, required: true },
  rating: { type: Number, default: 5 },
  project: { type: String, default: '' },
  isApproved: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.model('Testimonial', testimonialSchema)
