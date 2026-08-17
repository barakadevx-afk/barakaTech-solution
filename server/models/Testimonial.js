import mongoose from 'mongoose'

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, default: 5 },
  project: { type: String, default: null },
  image: { type: String, default: null },
  isFeatured: { type: Boolean, default: false },
}, { timestamps: { createdAt: 'createdAt', updatedAt: false } })

export default mongoose.model('Testimonial', testimonialSchema)
